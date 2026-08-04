/**
 * Memoirs in Motion — journey data.
 *
 * This is the ONLY file you need to edit to make the experience your own.
 *
 * The journey is split into CHAPTERS of 5 milestones each. Every chapter is
 * locked behind a CODE: you must enter the chapter's code before its five
 * questions become answerable — including a code at the very beginning.
 * After finishing a chapter's 5 questions, the next chapter locks again until
 * its code is entered.
 *
 * ── CHAPTERS ──────────────────────────────────────────────────────────────
 *   name   Chapter title, shown on the code gate.
 *   code   The passphrase that unlocks this chapter (case-insensitive,
 *          punctuation/accents ignored — same matching as answers).
 *   intro  A short line shown on the code gate.
 *
 * ── JOURNEY (milestones) ──────────────────────────────────────────────────
 *   id        Unique short id.
 *   x, y      Position on the map, as PERCENTAGES (0–100) of the canvas.
 *   icon      An emoji shown when the node unlocks.
 *   title     Milestone name, revealed on unlock.
 *   date      A date / era label, revealed on unlock.
 *   photo     The polaroid image for this memory. Point it at an image file
 *             (default: `images/<id>.jpg`) or any image URL. Drop your photo
 *             into the images/ folder with the matching name and it appears
 *             automatically. If the file is missing, the `icon` emoji is shown
 *             instead. You may also set this to an emoji to use emoji art.
 *   blurb     A short memory description, revealed on unlock.
 *   question  The trivia prompt gating this milestone.
 *   hint      (optional) A gentle nudge shown after a wrong guess.
 *   answers   Array of accepted answers. Matching is case-insensitive,
 *             trims whitespace, and ignores punctuation. Provide a few
 *             phrasings so near-misses still count.
 *
 * Milestones unlock strictly in array order. Every 5 entries form one chapter,
 * matched by position to the CHAPTERS array (entries 0–4 → chapter 0, etc.).
 */

window.CHAPTER_SIZE = 5;

window.CHAPTERS = [
  {
    name: "Chapter I — Who made the first move",
    code: "ITWASME",
    intro: "Enter the opening code to begin the journey.",
  },
  {
    name: "Chapter II — life happened",
    code: "Universeplan",
    intro: "Five memories in. Enter the next code to continue the adventure.",
  },
  {
    name: "Chapter III — How i met your mother",
    code: "THEOLIVETHEORY",
    intro: "The final stretch. Enter the last code to unlock the way home.",
  },
];

window.JOURNEY = [
  /* ───────── Chapter I — Who made the first move (code: ITWASME) ───────── */
  {
    id: "meet",
    x: 10, y: 18,
    icon: "☕",
    title: "Chaat pe chalegi?",
    date: "Oct 2023",
    photo: "images/meet.JPG",
    blurb:
      "Someone asking me chaat pe chalegi really hit home, I didnt know back then that this person would really become the home I crave " +
      "Thank you for being the most polite selfish person to ask me for a  conversation and seeing me through those pretty eyes for who I was, for who I can be",
    question: "First night, first place you asked me out to.. A very specific word?",
    hint: "Whatsapp text.",
    answers: ["chaat", "chat", "rooftop"],
  },
  {
    id: "movie",
    x: 28, y: 28,
    icon: "🎬",
    title: "Magic",
    date: "Nov 2023",
    photo: "images/movie.jpg",
    blurb:
      "We argued about the ending for the entire walk home. First of many " +
      "post-credits debates, and neither of us has ever conceded.",
    question: "The first conversation that makes all of this a butterfly effect?",
    hint: "I think you must beleive now",
    answers: ["magic", "mag ic"],
  },
  {
    id: "rain",
    x: 46, y: 16,
    icon: "🌧️",
    title: "The Rainy Walk",
    date: "Spring, 2016",
    photo: "images/rain.jpg",
    blurb:
      "Soaked to the bone, laughing at how unprepared we were. Somehow the " +
      "worst weather made the best memory.",
    question: "What did we forget that day, leaving us completely soaked?",
    hint: "You open it when it rains — if you remember to bring it.",
    answers: ["umbrella", "the umbrella", "an umbrella"],
  },
  {
    id: "fair",
    x: 64, y: 26,
    icon: "🎡",
    title: "The Fair",
    date: "Summer, 2016",
    photo: "images/fair.jpg",
    blurb:
      "Cotton candy, terrible aim at the ring toss, and one ride we rode " +
      "until the sun went down.",
    question: "Which ride did we go on again and again?",
    hint: "It's tall, it's round, and it stops at the very top for the view.",
    answers: ["ferris wheel", "the ferris wheel", "ferriswheel", "ferris"],
  },
  {
    id: "stars",
    x: 82, y: 16,
    icon: "⭐",
    title: "First 'I Like You'",
    date: "Autumn, 2016",
    photo: "images/stars.jpg",
    blurb:
      "Said out loud, finally, on a rooftop that was a little too cold. " +
      "Worth every shiver.",
    question: "Under what did we finally say it out loud?",
    hint: "They come out at night. You wish on them.",
    answers: ["stars", "the stars", "starlight", "star"],
  },

  /* ───────── Chapter II — Adventures (code: JOURNEY) ───────── */
  {
    id: "mountain",
    x: 86, y: 44,
    icon: "🏔️",
    title: "The Mountain",
    date: "Summer, 2017",
    photo: "images/mountain.jpg",
    blurb:
      "We got hopelessly lost, missed the last bus, and laughed until it " +
      "didn't matter. The first of a thousand detours worth taking.",
    question: "What did we climb on our first big trip together?",
    hint: "Snow at the top, a flag we planted, and a view we still talk about.",
    answers: ["mountain", "the mountain", "a mountain", "mountains", "hill"],
  },
  {
    id: "roadtrip",
    x: 66, y: 52,
    icon: "🚗",
    title: "The Road Trip",
    date: "Autumn, 2017",
    photo: "images/roadtrip.jpg",
    blurb:
      "One playlist on repeat, a map we never really read, and a detour that " +
      "became the whole point.",
    question: "What ran out halfway, forcing our best detour?",
    hint: "The car needs it. The gauge hit E.",
    answers: ["fuel", "gas", "petrol", "the fuel", "gasoline"],
  },
  {
    id: "beach",
    x: 48, y: 44,
    icon: "🌊",
    title: "The Beach",
    date: "Summer, 2018",
    photo: "images/beach.jpg",
    blurb:
      "We spent an hour building it and the sea took it in ten seconds. We " +
      "cheered anyway.",
    question: "What did we build that the tide swept away?",
    hint: "Made of sand, complete with a moat.",
    answers: ["sandcastle", "sand castle", "a sandcastle", "castle"],
  },
  {
    id: "song",
    x: 30, y: 52,
    icon: "🎶",
    title: "Our Song",
    date: "New Year's Eve, 2018",
    photo: "images/song.jpg",
    blurb:
      "Played it once, badly, on a borrowed guitar. Now it hijacks every " +
      "road-trip playlist.",
    question: "What single word do we always shout in the chorus?",
    hint: "It's what we say when things go right. Four letters, full of light.",
    answers: ["home", "the word home", "'home'"],
  },
  {
    id: "cat",
    x: 12, y: 46,
    icon: "🐱",
    title: "The Stray We Kept",
    date: "Spring, 2019",
    photo: "images/cat.jpg",
    blurb:
      "Followed us home in the rain and simply never left. Best decision we " +
      "didn't really make.",
    question: "What kind of animal did we adopt together?",
    hint: "It purrs, it naps in sunbeams, and it rules the house.",
    answers: ["cat", "a cat", "kitten", "the cat", "kitty"],
  },

  /* ───────── Chapter III — Forever (code: FOREVER) ───────── */
  {
    id: "home",
    x: 14, y: 70,
    icon: "🏡",
    title: "A Place of Our Own",
    date: "Spring, 2019",
    photo: "images/home.jpg",
    blurb:
      "Empty rooms, too many boxes, and a pizza on the floor. It wasn't much, " +
      "but it was ours.",
    question: "What did we eat on our first night in the new place?",
    hint: "Round, cheesy, eaten straight off the box on a bare floor.",
    answers: ["pizza", "a pizza", "the pizza", "pizzas"],
  },
  {
    id: "question",
    x: 32, y: 80,
    icon: "💍",
    title: "The Question",
    date: "Winter, 2019",
    photo: "images/question.jpg",
    blurb:
      "One knee, one shaky voice, one word that changed the shape of every " +
      "day after.",
    question: "What single word changed everything?",
    hint: "The opposite of no.",
    answers: ["yes", "yes!", "i do", "yes i do"],
  },
  {
    id: "bigday",
    x: 52, y: 70,
    icon: "🎉",
    title: "The Big Day",
    date: "Summer, 2020",
    photo: "images/bigday.jpg",
    blurb:
      "A little rain (of course), a lot of dancing, and a room full of every " +
      "person who mattered.",
    question: "What rained down on us as we walked back up the aisle?",
    hint: "Tiny, colorful, and it got everywhere for weeks.",
    answers: ["confetti", "petals", "rice", "flower petals", "the confetti"],
  },
  {
    id: "honeymoon",
    x: 72, y: 80,
    icon: "✈️",
    title: "The Honeymoon",
    date: "Autumn, 2020",
    photo: "images/honeymoon.jpg",
    blurb:
      "We got delightfully lost down every side street and called it a plan. " +
      "The city of light, indeed.",
    question: "Which city did we get delightfully lost in?",
    hint: "City of light. Iron tower. Too many pastries.",
    answers: ["paris", "paris france"],
  },
  {
    id: "onward",
    x: 88, y: 72,
    icon: "♾️",
    title: "And Onward",
    date: "Today, and after",
    photo: "images/onward.jpg",
    blurb:
      "The map doesn't end here — it just keeps drawing forward. Every day is " +
      "a new node waiting to be unlocked.",
    question: "How long does this journey last?",
    hint: "Not a number. The answer we always give each other.",
    answers: ["forever", "always", "for ever", "eternity"],
  },
];
