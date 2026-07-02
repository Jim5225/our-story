export const config = {
  // General Game Settings
  gameTitle: "Our Story – Level Up Love ❤️",
  anniversaryDate: "July 4, 2026",

  // Level 8: How Well Do You Know Jim? ❤️
  level8: {
    questions: [
      {
        id: 1,
        question: "Does Jim have any 3 habits that you find really cute?\n(after marriage you have noticed)",
        expectedAnswers: ["Habit 1", "Habit 2", "Habit 3"], // JIM: Edit these
        weights: { observation: 100 },
        suggestion: "He loves that you notice the little things.",
      },
      {
        id: 2,
        question: "When Jim is under a lot of mental stress, what is it that he actually wants most from you?",
        expectedAnswers: ["A hug", "Peace", "Quiet", "Just being there", "Support", "Alingon", "Bhalobasha"],
        weights: { emotional: 50, comfort: 50 },
        suggestion: "Sometimes a quiet, comforting presence is all he needs to recharge.",
      },
      {
        id: 3,
        question: "What is Jim's biggest dream?",
        expectedAnswers: ["To be happy with you", "Traveling", "A peaceful life", "Success"],
        weights: { future: 100 },
        suggestion: "He dreams of a beautiful, peaceful future with you by his side.",
      },
      {
        id: 4,
        question: "What hurts him the most?",
        expectedAnswers: ["Lies", "Being misunderstood", "Distance", "When you are sad", "Ignoring"],
        weights: { emotional: 50, communication: 50 },
        suggestion: "Honesty and open communication mean everything to him.",
      },
      {
        id: 5,
        question: "What is Jim's biggest fear?",
        expectedAnswers: ["Losing you", "Failure", "Being alone"],
        weights: { emotional: 100 },
        suggestion: "Reassuring him of your unwavering love helps calm his fears.",
      },
      {
        id: 6,
        question: "What could you do to make Jim feel, \"He/She really understands me\"?",
        expectedAnswers: ["Listen", "Validate his feelings", "Remember small details", "Quality time"],
        weights: { communication: 50, understanding: 50 },
        suggestion: "Listening to him without judgment makes him feel incredibly understood.",
      },
      {
        id: 7,
        question: "If Jim wanted to leave everything behind and go somewhere one day, where do you think he would want to go? Why?",
        expectedAnswers: ["Mountains", "Beach", "Nature", "A quiet place", "Village"],
        weights: { memory: 50, comfort: 50 },
        suggestion: "He often craves the peace and quiet of nature to clear his mind.",
      },
      {
        id: 8,
        question: "What quality does Jim have—one he might not realize himself, but that you see?",
        expectedAnswers: ["Kindness", "Patience", "Resilience", "Caring", "Hardworking"],
        weights: { understanding: 100 },
        suggestion: "Reminding him of his unseen strengths gives him so much confidence.",
      },
      {
        id: 9,
        question: "Jim-এর কোন মুহূর্তটা তোমার মনে হয় তার জীবনের Turning Point ছিল?",
        expectedAnswers: ["Meeting you", "Marriage", "Getting a job", "A specific event"], // JIM: Edit
        weights: { memory: 100 },
        suggestion: "He often views the major milestones with you as his greatest turning points.",
      },
      {
        id: 10,
        question: "If he completely breaks down, what exactly would you say to him?\n(Write in your own words)",
        expectedAnswers: ["I'm here for you", "We will get through this", "I love you", "You are not alone", "Pash aachi"],
        weights: { support: 100 },
        suggestion: "Your words of reassurance are his strongest anchor in tough times.",
      },
      {
        id: 11,
        question: "Don't just give a one-word answer—write from the heart:\nwhat does \"Jim\" mean to you?",
        expectedAnswers: ["Everything", "My life", "Safe place", "Best friend", "Soulmate", "Amar shob", "Amar bhalobasha"],
        weights: { emotional: 100 },
        suggestion: "He loves being your safe place.",
      },
      {
        id: 12,
        question: "what are the worst things of Jim that should be improved?",
        expectedAnswers: ["Anger", "Overthinking", "Stubbornness", "Working too much"], // JIM: Edit
        weights: { communication: 100 },
        suggestion: "He is always willing to grow and improve for the sake of your relationship.",
      }
    ],
    // Positive feedback messages to show randomly after each answer
    positiveFeedback: [
      "That was a beautiful answer.",
      "Interesting perspective.",
      "Your words tell a lovely story.",
      "Let's discover how your hearts connect.",
      "Such a sweet thought.",
      "That is incredibly heartwarming.",
      "A beautiful observation.",
      "That tells me a lot about your bond."
    ]
  },

  // The deep meaning line and Final Letter
  finalLetter: "For all these years...\n\nNo matter what the score says...\nLove cannot be measured by numbers.\n\nUnderstanding someone is a lifelong journey, and I am so grateful to be on this journey with you.\n\nHappy First Wedding Anniversary ❤️",

  // Secret Surprise Assets (JIM: Place audio files in public/assets folder)
  secretSurprise: {
    bgMusic: "/assets/soft-piano.mp3",
    voiceMessage: "/assets/voice-message.mp3",
    title: "One Last Surprise..."
  },

  // Email Delivery Settings (Web3Forms API)
  emailSettings: {
    accessKey: "9ea21686-15c9-4d46-9494-26d927ab19a1",
    destination: "jimjaaj@gmail.com",
    subject: "Our Story - New Answers from Your Wife ❤️"
  }
};
