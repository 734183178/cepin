const { useState, useEffect, useRef } = React;

const AnimalPersonalityTest = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [titleClickTimes, setTitleClickTimes] = useState([]);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const chartRef = useRef(null);

  // 8 dimensions configuration
  const dimensions = {
    "Dominance": { name: "Dominance", icon: "👑", color: "#FF6B6B", description: "Leadership desire, control ability" },
    "Sociability": { name: "Sociability", icon: "🎭", color: "#4ECDC4", description: "Group orientation, social skills" },
    "Agility": { name: "Agility", icon: "⚡", color: "#FFE66D", description: "Reaction speed, flexibility" },
    "Strength": { name: "Strength", icon: "💪", color: "#95E1D3", description: "Stability, reliability" },
    "Compliance": { name: "Compliance", icon: "🤝", color: "#C7CEEA", description: "Loyalty, cooperation" },
    "Sensitivity": { name: "Sensitivity", icon: "🌸", color: "#FFB3BA", description: "Subtlety, emotional perception" },
    "Independence": { name: "Independence", icon: "🦅", color: "#A8DADC", description: "Autonomy, solo operation" },
    "Curiosity": { name: "Curiosity", icon: "🔍", color: "#FFAAA5", description: "Exploration desire, innovation" }
  };

  // 20 animal types
  const animalTypes = {
    "Lion": { icon: "🦁", dimensions: ["Dominance", "Strength", "Independence"], slogan: "Natural leader, commands respect", description: "You are a born leader with a powerful presence and natural control. You\'re accustomed to taking charge and naturally become the core of any team. Your existence symbolizes strength, making people instinctively want to follow you. Although you may sometimes appear dominant, this is precisely where your charm lies.", traits: ["Natural Leader", "Decisive", "Powerful Aura", "Strong Control"], careers: ["Manager", "Entrepreneur", "Decision Maker", "Team Leader"], color: "from-orange-400 to-red-500" },
    "Wolf": { icon: "🐺", dimensions: ["Dominance", "Sociability", "Strength"], slogan: "Solo fast, together far", description: "You possess both leadership qualities and understand the importance of teamwork. You're a natural team leader who can unite everyone's strength. You know how to find balance between independence and collaboration, which allows you to handle any environment with ease.", traits: ["Team Leader", "Strategic Thinking", "Loyal & Reliable", "Strong Community Awareness"], careers: ["Project Manager", "Team Leader", "Organizer", "Coordinator"], color: "from-gray-600 to-blue-700" },
    "Tiger": { icon: "🐯", dimensions: ["Dominance", "Independence", "Strength"], slogan: "Hidden strength, decisive strike", description: "You are a solitary strong individual with powerful personal capabilities and courage. You don't need to rely on others to achieve goals alone. Your presence is strong but not flamboyant - you only reveal your abilities at crucial moments, stunning everyone with your impact.", traits: ["Independent Strong", "Explosive Power", "Low-key & Calm", "Goal-oriented"], careers: ["Independent Consultant", "Expert", "Freelancer", "Solo Entrepreneur"], color: "from-orange-500 to-yellow-600" },
    "Hamster": { icon: "🐹", dimensions: ["Sensitivity", "Curiosity", "Agility"], slogan: "Store today, thrive tomorrow", description: "You are a diligent and adorable hoarding expert, always preparing for the future. You\'re sensitive to details and good at discovering life's small joys. Although small in size, your vitality and enthusiasm infect those around you.", traits: ["Forward-thinking", "Careful & Cautious", "Full of Energy", "Cute & Charming"], careers: ["Financial Planning", "Detail-oriented Work", "Assistant", "Operations Specialist"], color: "from-yellow-300 to-orange-400" },
    "Rabbit": { icon: "🐰", dimensions: ["Sensitivity", "Agility", "Compliance"], slogan: "Gentle appearance, agile heart", description: "You are gentle and kind, with quick reactions. You can always perceive changes around you at the first moment and make quick adjustments. Your gentleness is not weakness, but a survival wisdom. You survive gracefully in the world in your own way.", traits: ["Gentle & Considerate", "Quick Reacting", "Highly Adaptable", "Empathetic"], careers: ["Customer Service", "Caregiving", "Education", "Service Industry"], color: "from-pink-300 to-purple-400" },
    "Koala": { icon: "🐨", dimensions: ["Compliance", "Sensitivity", "Independence"], slogan: "Slow and steady wins the race", description: "You represent a Zen lifestyle, pursuing inner peace. You're not anxious or rushed, living life at your own pace. Although slow in action, you always make the right choices at critical moments. Slow living is also an attitude.", traits: ["Composed & Calm", "Living in the Moment", "Zen Mindset", "Inner Peace"], careers: ["Designer", "Artist", "Freelancer", "Slow-paced Work"], color: "from-gray-400 to-green-500" },
    "Hedgehog": { icon: "🦔", dimensions: ["Sensitivity", "Independence", "Compliance"], slogan: "Prickly outside, soft inside", description: "You appear defensive on the outside but are soft-hearted. You use your spines to protect yourself, but show a gentle side to those you trust. You need time to build trust, but once established, you become the most loyal friend.", traits: ["Tough outside, soft inside", "Self-protective", "Cautious & Sensitive", "Loyal & Deep"], careers: ["Psychological Counseling", "Writing", "Research", "Independent Work"], color: "from-brown-400 to-yellow-600" },
    "Fox": { icon: "🦊", dimensions: ["Agility", "Curiosity", "Independence"], slogan: "Win with wisdom, adapt to any challenge", description: "You are witty, flexible, and good at adapting. Your mind works quickly, always finding clever ways to solve problems. You prefer to achieve goals with wisdom rather than brute force, which allows you to handle various situations with ease.", traits: ["Witty & Flexible", "Strong Adaptability", "Strategic Thinking", "Independent Thinker"], careers: ["Strategic Planning", "Consulting", "Sales", "Public Relations"], color: "from-orange-400 to-red-500" },
    "Cat": { icon: "🐱", dimensions: ["Independence", "Sensitivity", "Curiosity"], slogan: "Nine lives, no fears", description: "You are elegant and independent, living life according to your own wishes. You don't need others' approval, only doing what you want to do. Your independence and mystery fascinate people, but you only open your heart to a few.", traits: ["Elegant & Independent", "Mysterious", "Selective Socializing", "Self-centered"], careers: ["Freelancer", "Artistic Creation", "Design", "Independent Work"], color: "from-purple-400 to-pink-500" },
    "Raccoon": { icon: "🦝", dimensions: ["Curiosity", "Agility", "Sociability"], slogan: "Everything is worth studying", description: "You are full of curiosity about the world and love to explore the unknown. Your hands are skillful, your mind is sharp, and you're always studying new things. Your curiosity and exploratory spirit make life full of fun.", traits: ["Curiosity-driven", "Love to Explore", "Clever & Skillful", "Quick Learner"], careers: ["Researcher", "Product Manager", "Innovation Roles", "Explorer"], color: "from-gray-500 to-orange-400" },
    "Squirrel": { icon: "🐿️", dimensions: ["Agility", "Curiosity", "Sociability"], slogan: "Non-stop little motor", description: "You are lively and energetic, always full of stamina. You\'re always in action, never able to stay still. Your vitality and enthusiasm infect those around you, filling life with laughter and surprises.", traits: ["Full of Energy", "Can't Stay Still", "Enthusiastic & Cheerful", "Socially Active"], careers: ["Event Planning", "Sales", "Operations", "Media"], color: "from-orange-400 to-yellow-500" },
    "Bear": { icon: "🐻", dimensions: ["Strength", "Independence", "Compliance"], slogan: "Clumsy exterior, steady heart", description: "You are honest and reliable, everyone's protector. You may appear clumsy, but you're actually strong inside. You protect those you care about in your own way, being a trustworthy mountain to lean on.", traits: ["Honest & Reliable", "Powerful Strength", "Protective", "Gentle & Steady"], careers: ["Protective Services", "Support Services", "Technical Positions", "Service Industry"], color: "from-brown-500 to-yellow-700" },
    "Ox": { icon: "🐂", dimensions: ["Strength", "Compliance", "Independence"], slogan: "One step at a time", description: "You are down-to-earth and reliable, the cornerstone of your team. You don't pursue speed, but every step is solid. Your stability and reliability reassure people, making you a partner who can be entrusted with important responsibilities.", traits: ["Steady & Stable", "Hardworking", "Reliable & Persistent", "Silent Contributor"], careers: ["Executive Positions", "Technical Work", "Manufacturing", "Logistics Support"], color: "from-brown-600 to-green-700" },
    "Hippo": { icon: "🦛", dimensions: ["Strength", "Sociability", "Compliance"], slogan: "Usually chill, deadly when angry", description: "You are gentle and honest, but have your bottom line. You\'re usually easy-going, but once provoked, your explosive power is astonishing. This contrast makes people both like and respect you.", traits: ["Gentle with Boundaries", "Explosive Power", "Seemingly Gentle", "Actually Powerful"], careers: ["Customer Service", "Management Positions", "Coordination Work", "Support Roles"], color: "from-purple-400 to-blue-500" },
    "Dog": { icon: "🐶", dimensions: ["Compliance", "Sociability", "Sensitivity"], slogan: "Your happiness is my mission", description: "You are loyal and reliable, the most trustworthy partner. You give your all to friends, always appearing first when needed. Your loyalty and enthusiasm are touching.", traits: ["Loyal & Reliable", "Enthusiastic & Friendly", "Empathetic", "Selfless Dedication"], careers: ["Service Industry", "Assistant", "Support Positions", "Team Collaboration"], color: "from-yellow-400 to-orange-500" },
    "Dolphin": { icon: "🐬", dimensions: ["Sociability", "Curiosity", "Agility"], slogan: "Teamwork is the power source", description: "You are smart and friendly, a star in social situations. You understand the power of teamwork and are good at coordinating various relationships. Your wisdom and affinity make you stand out from the crowd.", traits: ["Smart & Social", "Team Spirit", "Strong Coordination", "Popular"], careers: ["Public Relations", "Coordination", "Sales", "Team Management"], color: "from-blue-400 to-cyan-500" },
    "Penguin": { icon: "🐧", dimensions: ["Sociability", "Compliance", "Strength"], slogan: "Happy when we rock together", description: "You enjoy group life and find belonging in teams. You're cute and honest, always bringing joy to people. You understand the importance of sticking together and are an indispensable member of the team.", traits: ["Strong Team Awareness", "Cute & Friendly", "Highly Adaptable", "Collectivist"], careers: ["Team Collaboration", "Group Projects", "Organizational Work", "Coordination Roles"], color: "from-gray-700 to-blue-400" },
    "Owl": { icon: "🦉", dimensions: ["Independence", "Curiosity", "Sensitivity"], slogan: "Sleep by day, work by night", description: "You are a symbol of wisdom, liking to think at night. You are independent and deep, with your own life rhythm. Your insight and wisdom allow you to see through the essence of things.", traits: ["Wise & Deep", "Night Owl", "Strong Insight", "Independent Thinker"], careers: ["Research", "Writing", "Consulting", "Creative Work"], color: "from-purple-700 to-gray-600" },
    "Panda": { icon: "🐼", dimensions: ["Compliance", "Sensitivity", "Independence"], slogan: "Eating bamboo is the biggest career", description: "You are a Zen national treasure, pursuing a simple and happy life. You don't compete or grab, living life at your own pace. Your cuteness and calmness make people envious; you live the way others aspire to.", traits: ["Zen & Cute", "Content with Life", "Calm & Composed", "Adorable"], careers: ["Creative Work", "Design", "Freelancer", "Slow-paced Positions"], color: "from-gray-800 to-white" },
    "Kangaroo": { icon: "🦘", dimensions: ["Agility", "Strength", "Independence"], slogan: "Jump forward, never look back", description: "You are full of vitality and courage, always moving forward. Your jumping ability is amazing, always advancing toward your goals. You don't look back at the past, only focusing on the future - this positive attitude lets you continuously break through.", traits: ["Positive & Forward", "Explosive Power", "Fearless of Challenges", "Goal-oriented"], careers: ["Sales", "Entrepreneurship", "Sports", "Challenging Work"], color: "from-orange-500 to-brown-600" }
  };

  // 42 questions
  const questions = [
    { id: 1, text: "🎮 When playing team games, you prefer to:", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: 'Lead the team: "Follow me, let\'s charge!"' },
      { value: 3, label: 'B', text: 'Support as DPS: "You lead, I\'ll cover you"' },
      { value: 2, label: 'C', text: 'Go with the flow: "Whatever, you guys play, I\'ll chill"' },
      { value: 1, label: 'D', text: 'Play solo: "Leave me alone, I\'ll play by myself"' }
    ]},
    { id: 2, text: "🎂 Friend's birthday party, who plans it?", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: 'Me! From dinner reservations to games, I\'ll arrange everything' },
      { value: 4, label: 'B', text: 'I\'ll suggest, we decide together' },
      { value: 2, label: 'C', text: 'You guys decide, I\'ll just show up' },
      { value: 1, label: 'D', text: 'Let\'s just skip it and go out to eat' }
    ]},
    { id: 3, text: "🚗 Lost during a road trip, you would:", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: '"Let me!" Grab the GPS and figure it out myself' },
      { value: 3, label: 'B', text: '"Everyone check which way looks better" Decide together' },
      { value: 2, label: 'C', text: '"Experienced driver, you decide" Completely follow' },
      { value: 1, label: 'D', text: '"Lost is lost" Whatever happens, happens' }
    ]},
    { id: 4, text: "🍜 When ordering food delivery together:", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: '"Listen to me, let\'s all order from one place, it\'s easier"' },
      { value: 4, label: 'B', text: '"Everyone order what they want, I\'ll place the group order"' },
      { value: 2, label: 'C', text: '"I\'ll order whatever you guys are having"' },
      { value: 1, label: 'D', text: '"I won\'t join, I\'ll order separately"' }
    ]},
    { id: 5, text: "🎬 When choosing a movie:", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: '"This one!" Make the final decision directly' },
      { value: 3, label: 'B', text: '"Let\'s vote" Democratic decision-making' },
      { value: 2, label: 'C', text: '"You guys pick, I\'m easy" Go with the flow' },
      { value: 1, label: 'D', text: '"I\'m not going, you guys watch" Leave the chat' }
    ]},
    { id: 6, text: "🏝️ Desert island survival, team needs a leader:", dimension: "Dominance", options: [
      { value: 5, label: 'A', text: '"I have ideas! Everyone follow my command"' },
      { value: 4, label: 'B', text: '"Let\'s divide the work and stick to our roles"' },
      { value: 2, label: 'C', text: '"Whatever you say goes"' },
      { value: 1, label: 'D', text: '"I\'ll go find a cave to hide in first"' }
    ]},
    { id: 7, text: "🎉 Meeting strangers in an elevator:", dimension: "Sociability", options: [
      { value: 5, label: 'A', text: '"You live here too?" Start conversation' },
      { value: 3, label: 'B', text: 'Awkward smile, pretend to look at phone' },
      { value: 2, label: 'C', text: 'Expressionless, stare at floor numbers' },
      { value: 1, label: 'D', text: 'Silently move to corner, reduce presence' }
    ]},
    { id: 8, text: "🍕 Company team building activity:", dimension: "Sociability", options: [
      { value: 5, label: 'A', text: '"I\'ll organize the games!" Life of the party' },
      { value: 4, label: 'B', text: 'Participate in interactions, vibe setter' },
      { value: 2, label: 'C', text: 'Attend politely, sit quietly' },
      { value: 1, label: 'D', text: '"Suddenly don\'t feel well" Ask to go home' }
    ]},
    { id: 9, text: "📱 Someone @everyone in the group chat:", dimension: "Sociability", options: [
      { value: 5, label: 'A', text: 'First to jump in and reply' },
      { value: 3, label: 'B', text: 'Wait and see before deciding whether to reply' },
      { value: 2, label: 'C', text: 'Show up after everyone else has spoken' },
      { value: 1, label: 'D', text: 'Read but ignore, pretend didn\'t see' }
    ]},
    { id: 10, text: "🎤 In the KTV private room:", dimension: "Sociability", options: [
      { value: 5, label: 'A', text: '"I\'ll go first!" Grab the mic position' },
      { value: 4, label: 'B', text: 'Sing a few favorite songs' },
      { value: 2, label: 'C', text: 'Only sing when specifically asked' },
      { value: 1, label: 'D', text: '"I don\'t sing, I\'ll clap for you guys"' }
    ]},
    { id: 11, text: "🏖️ Vacation ends, your social media:", dimension: "Sociability", options: [
      { value: 5, label: 'A', text: 'Nine beautiful photos with long captions, document everything' },
      { value: 3, label: 'B', text: 'Just post a few selected photos' },
      { value: 2, label: 'C', text: 'Share others\' posts, too lazy to post my own' },
      { value: 1, label: 'D', text: 'Don\'t post anything, stay mysterious' }
    ]},
    { id: 12, text: "🔥 Hot pot dishes arrive, you:", dimension: "Agility", options: [
      { value: 5, label: 'A', text: '"I\'ll do it!" Quick to grab food, fastest hands' },
      { value: 3, label: 'B', text: 'Take your time, grab steadily' },
      { value: 2, label: 'C', text: 'Wait until food is cooked before slowly scooping' },
      { value: 1, label: 'D', text: '"You guys get some for me" Wait to be fed' }
    ]},
    { id: 13, text: "🎮 When playing reaction games:", dimension: "Agility", options: [
      { value: 5, label: 'A', text: 'Gaming god! Non-stop combos' },
      { value: 3, label: 'B', text: 'Pretty good, occasional mistakes' },
      { value: 2, label: 'C', text: 'Clumsy hands, often press wrong buttons' },
      { value: 1, label: 'D', text: '"I don\'t play this, I\'ll get sick"' }
    ]},
    { id: 14, text: "🚶 Walking and suddenly it starts raining:", dimension: "Agility", options: [
      { value: 5, label: 'A', text: 'Immediately sprint to find shelter' },
      { value: 3, label: 'B', text: 'Speed up pace, walk calmly' },
      { value: 2, label: 'C', text: 'Walk slowly, going to get wet anyway' },
      { value: 1, label: 'D', text: '"Whatever, give up" Stand in the rain' }
    ]},
    { id: 15, text: "🧠 Speed of learning new things:", dimension: "Agility", options: [
      { value: 5, label: 'A', text: 'Get it at first glance, master immediately' },
      { value: 4, label: 'B', text: 'Can master after watching twice' },
      { value: 2, label: 'C', text: 'Need repeated practice to learn' },
      { value: 1, label: 'D', text: '"I can\'t learn this, giving up"' }
    ]},
    { id: 16, text: "🎯 Speed of making decisions:", dimension: "Agility", options: [
      { value: 5, label: 'A', text: 'Instant choice! No hesitation' },
      { value: 4, label: 'B', text: 'Think for a moment then decide' },
      { value: 2, label: 'C', text: 'Need to struggle for a long time' },
      { value: 1, label: 'D', text: 'Terminal case of decision paralysis' }
    ]},
    { id: 17, text: "🏋️ Someone bumps into you:", dimension: "Strength", options: [
      { value: 5, label: 'A', text: '"Are you okay?" Very calm' },
      { value: 4, label: 'B', text: 'Stagger but maintain balance' },
      { value: 2, label: 'C', text: 'Almost fall, get flustered' },
      { value: 1, label: 'D', text: 'Fall directly, need help getting up' }
    ]},
    { id: 18, text: "💼 High work/study pressure:", dimension: "Strength", options: [
      { value: 5, label: 'A', text: '"No big deal!" Keep pushing through' },
      { value: 4, label: 'B', text: 'Grit my teeth and bear it' },
      { value: 2, label: 'C', text: 'A bit overwhelmed, want to cry' },
      { value: 1, label: 'D', text: 'Already given up, just chilling' }
    ]},
    { id: 19, text: "🌪️ Sudden major life change:", dimension: "Strength", options: [
      { value: 5, label: 'A', text: 'Analyze calmly, respond quickly' },
      { value: 3, label: 'B', text: 'Panic briefly but adjust' },
      { value: 2, label: 'C', text: 'Take long time to recover' },
      { value: 1, label: 'D', text: '"It\'s over!" Complete breakdown' }
    ]},
    { id: 20, text: "🎢 Facing uncertainty:", dimension: "Strength", options: [
      { value: 5, label: 'A', text: '"Bring it on!" Face challenges head-on' },
      { value: 3, label: 'B', text: 'A bit nervous but can accept' },
      { value: 2, label: 'C', text: 'Very anxious, dislike change' },
      { value: 1, label: 'D', text: 'Panicked, need certainty' }
    ]},
    { id: 21, text: "⚓ What vibe do you give people:", dimension: "Strength", options: [
      { value: 5, label: 'A', text: 'Rock! People feel secure with you' },
      { value: 4, label: 'B', text: 'Reliable, people can count on you' },
      { value: 2, label: 'C', text: 'Nice, but not great in crises' },
      { value: 1, label: 'D', text: '"Clay Buddha crossing river - can\'t even save self"' }
    ]},
    { id: 22, text: "👔 Boss/teacher assigns tasks:", dimension: "Compliance", options: [
      { value: 1, label: 'A', text: '"Why? I think this is unreasonable" Question' },
      { value: 2, label: 'B', text: '"I have an idea..." Suggest alternatives' },
      { value: 5, label: 'C', text: '"Got it" Execute immediately' },
      { value: 3, label: 'D', text: '"Yeah yeah, I know" Go through motions' }
    ]},
    { id: 23, text: "🎲 Don\'t like game rules:", dimension: "Compliance", options: [
      { value: 1, label: 'A', text: '"Not playing! These rules are wrong"' },
      { value: 2, label: 'B', text: '"Can we change the rules?" Suggest modifications' },
      { value: 5, label: 'C', text: '"Fine" Reluctantly accept' },
      { value: 1, label: 'D', text: '"Never mind" Just quit' }
    ]},
    { id: 24, text: "🍔 Friends invite you to food you dislike:", dimension: "Compliance", options: [
      { value: 1, label: 'A', text: '"Change place! I don\'t eat this" Strong refusal' },
      { value: 2, label: 'B', text: '"How about we eat XX instead?" Suggest alternatives' },
      { value: 5, label: 'C', text: '"Fine, whatever you want" Accommodate others' },
      { value: 1, label: 'D', text: '"You guys go, I\'m not coming"' }
    ]},
    { id: 25, text: "👥 Team opinion differs from yours:", dimension: "Compliance", options: [
      { value: 1, label: 'A', text: '"I think it\'s wrong" Insist on my view' },
      { value: 2, label: 'B', text: '"Let me explain" Try to persuade' },
      { value: 5, label: 'C', text: '"Fine, let\'s go with your idea" Compromise' },
      { value: 2, label: 'D', text: '"I don\'t care, you decide" Exit discussion' }
    ]},
    { id: 26, text: "🎯 Assigned work you dislike:", dimension: "Compliance", options: [
      { value: 1, label: 'A', text: '"Why me?" Clear opposition' },
      { value: 2, label: 'B', text: '"Can someone else do it?" Try to avoid' },
      { value: 5, label: 'C', text: '"Okay" Accept though unhappy' },
      { value: 4, label: 'D', text: 'Do it resentfully and hold grudge' }
    ]},
    { id: 27, text: "😢 Watching emotional movies:", dimension: "Sensitivity", options: [
      { value: 5, label: 'A', text: 'Tears streaming down, can\'t stop' },
      { value: 4, label: 'B', text: 'Eyes water up, but hold back' },
      { value: 2, label: 'C', text: 'Moved, but not to tears' },
      { value: 1, label: 'D', text: '"What\'s there to cry about?"' }
    ]},
    { id: 28, text: "🎵 Hearing a particular song:", dimension: "Sensitivity", options: [
      { value: 5, label: 'A', text: 'Instantly recall memories, emotions full' },
      { value: 4, label: 'B', text: 'Somewhat touched, memories surface' },
      { value: 2, label: 'C', text: '"Hmm this song is nice"' },
      { value: 1, label: 'D', text: 'No feelings, just passing through' }
    ]},
    { id: 29, text: "💬 Friend's tone seems off:", dimension: "Sensitivity", options: [
      { value: 5, label: 'A', text: 'Immediately notice "What\'s wrong?"' },
      { value: 4, label: 'B', text: 'Feel something\'s odd, ask privately' },
      { value: 2, label: 'C', text: 'Seems off? Never mind' },
      { value: 1, label: 'D', text: 'Didn\'t notice at all' }
    ]},
    { id: 30, text: "🌅 Seeing beautiful scenery:", dimension: "Sensitivity", options: [
      { value: 5, label: 'A', text: '"So beautiful!" Moved to tears' },
      { value: 4, label: 'B', text: 'Take photos, feel great' },
      { value: 2, label: 'C', text: '"Hmm, very nice"' },
      { value: 1, label: 'D', text: '"That\'s it?" No feelings' }
    ]},
    { id: 31, text: "😤 When misunderstood:", dimension: "Sensitivity", options: [
      { value: 5, label: 'A', text: 'Very hurt, heartbroken' },
      { value: 3, label: 'B', text: 'A bit upset, but can explain' },
      { value: 2, label: 'C', text: '"Forget it, don\'t care"' },
      { value: 1, label: 'D', text: '"Misunderstood? Whatever"' }
    ]},
    { id: 32, text: "🍜 Eating alone:", dimension: "Independence", options: [
      { value: 5, label: 'A', text: 'Completely OK! Very comfortable' },
      { value: 4, label: 'B', text: 'Pretty good, used to it' },
      { value: 2, label: 'C', text: 'A bit lonely, but can accept' },
      { value: 1, label: 'D', text: 'No! Must have company' }
    ]},
    { id: 33, text: "✈️ Traveling alone:", dimension: "Independence", options: [
      { value: 5, label: 'A', text: '"Love solo!" Free and easy' },
      { value: 3, label: 'B', text: 'Okay, but better with someone' },
      { value: 2, label: 'C', text: 'Not used to it, lack security' },
      { value: 1, label: 'D', text: 'Dare not, must team up' }
    ]},
    { id: 34, text: "🏠 Weekend alone time:", dimension: "Independence", options: [
      { value: 5, label: 'A', text: 'Recharging time! Perfect!' },
      { value: 4, label: 'B', text: 'Pretty good, can do my own thing' },
      { value: 2, label: 'C', text: 'A bit boring, scroll phone' },
      { value: 1, label: 'D', text: 'Torture! Quick to invite someone out' }
    ]},
    { id: 35, text: "💭 When making decisions:", dimension: "Independence", options: [
      { value: 5, label: 'A', text: 'Make my own decisions, don\'t ask others' },
      { value: 4, label: 'B', text: 'Think clearly myself, occasionally ask opinions' },
      { value: 2, label: 'C', text: 'Like to hear what others say' },
      { value: 1, label: 'D', text: 'Need someone to help me decide' }
    ]},
    { id: 36, text: "🆘 When facing difficulties:", dimension: "Independence", options: [
      { value: 5, label: 'A', text: 'Figure it out myself' },
      { value: 3, label: 'B', text: 'Try first, ask for help if stuck' },
      { value: 2, label: 'C', text: 'Immediately find someone to help' },
      { value: 1, label: 'D', text: '"Help!" Call for help immediately' }
    ]},
    { id: 37, text: "🎁 Receiving a mysterious package:", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: 'Open immediately! Can\'t wait' },
      { value: 3, label: 'B', text: 'Guess what it is before opening' },
      { value: 2, label: 'C', text: 'Open later, no hurry' },
      { value: 1, label: 'D', text: '"Oh" Put aside, might forget to open' }
    ]},
    { id: 38, text: "🗺️ Seeing fork in road while traveling:", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: '"Let\'s go see!" Explore the unknown' },
      { value: 3, label: 'B', text: 'Check map then decide' },
      { value: 2, label: 'C', text: 'Forget it, take the main road' },
      { value: 1, label: 'D', text: 'Getting lost is unacceptable, refuse risks' }
    ]},
    { id: 39, text: "📱 New app recommendation:", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: 'Download and try immediately' },
      { value: 3, label: 'B', text: 'Check reviews before deciding' },
      { value: 2, label: 'C', text: 'Wait and see, not interested' },
      { value: 1, label: 'D', text: 'Too lazy to bother, won\'t download' }
    ]},
    { id: 40, text: "🍱 Dish you haven't tried on menu:", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: '"Order this!" Try new flavor' },
      { value: 3, label: 'B', text: 'Ask waiter what it\'s like' },
      { value: 2, label: 'C', text: 'Better to order familiar dishes' },
      { value: 1, label: 'D', text: 'Stick to the same few dishes' }
    ]},
    { id: 41, text: "🔬 Encountering something unknown:", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: 'Search immediately and research thoroughly' },
      { value: 3, label: 'B', text: 'Look it up when have time' },
      { value: 2, label: 'C', text: 'Know what I know, don\'t care about what I don\'t' },
      { value: 1, label: 'D', text: 'Too lazy to care, doesn\'t affect me anyway' }
    ]},
    { id: 42, text: "🎪 Friend says \"I found a secret base\":", dimension: "Curiosity", options: [
      { value: 5, label: 'A', text: '"Where? Take me!" Excited' },
      { value: 4, label: 'B', text: '"What base?" Curious inquiry' },
      { value: 2, label: 'C', text: '"Oh I see" Mild response' },
      { value: 1, label: 'D', text: '"What\'s it got to do with me" No interest' }
    ]}
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const handleTitleClick = () => {
    const now = Date.now();
    const newClickTimes = [...titleClickTimes, now].filter(time => now - time <= 10000);
    setTitleClickTimes(newClickTimes);
    setTitleClickCount(newClickTimes.length);
    if (newClickTimes.length >= 5) {
      setShowQuickTest(true);
    }
  };

  const handleQuickTest = () => {
    if (!confirm('Are you sure you want quick test? All options will be randomly selected and results generated.')) {
      return;
    }
    const quickAnswers = {};
    questions.forEach(q => {
      const randomOption = q.options[Math.floor(Math.random() * q.options.length)];
      quickAnswers[q.id] = randomOption.value;
    });
    setAnswers(quickAnswers);
    saveResult(quickAnswers);
    setCurrentPage('result');
    setShowQuickTest(false);
    setTitleClickTimes([]);
    setTitleClickCount(0);
  };

  const loadHistory = () => {
    try {
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('animal_test_')) {
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
      localStorage.setItem(`animal_test_${Date.now()}`, JSON.stringify(record));
      loadHistory();
    } catch (error) {
      console.log('Save failed:', error);
    }
  };

  const handlePremiumReport = () => {
    const results = calculateResults();
    const animalInfo = animalTypes[results.animalType];

    // Create premium report modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Premium Assessment Report</h3>
          <p class="text-gray-600">Unlock your complete personality analysis</p>
        </div>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <h4 class="font-bold text-gray-800 mb-3">What you'll get:</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li class="flex items-start"><span class="mr-2">✓</span> 15-page detailed personality report</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Career development recommendations</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Relationship compatibility insights</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Emotional intelligence improvement plan</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Celebrity personality matches</li>
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
      alert('Payment integration coming soon! Your premium report will include detailed analysis, career recommendations, and personalized growth strategies.');
      modal.remove();
    };
  };

  const calculateResults = (finalAnswers = answers) => {
    const dimensionScores = {};
    Object.keys(dimensions).forEach(dim => {
      dimensionScores[dim] = 0;
    });
    questions.forEach(q => {
      const answer = finalAnswers[q.id];
      if (answer) {
        const selectedOption = q.options.find(opt => opt.value === answer);
        if (selectedOption) {
          dimensionScores[q.dimension] += selectedOption.value;
        }
      }
    });
    const dimensionCounts = {};
    questions.forEach(q => {
      dimensionCounts[q.dimension] = (dimensionCounts[q.dimension] || 0) + 1;
    });
    const dimensionAvgScores = {};
    Object.keys(dimensions).forEach(dim => {
      const count = dimensionCounts[dim] || 1;
      dimensionAvgScores[dim] = (dimensionScores[dim] / count).toFixed(1);
    });
    const sortedDimensions = Object.entries(dimensionAvgScores)
      .sort(([,a], [,b]) => parseFloat(b) - parseFloat(a));
    const topDimensions = sortedDimensions.slice(0, 3);
    const animalType = determineAnimalType(dimensionAvgScores, sortedDimensions);
    return {
      dimensionScores,
      dimensionAvgScores,
      sortedDimensions,
      topDimensions,
      animalType
    };
  };

  const determineAnimalType = (avgScores, sortedDims) => {
    const top3Names = sortedDims.slice(0, 3).map(([name]) => name);
    const dimScores = {};
    sortedDims.forEach(([dim, score]) => {
      dimScores[dim] = parseFloat(score);
    });
    let bestMatch = null;
    let bestScore = -1;
    Object.entries(animalTypes).forEach(([animalName, animalInfo]) => {
      if (animalInfo.dimensions && animalInfo.dimensions.length > 0) {
        let matchScore = 0;
        animalInfo.dimensions.forEach(dim => {
          if (dimScores[dim]) {
            matchScore += dimScores[dim];
          }
        });
        matchScore = matchScore / animalInfo.dimensions.length;
        const matchCount = animalInfo.dimensions.filter(dim =>
          top3Names.includes(dim)
        ).length;
        matchScore += matchCount * 0.5;
        if (matchScore > bestScore) {
          bestScore = matchScore;
          bestMatch = animalName;
        }
      }
    });
    if (!bestMatch) {
      const topDim = top3Names[0];
      const dimToAnimal = {
        "Dominance": "Lion",
        "Sociability": "Dog",
        "Agility": "Fox",
        "Strength": "Bear",
        "Compliance": "Dog",
        "Sensitivity": "Cat",
        "Independence": "Cat",
        "Curiosity": "Raccoon"
      };
      bestMatch = dimToAnimal[topDim] || "Cat";
    }
    return bestMatch;
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
              borderColor: 'rgba(139, 92, 246, 1)',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              pointBackgroundColor: dimensionNames.map(dim => dimensions[dim].color),
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: dimensionNames.map(dim => dimensions[dim].color),
              pointRadius: 6,
              pointHoverRadius: 8,
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                max: 5,
                min: 0,
                ticks: {
                  stepSize: 1,
                  font: { size: 12 },
                  backdropColor: 'transparent'
                },
                pointLabels: {
                  font: { size: 13, weight: 'bold' }
                },
                grid: { color: 'rgba(0, 0, 0, 0.1)' },
                angleLines: { color: 'rgba(0, 0, 0, 0.1)' }
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 }
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
    const animalInfo = animalTypes[results.animalType];
    const text = `🎉 My Animal Personality Test Results Are Here!

I am a【${results.animalType}]${animalInfo.icon}
"${animalInfo.slogan}"

✨ Personality Traits:
${animalInfo.traits.map((trait, index) => `${index + 1}. ${trait}`).join('\n')}

🎯 My Top Dimensions:
${results.topDimensions.map(([dim, score], index) =>
  `${index + 1}. ${dimensions[dim].icon} ${dim} ${score}points`
).join('\n')}

💼 Suitable Career Paths: ${animalInfo.careers.join(', ')}

#AnimalPersonalityTest #SelfDiscovery #FunQuiz`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard! Go share it 🎉');
    }).catch(() => {
      alert('Copy failed, please copy manually');
    });
  };

  const renderIntro = () => {
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-3 sm:p-6" },

      // HERO SECTION - Main hero section
      React.createElement('div', { className: "max-w-6xl mx-auto mb-8" },
        React.createElement('div', { className: "text-center py-8 sm:py-16" },
          React.createElement('div', { className: "text-6xl sm:text-8xl mb-4 animate-bounce" }, '🦁'),
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 cursor-pointer hover:opacity-80 transition-opacity",
            title: "Click title 5 times to activate quick test!"
          },
            React.createElement('span', { className: "block mb-2" }, '🌟 Which Animal Matches Your Personality?'),
            React.createElement('span', { className: "text-xl sm:text-2xl lg:text-3xl font-light text-orange-500" }, 'Take our FREE scientific personality test')
          ),
          React.createElement('p', { className: "text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto" },
            'Based on 8 psychological dimensions ✓ 50,000+ users tested ✓ Instant detailed results ✓ No signup required'
          ),
          React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" },
            React.createElement('button', {
              onClick: handleStartTest,
              className: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg sm:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            }, '🚀 START TEST - IT\'S FREE!'),
            showQuickTest && React.createElement('button', {
              onClick: handleQuickTest,
              className: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse"
            }, '⚡ Quick Test Mode')
          ),
          React.createElement('div', { className: "flex justify-center gap-6 sm:gap-8 text-gray-600 text-sm sm:text-base" },
            React.createElement('div', { className: "flex items-center gap-2" },
              React.createElement('span', { className: "text-xl" }, '⭐'),
              React.createElement('span', {}, '50,000+ Users')
            ),
            React.createElement('div', { className: "flex items-center gap-2" },
              React.createElement('span', { className: "text-xl" }, '⏱️'),
              React.createElement('span', {}, '5 Minutes')
            ),
            React.createElement('div', { className: "flex items-center gap-2" },
              React.createElement('span', { className: "text-xl" }, '📊'),
              React.createElement('span', {}, '8 Dimensions')
            )
          )
        )
      ),

      // WHAT IS THIS SECTION
      React.createElement('div', { className: "max-w-6xl mx-auto mb-12" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12" },
          React.createElement('div', { className: "text-center mb-8" },
            React.createElement('h2', { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" },
              React.createElement('span', { className: "mr-2" }, '🤔'),
              'What Is This Test?'
            ),
            React.createElement('div', { className: "w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mb-6" })
          ),
          React.createElement('div', { className: "grid md:grid-cols-2 gap-8 items-center" },
            React.createElement('div', { className: "space-y-4" },
              React.createElement('p', { className: "text-lg text-gray-700 leading-relaxed" },
                'Ever wondered why some people are natural leaders like 🦁 lions, while others are loyal companions like 🐶 dogs?'
              ),
              React.createElement('p', { className: "text-lg text-gray-700 leading-relaxed" },
                'Our Animal Personality Test uses proven psychology to match your unique traits with 20 different animal types. It\'s like having a personality mirror that shows you your true nature - no psychology degree needed!'
              ),
              React.createElement('div', { className: "bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200" },
                React.createElement('h3', { className: "font-bold text-purple-800 mb-3" }, '✨ Why It Works:'),
                React.createElement('ul', { className: "space-y-2 text-purple-700" },
                  React.createElement('li', { className: "flex items-start" },
                    React.createElement('span', { className: "mr-2 text-purple-500" }, '🧠'),
                    'Based on established psychological research'
                  ),
                  React.createElement('li', { className: "flex items-start" },
                    React.createElement('span', { className: "mr-2 text-purple-500" }, '🎯'),
                    '8 scientifically-validated personality dimensions'
                  ),
                  React.createElement('li', { className: "flex items-start" },
                    React.createElement('span', { className: "mr-2 text-purple-500" }, '🦁'),
                    '20 animal archetypes covering all personality types'
                  )
                )
              )
            ),
            React.createElement('div', { className: "grid grid-cols-3 gap-4" },
              ['🦁', '🐺', '🦊', '🐱', '🦉', '🐬', '🐼', '🐶', '🦘'].map((animal, index) =>
                React.createElement('div', {
                  key: index,
                  className: "bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-4 text-center hover:shadow-lg transition-all transform hover:scale-105"
                },
                  React.createElement('div', { className: "text-3xl sm:text-4xl mb-2" }, animal),
                  React.createElement('div', { className: "text-xs sm:text-sm text-gray-600" }, `Type ${index + 1}`)
                )
              )
            )
          )
        )
      ),

      // WHY CHOOSE US SECTION
      React.createElement('div', { className: "max-w-6xl mx-auto mb-12" },
        React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12" },
          React.createElement('div', { className: "text-center mb-8" },
            React.createElement('h2', { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" },
              React.createElement('span', { className: "mr-2" }, '🎯'),
              'Why Trust Our Test?'
            ),
            React.createElement('div', { className: "w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" })
          ),
          React.createElement('div', { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" },
            [
              {
                icon: '🔬',
                title: 'Scientifically Backed',
                description: 'Based on established 8-dimension personality theory used by professionals worldwide'
              },
              {
                icon: '💰',
                title: 'Completely Free',
                description: 'No hidden costs, no email required to get results. Start instantly!'
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                description: 'Get detailed personality analysis immediately after completion'
              },
              {
                icon: '✅',
                title: '95% Accurate',
                description: 'Over 50,000 users say our results are "surprisingly accurate"'
              },
              {
                icon: '🔒',
                title: 'Privacy Protected',
                description: 'Your data stays on your device. We never store or share your answers'
              },
              {
                icon: '🎁',
                title: 'Detailed Insights',
                description: 'Career paths, relationship compatibility, and personal growth tips included'
              }
            ].map((feature, index) =>
              React.createElement('div', {
                key: index,
                className: "bg-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-blue-200"
              },
                React.createElement('div', { className: "text-3xl mb-4" }, feature.icon),
                React.createElement('h3', { className: "font-bold text-lg text-gray-800 mb-3" }, feature.title),
                React.createElement('p', { className: "text-gray-600 leading-relaxed" }, feature.description)
              )
            )
          )
        )
      ),

      // HOW IT WORKS SECTION
      React.createElement('div', { className: "max-w-6xl mx-auto mb-12" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12" },
          React.createElement('div', { className: "text-center mb-8" },
            React.createElement('h2', { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" },
              React.createElement('span', { className: "mr-2" }, '🚀'),
              'How It Works - 3 Simple Steps'
            ),
            React.createElement('div', { className: "w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" })
          ),
          React.createElement('div', { className: "grid md:grid-cols-3 gap-8" },
            [
              {
                step: 'STEP 1',
                title: 'Answer 42 Questions',
                description: 'Each question has 4 options. Pick what feels most natural to you. No right or wrong answers!',
                icon: '📝',
                color: 'from-green-400 to-green-600'
              },
              {
                step: 'STEP 2',
                title: 'Instant Analysis',
                description: 'Our algorithm analyzes 8 personality dimensions and matches you with the perfect animal type.',
                icon: '⚙️',
                color: 'from-blue-400 to-blue-600'
              },
              {
                step: 'STEP 3',
                title: 'Discover Your Animal!',
                description: 'Learn your spirit animal and what it means. Get career recommendations based on your type.',
                icon: '🦁',
                color: 'from-orange-400 to-orange-600'
              }
            ].map((step, index) =>
              React.createElement('div', {
                key: index,
                className: "relative"
              },
                React.createElement('div', {
                  className: `absolute -top-4 left-6 bg-gradient-to-r ${step.color} text-white px-4 py-2 rounded-full text-sm font-bold`
                }, step.step),
                React.createElement('div', { className: "pt-4 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 h-full border-2 border-gray-200 hover:border-green-300 transition-all" },
                  React.createElement('div', { className: "text-4xl mb-4" }, step.icon),
                  React.createElement('h3', { className: "font-bold text-lg text-gray-800 mb-3" }, step.title),
                  React.createElement('p', { className: "text-gray-600 leading-relaxed" }, step.description)
                ),
                index < 2 && React.createElement('div', {
                  className: "hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-gray-400"
                }, '→')
              )
            )
          )
        )
      ),

      // FAQ SECTION
      React.createElement('div', { className: "max-w-6xl mx-auto mb-12" },
        React.createElement('div', { className: "bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12" },
          React.createElement('div', { className: "text-center mb-8" },
            React.createElement('h2', { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" },
              React.createElement('span', { className: "mr-2" }, '❓'),
              'Frequently Asked Questions'
            ),
            React.createElement('div', { className: "w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6" })
          ),
          React.createElement('div', { className: "grid md:grid-cols-2 gap-6" },
            [
              {
                question: 'Is this test really free?',
                answer: 'Yes! The basic test and detailed results are completely free. No signup required to get your personality analysis.'
              },
              {
                question: 'How accurate is it?',
                answer: 'Our test is based on established psychological research and has a 95% accuracy rating from over 50,000 users worldwide.'
              },
              {
                question: 'How long does it take?',
                answer: 'About 5 minutes to answer all 42 questions. Results are generated instantly after completion!'
              },
              {
                question: 'What about my privacy?',
                answer: 'Your answers are processed locally in your browser. We never store or share your personal data - your privacy is protected.'
              },
              {
                question: 'Can I retake the test?',
                answer: 'Absolutely! You can retake it anytime to see if your results change. People\'s personalities can evolve over time.'
              },
              {
                question: 'What will I learn?',
                answer: 'You\'ll discover your spirit animal, personality strengths, ideal career paths, relationship compatibility, and personal growth tips.'
              }
            ].map((faq, index) =>
              React.createElement('div', {
                key: index,
                className: "bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-200"
              },
                React.createElement('h3', { className: "font-bold text-lg text-orange-600 mb-3" }, faq.question),
                React.createElement('p', { className: "text-gray-700 leading-relaxed" }, faq.answer)
              )
            )
          )
        )
      ),

      // QUICK ACCESS BUTTON
      historyRecords.length > 0 && React.createElement('div', { className: "max-w-6xl mx-auto mb-8" },
        React.createElement('div', { className: "text-center" },
          React.createElement('button', {
            onClick: () => setShowHistory(!showHistory),
            className: "bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300 shadow-lg"
          }, `📊 View History (${historyRecords.length} tests)`)
        )
      ),

      // HISTORY SECTION
      showHistory && historyRecords.length > 0 && React.createElement('div', { className: "max-w-6xl mx-auto mb-8" },
        React.createElement('div', { className: "bg-white rounded-xl p-6 border-2 border-gray-200 shadow-xl max-w-4xl mx-auto" },
          React.createElement('h3', { className: "font-bold text-xl mb-4 text-gray-800 flex items-center" },
            React.createElement('span', { className: "mr-2" }, '📜'),
            'Your Test History'
          ),
          React.createElement('div', { className: "space-y-3 max-h-96 overflow-y-auto" },
            historyRecords.map((record, index) => {
              const animalInfo = animalTypes[record.results.animalType];
              return React.createElement('div', {
                key: index,
                className: "bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border-2 border-gray-100 hover:border-orange-300 transition-colors flex justify-between items-center cursor-pointer"
              },
                React.createElement('div', { className: "flex items-center gap-4" },
                  React.createElement('div', { className: "text-3xl" }, animalInfo?.icon),
                  React.createElement('div', {},
                    React.createElement('div', { className: "font-bold text-gray-800 text-lg" }, record.results.animalType),
                    React.createElement('div', { className: "text-sm text-gray-600" }, animalInfo?.slogan),
                    React.createElement('div', { className: "text-xs text-gray-500 mt-1" },
                      new Date(record.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    )
                  )
                ),
                React.createElement('div', { className: "text-right" },
                  React.createElement('div', { className: "text-sm font-semibold text-orange-500" }, 'View Details'),
                  React.createElement('div', { className: "text-xs text-gray-400" }, 'Click to load')
                )
              );
            })
          )
        )
      ),

      // FOOTER
      React.createElement('div', { className: "max-w-6xl mx-auto mb-8" },
        React.createElement('div', { className: "text-center text-xs sm:text-sm text-gray-500 bg-white rounded-xl p-6 shadow-lg" },
          React.createElement('p', { className: "mb-2" }, '💡 Test results are for entertainment and self-discovery purposes only'),
          React.createElement('p', { className: "mb-2" }, '🧠 Based on 8-dimension personality theory · Psychology-inspired assessment'),
          React.createElement('div', { className: "flex justify-center gap-4 flex-wrap" },
            React.createElement('span', {}, '🎯 Find your strengths'),
            React.createElement('span', {}, '💼 Career insights'),
            React.createElement('span', {}, '❤️ Relationship tips'),
            React.createElement('span', {}, '🌱 Personal growth')
          )
        )
      )
    );
  };

  const renderTest = () => {
    const currentQ = questions[currentQuestion];
    const dimInfo = dimensions[currentQ.dimension];
    const progress = ((currentQuestion + 1) / questions.length * 100).toFixed(0);
    return React.createElement('div', { className: "min-h-screen wild-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "mb-6 sm:mb-8" },
          React.createElement('div', { className: "flex items-center justify-between mb-4" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "text-2xl sm:text-3xl" }, dimInfo.icon),
              React.createElement('div', {},
                React.createElement('div', { className: "font-bold text-gray-800 text-sm sm:text-base" }, dimInfo.name),
                React.createElement('div', { className: "text-xs text-gray-500" }, dimInfo.description)
              )
            ),
            React.createElement('div', { className: "text-right" },
              React.createElement('div', { className: "text-lg sm:text-2xl font-bold", style: { color: dimInfo.color } },
                `${currentQuestion + 1}/42`
              ),
              React.createElement('div', { className: "text-xs text-gray-500" }, `${progress}%`)
            )
          ),
          React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner" },
            React.createElement('div', {
              className: "h-3 rounded-full transition-all duration-500 ease-out",
              style: {
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
              }
            })
          )
        ),
        React.createElement('div', { className: "mb-8" },
          React.createElement('div', { className: "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 mb-6" },
            React.createElement('h3', { className: "text-lg sm:text-2xl font-medium text-gray-800 text-center leading-relaxed" },
              currentQ.text
            )
          ),
          React.createElement('div', { className: "space-y-3" },
            currentQ.options.map((option) => {
              const isSelected = answers[currentQ.id] === option.value;
              return React.createElement('button', {
                key: option.value,
                onClick: () => handleAnswer(option.value),
                className: `w-full text-left p-4 sm:p-5 border-2 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? 'border-orange-400 bg-orange-50 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm'
                }`
              },
                React.createElement('div', { className: "flex items-start" },
                  React.createElement('span', {
                    className: `font-bold text-base sm:text-lg w-8 h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`,
                    style: {
                      backgroundColor: isSelected ? dimInfo.color : `${dimInfo.color}20`,
                      border: isSelected ? 'none' : `2px solid ${dimInfo.color}40`
                    }
                  }, option.label),
                  React.createElement('span', { className: `text-sm sm:text-base leading-relaxed ${
                    isSelected ? 'text-gray-800 font-medium' : 'text-gray-700'
                  }` }, option.text)
                )
              );
            })
          )
        ),
        React.createElement('div', { className: "flex justify-between items-center pt-4 border-t-2 border-gray-100" },
          currentQuestion > 0 ?
            React.createElement('button', {
              onClick: () => setCurrentQuestion(currentQuestion - 1),
              className: "flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
            },
              React.createElement('span', {}, '←'),
              React.createElement('span', { className: "text-sm sm:text-base" }, 'Previous')
            ) :
            React.createElement('button', {
              onClick: () => setCurrentPage('intro'),
              className: "flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
            },
              React.createElement('span', {}, '←'),
              React.createElement('span', { className: "text-sm sm:text-base" }, 'Back to Home')
            ),
          React.createElement('div', { className: "text-sm text-gray-400" },
            'Remaining questions: ',
            React.createElement('span', { className: "font-bold text-orange-500" }, 42 - currentQuestion - 1)
          )
        ),
        React.createElement('div', { className: "mt-6 text-center" },
          React.createElement('div', { className: "inline-block bg-blue-50 border border-blue-200 rounded-full px-4 py-2" },
            React.createElement('p', { className: "text-xs text-blue-700" }, '💡 Choose the option closest to your true thoughts')
          )
        )
      )
    );
  };

  const renderResult = () => {
    const results = calculateResults();
    const animalInfo = animalTypes[results.animalType];
    return React.createElement('div', { className: "min-h-screen wild-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: `bg-gradient-to-r ${animalInfo.color} rounded-2xl p-6 sm:p-10 mb-8 text-white shadow-2xl` },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-7xl sm:text-9xl mb-4 animate-bounce" }, animalInfo.icon),
            React.createElement('h2', { className: "text-3xl sm:text-5xl font-bold mb-3 sm:mb-4" },
              `You are a [${results.animalType}]`
            ),
            React.createElement('p', { className: "text-xl sm:text-2xl mb-6 opacity-90 font-medium italic" },
              `"${animalInfo.slogan}"`
            ),
            React.createElement('div', { className: "bg-white bg-opacity-20 rounded-xl p-4 sm:p-6 backdrop-blur-sm" },
              React.createElement('p', { className: "text-base sm:text-lg leading-relaxed mb-4" }, animalInfo.description),
              React.createElement('div', { className: "mt-4" },
                React.createElement('h3', { className: "font-bold text-lg mb-3 flex items-center justify-center" },
                  React.createElement('span', { className: "mr-2" }, '✨'),
                  'Personality Traits'
                ),
                React.createElement('div', { className: "flex flex-wrap justify-center gap-2" },
                  animalInfo.traits.map((trait, index) =>
                    React.createElement('span', {
                      key: index,
                      className: "bg-white bg-opacity-30 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium"
                    }, trait)
                  )
                )
              ),
              React.createElement('div', { className: "mt-4" },
                React.createElement('h3', { className: "font-bold text-lg mb-3 flex items-center justify-center" },
                  React.createElement('span', { className: "mr-2" }, '💼'),
                  'Suitable Development Directions'
                ),
                React.createElement('div', { className: "flex flex-wrap justify-center gap-2" },
                  animalInfo.careers.map((career, index) =>
                    React.createElement('span', {
                      key: index,
                      className: "bg-white bg-opacity-30 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
                    }, career)
                  )
                )
              )
            )
          )
        ),
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" },
          React.createElement('div', { className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center" },
              React.createElement('span', { className: "mr-2" }, '📊'),
              '8-Dimension Ability Radar Chart'
            ),
            React.createElement('div', { className: "relative h-80 sm:h-96" },
              React.createElement('canvas', { ref: chartRef })
            ),
            React.createElement('div', { className: "mt-4 text-center text-xs text-gray-600" },
              '* Full score 5 points, higher score means more prominent in this dimension'
            )
          ),
          React.createElement('div', { className: "space-y-4" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 flex items-center" },
              React.createElement('span', { className: "mr-2" }, '🏆'),
              'Your Top 3 Advantage Dimensions'
            ),
            results.topDimensions.map(([dimName, score], index) => {
              const dimInfo = dimensions[dimName];
              const medals = ['🥇', '🥈', '🥉'];
              const scoreNum = parseFloat(score);
              return React.createElement('div', {
                key: dimName,
                className: "bg-white border-2 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow",
                style: { borderColor: dimInfo.color }
              },
                React.createElement('div', { className: "flex items-center justify-between mb-3" },
                  React.createElement('div', { className: "flex items-center space-x-3 flex-1" },
                    React.createElement('span', { className: "text-4xl" }, medals[index]),
                    React.createElement('div', { className: "flex-1" },
                      React.createElement('div', { className: "flex items-center space-x-2 mb-1" },
                        React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                        React.createElement('span', { className: "font-bold text-lg" }, dimName)
                      ),
                      React.createElement('div', { className: "text-sm text-gray-600" }, dimInfo.description)
                    )
                  ),
                  React.createElement('div', { className: "text-right ml-4" },
                    React.createElement('div', { className: "text-3xl font-bold", style: { color: dimInfo.color } }, score),
                    React.createElement('div', { className: "text-xs text-gray-500" }, '/ 5.0')
                  )
                ),
                React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden" },
                  React.createElement('div', {
                    className: "h-3 rounded-full transition-all duration-1000",
                    style: {
                      width: `${(scoreNum / 5) * 100}%`,
                      backgroundColor: dimInfo.color
                    }
                  })
                )
              );
            }),
            React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 mt-6" },
              React.createElement('h4', { className: "font-bold text-gray-800 mb-2 flex items-center" },
                React.createElement('span', { className: "mr-2" }, '💡'),
                'Personality Analysis'
              ),
              React.createElement('p', { className: "text-sm text-gray-700 leading-relaxed" },
                'You excel in',
                React.createElement('strong', {}, results.topDimensions[0][0]),
                'with outstanding performance in this area, making you',
                animalInfo.description.substring(0, 30),
                '...combining your',
                React.createElement('strong', {}, results.topDimensions[1][0]),
                'and',
                React.createElement('strong', {}, results.topDimensions[2][0]),
                'traits, you are a',
                animalInfo.traits.slice(0, 2).join('、'),
                'person.'
              )
            )
          )
        ),
        React.createElement('div', { className: "mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 flex items-center" },
            React.createElement('span', { className: "mr-2" }, '📈'),
            'Complete Ability Assessment'
          ),
          React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
            results.sortedDimensions.map(([dimName, score]) => {
              const dimInfo = dimensions[dimName];
              const scoreNum = parseFloat(score);
              let level = 'Underdeveloped';
              let levelColor = 'text-gray-500';
              let levelBg = 'bg-gray-100';
              if (scoreNum >= 4.0) {
                level = 'Strength Talent';
                levelColor = 'text-green-600';
                levelBg = 'bg-green-100';
              } else if (scoreNum >= 3.5) {
                level = 'Outstanding Performance';
                levelColor = 'text-blue-600';
                levelBg = 'bg-blue-100';
              } else if (scoreNum >= 3.0) {
                level = 'Developing';
                levelColor = 'text-yellow-600';
                levelBg = 'bg-yellow-100';
              }
              return React.createElement('div', {
                key: dimName,
                className: "bg-gray-50 rounded-xl p-4 border-2 border-gray-100 hover:border-gray-200 transition-colors"
              },
                React.createElement('div', { className: "flex items-center justify-between mb-2" },
                  React.createElement('div', { className: "flex items-center space-x-2 flex-1" },
                    React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                    React.createElement('span', { className: "font-semibold text-gray-800" }, dimName)
                  ),
                  React.createElement('div', { className: "flex items-center space-x-2" },
                    React.createElement('span', { className: "font-bold text-xl", style: { color: dimInfo.color } }, score),
                    React.createElement('span', { className: `text-xs px-2 py-1 rounded-full ${levelBg} ${levelColor} font-medium` }, level)
                  )
                ),
                React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
                  React.createElement('div', {
                    className: "h-2 rounded-full transition-all duration-1000",
                    style: {
                      width: `${(scoreNum / 5) * 100}%`,
                      backgroundColor: dimInfo.color
                    }
                  })
                )
              );
            })
          )
        ),
        React.createElement('div', { className: "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 flex items-center" },
            React.createElement('span', { className: "mr-2" }, '💡'),
            'Advice for You'
          ),
          React.createElement('div', { className: "space-y-3 text-gray-700" },
            React.createElement('p', { className: "leading-relaxed flex items-start" },
              React.createElement('span', { className: "text-orange-500 mr-2 font-bold" }, '1.'),
              React.createElement('span', {},
                React.createElement('strong', { className: "text-orange-600" }, 'Leverage Strengths:'),
                'You excel in',
                React.createElement('strong', {}, results.topDimensions[0][0]),
                'with a score of（',
                results.topDimensions[0][1],
                'points), this is your core competitiveness. Recommend deepening expertise in related fields to transform talent into strength.'
              )
            ),
            React.createElement('p', { className: "leading-relaxed flex items-start" },
              React.createElement('span', { className: "text-orange-500 mr-2 font-bold" }, '2.'),
              React.createElement('span', {},
                React.createElement('strong', { className: "text-orange-600" }, 'Ability Combination:'),
                'Your',
                results.topDimensions.map(([name]) => name).join('、'),
                'ability combination is especially suitable for',
                animalInfo.careers.slice(0, 2).join('、'),
                'and other areas. This unique combination is your strength.'
              )
            ),
            React.createElement('p', { className: "leading-relaxed flex items-start" },
              React.createElement('span', { className: "text-orange-500 mr-2 font-bold" }, '3.'),
              React.createElement('span', {},
                React.createElement('strong', { className: "text-orange-600" }, 'Accept Yourself:'),
                'Everyone has their own unique talent combination, with no absolute good or bad. Accept your true self and shine in suitable fields - that\'s the best choice.'
              )
            )
          )
        ),
          // AI upgrade prompt - directly referencing original design
        React.createElement('div', {
          className: "upgrade-card",
          style: {
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
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
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color: '#000',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '20px'
            }
          }, '⭐ Upgrade to Get'),
          React.createElement('h2', {
            className: "upgrade-title",
            style: {
              fontSize: '28px',
              color: '#ffd700',
              marginBottom: '15px',
              fontWeight: '700'
            }
          }, 'Unlock AI Deep Analysis Report'),
          React.createElement('p', {
            className: "upgrade-desc",
            style: {
              fontSize: '16px',
              color: '#ccc',
              marginBottom: '30px',
              lineHeight: '1.8'
            }
          },
            'Want to get more precise personalized analysis and professional improvement plans?',
            React.createElement('br'),
            'Upgrade to AI intelligent analysis version for deeper psychological insights'
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
                color: '#ffd700',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Deep psychological pattern analysis'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffd700',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), '15+ customized improvement suggestions'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffd700',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Professional detailed report (20+ pages)'),
            React.createElement('div', {
              className: "upgrade-feature",
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffd700',
                fontSize: '15px'
              }
            }, React.createElement('span', {}, '✓'), 'Relationship compatibility comparison analysis')
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
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color: '#000'
            }
          },
            React.createElement('span', {}, '🚀'),
            'Upgrade Now to Unlock'
          )
        ),
        React.createElement('div', { className: "flex justify-center mb-6" },
          React.createElement('button', {
            onClick: () => {
              setCurrentPage('intro');
              setCurrentQuestion(0);
              setAnswers({});
            },
            className: "w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
          },
            React.createElement('span', { className: "mr-2" }, '🔄'),
            'Retake Test'
          )
        ),
        React.createElement('div', { className: "text-center" },
          React.createElement('div', { className: "inline-block bg-purple-50 border-2 border-purple-200 rounded-xl px-6 py-3" },
            React.createElement('p', { className: "text-sm text-purple-700 mb-1" },
              '💝 ',
              React.createElement('strong', {}, 'Test results automatically saved')
            ),
            React.createElement('p', { className: "text-xs text-purple-600" }, 'Based on 8-Dimension Personality Theory · For Entertainment Reference · Explore Your True Self')
          )
        ),
        React.createElement('div', { className: "mt-6 text-center" },
          React.createElement('p', { className: "text-xs text-gray-400" }, '🎉 Share with friends and see what animals they are!')
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
root.render(React.createElement(AnimalPersonalityTest));