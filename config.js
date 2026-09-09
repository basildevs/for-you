/**
 * ==========================================================
 * 5-YEAR RELATIONSHIP & BIRTHDAY SURPRISE CONFIGURATION
 * FOR NANDINI (KUNJUTI) FROM BASIL (KUNJUTAN)
 * ==========================================================
 */

const CONFIG = {
  // Security / Private Access
  security: {
    enabled: true,
    passcode: "511303", // 6-digit secret code
    hint: "Enter our 6-digit secret passcode ❤️"
  },

  // Couple Details
  couple: {
    him: "Basil",
    her: "Nandini",
    hisPetName: "Kunjutan",
    herPetName: "Kunjuti",
    anniversaryYears: 5,
    birthday: "November 5",
    tagline: "5 Magical Years Together & Happy Birthday to My Kunjuti ✨",
    startYear: "2021",
    currentYear: "2026"
  },

  recipient: {
    name: "Nandini",
    petName: "Kunjuti",
    birthday: "November 5"
  },

  sender: {
    name: "Basil",
    petName: "Kunjutan",
    signOff: "Forever & Always Your Kunjutan ❤️"
  },

  // Audio Settings
  music: {
    title: "Can't Help Falling in Love (Romantic Piano Suite)",
    useFile: false,
    filePath: "assets/audio/song.mp3"
  },

  // Romantic Love Quotes for Transitions & Tasks
  quotes: [
    "5 years of falling for you more and more each sunrise.",
    "In a universe of chaos, your arms are my only home.",
    "Half a decade of loving my Kunjuti — and forever still wouldn't be enough.",
    "Every love story is beautiful, but ours is my favorite fairy tale.",
    "You are not just my love, you are the beat inside my chest."
  ],

  // Task 1: Starlight Constellation
  constellation: {
    title: "Task 1 • Connect Our Starlight Destiny ✨",
    subtitle: "Connect the cosmic stars to bind Basil (Kunjutan) & Nandini (Kunjuti)",
    successMessage: "5 Years of Starlight Destiny Connected! 🌟"
  },

  // Task 2: Cupid's Heart Resonance
  cupid: {
    title: "Task 2 • Tune Kunjutan's Heart to Kunjuti 🏹",
    subtitle: "Pull back the bow and shoot your love straight into my beating heart",
    hitMessage: "Bullseye! 5 Years ago you stole my heart, and you keep it forever ❤️"
  },

  // Task 3: Relationship Q&A Trivia Mini-Game
  trivia: {
    title: "Task 3 • The Kunjuti & Kunjutan Love Quiz 💕",
    subtitle: "Answer these 4 sweet couple questions to unlock our memory vault!",
    questions: [
      {
        id: 1,
        question: "Who fell in love first between us? 👀",
        options: [
          "Kunjutan (Basil)",
          "Kunjuti (Nandini)",
          "Both at the exact same heartbeat ❤️"
        ],
        correctIndex: 2,
        revealNote: "Kunjutan was captivated from the start, but our souls chose each other at the exact same heartbeat!",
        quote: "Loving you was never a choice — it was my destiny."
      },
      {
        id: 2,
        question: "What is Kunjutan's absolute favorite thing about his Kunjuti? 🥰",
        options: [
          "Your beautiful radiant smile",
          "Your cute little angry expressions",
          "Every single breath and detail of you ❤️"
        ],
        correctIndex: 2,
        revealNote: "Every little laugh, pout, and sweet word of yours is Kunjutan's greatest treasure.",
        quote: "You make ordinary days feel like poetry."
      },
      {
        id: 3,
        question: "How many unforgettable years of love are we celebrating today? ⏳",
        options: [
          "3 Years",
          "5 Magical, Beautiful Years! ❤️",
          "100 Years"
        ],
        correctIndex: 1,
        revealNote: "5 years of endless laughs, tight hugs, overcoming challenges, and unconditional love!",
        quote: "5 years down, a hundred more to go with you."
      },
      {
        id: 4,
        question: "What is our forever promise to each other? 💍",
        options: [
          "To always share the sweetest food",
          "To hold hands through every storm and never let go ❤️",
          "To watch sunsets every weekend"
        ],
        correctIndex: 1,
        revealNote: "Through sunshine or rain, through every high and low, Kunjutan will always hold Kunjuti's hand.",
        quote: "I promise to choose you, love you, and cherish you in this life and the next."
      }
    ]
  },

  // Task 4: 5-Year Memory Vault (5 Photos per Year = 25 Photos Total)
  yearsData: [
    {
      yearNum: 1,
      yearLabel: "Year 1 (2021-2022)",
      title: "Where Our Magic Began ✨",
      theme: "The first nervous smiles, late-night calls, and the moment our worlds collided.",
      photos: [
        { id: "y1_1", src: "assets/photos/y1_1.svg", caption: "Our first spark" },
        { id: "y1_2", src: "assets/photos/y1_2.svg", caption: "Nervous first laughs" },
        { id: "y1_3", src: "assets/photos/y1_3.svg", caption: "Late night conversations" },
        { id: "y1_4", src: "assets/photos/y1_4.svg", caption: "Falling helplessly in love" },
        { id: "y1_5", src: "assets/photos/y1_5.svg", caption: "The day you became my world" }
      ]
    },
    {
      yearNum: 2,
      yearLabel: "Year 2 (2022-2023)",
      title: "Growing Closer & Deeper 💖",
      theme: "Learning each other's habits, cute silly fights, and realizing we are soulmates.",
      photos: [
        { id: "y2_1", src: "assets/photos/y2_1.svg", caption: "Unfiltered silliness" },
        { id: "y2_2", src: "assets/photos/y2_2.svg", caption: "Comfort in your presence" },
        { id: "y2_3", src: "assets/photos/y2_3.svg", caption: "Sweetest memories made" },
        { id: "y2_4", src: "assets/photos/y2_4.svg", caption: "Holding hands tighter" },
        { id: "y2_5", src: "assets/photos/y2_5.svg", caption: "Knowing you are the one" }
      ]
    },
    {
      yearNum: 3,
      yearLabel: "Year 3 (2023-2024)",
      title: "Our Unbreakable Bond 💫",
      theme: "Standing by each other through thick and thin, building our own little universe.",
      photos: [
        { id: "y3_1", src: "assets/photos/y3_1.svg", caption: "Through every storm" },
        { id: "y3_2", src: "assets/photos/y3_2.svg", caption: "My biggest cheerleader" },
        { id: "y3_3", src: "assets/photos/y3_3.svg", caption: "Pure warmth and peace" },
        { id: "y3_4", src: "assets/photos/y3_4.svg", caption: "Sunset dreams together" },
        { id: "y3_5", src: "assets/photos/y3_5.svg", caption: "Three years of blessings" }
      ]
    },
    {
      yearNum: 4,
      yearLabel: "Year 4 (2024-2025)",
      title: "Adventures & Eternal Laughter 🌸",
      theme: "Exploring life together, celebrating small victories, and falling in love all over again.",
      photos: [
        { id: "y4_1", src: "assets/photos/y4_1.svg", caption: "Every adventure is golden" },
        { id: "y4_2", src: "assets/photos/y4_2.svg", caption: "Your smile is my home" },
        { id: "y4_3", src: "assets/photos/y4_3.svg", caption: "Moments etched in time" },
        { id: "y4_4", src: "assets/photos/y4_4.svg", caption: "Laughter that cures all" },
        { id: "y4_5", src: "assets/photos/y4_5.svg", caption: "Four years of deep love" }
      ]
    },
    {
      yearNum: 5,
      yearLabel: "Year 5 (2025-2026)",
      title: "Half A Decade Of Forever ♾️",
      theme: "5 glorious years of you and me. Mature love, unbreakable trust, and excitement for forever.",
      photos: [
        { id: "y5_1", src: "assets/photos/y5_1.svg", caption: "5 years of pure bliss" },
        { id: "y5_2", src: "assets/photos/y5_2.svg", caption: "Still giving me butterflies" },
        { id: "y5_3", src: "assets/photos/y5_3.svg", caption: "Growing together daily" },
        { id: "y5_4", src: "assets/photos/y5_4.svg", caption: "Happy Birthday my love" },
        { id: "y5_5", src: "assets/photos/y5_5.svg", caption: "To our next 50 years" }
      ]
    }
  ],

  // Task 5: 5 Lanterns of Our 5 Years (Tapping pops/illuminates each year)
  lanterns: [
    {
      year: 1,
      title: "Year 1 • The Spark That Changed My Life 🕊️",
      text: "The gentle way you entered my world and cared for me melted my heart from the very first moment."
    },
    {
      year: 2,
      title: "Year 2 • The Comfort Of Your Voice 🏡",
      text: "Whenever life felt overwhelming, talking to my Kunjuti felt like walking into peace and warmth."
    },
    {
      year: 3,
      title: "Year 3 • The Strength We Built Together 💎",
      text: "We proved that together, no storm could shake us. You became my rock and my greatest support."
    },
    {
      year: 4,
      title: "Year 4 • My Deepest Happiness 😍",
      text: "With you, the simplest cup of tea or a quiet drive became the sweetest memories of my life."
    },
    {
      year: 5,
      title: "Year 5 • My Today, Tomorrow & Forever ♾️",
      text: "5 full years of choosing you every day. Today on your birthday, I fall in love with you all over again."
    }
  ],

  // Task 6: Birthday Cake with 5 Candles
  cake: {
    title: "Task 6 • 5 Candles For 5 Years & A Birthday Wish 🎂",
    subtitle: "5 candles glowing for our 5 beautiful years. Close your eyes, make a wish, and blow them out together!",
    flamesText: "✨ 5 flames are glowing for our 5 years together...",
    blownText: "🎉 Your wish is blessed by the heavens! Happy Birthday Kunjuti! ❤️"
  },

  // Task 7: Wax-Sealed Handwritten Love Letter from Kunjutan
  letter: {
    header: "My Dearest Kunjuti (Nandini),",
    date: "November 5th — Celebrating 5 Years & Your Special Day",
    paragraphs: [
      "Happy Birthday, my precious Kunjuti! ❤️",
      "As I sit down to write this, my heart is overflowing with so much gratitude. Can you believe it has been 5 whole years since we started this journey together? Five years of laughter, late-night talks, holding hands through tough times, and discovering that my home is wherever you are.",
      "Every single time I call you 'Kunjuti', my heart feels a warmth that words could never capture. You are the kindest, softest, most incredible soul I have ever known. The way you care for me, listen to me, and believe in me makes me want to be the best man for you every single day.",
      "Today, on November 5th, we celebrate not just the blessing of your life, but the half-decade of love we have built brick by brick. Thank you for choosing me. Thank you for standing by your Kunjutan through every high and low.",
      "I promise to keep loving you, protecting your smile, wiping your tears, and making every year even more magical than the last. 5 years down, my love... and a lifetime of forever to go."
    ],
    closing: "With every beat of my heart, Forever & Always,",
    signature: "Your Kunjutan (Basil) ❤️"
  }
};
