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
    title: "it just felt right- Magic",
    date: "Nov 2023",
    photo: "images/movie.jpg",
    blurb:
      "I love how everything in our story makes so much sense and we have the capability to romaticise it all" +
      "It was a winter evening, two utterly confused souls were talking if magic is real without knowing that what was happening with them was magic itself.",
    question: "The first conversation that makes all of this a butterfly effect?",
    hint: "I think you must understand now to believe",
    answers: ["magic", "mag ic"],
  },
  {
    id: "rain",
    x: 46, y: 16,
    icon: "🌧️",
    title: "love like yours and mine last forever",
    date: "19 Nov 2023",
    photo: "images/rain.jpg",
    blurb:
      "We were scared, we are scared now, we sort of cancelling our own ideas, we evolved." +
      "It was the happiest times, that piece of love and happiness I felt there stayed till now and so shall this",
    question: "we wrote the same sentence on a note, although its debatable now",
    hint: "three words",
    answers: ["nothing lasts forever", "nothing last forever", "last forever"],
  },
  {
    id: "fair",
    x: 64, y: 26,
    icon: "🎡",
    title: "What if...",
    date: "nov 2023",
    photo: "images/fair.jpg",
    blurb:
      "This memory stands vivid in my head, too many feelings, confusion, this felt like that place beyond right and wrong" +
      "and I am glad i met you there.",
    question: "At the vending machine, thinking all the wrongs and rights.. what were we buying?",
    hint: "What if we had not..",
    answers: ["condom", "condoms", "condom packet"],
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
    question: "When was the first time I called you my boyfriend?",
    hint: "the night of our lives.",
    answers: ["strip club", "at the strip club", "prague"],
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
