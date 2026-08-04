/* ============================================================
   Memoirs in Motion — application logic
   ------------------------------------------------------------
   Components:
     - Gated Logic Engine  : evaluates answers, unlocks in order
     - Interactive Canvas  : SVG nodes that glow / change state
     - Path Interpolation  : animated line grows to the next node
     - Feedback Overlay     : banners + confetti on success
   ============================================================ */
(function () {
  "use strict";

  const JOURNEY = window.JOURNEY || [];
  const CHAPTERS = window.CHAPTERS || [];
  const CHAPTER_SIZE = window.CHAPTER_SIZE || 5;
  const STORAGE_KEY = "memoirs-in-motion:progress:v2";

  // --- SVG coordinate space (nodes are positioned as % of this box) ---
  const VB_W = 1000;
  const VB_H = 700;

  const svg = document.getElementById("mapSvg");
  const defs = svg.querySelector("defs");
  const nodeLayer = document.getElementById("nodeLayer");
  const pathLayer = document.getElementById("pathLayer");
  const cardEl = document.getElementById("card");
  const feedbackEl = document.getElementById("feedback");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const finaleEl = document.getElementById("finale");
  const fxCanvas = document.getElementById("fx");

  svg.setAttribute("viewBox", `0 0 ${VB_W} ${VB_H}`);

  // ----- State -----
  // unlockedCount    = number of milestones already solved.
  // chaptersUnlocked = number of chapters whose CODE has been entered.
  // The "active" milestone (the one being asked) is at index === unlockedCount,
  // but it only becomes answerable once its chapter's code has been entered.
  // Everything after it stays locked. A chapter is `CHAPTER_SIZE` milestones.
  const saved = loadProgress();
  let unlockedCount = saved.solved;
  let chaptersUnlocked = saved.chapters;
  let revealTimer = null; // pending auto-advance from the "memory unlocked" card
  const nodeEls = []; // { group, dot, ... } per milestone
  const pathEls = []; // path element leading INTO milestone i (i>=1)

  // Which chapter a milestone index belongs to, and whether its code is in.
  const chapterOf = (i) => Math.floor(i / CHAPTER_SIZE);
  const chapterCount = () => Math.ceil(JOURNEY.length / CHAPTER_SIZE);
  const isChapterOpen = (c) => c < chaptersUnlocked;
  function getChapter(c) {
    return CHAPTERS[c] || { name: `Chapter ${c + 1}`, code: "", intro: "" };
  }
  // A chapter with no code configured is treated as already open.
  function chapterNeedsCode(c) {
    const meta = getChapter(c);
    return !!(meta.code && String(meta.code).trim()) && !isChapterOpen(c);
  }

  // ---------- Photos ----------
  // Each memory's `photo` (set in data.js) is the default polaroid image:
  // an image path/URL is shown as a picture; anything else is an emoji.
  // A path that fails to load falls back to the emoji (see updateNodePhoto /
  // renderCardPhoto), so missing files in images/ simply show the emoji.
  function isImageSrc(s) {
    return (
      typeof s === "string" &&
      /^(data:image\/|https?:\/\/)|\.(png|jpe?g|gif|webp|svg)$/i.test(s.trim())
    );
  }
  // The image to show for a memory, or null when only an emoji is configured.
  function getPhoto(m) {
    if (m && isImageSrc(m.photo)) return m.photo;
    return null;
  }
  // The emoji placeholder to show when there's no image (or it failed to load).
  function getEmoji(m) {
    if (m && m.photo && !isImageSrc(m.photo)) return m.photo;
    return (m && m.icon) || "★";
  }

  // ---------- Geometry helpers ----------
  function px(m) {
    return { x: (m.x / 100) * VB_W, y: (m.y / 100) * VB_H };
  }

  // A gentle curved connector between two points (quadratic Bézier).
  function curvePath(p1, p2) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    // Perpendicular offset so the line bows nicely instead of being straight.
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const bow = Math.min(90, len * 0.22);
    const cx = mx + (-dy / len) * bow;
    const cy = my + (dx / len) * bow;
    return `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`;
  }

  function el(tag, attrs) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  // Polaroid geometry (SVG user units).
  const POL = { w: 128, h: 150, px: -54, py: -62, ps: 108 };

  // ---------- Build the map ----------
  function buildMap() {
    // A soft drop shadow so the polaroids lift off the map.
    const shadow = el("filter", {
      id: "polaroidShadow",
      x: "-30%", y: "-30%", width: "160%", height: "160%",
    });
    shadow.appendChild(
      el("feDropShadow", {
        dx: 0, dy: 4, stdDeviation: 6, "flood-color": "rgba(0,0,0,0.45)",
      })
    );
    defs.appendChild(shadow);

    // Paths first, so nodes render on top.
    for (let i = 1; i < JOURNEY.length; i++) {
      const p1 = px(JOURNEY[i - 1]);
      const p2 = px(JOURNEY[i]);
      const path = el("path", {
        d: curvePath(p1, p2),
        class: "journey-path pending",
      });
      pathLayer.appendChild(path);
      pathEls[i] = path;
    }

    JOURNEY.forEach((m, i) => {
      const p = px(m);
      const g = el("g", { class: "node locked", "data-index": i });
      g.style.setProperty("transform", `translate(${p.x}px, ${p.y}px)`);

      // Simple marker (locked / active states).
      const glow = el("circle", { class: "node-glow", r: 46, fill: "url(#glowGrad)" });
      const ring = el("circle", { class: "node-ring", r: 20 });
      const dot = el("circle", { class: "node-dot", r: 18 });
      const lock = el("text", { class: "node-lock", y: 1 });
      lock.textContent = "🔒";
      const icon = el("text", { class: "node-icon", y: 1 });
      icon.textContent = m.icon || "★";

      // Polaroid (unlocked state) — a rotated white frame with photo + caption.
      const rot = ((i * 41) % 11) - 5; // deterministic tilt, roughly -5°..+5°
      const pol = el("g", { class: "polaroid" });
      const rotG = el("g", { class: "pol-rot", transform: `rotate(${rot})` });

      const frame = el("rect", {
        class: "pol-frame",
        x: -POL.w / 2, y: -72, width: POL.w, height: POL.h, rx: 5,
        filter: "url(#polaroidShadow)",
      });
      const photoBg = el("rect", {
        class: "pol-photobg", x: POL.px, y: POL.py, width: POL.ps, height: POL.ps, rx: 2,
      });
      // Per-node clip so the photo fills its square window without distortion.
      const clip = el("clipPath", { id: `pclip-${i}`, clipPathUnits: "userSpaceOnUse" });
      clip.appendChild(
        el("rect", { x: POL.px, y: POL.py, width: POL.ps, height: POL.ps, rx: 2 })
      );
      defs.appendChild(clip);
      const image = el("image", {
        class: "pol-image",
        x: POL.px, y: POL.py, width: POL.ps, height: POL.ps,
        preserveAspectRatio: "xMidYMid slice",
        "clip-path": `url(#pclip-${i})`,
      });
      image.style.display = "none";
      // If a configured image path fails to load, fall back to the emoji.
      image.addEventListener("error", () => {
        image.style.display = "none";
        emoji.style.display = "";
      });
      const emoji = el("text", { class: "pol-emoji", x: 0, y: -8, "text-anchor": "middle" });
      emoji.textContent = getEmoji(m);
      const capTitle = el("text", { class: "pol-title", x: 0, y: 58, "text-anchor": "middle" });
      capTitle.textContent = m.title;
      const capDate = el("text", { class: "pol-date", x: 0, y: 71, "text-anchor": "middle" });
      capDate.textContent = m.date || "";

      rotG.appendChild(frame);
      rotG.appendChild(photoBg);
      rotG.appendChild(image);
      rotG.appendChild(emoji);
      rotG.appendChild(capTitle);
      rotG.appendChild(capDate);
      pol.appendChild(rotG);

      g.appendChild(glow);
      g.appendChild(ring);
      g.appendChild(dot);
      g.appendChild(lock);
      g.appendChild(icon);
      g.appendChild(pol);

      g.addEventListener("click", () => {
        if (i < unlockedCount) {
          reviewMemory(i); // an unlocked point — reopen its memory
        } else if (i === unlockedCount) {
          focusCard(); // the active point — re-focus its question
        }
      });

      nodeLayer.appendChild(g);
      nodeEls[i] = { g, dot, icon, image, emoji };
    });
  }

  // Point a node's polaroid at its current photo (or fall back to the emoji).
  function updateNodePhoto(i) {
    const refs = nodeEls[i];
    if (!refs) return;
    const src = getPhoto(JOURNEY[i]);
    if (src) {
      refs.image.setAttribute("href", src);
      refs.image.setAttributeNS("http://www.w3.org/1999/xlink", "href", src);
      refs.image.style.display = "";
      refs.emoji.style.display = "none";
    } else {
      refs.image.style.display = "none";
      refs.emoji.style.display = "";
    }
  }

  // ---------- Render node states ----------
  function renderStates(animateNewlyUnlocked) {
    JOURNEY.forEach((m, i) => {
      const { g } = nodeEls[i];
      g.classList.remove("locked", "active", "unlocked");
      if (i < unlockedCount) {
        g.classList.add("unlocked");
      } else if (i === unlockedCount && isChapterOpen(chapterOf(i))) {
        // Current milestone, and its chapter's code has been entered.
        g.classList.add("active");
      } else {
        // Locked: either a future milestone, or the current one is still
        // waiting on its chapter code.
        g.classList.add("locked");
      }
      updateNodePhoto(i);
    });

    // Paths: a path INTO milestone i is "drawn" once milestone i is unlocked.
    for (let i = 1; i < JOURNEY.length; i++) {
      const path = pathEls[i];
      if (!path) continue;
      const shouldDraw = i < unlockedCount;
      const already = path.dataset.drawn === "1";
      if (shouldDraw && !already) {
        drawPath(path, i === animateNewlyUnlocked);
      } else if (!shouldDraw && already) {
        // reset (used on replay)
        path.classList.add("pending");
        path.style.strokeDasharray = "";
        path.style.strokeDashoffset = "";
        delete path.dataset.drawn;
      }
    }

    updateProgress();
  }

  // Animate a path "walking" from one node to the next.
  function drawPath(path, animate) {
    path.classList.remove("pending");
    path.dataset.drawn = "1";
    const total = path.getTotalLength();
    if (animate) {
      path.style.strokeDasharray = total;
      path.style.strokeDashoffset = total;
      // Force reflow so the transition takes effect.
      // eslint-disable-next-line no-unused-expressions
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.65,0,0.35,1)";
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    } else {
      path.style.strokeDasharray = "";
      path.style.strokeDashoffset = "";
    }
  }

  function updateProgress() {
    const total = JOURNEY.length;
    const pct = total ? (unlockedCount / total) * 100 : 0;
    progressFill.style.width = pct + "%";
    progressLabel.textContent = `${unlockedCount} / ${total} memories unlocked`;
  }

  // ---------- The active card (code gate, question, or finale) ----------
  function renderCard() {
    clearTimeout(revealTimer);
    if (unlockedCount >= JOURNEY.length) {
      renderComplete();
      return;
    }
    const chapter = chapterOf(unlockedCount);
    if (chapterNeedsCode(chapter)) {
      renderCodeGate(chapter);
      return;
    }
    renderQuestion();
  }

  // A locked chapter: ask for its code before any of its questions appear.
  function renderCodeGate(chapter) {
    const meta = getChapter(chapter);
    const first = chapter * CHAPTER_SIZE + 1;
    const last = Math.min((chapter + 1) * CHAPTER_SIZE, JOURNEY.length);

    cardEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fade-in code-gate";
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.height = "100%";

    wrap.innerHTML = `
      <div class="card-kicker">Chapter ${chapter + 1} of ${chapterCount()} — locked</div>
      <div class="gate-lock" aria-hidden="true">🔐</div>
      <h2>${escapeHtml(meta.name)}</h2>
      <div class="step-count">${escapeHtml(meta.intro || "Enter the code to unlock this chapter.")}</div>
      <div class="question-block">
        <p class="question-text">This chapter holds memories ${first}–${last}. Enter its code to continue.</p>
        <form class="answer-form" id="codeForm" autocomplete="off">
          <input class="answer-input" id="codeInput" type="text"
                 placeholder="Enter chapter code…" aria-label="Chapter code" />
          <button class="btn primary" type="submit">Enter</button>
        </form>
        <div class="hint" id="hint">💡 Ask the storyteller for the code, or check where it was shared with you.</div>
      </div>
      <div class="next-cue">
        <span>🔒</span>
        <span>The five memories in this chapter stay hidden until the code is entered.</span>
      </div>
    `;
    cardEl.appendChild(wrap);

    const form = wrap.querySelector("#codeForm");
    const input = wrap.querySelector("#codeInput");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleCode(chapter, input.value, input);
    });
    input.focus();
  }

  function renderQuestion() {
    const m = JOURNEY[unlockedCount];
    const isChapterEnd =
      (unlockedCount + 1) % CHAPTER_SIZE === 0 && unlockedCount + 1 < JOURNEY.length;

    cardEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fade-in";
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.height = "100%";

    let cue;
    if (unlockedCount + 1 >= JOURNEY.length) {
      cue = "This is the final memory on the journey.";
    } else if (isChapterEnd) {
      cue = "Last memory of this chapter — a new code will be needed to continue.";
    } else {
      cue = "The next destination stays hidden until this one is solved.";
    }

    wrap.innerHTML = `
      <div class="card-kicker">Milestone ${unlockedCount + 1} of ${JOURNEY.length}</div>
      <h2>A locked memory awaits</h2>
      <div class="step-count">Answer correctly to reveal it on the map.</div>
      <div class="question-block">
        <p class="question-text">${escapeHtml(m.question)}</p>
        <form class="answer-form" id="answerForm" autocomplete="off">
          <input class="answer-input" id="answerInput" type="text"
                 placeholder="Type your answer…" aria-label="Your answer" />
          <button class="btn primary" type="submit">Unlock</button>
        </form>
        <div class="hint" id="hint">💡 ${escapeHtml(m.hint || "Trust your memory — you know this one.")}</div>
      </div>
      <div class="next-cue">
        <span>🔒</span>
        <span>${cue}</span>
      </div>
    `;
    cardEl.appendChild(wrap);

    const form = wrap.querySelector("#answerForm");
    const input = wrap.querySelector("#answerInput");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAnswer(input.value, input);
    });
    input.focus();
  }

  function focusCard() {
    const input =
      document.getElementById("answerInput") || document.getElementById("codeInput");
    if (input) input.focus();
  }

  // ---------- Gated Logic Engine ----------
  function normalize(s) {
    return String(s)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "") // strip accents
      .replace(/[^a-z0-9 ]/g, " ") // punctuation -> space
      .replace(/\s+/g, " ")
      .trim();
  }

  function isCorrect(input, answers) {
    const guess = normalize(input);
    if (!guess) return false;
    return answers.some((a) => normalize(a) === guess);
  }

  function handleAnswer(rawInput, inputEl) {
    const m = JOURNEY[unlockedCount];
    if (isCorrect(rawInput, m.answers || [])) {
      onCorrect(m);
    } else {
      onWrong(inputEl);
    }
  }

  // Evaluate a chapter code. On success, unlock the chapter and show its
  // first pending question.
  function handleCode(chapter, rawInput, inputEl) {
    const meta = getChapter(chapter);
    if (isCorrect(rawInput, [meta.code])) {
      chaptersUnlocked = Math.max(chaptersUnlocked, chapter + 1);
      saveProgress();
      showFeedback(`🔓 ${meta.name} unlocked!`, "good");
      burstConfetti();
      renderStates();
      renderCard();
    } else {
      onWrong(inputEl);
      showFeedback("Wrong code — try again 🔐", "bad");
    }
  }

  function onCorrect(m) {
    const solvedIndex = unlockedCount;
    unlockedCount += 1;
    saveProgress();

    showFeedback("✨ Correct! A memory unlocks…", "good");

    // Pop the newly unlocked node.
    const node = nodeEls[solvedIndex];
    node.g.classList.add("pop");
    setTimeout(() => node.g.classList.remove("pop"), 700);

    burstConfetti();

    // Animate the path that now leads out of the solved node (into the next).
    renderStates(unlockedCount /* animate path into this index */);

    // Reveal the memory in the card, then move on to the next question.
    renderRevealedMemory(m, () => {
      renderStates();
      renderCard();
      maybeFinale();
    });
  }

  function onWrong(inputEl) {
    showFeedback("Not quite — try again 💭", "bad");
    if (inputEl) {
      inputEl.classList.add("shake");
      setTimeout(() => inputEl.classList.remove("shake"), 400);
      inputEl.select();
    }
    const hint = document.getElementById("hint");
    if (hint) hint.classList.add("show");
  }

  // Render the polaroid photo (or emoji placeholder) into a card container.
  // A configured image that fails to load falls back to the emoji.
  function renderCardPhoto(m, container) {
    container.className = "card-photo memory-photo polaroid-card";
    container.innerHTML = "";
    const src = getPhoto(m);
    if (src) {
      const img = document.createElement("img");
      img.alt = m.title || "";
      img.addEventListener("error", () => {
        container.innerHTML = `<span class="ph-emoji">${escapeHtml(getEmoji(m))}</span>`;
      });
      img.src = src;
      container.appendChild(img);
    } else {
      container.innerHTML = `<span class="ph-emoji">${escapeHtml(getEmoji(m))}</span>`;
    }
  }

  // Show the just-unlocked memory (date / photo / blurb), then advance —
  // automatically after a beat, or via "Continue".
  function renderRevealedMemory(m, next) {
    clearTimeout(revealTimer);
    cardEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fade-in";

    wrap.innerHTML = `
      <div class="card-kicker">Memory unlocked</div>
      <h2>${escapeHtml(m.title)}</h2>
      <div class="memory-date">${escapeHtml(m.date || "")}</div>
      <div class="card-photo"></div>
      <div class="memory-blurb">${escapeHtml(m.blurb || "")}</div>
      <div class="next-cue">
        <button class="btn primary" id="continueBtn" type="button">Continue →</button>
      </div>
    `;
    cardEl.appendChild(wrap);
    renderCardPhoto(m, wrap.querySelector(".card-photo"));

    let advanced = false;
    const go = () => {
      if (advanced) return;
      advanced = true;
      clearTimeout(revealTimer);
      next();
    };
    wrap.querySelector("#continueBtn").addEventListener("click", go);
    revealTimer = setTimeout(go, unlockedCount < JOURNEY.length ? 3000 : 2400);
  }

  // Reopen an already-unlocked memory for reading (no timer). "Back" returns
  // to whatever the current step is, leaving progress untouched.
  function reviewMemory(index) {
    clearTimeout(revealTimer);
    const m = JOURNEY[index];
    cardEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fade-in";

    wrap.innerHTML = `
      <div class="card-kicker">Memory ${index + 1} of ${JOURNEY.length} · revisiting</div>
      <h2>${escapeHtml(m.title)}</h2>
      <div class="memory-date">${escapeHtml(m.date || "")}</div>
      <div class="card-photo"></div>
      <div class="memory-blurb">${escapeHtml(m.blurb || "")}</div>
      <div class="next-cue">
        <button class="btn primary" id="backBtn" type="button">← Back to the journey</button>
      </div>
    `;
    cardEl.appendChild(wrap);
    renderCardPhoto(m, wrap.querySelector(".card-photo"));
    wrap.querySelector("#backBtn").addEventListener("click", () => renderCard());
  }

  // ---------- Finale ----------
  function renderComplete() {
    cardEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fade-in";
    wrap.innerHTML = `
      <div class="card-kicker">Journey complete</div>
      <h2>Every memory found its place ✨</h2>
      <div class="step-count">${JOURNEY.length} milestones, one connected story.</div>
      <div class="memory-blurb">
        Scroll back across the map and relive the path you drew — from the
        very first memory to the last.
      </div>
      <div class="next-cue">
        <button class="btn primary" id="cardReplay" type="button">Relive the journey</button>
      </div>
    `;
    cardEl.appendChild(wrap);
    const btn = wrap.querySelector("#cardReplay");
    if (btn) btn.addEventListener("click", reset);
  }

  function maybeFinale() {
    if (unlockedCount >= JOURNEY.length) {
      setTimeout(() => {
        finaleEl.hidden = false;
        bigConfetti();
      }, 400);
    }
  }

  // ---------- Feedback banner ----------
  let feedbackTimer = null;
  function showFeedback(msg, kind) {
    clearTimeout(feedbackTimer);
    feedbackEl.textContent = msg;
    feedbackEl.className = "feedback show " + kind;
    feedbackTimer = setTimeout(() => {
      feedbackEl.className = "feedback " + kind;
    }, 2200);
  }

  // ---------- Confetti / celebration FX ----------
  const ctx = fxCanvas.getContext("2d");
  let particles = [];
  let rafId = null;

  function sizeCanvas() {
    fxCanvas.width = window.innerWidth * devicePixelRatio;
    fxCanvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);

  const COLORS = ["#ffd678", "#ff7ab6", "#7af0c8", "#8ec5ff", "#c9a7ff"];

  function spawn(count, spread, power) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.32;
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() - 0.5) * spread - Math.PI / 2;
      const speed = power * (0.5 + Math.random());
      particles.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        g: 0.15 + Math.random() * 0.1,
        size: 5 + Math.random() * 6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: 0.008 + Math.random() * 0.006,
      });
    }
    if (!rafId) loop();
  }

  const burstConfetti = () => spawn(70, Math.PI * 0.9, 9);
  const bigConfetti = () => spawn(180, Math.PI * 1.4, 12);

  function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((p) => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    particles = particles.filter((p) => p.life > 0 && p.y < window.innerHeight + 40);
    if (particles.length) {
      rafId = requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      rafId = null;
    }
  }

  // ---------- Persistence ----------
  function loadProgress() {
    const fallback = { solved: 0, chapters: 0 };
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && typeof raw === "object") {
        const solved =
          Number.isFinite(raw.solved) && raw.solved >= 0 && raw.solved <= JOURNEY.length
            ? raw.solved
            : 0;
        const maxChapters = Math.ceil(JOURNEY.length / CHAPTER_SIZE);
        let chapters =
          Number.isFinite(raw.chapters) && raw.chapters >= 0 && raw.chapters <= maxChapters
            ? raw.chapters
            : 0;
        // A chapter containing already-solved milestones must count as open.
        const impliedChapters = solved > 0 ? Math.floor((solved - 1) / CHAPTER_SIZE) + 1 : 0;
        chapters = Math.max(chapters, impliedChapters);
        return { solved, chapters };
      }
    } catch (_) {}
    return fallback;
  }
  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ solved: unlockedCount, chapters: chaptersUnlocked })
      );
    } catch (_) {}
  }
  // ---------- Reset / replay ----------
  function reset() {
    unlockedCount = 0;
    chaptersUnlocked = 0;
    saveProgress();
    finaleEl.hidden = true;
    renderStates();
    renderCard();
  }

  document.getElementById("replayBtn").addEventListener("click", reset);

  // ---------- Small escapers ----------
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  // ---------- Boot ----------
  function init() {
    if (!JOURNEY.length) {
      cardEl.innerHTML = "<h2>No memories configured</h2><p>Add milestones to <code>data.js</code>.</p>";
      return;
    }
    buildMap();
    // On reload with saved progress, draw already-unlocked paths instantly.
    renderStates();
    renderCard();
    maybeFinale();
  }

  init();
})();
