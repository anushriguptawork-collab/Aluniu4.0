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

window.CHAPTER_SIZE = 6;

window.CHAPTERS = [
  {
    name: "Chapter I — Who made the first move",
    code: "ITWASME",
    intro: "Enter the opening code to begin the journey.",
  },
  {
    name: "Chapter II — life happened",
    code: "UNIVERSE'SPLAN",
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
    x: 8, y: 20,
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
    x: 24, y: 12,
    icon: "🎬",
    title: "Felt right- Magic",
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
    x: 41, y: 20,
    icon: "🌧️",
    title: "Attempt to forever",
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
    x: 57, y: 12,
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
    x: 74, y: 20,
    icon: "⭐",
    title: "Prague Night'",
    date: "nov 2023",
    photo: "images/stars.jpg",
    blurb:
      "It was only natural for me to say it without thinking, I guess you are the only person I wanted to call mine " +
      "That night, this trip defined us for me",
    question: "When was the first time I called you my boyfriend?",
    hint: "the night of our lives.",
    answers: ["strip club", "at the strip club", "prague"],
  },
  {
    id: "starsnew",
    x: 90, y: 13,
    icon: "⭐",
    title: "Sunflowers",
    date: "19 Nov 2023",
    photo: "images/stars.jpg",
    blurb:
      "I beleive we have been finding clues in the universe, that stay with us in this journey " +
      "Van gogh's sunflower got love and light, core memory",
    question: "& it was all yellow, van gogh's .........",
    hint: "a flower",
    answers: ["sunflower"],
  },
  /* ───────── Chapter II — Adventures (code: UNIVERSE'SPLAN) ───────── */
  {
    id: "mountain",
    x: 90, y: 44,
    icon: "🏔️",
    title: "Lost & Found",
    date: "Feb 2024",
    photo: "images/mountain.jpg",
    blurb:
      "We got hopelessly lost, it was only a matter of time until we found each other in the most raw, beautiful, coincidental ways." +
      "One of many detours worth taking.",
    question: "I was lost...Where did you find me?",
    hint: "alu's fav place in ahemdabad",
    answers: ["riverfront"],
  },
  {
    id: "roadtrip",
    x: 74, y: 52,
    icon: "🚗",
    title: "make you mine",
    date: "March 2024",
    photo: "images/roadtrip.jpg",
    blurb:
      "One playlist on repeat, a map we never really read, and a detour that " +
      "became the whole point.",
    question: "Our song that Alu played on the way to ahmedabad airport when we were breaking up?",
    hint: "mine",
    answers: ["put your hand in mine", "Make You Mine", "make you mine"],
  },
  {
    id: "beach",
    x: 57, y: 44,
    icon: "🌊",
    title: "love begins",
    date: "April 2024",
    photo: "images/beach.jpg",
    blurb:
      "Conversations that move us, that stay. I love to have conversations that matter, that put our beliefs to question, that we learn and adapt from, you have been that one person i want to talk to about anything and everything  " +
      "I was on the terrace where i spend hours of my childhood pondering about the existence of this world, complex concepts, I was always lost and alone in these thoughts, that night younger alu slept with so much peace knowing she was not alone and weird afterall, she just needed to find someone who matches her freak",
    question: "Where was I when we had a ver long midnight conversation about souls, stars and everything in between?",
    hint: "I belong to...",
    answers: ["pipariya"],
  },
  {
    id: "song",
    x: 41, y: 52,
    icon: "🎶",
    title: "Moving in",
    date: "July 2024",
    photo: "images/song.jpg",
    blurb:
      "A few days of living together felt like you are my end goal, that living with someone can be this fun? It felt utterly life changing and filled with happiness " +
      "to a lifetime of food experiements",
    question: "What was the spicy food experiment we did while living together?",
    hint: "we kept adding cheese",
    answers: ["red sauce pasta", "penne pasta"],
  },
  {
    id: "cat",
    x: 22, y: 44,
    icon: "🐱",
    title: "oh tobein love",
    date: "October 2024",
    photo: "images/cat.jpg",
    blurb:
      "Followed us home in the rain and simply never left. Best decision we " +
      "didn't really make.",
    question: "What was the name of the wine you got me in ahmedabad and I wanted it?",
    hint: "it's who I am, its by an instagram creator",
    answers: ["poet", "Lost Poet"],
  },
   {
    id: "era",
    x: 8, y: 52,
    icon: "🐱",
    title: "beach effect",
    date: "November, 2024",
    photo: "images/cat.jpg",
    blurb:
      "You know there are these highlights of our story that made me beleive in us better than before, for the trust in you and your love, for the darker nights to be a bit brighter with you" +
      "moving forward i trust that we can deal with any situation like this fun dark night",
    question: "The beach that got us stuck through the curvy roads of goa",
    hint: "it's an effect",
    answers: ["butterfly"],
  },

  /* ───────── Chapter III — Forever (code: THEOLIVETHEORY) ───────── */
  {
    id: "home",
    x: 8, y: 76,
    icon: "🏡",
    title: "Husband duties",
    date: "16 Feb 2025",
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
    x: 24, y: 84,
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
    x: 41, y: 76,
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
    x: 54, y: 84,
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
    x: 74, y: 76,
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
  {
    id: "question",
    x: 90, y: 84,
    icon: "♾️",
    title: "WE said YES!",
    date: "7 august 2026",
    photo: "images/onward.jpg",
    blurb:
      "The map doesn't end here, it just keeps drawing forward. Every day from now on is " +
      "a new node waiting to be unlocked.",
    question: "Will you be alu's husband and partner for life, till death do us part?",
    hint: "You can't say no",
    answers: ["yes"],
  },
];
