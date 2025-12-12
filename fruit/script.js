const { useState, useEffect, useRef } = React;

const FruitAssessment = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const chartRef = useRef(null);

  const [titleClickCount, setTitleClickCount] = useState(0);
  const [clickTime, setClickTime] = useState(null);
  const [showQuickTest, setShowQuickTest] = useState(false);

  const dimensions = {
    "Sweetness": {
      name: "Sweetness",
      icon: "🍬",
      color: "#FF69B4",
      description: "Gentle Affinity"
    },
    "Tartness": {
      name: "Tartness",
      icon: "🍋",
      color: "#FFD700",
      description: "Sharp Criticality"
    },
    "Juiciness": {
      name: "Juiciness",
      icon: "💧",
      color: "#00CED1",
      description: "Emotional Richness"
    },
    "Firmness": {
      name: "Firmness",
      icon: "💪",
      color: "#8B4513",
      description: "Tough Stability"
    },
    "Freshness": {
      name: "Freshness",
      icon: "🌿",
      color: "#98FB98",
      description: "Vibrant Energy"
    },
    "Richness": {
      name: "Richness",
      icon: "🎨",
      color: "#FF6347",
      description: "Expressive Individuality"
    },
    "Sociability": {
      name: "Sociability",
      icon: "🎉",
      color: "#FFA500",
      description: "Social Adaptability"
    },
    "Uniqueness": {
      name: "Uniqueness",
      icon: "⭐",
      color: "#DA70D6",
      description: "Standing Out"
    }
  };

  const questions = [
    { id: 1, text: "🎂 For a friend's birthday, you would:", dimension: "Sweetness", options: [
      { value: 1, label: 'A', text: '"Let me handle it!" Take initiative to plan a surprise party' },
      { value: 2, label: 'B', text: 'Carefully prepare gifts and wishes' },
      { value: 3, label: 'C', text: 'Just contribute money and show up' },
      { value: 4, label: 'D', text: '"Happy birthday" - send a red envelope and done' }
    ]},
    { id: 2, text: "😭 When a friend cries and seeks comfort:", dimension: "Sweetness", options: [
      { value: 1, label: 'A', text: 'Immediately hug and comfort "Don\'t cry, don\'t cry, I\'m here"' },
      { value: 2, label: 'B', text: 'Hand them tissues, listen, and give advice' },
      { value: 3, label: 'C', text: '"Look on the bright side" - rational analysis' },
      { value: 4, label: 'D', text: '"Why are you crying? Pull yourself together" - blunt comfort' }
    ]},
    { id: 3, text: "🍰 When you see someone eating:", dimension: "Sweetness", options: [
      { value: 1, label: 'A', text: '"Want to try some of mine?" Proactively share' },
      { value: 2, label: 'B', text: 'Will give some if they want' },
      { value: 3, label: 'C', text: 'Mine is mine, yours is yours' },
      { value: 4, label: 'D', text: '"Go buy your own" - protective of food' }
    ]},
    { id: 4, text: "💬 Your tone when chatting:", dimension: "Sweetness", options: [
      { value: 1, label: 'A', text: '"Baby" "Dear" everywhere - sickeningly sweet' },
      { value: 2, label: 'B', text: 'Polite and gentle, occasionally add emojis' },
      { value: 3, label: 'C', text: 'Words are precious, straight to the point' },
      { value: 4, label: 'D', text: '"Hmm" "Oh" "Okay" - three consecutive replies' }
    ]},
    { id: 5, text: "🎁 When receiving an unwanted gift:", dimension: "Sweetness", options: [
      { value: 1, label: 'A', text: '"Wow, I love it so much!" Acting skills explode' },
      { value: 2, label: 'B', text: '"Thank you" - sincere gratitude for the thought' },
      { value: 3, label: 'C', text: '"Hmm, it\'s alright" - honest reaction' },
      { value: 4, label: 'D', text: '"What is this crap?" Direct complaint' }
    ]},
    { id: 6, text: "👀 Seeing a friend wearing an ugly outfit:", dimension: "Tartness", options: [
      { value: 1, label: 'A', text: '"Hmm... very unique personality" - subtle hint' },
      { value: 2, label: 'B', text: 'Say nothing, let them discover it themselves' },
      { value: 3, label: 'C', text: '"Are you sure you want to wear this out?"' },
      { value: 4, label: 'D', text: '"That\'s ugly, change it now!" Direct criticism' }
    ]},
    { id: 7, text: "📱 Friend posts a selfie seeking compliments:", dimension: "Tartness", options: [
      { value: 1, label: 'A', text: '"So beautiful! Absolutely gorgeous!" Shower with praise' },
      { value: 2, label: 'B', text: '"Not bad, looks pretty good"' },
      { value: 3, label: 'C', text: '"It\'s alright, the angle is decent"' },
      { value: 4, label: 'D', text: '"This one\'s blurry, retake" - brutally honest' }
    ]},
    { id: 8, text: "🎬 After watching a terrible movie:", dimension: "Tartness", options: [
      { value: 1, label: 'A', text: '"It was okay, some parts were interesting"' },
      { value: 2, label: 'B', text: 'No opinion, stay silent' },
      { value: 3, label: 'C', text: '"Just average, waste of money"' },
      { value: 4, label: 'D', text: '"What garbage! Director should come get beaten!"' }
    ]},
    { id: 9, text: "💼 A colleague shows off new luxury goods:", dimension: "Tartness", options: [
      { value: 1, label: 'A', text: '"So beautiful! I\'m so jealous!"' },
      { value: 2, label: 'B', text: '"Hmm, pretty nice"' },
      { value: 3, label: 'C', text: '"Quite expensive, right? Worth it?"' },
      { value: 4, label: 'D', text: '"That money would be better invested"' }
    ]},
    { id: 10, text: "🗣️ Someone says something obviously wrong:", dimension: "Tartness", options: [
      { value: 1, label: 'A', text: 'Pretend not to hear, don\'t expose them' },
      { value: 2, label: 'B', text: 'Remind them privately' },
      { value: 3, label: 'C', text: '"This seems wrong, right?" Point it out immediately' },
      { value: 4, label: 'D', text: '"You\'re completely wrong" - directly challenge them' }
    ]},
    { id: 11, text: "😢 When watching a touching movie:", dimension: "Juiciness", options: [
      { value: 1, label: 'A', text: 'Tears streaming down, crying uncontrollably' },
      { value: 2, label: 'B', text: 'Eyes get wet, secretly wipe away tears' },
      { value: 3, label: 'C', text: 'A bit moved, but hold it together' },
      { value: 4, label: 'D', text: '"What is this, what\'s there to cry about?"' }
    ]},
    { id: 12, text: "🎵 Hearing an old song:", dimension: "Juiciness", options: [
      { value: 1, label: 'A', text: 'Instantly emotional, remembering things from back then' },
      { value: 2, label: 'B', text: 'A bit touched, lost in memories' },
      { value: 3, label: 'C', text: '"Hmm, this song is pretty good"' },
      { value: 4, label: 'D', text: 'No feeling, just passing by' }
    ]},
    { id: 13, text: "💔 After a breakup:", dimension: "Juiciness", options: [
      { value: 1, label: 'A', text: 'Collapse and cry, feeling like it\'s the end of the world' },
      { value: 2, label: 'B', text: 'Sad for a few days, talk to friends' },
      { value: 3, label: 'C', text: 'A bit regretful, but adjust quickly' },
      { value: 4, label: 'D', text: '"The next one will be better" - seamless transition' }
    ]},
    { id: 14, text: "🌅 Seeing a beautiful sunrise/sunset:", dimension: "Juiciness", options: [
      { value: 1, label: 'A', text: '"So beautiful!" So moved you could cry' },
      { value: 2, label: 'B', text: 'Take photos and post, feeling great' },
      { value: 3, label: 'C', text: '"Hmm, pretty nice"' },
      { value: 4, label: 'D', text: '"That\'s it?" No feeling' }
    ]},
    { id: 15, text: "📖 Reading moving text:", dimension: "Juiciness", options: [
      { value: 1, label: 'A', text: 'Read repeatedly, take notes, full of resonance' },
      { value: 2, label: 'B', text: 'Resonate, will like and save' },
      { value: 3, label: 'C', text: 'Read and forget, not much feeling' },
      { value: 4, label: 'D', text: 'Don\'t get it, so dramatic' }
    ]},
    { id: 16, text: "🌪️ Facing a sudden crisis:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: 'Immediately calm down, analyze, respond quickly' },
      { value: 2, label: 'B', text: 'Panic a bit but can steady yourself' },
      { value: 3, label: 'C', text: 'Very anxious, need time to adjust' },
      { value: 4, label: 'D', text: 'Break down on the spot, need someone to comfort you' }
    ]},
    { id: 17, text: "💼 Being misunderstood or wronged:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: '"Whatever if they misunderstand" too lazy to explain' },
      { value: 2, label: 'B', text: 'Simple explanation, don\'t dwell on it' },
      { value: 3, label: 'C', text: 'A bit wronged, but can accept it' },
      { value: 4, label: 'D', text: 'Fragile heart shattered, very hurt' }
    ]},
    { id: 18, text: "🎯 Being criticized or blamed:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: '"You\'re right" humbly accept and improve' },
      { value: 2, label: 'B', text: 'Analyze right and wrong before deciding' },
      { value: 3, label: 'C', text: 'A bit upset, but can listen' },
      { value: 4, label: 'D', text: 'Immediately retort "Why are you saying that about me?"' }
    ]},
    { id: 19, text: "⚡ Plans suddenly disrupted:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: '"Then let\'s change the plan" flexible adjustment' },
      { value: 2, label: 'B', text: 'A bit upset, but can accept it' },
      { value: 3, label: 'C', text: 'Very anxious, don\'t like changes' },
      { value: 4, label: 'D', text: 'Emotional breakdown, hard to accept' }
    ]},
    { id: 20, text: "🏋️ Getting bumped by someone:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: '"No problem" very calm' },
      { value: 2, label: 'B', text: 'Stagger a bit but stay balanced' },
      { value: 3, label: 'C', text: 'Almost fall, panic-stricken' },
      { value: 4, label: 'D', text: 'Fall down directly, need someone to help' }
    ]},
    { id: 21, text: "💪 Facing long-term pressure:", dimension: "Firmness", options: [
      { value: 1, label: 'A', text: '"Piece of cake!" The more setbacks, the stronger you get' },
      { value: 2, label: 'B', text: 'Grind your teeth and endure' },
      { value: 3, label: 'C', text: 'A bit breaking down, want to cry' },
      { value: 4, label: 'D', text: 'Already given up and let things rot' }
    ]},
    { id: 22, text: "☀️ First thing in the morning:", dimension: "Freshness", options: [
      { value: 1, label: 'A', text: '"New day! Let\'s go!" Full of energy' },
      { value: 2, label: 'B', text: 'Stretch and slowly wake up' },
      { value: 3, label: 'C', text: '"Don\'t wanna get up..." Struggle to get out of bed' },
      { value: 4, label: 'D', text: 'Alarm goes off N times before crawling out' }
    ]},
    { id: 23, text: "🌿 On weekends, you would:", dimension: "Freshness", options: [
      { value: 1, label: 'A', text: 'Hiking, running, outdoor activities' },
      { value: 2, label: 'B', text: 'Shopping, meeting friends, going out' },
      { value: 3, label: 'C', text: 'Stay home, binge-watch shows, play games' },
      { value: 4, label: 'D', text: 'Sleep until naturally awake, continue lying down' }
    ]},
    { id: 24, text: "🍃 Your dressing style:", dimension: "Freshness", options: [
      { value: 1, label: 'A', text: 'Fresh and simple, mostly light colors' },
      { value: 2, label: 'B', text: 'Comfortable and casual, whatever feels good' },
      { value: 3, label: 'C', text: 'Dark colors, low-key and safe' },
      { value: 4, label: 'D', text: 'Wear whatever, as long as it covers the body' }
    ]},
    { id: 25, text: "💨 Facing new things:", dimension: "Freshness", options: [
      { value: 1, label: 'A', text: '"Let\'s try it!" Try immediately' },
      { value: 2, label: 'B', text: 'Observe for a while before deciding' },
      { value: 3, label: 'C', text: 'Not interested, too lazy to learn' },
      { value: 4, label: 'D', text: 'Reject change, stick to old habits' }
    ]},
    { id: 26, text: "🌊 Your life rhythm:", dimension: "Freshness", options: [
      { value: 1, label: 'A', text: 'Fast-paced, full and efficient' },
      { value: 2, label: 'B', text: 'Balanced work and rest, just right' },
      { value: 3, label: 'C', text: 'Slow-paced, chill and lie flat' },
      { value: 4, label: 'D', text: 'Lie down when possible, sit instead of stand' }
    ]},
    { id: 27, text: "👗 Your style tendency:", dimension: "Richness", options: [
      { value: 1, label: 'A', text: 'Bold and exaggerated, eye-catching' },
      { value: 2, label: 'B', text: 'Individualistic but not over the top' },
      { value: 3, label: 'C', text: 'Low-key and simple, safe' },
      { value: 4, label: 'D', text: 'Invisible person, no particular style' }
    ]},
    { id: 28, text: "🗣️ Your way of speaking:", dimension: "Richness", options: [
      { value: 1, label: 'A', text: 'Loud voice, rich body language' },
      { value: 2, label: 'B', text: 'Vivid tone, infectious' },
      { value: 3, label: 'C', text: 'Straightforward, normal communication' },
      { value: 4, label: 'D', text: 'Words are precious, speak as little as possible' }
    ]},
    { id: 29, text: "🎨 Color preference:", dimension: "Richness", options: [
      { value: 1, label: 'A', text: 'Rich and vibrant, bright reds and purples' },
      { value: 2, label: 'B', text: 'Bright and soft, colorful palette' },
      { value: 3, label: 'C', text: 'Black, white, gray, simple and elegant' },
      { value: 4, label: 'D', text: 'Anything is fine, don\'t care' }
    ]},
    { id: 30, text: "🎤 In a KTV room:", dimension: "Richness", options: [
      { value: 1, label: 'A', text: '"I\'ll go first!" Grab the mic throne' },
      { value: 2, label: 'B', text: 'Pick a few favorite songs to sing' },
      { value: 3, label: 'C', text: 'Only reluctantly sing when called upon' },
      { value: 4, label: 'D', text: '"I don\'t sing, I\'ll just clap"' }
    ]},
    { id: 31, text: "📸 Social media posting frequency:", dimension: "Richness", options: [
      { value: 1, label: 'A', text: 'Post daily, documenting life' },
      { value: 2, label: 'B', text: 'Post when something happens, follow feelings' },
      { value: 3, label: 'C', text: 'Occasionally post, rarely update' },
      { value: 4, label: 'D', text: 'Never post, just observe quietly' }
    ]},
    { id: 32, text: "🎉 Meeting a stranger in an elevator:", dimension: "Sociability", options: [
      { value: 1, label: 'A', text: '"Hey, you live here too?" Proactively start conversation' },
      { value: 2, label: 'B', text: 'Smile and nod, polite greeting' },
      { value: 3, label: 'C', text: 'Awkward smile, pretend to look at phone' },
      { value: 4, label: 'D', text: 'Expressionless, stare at floor numbers' }
    ]},
    { id: 33, text: "🍕 Company team building activities:", dimension: "Sociability", options: [
      { value: 1, label: 'A', text: '"I\'ll organize the games!" The life of the party' },
      { value: 2, label: 'B', text: 'Participate and interact, atmosphere maker' },
      { value: 3, label: 'C', text: 'Polite participation, sit quietly' },
      { value: 4, label: 'D', text: '"Suddenly don\'t feel well" go home early' }
    ]},
    { id: 34, text: "📱 Someone @everyone in a group chat:", dimension: "Sociability", options: [
      { value: 1, label: 'A', text: 'First to reply' },
      { value: 2, label: 'B', text: 'See the situation before deciding whether to reply' },
      { value: 3, label: 'C', text: 'Wait until everyone else has replied' },
      { value: 4, label: 'D', text: 'Read but don\'t reply, pretend not to see' }
    ]},
    { id: 35, text: "🎊 Your adaptation style in new environments:", dimension: "Sociability", options: [
      { value: 1, label: 'A', text: 'Proactive socializing, quick integration' },
      { value: 2, label: 'B', text: 'Observe for a while, slowly make contact' },
      { value: 3, label: 'C', text: 'Wait for others to approach' },
      { value: 4, label: 'D', text: 'Keep distance, come and go alone' }
    ]},
    { id: 36, text: "🏖️ After vacation ends, your social media:", dimension: "Sociability", options: [
      { value: 1, label: 'A', text: 'Nine beautiful photos with long text' },
      { value: 2, label: 'B', text: 'Post a few selected photos' },
      { value: 3, label: 'C', text: 'Share others\' posts, too lazy to post own' },
      { value: 4, label: 'D', text: 'Post nothing, stay mysterious' }
    ]},
    { id: 37, text: "🍱 A dish on the menu you haven\'t tried:", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: '"Order this!" Try new flavors' },
      { value: 2, label: 'B', text: 'Ask the waiter how it is' },
      { value: 3, label: 'C', text: 'Better stick with familiar dishes' },
      { value: 4, label: 'D', text: 'Always order the same few things' }
    ]},
    { id: 38, text: "👕 Outfit coordination:", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: 'Pursue uniqueness, outfit clash is embarrassing' },
      { value: 2, label: 'B', text: 'Have your own style, but not exaggerated' },
      { value: 3, label: 'C', text: 'Follow the crowd, safe choices' },
      { value: 4, label: 'D', text: 'Wear whatever, comfort is key' }
    ]},
    { id: 39, text: "🎭 When everyone else is doing something:", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: '"I\'d rather not" do the opposite' },
      { value: 2, label: 'B', text: 'Depends on the situation, don\'t blindly follow' },
      { value: 3, label: 'C', text: 'Everyone\'s doing it, must be right' },
      { value: 4, label: 'D', text: 'Go with the flow, less trouble' }
    ]},
    { id: 40, text: "🎨 Hobbies and interests:", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: 'Niche and obscure, others haven\'t heard of' },
      { value: 2, label: 'B', text: 'A bit special, but understandable' },
      { value: 3, label: 'C', text: 'Mainstream popular, everyone likes' },
      { value: 4, label: 'D', text: 'No special hobbies' }
    ]},
    { id: 41, text: "🗣️ When expressing opinions:", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: 'Surprising statements, sharp and unique views' },
      { value: 2, label: 'B', text: 'Have your own insights, don\'t follow the crowd' },
      { value: 3, label: 'C', text: 'Conventional, not too special' },
      { value: 4, label: 'D', text: 'Follow the crowd, whatever others say goes' }
    ]},
    { id: 42, text: "🎪 Friend says 'I found a secret base':", dimension: "Uniqueness", options: [
      { value: 1, label: 'A', text: '"Where? Take me!" Excited' },
      { value: 2, label: 'B', text: '"What kind of base?" Curious inquiry' },
      { value: 3, label: 'C', text: '"Oh, I see" Mild response' },
      { value: 4, label: 'D', text: '"What\'s that got to do with me?" No interest' }
    ]}
  ];

  const fruitTypes = {
    "Strawberry": {
      icon: "🍓",
      slogan: "Small happiness collector, sweet and lovely",
      dimensions: ["Sweetness", "Juiciness", "Sociability"],
      description: "You're like a fresh strawberry, sweet and adorable, making people want to get close to you. You have a gentle personality and rich emotions, always bringing warmth and happiness to those around you. You're good at socializing and thrive in crowds, being everyone's mood booster.",
      traits: ["Gentle and caring", "Emotionally rich", "Popular", "Sweet and lovely"],
      careers: ["Early childhood teacher", "Psychological counselor", "Customer service specialist", "Beauty blogger", "Pastry chef"],
      goodMatch: ["Watermelon", "Orange", "Grape"],
      badMatch: ["Durian", "Lemon"],
      advice: [
        "💝 Keep your gentleness, but also learn to say no appropriately",
        "🌟 Sometimes too much sweetness can be overwhelming, showing some personality occasionally is more charming",
        "💪 Don't care too much about others' opinions, you're already amazing"
      ],
      color: "from-pink-400 to-red-400"
    },
    "Peach": {
      icon: "🍑",
      slogan: "Gentle guardian, soft and caring",
      dimensions: ["Sweetness", "Juiciness", "Firmness"],
      description: "You're like a peach, soft and gentle on the outside but tough on the inside. You're very understanding and can always perceive others' emotional changes. Although you may seem to need protection, you can display amazing strength at critical moments.",
      traits: ["Understanding", "Delicate and sensitive", "Gently resilient", "Considerate and caring"],
      careers: ["Nurse", "Social worker", "Copywriter", "Illustrator", "Children's education"],
      goodMatch: ["Strawberry", "Grape", "Apple"],
      badMatch: ["Durian", "Coconut"],
      advice: [
        "🌸 Your gentleness is an advantage, don't let it become weakness",
        "💪 Exercise your inner strength more, learn to protect yourself",
        "✨ Express your thoughts appropriately, don't always accommodate others"
      ],
      color: "from-pink-300 to-orange-300"
    },
    "Grape": {
      icon: "🍇",
      slogan: "Group's little darling, sweet and soft",
      dimensions: ["Sweetness", "Juiciness", "Sociability"],
      description: "You're like a bunch of purple grapes, sweet, juicy, and adorable. Your personality is gentle and cute, and you can easily integrate into various circles. You like to huddle together for warmth and enjoy spending time with friends.",
      traits: ["Cute and charming", "Team spirit", "Emotionally stable", "Easy-going and friendly"],
      careers: ["Event planner", "PR specialist", "Community manager", "Tour guide", "Streamer"],
      goodMatch: ["Strawberry", "Watermelon", "Orange"],
      badMatch: ["Dragon Fruit", "Durian"],
      advice: [
        "🎉 Maintain your approachability, this is your greatest charm",
        "💎 Occasionally have your own opinions, don't always follow the crowd",
        "🌟 Develop some unique skills to make yourself more competitive"
      ],
      color: "from-purple-400 to-pink-400"
    },
    "Coconut": {
      icon: "🥥",
      slogan: "Tough guardian, hard outside but soft inside",
      dimensions: ["Firmness", "Uniqueness", "Sweetness"],
      description: "You're like a coconut, hard on the outside but soft on the inside. You may seem difficult to approach, but those who truly know you discover your inner gentleness. You're independent and strong, a reliable support others can count on.",
      traits: ["Resilient and independent", "Cold outside, warm inside", "Trustworthy", "Principled"],
      careers: ["Project Manager", "Lawyer", "Engineer", "Fitness Trainer", "Entrepreneur"],
      goodMatch: ["Mango", "Avocado", "Watermelon"],
      badMatch: ["Strawberry", "Grape"],
      advice: [
        "💪 Your strength is admirable, but it's okay to show vulnerability occasionally",
        "💝 Show your gentle side more, let others get closer to you",
        "🌈 Learn to express emotions, don't always keep things bottled up"
      ],
      color: "from-amber-600 to-stone-500"
    },
    "Avocado": {
      icon: "🥑",
      slogan: "Zen wellness expert, calm and composed",
      dimensions: ["Firmness", "Uniqueness", "Freshness"],
      description: "You're like an avocado, healthy, calm, and extraordinary. You pursue quality of life, not following trends blindly. You have your own rhythm, living your life unhurriedly. Though not everyone understands you, those who do recognize your value.",
      traits: ["Calm and composed", "Quality-seeking", "Health-conscious", "Extraordinary"],
      careers: ["Nutritionist", "Yoga Instructor", "Product Manager", "Independent Designer", "Freelancer"],
      goodMatch: ["Blueberry", "Dragon Fruit", "Kiwi"],
      badMatch: ["Watermelon", "Orange"],
      advice: [
        "🧘 Maintain your life rhythm, no need to please everyone",
        "💚 Your uniqueness is precious, continue being yourself",
        "🌟 Step out of your comfort zone appropriately, try more possibilities"
      ],
      color: "from-green-500 to-lime-600"
    },
    "Cantaloupe": {
      icon: "🍈",
      slogan: "Solid and honest person, dependable and reliable",
      dimensions: ["Firmness", "Sweetness", "Juiciness"],
      description: "You're like a cantaloupe, thick and dependable, moderately sweet. You're a typical honest person, solid and reliable in your work. Though not good at showing off, you always silently contribute to those around you.",
      traits: ["Solid and reliable", "Hardworking without complaint", "Simple and sincere", "Patient"],
      careers: ["Accountant", "Archivist", "Quality Inspector", "Logistics Manager", "Technical Support"],
      goodMatch: ["Apple", "Orange", "Banana"],
      badMatch: ["Dragon Fruit", "Durian"],
      advice: [
        "🌟 Your reliability is an advantage, but also learn to express yourself",
        "💪 Appropriately pursue your interests, don't always give silently",
        "✨ Show your thoughts more, let others understand you better"
      ],
      color: "from-yellow-400 to-orange-400"
    },
    "Watermelon": {
      icon: "🍉",
      slogan: "Summer social king, enthusiastic and unrestrained",
      dimensions: ["Sociability", "Juiciness", "Freshness"],
      description: "You're like a summer watermelon, refreshing and popular. You have an outgoing and cheerful personality, becoming the center of attention wherever you go. You're passionate and full of energy, the soul of any party.",
      traits: ["Enthusiastic and cheerful", "Popular", "Full of energy", "Naturally sociable"],
      careers: ["Sales", "Event Planner", "Host", "Travel Blogger", "PR"],
      goodMatch: ["Orange", "Strawberry", "Mango"],
      badMatch: ["Durian", "Avocado"],
      advice: [
        "🎉 Maintain your enthusiasm, it's your greatest charm",
        "💭 Pay attention to listening to others, don't just focus on your own happiness",
        "🌟 Learn to find balance between excitement and quiet"
      ],
      color: "from-red-500 to-green-500"
    },
    "Mango": {
      icon: "🥭",
      slogan: "Tropical charm, rich and passionate",
      dimensions: ["Richness", "Sweetness", "Uniqueness"],
      description: "You're like a tropical mango, rich, sweet, and charming. Your personality is expressive, you love and hate boldly, never hiding your emotions. You have a strong presence and always leave a deep impression on others.",
      traits: ["Distinctive personality", "Passionate as fire", "Love and hate boldly", "Full of charm"],
      careers: ["Actor", "Singer", "Artist", "Creative Director", "Fashion Blogger"],
      goodMatch: ["Watermelon", "Orange", "Coconut"],
      badMatch: ["Apple", "Green Apple"],
      advice: [
        "🔥 Your passion is charming, but learn to control it appropriately",
        "💎 While maintaining your personality, also consider others' feelings",
        "🌈 You're already dazzling enough, no need to overperform"
      ],
      color: "from-yellow-500 to-orange-600"
    },
    "Orange": {
      icon: "🍊",
      slogan: "Sunny and cheerful, full of vitality",
      dimensions: ["Freshness", "Sociability", "Sweetness"],
      description: "You're like an orange, sunny, cheerful, and full of positive energy. You always maintain a positive attitude, bringing joy and hope to those around you. You're good at socializing, extremely popular, and the mood booster in any team.",
      traits: ["Sunny and positive", "Full of positive energy", "Strong affinity", "Optimistic"],
      careers: ["Teacher", "Trainer", "Customer Service Manager", "HR", "Health Manager"],
      goodMatch: ["Watermelon", "Strawberry", "Apple"],
      badMatch: ["Lemon", "Durian"],
      advice: [
        "☀️ Maintain your sunshine, the world needs more positive energy",
        "💪 Allow yourself to be down occasionally, no need to force a smile",
        "🌟 Your optimism is a gift, but also face problems realistically"
      ],
      color: "from-orange-400 to-yellow-500"
    },
    "Lemon": {
      icon: "🍋",
      slogan: "Sarcastic cutie, sharp tongue but soft heart",
      dimensions: ["Tartness", "Freshness", "Uniqueness"],
      description: "You're like a lemon, sharp and refreshing. You speak directly, sometimes accidentally hurting people, but you're actually kind-hearted, just not good at expressing it. Behind your sharp tongue lies deep concern.",
      traits: ["Frank and outspoken", "Sharp and humorous", "Cold outside, warm inside", "Fresh and extraordinary"],
      careers: ["Editor", "Commentator", "Stand-up Comedian", "Product Manager", "Media Professional"],
      goodMatch: ["Orange", "Watermelon", "Green Apple"],
      badMatch: ["Strawberry", "Peach"],
      advice: [
        "🍋 Your sincerity is valuable, but you can speak more gently",
        "💛 Let others see your soft side, don't always be so hard",
        "🌟 Learn to express care in more gentle ways"
      ],
      color: "from-yellow-300 to-lime-400"
    },
    "Blueberry": {
      icon: "🫐",
      slogan: "Fresh artistic soul, low-key with substance",
      dimensions: ["Freshness", "Uniqueness", "Firmness"],
      description: "You're like a blueberry, delicate and understated with depth. You don't like noise, preferring quiet time alone. You have your own aesthetic and taste, pursuing spiritual satisfaction.",
      traits: ["Artistic temperament", "Low-key and reserved", "Tasteful", "Independent thinker"],
      careers: ["Writer", "Photographer", "Librarian", "Barista", "Independent Designer"],
      goodMatch: ["Avocado", "Kiwi", "Dragon Fruit"],
      badMatch: ["Watermelon", "Mango"],
      advice: [
        "📚 Maintain your artistic style, it's your unique charm",
        "🌟 Step out of your small world appropriately, communicate more with others",
        "💙 Your depth is precious, but you can also show it appropriately"
      ],
      color: "from-blue-400 to-indigo-500"
    },
    "Green Apple": {
      icon: "🍏",
      slogan: "Energetic youth, refreshing and vibrant",
      dimensions: ["Freshness", "Tartness", "Sociability"],
      description: "You're like a green apple, refreshing and full of youthful energy. You're vibrant and full of passion for life. You have the freshness of lemon and the affinity of apple, the energy booster in everyone's eyes.",
      traits: ["Youthful vitality", "Fresh and natural", "Full of vigor", "Healthy and upward"],
      careers: ["Fitness Trainer", "PE Teacher", "Sports Blogger", "Outdoor Guide", "Nutritionist"],
      goodMatch: ["Orange", "Lemon", "Watermelon"],
      badMatch: ["Durian", "Coconut"],
      advice: [
        "💚 Maintain your vitality, keep a forever young mindset",
        "🌟 Balance work and rest, don't exhaust yourself",
        "✨ Your positive energy is contagious, keep shining"
      ],
      color: "from-green-400 to-lime-500"
    },
    "Dragon Fruit": {
      icon: "🐉",
      slogan: "Mysterious artist, stunning appearance",
      dimensions: ["Uniqueness", "Richness", "Firmness"],
      description: "You're like a dragon fruit, stunning on the outside, unique on the inside. You don't follow the beaten path, always bringing surprises. You have a strong personal style, not caring about others' opinions, insisting on being yourself.",
      traits: ["Unique personality", "Artistic temperament", "Mysterious", "Full of creativity"],
      careers: ["Artist", "Designer", "Stylist", "Independent Musician", "Creative Director"],
      goodMatch: ["Avocado", "Blueberry", "Kiwi"],
      badMatch: ["Apple", "Orange"],
      advice: [
        "🎨 Your uniqueness is a treasure, continue being yourself",
        "💎 Also learn to adapt to society, don't be too alternative",
        "🌟 Find circles that appreciate you, no need to please everyone"
      ],
      color: "from-pink-500 to-purple-600"
    },
    "Banana": {
      icon: "🍌",
      slogan: "Witty comedian, humorous and fun",
      dimensions: ["Sociability", "Sweetness", "Richness"],
      description: "You're like a banana, naturally funny, the mood booster in any crowd. You're humorous and witty, always able to defuse awkwardness with humor. You're casual about details, living freely and easily, everyone's source of happiness.",
      traits: ["Humorous and funny", "Optimistic and cheerful", "Naturally sociable", "Casual about details"],
      careers: ["Comedian", "Joke Writer", "Video Blogger", "Entertainment Host", "Event Planner"],
      goodMatch: ["Watermelon", "Orange", "Grape"],
      badMatch: ["Blueberry", "Dragon Fruit"],
      advice: [
        "😄 Your humor is a gift, keep bringing joy to others",
        "💛 Pay attention to appropriateness, not all occasions are suitable for jokes",
        "🌟 Also have a serious side, let others see your depth"
      ],
      color: "from-yellow-400 to-yellow-600"
    },
    "Pineapple": {
      icon: "🍍",
      slogan: "Spiky outside, sweet inside, seems hard to approach",
      dimensions: ["Tartness", "Sweetness", "Firmness"],
      description: "You're like a pineapple, spiky on the outside but sweet inside. Your first impression might be hard to approach, but deeper understanding reveals your charm. You have principles and boundaries, but are very sincere to friends.",
      traits: ["Cold outside, warm inside", "Principled", "Sincere and reliable", "Balanced sweet and sour"],
      careers: ["Lawyer", "Auditor", "Quality Management", "Editor", "Independent Consultant"],
      goodMatch: ["Coconut", "Lemon", "Mango"],
      badMatch: ["Strawberry", "Grape"],
      advice: [
        "🍍 Your protective shell is necessary, but can be appropriately soft",
        "💛 Let friends see your gentle side",
        "🌟 First impressions matter, you can be slightly friendlier"
      ],
      color: "from-yellow-500 to-orange-500"
    },
    "Durian": {
      icon: "🥴",
      slogan: "Love-hate divider, either love me to death or hate me",
      dimensions: ["Uniqueness", "Richness", "Firmness"],
      description: "You're like a durian, either loved to death or hated, no middle ground. Your personality is extremely strong, never compromising, insisting on being yourself. You know you can't please everyone, but you don't care, because those who understand you will naturally stay.",
      traits: ["Extremely strong personality", "Sticks to self", "Love and hate clearly", "Doesn't follow trends"],
      careers: ["Independent Entrepreneur", "Artist", "Opinion Leader", "Independent Writer", "Alternative Designer"],
      goodMatch: ["Dragon Fruit", "Coconut", "Pineapple"],
      badMatch: ["Strawberry", "Apple", "Orange"],
      advice: [
        "👑 Your persistence is valuable, but also learn to be flexible",
        "💪 Not everyone can understand you, that's normal",
        "🌟 Find your circle, no need to force integration into the mainstream"
      ],
      color: "from-yellow-600 to-amber-700"
    },
    "Young Coconut": {
      icon: "🥥",
      slogan: "Zen lie-flat expert, unconcerned with worldly affairs",
      dimensions: ["Firmness", "Freshness", "Juiciness"],
      description: "You're like a young coconut, refreshing and unconcerned with worldly affairs. Your life philosophy is 'lying flat is justice', not competing, being at peace with whatever comes. You view fame and fortune lightly, pursuing inner peace and freedom.",
      traits: ["Zen and calm", "Unconcerned with worldly affairs", "Pure desires", "At peace with whatever comes"],
      careers: ["Freelancer", "Meditation Coach", "B&B Owner", "Independent Writer", "Artisan"],
      goodMatch: ["Avocado", "Blueberry", "Kiwi"],
      badMatch: ["Watermelon", "Mango", "Durian"],
      advice: [
        "🥥 Your zen approach is wisdom, but also have pursuits",
        "💚 Moderate effort isn't bad, don't really lie completely flat",
        "🌟 Balance lying flat and striving, find your own rhythm"
      ],
      color: "from-teal-400 to-cyan-500"
    },
    "Kiwi": {
      icon: "🥝",
      slogan: "Low-key potential stock, rich on the inside",
      dimensions: ["Uniqueness", "Firmness", "Tartness"],
      description: "You're like a kiwi, unassuming but rich on the inside. You don't pursue external glamour, focusing more on cultivating inner substance. You're a typical potential stock, destined to shine brightly in time.",
      traits: ["Low-key and reserved", "Rich in substance", "Infinite potential", "Accumulates and blossoms"],
      careers: ["Researcher", "Data Analyst", "Programmer", "Investment Advisor", "Professional Consultant"],
      goodMatch: ["Avocado", "Blueberry", "Dragon Fruit"],
      badMatch: ["Mango", "Watermelon"],
      advice: [
        "🥝 Your inner substance is wealth, but you can also show it appropriately",
        "💚 Don't be too low-key, let others see your talents",
        "🌟 You're better than you imagine, have confidence"
      ],
      color: "from-green-600 to-lime-600"
    },
    "Red Apple": {
      icon: "🍎",
      slogan: "All-round top student, classic and versatile",
      dimensions: ["Sweetness", "Sociability", "Firmness"],
      description: "You're like a red apple, classic, reliable, and liked by everyone. You're well-balanced in all aspects, a recognized good person. You're not extreme, handle things appropriately, the most reassuring type.",
      traits: ["Balanced development", "Reliable and steady", "Popular", "Strong adaptability"],
      careers: ["Management", "Administration", "HR", "Teacher", "Consultant"],
      goodMatch: ["Orange", "Grape", "Cantaloupe"],
      badMatch: ["Durian", "Dragon Fruit"],
      advice: [
        "🍎 Your balance is good, but you can have some edge",
        "💪 Don't lose yourself to please others",
        "🌟 Occasionally do something unconventional, surprise everyone"
      ],
      color: "from-red-400 to-pink-500"
    },
    "Tangerine": {
      icon: "🍊",
      slogan: "Approachable and friendly, easy to get along with",
      dimensions: ["Sociability", "Sweetness", "Freshness"],
      description: "You're like a tangerine, friendly and easy to peel. You're approachable, making people comfortable around you. You're the type people feel like they've known forever, welcomed wherever you go.",
      traits: ["Approachable", "Strong affinity", "Easy to get along with", "Down-to-earth"],
      careers: ["Customer Service", "Community Work", "Sales", "PR", "Tour Guide"],
      goodMatch: ["Apple", "Watermelon", "Grape"],
      badMatch: ["Durian", "Dragon Fruit"],
      advice: [
        "🍊 Your affinity is a treasure, keep it up",
        "💛 Also have your own stance, don't be too accommodating",
        "🌟 Show professionalism appropriately, earn more respect"
      ],
      color: "from-orange-400 to-yellow-400"
    }
  };

  const defaultOptions = [
    { value: 5, label: 'A', text: 'Strongly agree' },
    { value: 4, label: 'B', text: 'Somewhat agree' },
    { value: 3, label: 'C', text: 'Neutral' },
    { value: 2, label: 'D', text: 'Somewhat disagree' },
    { value: 1, label: 'E', text: 'Strongly disagree' }
  ];

  const handleTitleClick = () => {
    const now = Date.now();

    if (clickTime && now - clickTime > 10000) {
      setTitleClickCount(1);
      setClickTime(now);
    } else {
      const newCount = titleClickCount + 1;
      setTitleClickCount(newCount);
      setClickTime(now);

      if (newCount === 5) {
        setShowQuickTest(true);
        setTitleClickCount(0);
      }
    }
  };

  const handleQuickTest = () => {
    const quickAnswers = {};
    questions.forEach(q => {
      quickAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });

    setAnswers(quickAnswers);
    saveResult(quickAnswers);
    setCurrentPage('result');
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('fruit_test_')) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              records.push(JSON.parse(data));
            }
          } catch (e) {
            console.log('Failed to read record:', key);
          }
        }
      }
      records.sort((a, b) => b.timestamp - a.timestamp);
      setHistoryRecords(records);
    } catch (error) {
      console.log('History feature temporarily unavailable:', error);
    }
  };

  const handleStartTest = () => {
    setCurrentPage('test');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveResult(newAnswers);
      setCurrentPage('result');
    }
  };

  const saveResult = (finalAnswers) => {
    const results = calculateResults(finalAnswers);
    const record = {
      timestamp: Date.now(),
      answers: finalAnswers,
      results: results
    };

    try {
      localStorage.setItem(
        `fruit_test_${Date.now()}`,
        JSON.stringify(record)
      );
      loadHistory();
    } catch (error) {
      console.log('Save failed:', error);
    }
  };

  const handlePremiumReport = () => {
    const results = calculateResults();
    const fruitInfo = fruitTypes[results.fruitType];

    // Create premium report modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-4xl mb-4">🍓</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Premium Fruit Personality Report</h3>
          <p class="text-gray-600">Unlock your complete fruit personality analysis</p>
        </div>

        <div class="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 mb-6">
          <h4 class="font-bold text-gray-800 mb-3">What you'll get:</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li class="flex items-start"><span class="mr-2">✓</span> 15-page detailed personality report</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Career development recommendations</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Relationship compatibility insights</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Emotional intelligence improvement plan</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Celebrity fruit personality matches</li>
            <li class="flex items-start"><span class="mr-2">✓</span> 30-day personal growth challenge</li>
          </ul>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 line-through">Regular price: $4.90</p>
              <p class="text-2xl font-bold text-green-600">Only $1.90</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500 mb-1">Limited time offer</p>
              <p class="text-xs text-orange-600 font-semibold">Save 61%</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <button onclick="purchasePremiumReport()" class="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg">
            🚀 Get Premium Report - $1.90
          </button>
          <button onclick="this.closest('.fixed').remove()" class="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
            Maybe later
          </button>
        </div>

        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">🔒 30-day satisfaction guarantee | Instant delivery</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Add purchase function to window scope
    window.purchasePremiumReport = () => {
      alert('Payment integration coming soon! Your premium fruit personality report will include detailed analysis, career recommendations, and personalized growth strategies.');
      modal.remove();
    };
  };

  const calculateResults = (finalAnswers = answers) => {
    const dimensionScores = {};

    Object.keys(dimensions).forEach(dim => {
      dimensionScores[dim] = 0;
    });

    questions.forEach(q => {
      const score = finalAnswers[q.id] || 0;
      dimensionScores[q.dimension] += score;
    });

    const dimensionAvgScores = {};
    const dimensionCounts = {};

    questions.forEach(q => {
      dimensionCounts[q.dimension] = (dimensionCounts[q.dimension] || 0) + 1;
    });

    Object.keys(dimensions).forEach(dim => {
      const count = dimensionCounts[dim] || 1;
      dimensionAvgScores[dim] = (dimensionScores[dim] / count).toFixed(1);
    });

    const sortedDimensions = Object.entries(dimensionAvgScores)
      .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a));

    const topDimensions = sortedDimensions.slice(0, 3);
    const fruitType = determineFruitType(topDimensions, dimensionAvgScores);

    return {
      dimensionScores,
      dimensionAvgScores,
      topDimensions,
      fruitType
    };
  };

  const determineFruitType = (topDimensions, allScores) => {
    const top3Names = topDimensions.map(([name]) => name);

    let bestMatch = null;
    let bestScore = 0;

    for (const [fruitName, fruitInfo] of Object.entries(fruitTypes)) {
      if (fruitInfo.dimensions && fruitInfo.dimensions.length > 0) {
        let matchScore = 0;

        fruitInfo.dimensions.forEach(dim => {
          if (top3Names.includes(dim)) {
            matchScore += 2;
          }
          matchScore += parseFloat(allScores[dim] || 0) * 0.1;
        });

        if (matchScore > bestScore) {
          bestScore = matchScore;
          bestMatch = fruitName;
        }
      }
    }

    return bestMatch || "Red Apple";
  };

  useEffect(() => {
    if (currentPage === 'result' && chartRef.current && typeof Chart !== 'undefined') {
      const results = calculateResults();
      const ctx = chartRef.current.getContext('2d');

      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const dimensionNames = Object.keys(dimensions);
      const chartData = dimensionNames.map(dim =>
        parseFloat(results.dimensionAvgScores[dim])
      );

      try {
        new Chart(ctx, {
          type: 'radar',
          data: {
            labels: dimensionNames,
            datasets: [{
              label: 'Your Score',
              data: chartData,
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              pointBackgroundColor: dimensionNames.map(dim => dimensions[dim].color),
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: dimensionNames.map(dim => dimensions[dim].color),
              pointRadius: 5,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                max: 5,
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 12
                  }
                },
                pointLabels: {
                  font: {
                    size: 11
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      } catch (error) {
        console.log('Chart creation failed:', error);
      }
    }
  }, [currentPage, answers]);

  const copyResultText = () => {
    const results = calculateResults();
    const typeInfo = fruitTypes[results.fruitType];

    const text = `🍓 My fruit personality test results are out!

I'm a【${results.fruitType}】type ${typeInfo.icon}

✨ My personality traits:
${typeInfo.slogan}

💫 Top dimensions:
${results.topDimensions.map(([dim, score], index) =>
        `${index + 1}. ${dimensions[dim].icon} ${dim} ${score} points`
      ).join('\n')}

${typeInfo.description}

Suitable careers: ${typeInfo.careers.slice(0, 3).join(', ')}

#FruitPersonalityTest #PersonalityTest #SelfDiscovery`;

    navigator.clipboard.writeText(text).then(() => {
      alert('Result copied to clipboard!');
    }).catch(() => {
      alert('Copy failed, please copy manually');
    });
  };

  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen fruit-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('div', { className: "text-5xl sm:text-7xl mb-4 bounce-in" }, '🍓🍊🍋🍉'),
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-green-500 bg-clip-text text-transparent mb-2 sm:mb-4 cursor-pointer select-none",
            style: { userSelect: 'none' }
          },
            'Fruit Personality Assessment'
          ),
          React.createElement('p', { className: "text-sm sm:text-base text-gray-600" }, 'Discover your fruit personality · Find your true self')
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base mb-8" },
          React.createElement('div', { className: "bg-gradient-to-r from-pink-50 via-orange-50 to-yellow-50 border border-pink-200 rounded-xl p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold mb-3 text-pink-800" }, '✨ Assessment Instructions'),
            React.createElement('ul', { className: "space-y-2 text-pink-700" },
              React.createElement('li', null, '• This assessment is based on 8 personality dimensions, evaluating your fruit personality traits'),
              React.createElement('li', null, '• Total 42 questions, estimated 5-8 minutes to complete'),
              React.createElement('li', null, '• Please answer based on your true feelings, choose the option that best fits you'),
              React.createElement('li', null, '• Results will be automatically saved, supports viewing history')
            )
          ),

          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4" },
            Object.entries(dimensions).map(([key, dim]) =>
              React.createElement('div', {
                key: key,
                className: "dimension-card bg-white border-2 rounded-lg p-3 text-center",
                style: { borderColor: dim.color }
              },
                React.createElement('div', { className: "text-3xl mb-2" }, dim.icon),
                React.createElement('div', {
                  className: "font-semibold text-sm",
                  style: { color: dim.color }
                }, dim.name),
                React.createElement('div', { className: "text-xs text-gray-500 mt-1" }, dim.description)
              )
            )
          ),

          React.createElement('div', { className: "bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-xl p-4" },
            React.createElement('h3', { className: "text-lg font-bold mb-3 text-orange-800" }, '🍊 You might be one of the following fruits:'),
            React.createElement('div', { className: "flex flex-wrap gap-2" },
              Object.entries(fruitTypes).slice(0, 12).map(([name, info]) =>
                React.createElement('span', {
                  key: name,
                  className: "bg-white px-3 py-1 rounded-full text-sm border border-orange-200"
                },
                  React.createElement('span', null, `${info.icon} ${name}`)
                )
              ),
              React.createElement('span', { className: "text-gray-400 px-3 py-1" }, 'And more...')
            )
          )
        ),

        React.createElement('div', { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center" },
          React.createElement('button', {
            onClick: handleStartTest,
            className: "w-full sm:w-auto bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 hover:from-pink-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          },
            '🚀 Start Assessment (42 Questions)'
          ),

          historyRecords.length > 0 && React.createElement('button', {
            onClick: () => setShowHistory(!showHistory),
            className: "w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors"
          },
            `📊 View History (${historyRecords.length})`
          ),

          showQuickTest && React.createElement('button', {
            onClick: handleQuickTest,
            className: "w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-yellow-300 animate-pulse",
            title: "Easter egg: Generate random results with one click"
          },
            '⚡ Quick Test'
          )
        ),

        showHistory && historyRecords.length > 0 && React.createElement('div', { className: "mt-6 bg-gray-50 rounded-xl p-4 fade-in" },
          React.createElement('h3', { className: "font-bold text-lg mb-3" }, 'Historical Assessment Records'),
          React.createElement('div', { className: "space-y-2 max-h-64 overflow-y-auto" },
            historyRecords.map((record, index) =>
              React.createElement('div', {
                key: index,
                className: "bg-white p-3 rounded-lg border flex justify-between items-center hover:shadow-md transition-shadow"
              },
                React.createElement('div', null,
                  React.createElement('div', { className: "font-semibold" }, record.results.fruitType),
                  React.createElement('div', { className: "text-sm text-gray-500" },
                    new Date(record.timestamp).toLocaleString('zh-CN')
                  )
                ),
                React.createElement('div', { className: "text-3xl" },
                  fruitTypes[record.results.fruitType]?.icon
                )
              )
            )
          )
        )
      )
    )
  );

  const renderTest = () => {
    const currentQ = questions[currentQuestion];
    const dimInfo = dimensions[currentQ.dimension];
    const questionOptions = currentQ.options || defaultOptions;

    return React.createElement('div', { className: "min-h-screen fruit-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 fade-in" },
        React.createElement('div', { className: "mb-6 sm:mb-8" },
          React.createElement('div', { className: "flex items-center justify-between mb-4" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
              React.createElement('span', { className: "font-semibold text-gray-700" }, dimInfo.name)
            ),
            React.createElement('div', { className: "text-right" },
              React.createElement('div', {
                className: "text-lg sm:text-xl font-bold",
                style: { color: dimInfo.color }
              },
                `Question ${currentQuestion + 1}`
              ),
              React.createElement('div', { className: "text-xs sm:text-sm text-gray-500" }, 'Total 42 Questions')
            )
          ),

          React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
            React.createElement('div', {
              className: "h-2 rounded-full transition-all duration-300",
              style: {
                width: `${((currentQuestion + 1) / 42) * 100}%`,
                background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
              }
            })
          ),
          React.createElement('div', { className: "text-xs sm:text-sm text-gray-500 mt-1 text-right" },
            `${((currentQuestion + 1) / 42 * 100).toFixed(0)}% Complete`
          )
        ),

        React.createElement('div', { className: "mb-8" },
          React.createElement('h3', { className: "text-lg sm:text-2xl font-medium text-gray-800 text-center mb-8 leading-relaxed px-2" },
            currentQ.text
          ),

          React.createElement('div', { className: "space-y-3" },
            questionOptions.map(option =>
              React.createElement('button', {
                key: option.value,
                onClick: () => handleAnswer(option.value),
                className: "w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 transform hover:scale-[1.02]",
                style: {
                  borderColor: answers[currentQ.id] === option.value ? dimInfo.color : undefined,
                  backgroundColor: answers[currentQ.id] === option.value ? `${dimInfo.color}15` : undefined
                }
              },
                React.createElement('div', { className: "flex items-center" },
                  React.createElement('span', {
                    className: "font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center mr-4",
                    style: {
                      backgroundColor: `${dimInfo.color}20`,
                      color: dimInfo.color
                    }
                  },
                    option.label
                  ),
                  React.createElement('span', { className: "text-base text-gray-800" }, option.text)
                )
              )
            )
          )
        ),

        React.createElement('div', { className: "flex justify-between items-center" },
          currentQuestion > 0 ? React.createElement('button', {
            onClick: () => setCurrentQuestion(currentQuestion - 1),
            className: "text-gray-500 hover:text-gray-700 transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
          },
            '← Previous'
          ) : React.createElement('button', {
            onClick: () => setCurrentPage('intro'),
            className: "text-gray-500 hover:text-gray-700 transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
          },
            '← Back to Home'
          ),

          React.createElement('div', { className: "text-sm text-gray-400" },
            `${42 - currentQuestion - 1} Questions Remaining`
          )
        )
      )
    );
  };

  const renderResult = () => {
    let finalAnswers = answers;

    if (Object.keys(finalAnswers).length === 0) {
      try {
        const records = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('fruit_test_')) {
            const data = localStorage.getItem(key);
            if (data) {
              records.push(JSON.parse(data));
            }
          }
        }
        records.sort((a, b) => b.timestamp - a.timestamp);
        if (records.length > 0) {
          finalAnswers = records[0].answers;
        }
      } catch (error) {
        console.log('Failed to read historical answers:', error);
      }
    }

    const results = calculateResults(finalAnswers);
    const typeInfo = fruitTypes[results.fruitType];

    return React.createElement('div', { className: "min-h-screen fruit-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 fade-in" },

        React.createElement('div', {
          className: `bg-gradient-to-r ${typeInfo.color} rounded-2xl p-6 sm:p-8 mb-8 text-white bounce-in`
        },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-6xl sm:text-8xl mb-4" }, typeInfo.icon),
            React.createElement('h2', { className: "text-2xl sm:text-4xl font-bold mb-4" },
              `You are【${results.fruitType}】`
            ),
            React.createElement('p', { className: "text-lg sm:text-xl mb-6 opacity-90" },
              typeInfo.slogan
            ),

            React.createElement('div', { className: "bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm" },
              React.createElement('p', { className: "text-base sm:text-lg leading-relaxed" },
                typeInfo.description
              )
            )
          )
        ),

        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" },
          React.createElement('div', { className: "bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-6 border border-pink-200" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 text-center" }, 'Eight-Dimension Ability Radar Chart'),
            React.createElement('div', { className: "relative h-80" },
              React.createElement('canvas', { ref: chartRef })
            )
          ),

          React.createElement('div', { className: "space-y-4" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '⭐ Your Top Dimensions TOP3'),
            results.topDimensions.map(([dimName, score], index) => {
              const dimInfo = dimensions[dimName];
              const medals = ['🥇', '🥈', '🥉'];
              return React.createElement('div', {
                key: dimName,
                className: "bg-white border-2 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow",
                style: { borderColor: dimInfo.color }
              },
                React.createElement('div', { className: "flex items-center justify-between mb-2" },
                  React.createElement('div', { className: "flex items-center space-x-3" },
                    React.createElement('span', { className: "text-3xl" }, medals[index]),
                    React.createElement('div', null,
                      React.createElement('div', { className: "flex items-center space-x-2" },
                        React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                        React.createElement('span', { className: "font-bold text-lg" }, dimName)
                      ),
                      React.createElement('div', { className: "text-sm text-gray-600" }, dimInfo.description)
                    )
                  ),
                  React.createElement('div', { className: "text-right" },
                    React.createElement('div', {
                      className: "text-2xl font-bold",
                      style: { color: dimInfo.color }
                    },
                      score
                    ),
                    React.createElement('div', { className: "text-xs text-gray-500" }, '/ 5.0')
                  )
                ),
                React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
                  React.createElement('div', {
                    className: "h-2 rounded-full transition-all",
                    style: {
                      width: `${(parseFloat(score) / 5) * 100}%`,
                      backgroundColor: dimInfo.color
                    }
                  })
                )
              );
            })
          )
        ),

        React.createElement('div', { className: "bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-xl p-6 mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '🏷️ Your Personality Traits'),
          React.createElement('div', { className: "flex flex-wrap gap-3" },
            typeInfo.traits.map((trait, index) =>
              React.createElement('span', {
                key: index,
                className: "bg-white px-4 py-2 rounded-full text-sm border-2 border-pink-300 text-pink-700 font-semibold"
              },
                trait
              )
            )
          )
        ),

        React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '🎯 Suitable Career Directions'),
          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 gap-3" },
            typeInfo.careers.map((career, index) =>
              React.createElement('div', {
                key: index,
                className: "bg-white px-4 py-3 rounded-lg text-center border border-blue-200 hover:border-blue-400 transition-colors"
              },
                React.createElement('span', { className: "text-sm font-medium text-gray-700" }, career)
              )
            )
          )
        ),

        React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" },
          React.createElement('div', { className: "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '💕 Your Fruit Friends'),
            React.createElement('div', { className: "space-y-3" },
              typeInfo.goodMatch.map((fruit, index) =>
                React.createElement('div', {
                  key: index,
                  className: "bg-white p-3 rounded-lg border border-green-200 flex items-center space-x-3"
                },
                  React.createElement('span', { className: "text-3xl" }, fruitTypes[fruit]?.icon),
                  React.createElement('div', null,
                    React.createElement('div', { className: "font-semibold" }, fruit),
                    React.createElement('div', { className: "text-xs text-gray-500" }, fruitTypes[fruit]?.slogan)
                  )
                )
              )
            )
          ),

          React.createElement('div', { className: "bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '⚡ Be Careful With'),
            React.createElement('div', { className: "space-y-3" },
              typeInfo.badMatch.map((fruit, index) =>
                React.createElement('div', {
                  key: index,
                  className: "bg-white p-3 rounded-lg border border-red-200 flex items-center space-x-3"
                },
                  React.createElement('span', { className: "text-3xl" }, fruitTypes[fruit]?.icon),
                  React.createElement('div', null,
                    React.createElement('div', { className: "font-semibold" }, fruit),
                    React.createElement('div', { className: "text-xs text-gray-500" }, 'Large personality differences')
                  )
                )
              )
            )
          )
        ),

        React.createElement('div', { className: "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '💡 Advice For You'),
          React.createElement('div', { className: "space-y-3" },
            typeInfo.advice.map((tip, index) =>
              React.createElement('div', {
                key: index,
                className: "bg-white p-4 rounded-lg border border-purple-200"
              },
                React.createElement('p', { className: "text-gray-700 leading-relaxed" }, tip)
              )
            )
          )
        ),

        // AI upgrade prompt - adapted for fruit personality test
        React.createElement('div', {
          className: "upgrade-card",
          style: {
            background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 218, 185, 0.1) 100%)',
            border: '2px solid rgba(255, 182, 193, 0.3)',
            padding: '40px',
            borderRadius: '25px',
            textAlign: 'center',
            margin: '40px 0',
            position: 'relative',
            overflow: 'hidden'
          }
        },
          React.createElement('div', {
            className: "upgrade-badge",
            style: {
              display: 'inline-block',
              background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '20px'
            }
          }, '🍓 Upgrade to Get'),
          React.createElement('h2', {
            className: "upgrade-title",
            style: {
              fontSize: '28px',
              color: '#ff69b4',
              marginBottom: '15px',
              fontWeight: '700'
            }
          }, 'Unlock AI Deep Analysis Report'),
          React.createElement('p', {
            className: "upgrade-desc",
            style: {
              fontSize: '16px',
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.8'
            }
          },
            'Want to get more precise personalized analysis and professional improvement plans?',
            React.createElement('br'),
            'Upgrade to AI intelligent analysis version for deeper fruit personality insights'
          ),
          React.createElement('div', {
            className: "upgrade-features",
            style: {
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }
          },
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ff69b4',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Deep fruit personality pattern analysis'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ff69b4',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), '15+ customized improvement suggestions'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ff69b4',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Professional detailed report (20+ pages)'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ff69b4',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Fruit compatibility comparison analysis')
          ),
          React.createElement('button', {
            onClick: handlePremiumReport,
            className: "btn btn-primary",
            style: {
              padding: '18px 40px',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.4s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
              color: '#fff'
            }
          },
            React.createElement('span', {}, '🚀'),
            'Upgrade Now to Unlock'
          )
        ),

        React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center items-center" },
          React.createElement('button', {
            onClick: copyResultText,
            className: "w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          },
            '📋 Copy Results'
          ),

          React.createElement('button', {
            onClick: () => {
              setCurrentPage('intro');
              setCurrentQuestion(0);
              setAnswers({});
            },
            className: "w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          },
            '🔄 Retake Test'
          )
        ),

        React.createElement('div', { className: "mt-8 text-center text-sm text-gray-500" },
          React.createElement('p', null, '🍓 Test results have been automatically saved'),
          React.createElement('p', { className: "mt-1" }, 'Based on 8-dimension personality theory · For reference only · Explore more possibilities')
        )
      )
    );
  };

  switch (currentPage) {
    case 'intro':
      return renderIntro();
    case 'test':
      return renderTest();
    case 'result':
      return renderResult();
    default:
      return renderIntro();
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(FruitAssessment));