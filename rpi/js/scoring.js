// ============================================
// Fixed scoring.js - Complete Version
// ============================================

/**
 * Get latest test result
 */
function getLatestResult() {
    try {
        return JSON.parse(localStorage.getItem('latestRpiResult') || 'null');
    } catch (error) {
        console.error('Failed to read latest result:', error);
        return null;
    }
}

/**
 * Extended RPI Level Description Library - Entertainment & Casual Version
 */
const enhancedRPIAnalysis = {
    // ==========================================
    // Level 1: Perfectly Healthy (RPI 0-20)
    // ==========================================
    1: [
        {
            meaning: "Your relationship state is practically the definition of 'relaxed'. Your trust for your partner is as vast as the Pacific Ocean. In your view, love is about finding a teammate to level up together, not finding a criminal to interrogate daily. This confidence and calmness is truly charming.",
            suggestion: "Your mindset is perfect, keep it up! However, occasionally you can 'pretend' to be a little jealous or act clingy (even though you don't actually want to check up). A little bit of 'acting up' can make your partner feel that you care about them, otherwise they might think you see them as just a brother.",
            tone: "Humble-bragger Type"
        },
        {
            meaning: "You're a classic 'free-range' partner. You're like someone holding a kite string - as long as the line doesn't break, you don't care how high the kite flies. Friends might think you're too carefree, but only you understand that this relaxed attitude is the secret to lasting relationships.",
            suggestion: "Your independence is strong, which is your charm. But be careful not to let this independence become mistaken for 'indifference'. Occasionally creating some clingy moments, like asking for hugs or comfort, will make the relationship experience sweeter.",
            tone: "Cool & Free Type"
        },
        {
            meaning: "You have an enviable 'big heart'. Partner doesn't reply to messages? You think they must be busy, not up to something. Partner has friends of the opposite sex? You think it's normal social interaction - who doesn't have friends? This strong sense of security keeps you rarely overthinking in your relationship.",
            suggestion: "Since you're so low-maintenance, why not use the energy you save to improve the quality of your relationship. Plan more interesting dates or prepare little surprises for your partner. After all, too much security in a relationship can sometimes become boring, you need to add some seasoning.",
            tone: "Composed Type"
        },
        {
            meaning: "In your eyes, the best state of love is 'You are you, I am me, and we are happy together'. You don't like clingy drama, and you hate scripts of mutual suspicion. You give your partner maximum freedom while preserving your complete self.",
            suggestion: "Don't forget, relationships sometimes need a little 'irrationality'. Next time you meet, try to completely let go of reason for even one minute, act like a fool in the honeymoon phase and be clingy with your partner - you'll discover different joys.",
            tone: "Rational Type"
        },
    ],

    // ==========================================
    // Level 2: Good Balance (RPI 36-50)
    // ==========================================
    2: [
        {
            meaning: "You've found the most comfortable state in a relationship - caring, but not excessive; attentive, but not controlling. You might get jealous over some of your partner's behaviors, but you can handle these emotions rationally; you want to understand their life, but won't interrogate every detail. This 'just right' kind of love gives you both intimacy without suffocating each other.",
            suggestion: "You're already on the right track to a healthy relationship. Maintain this sense of balance, learn to communicate maturely when feeling insecure, rather than suppressing or exploding. Remember: A little jealousy adds flavor, too much harms the relationship.",
            tone: "Encouraging Type"
        },
        {
            meaning: "Your possessiveness is like seasoning salt - the right amount is perfect. You're not the 'so Zen it's cold' type, nor the 'so loving it's suffocating' type. You mind when they chat with the opposite sex, but won't have a meltdown; you want to know where they are, but won't GPS track them. This balance is just right.",
            suggestion: "Staying as you are is great. When you occasionally feel insecure, try asking yourself first: 'Did I really discover a problem, or am I just scaring myself?' Most of the time, you'll find it's the latter. Take a deep breath, then go about your business.",
            tone: "Friend-like Type"
        },
        {
            meaning: "You're a very genuine partner. You have all the human emotions - little jealousies, little tempers - but that's exactly what makes you cute. You haven't been carried away by possessiveness; when reason returns, you always make respectful choices. Your partner feels that you both care about them and are very reasonable.",
            suggestion: "When you feel jealous, why not directly act cute and say 'I'm jealous' instead of sulking. This frank expression is often more effective than cold wars, and can turn jealousy into playfulness.",
            tone: "Life-like Type"
        },
        {
            meaning: "Your RPI score shows you're at the 'golden ratio point'. You have vigilance, which protects the relationship from external interference; but you don't have aggression, which protects your partner from internal pressure. You know when to be firm on principle issues and when to let things slide on small matters.",
            suggestion: "Continue cultivating this wisdom. When encountering things that cause disagreement, practice empathy more often. Your balancing ability is your greatest advantage in maintaining long-term relationships.",
            tone: "Analytical Type"
        },
    ],

    // ==========================================
    // Level 3: Moderately High (RPI 51-70)
    // ==========================================
    3: [
        {
            meaning: "Your possessiveness index is at the moderately high level, which means you're standing at a crossroads: to the left is healthy concern, to the right is excessive control. Right now, you're quite sensitive to your partner's behaviors and want to keep track of their movements. Although not yet to the point of suffocating them, there are moments when they might already feel pressure.",
            suggestion: "This is a critical point that needs attention. If not careful, your 'caring' might slowly turn into 'monitoring'. It's recommended to start cultivating your own hobbies and establish an independent social circle. Remember: The more fulfilled you are, the less you'll focus all your attention on your partner.",
            tone: "Reminder Type"
        },
        {
            meaning: "To be honest, you care a bit too much about your partner. A social media post, a like, a late return home - all these can create waves in your heart. It's not that you don't trust them, but that you're too afraid of losing them. This anxiety is gradually affecting the quality of your time together.",
            suggestion: "Stop, take a deep breath. Ask yourself: What am I really afraid of? Am I afraid they'll change their heart, or that I'm not good enough? Finding the root of your fear is the only way to truly solve the problem. Maybe what you need isn't a 'more honest' partner, but a stronger version of yourself.",
            tone: "Direct Type"
        },
        {
            meaning: "You're in the 'gray zone' of possessiveness - not yet bad enough to break the relationship, but already starting to affect your daily interactions. Your partner might feel a bit tired being with you, needing to constantly watch your emotions; and you're also tired, always spending your days worrying, doubting, and feeling anxious.",
            suggestion: "It's time to make a change. This anxiety will drain your energy and turn you into someone you don't even like. Start small: don't check their social media today, don't ask about their whereabouts this weekend - try it, you'll see the sky won't fall.",
            tone: "Empathetic Type"
        },
        {
            meaning: "Inside you might live an 'insecure child'. When your partner is out of sight, this child starts crying, making you want to hold on tighter. This isn't because you're dominant, but precisely because you're soft and vulnerable inside.",
            suggestion: "Try to soothe that inner child instead of controlling your partner to relieve the pain. Tell yourself: 'I am worthy of love, even when they're not physically with me right now.' This ability to self-soothe is a required course for your growth.",
            tone: "Psychological Healing Type"
        },
        {
            meaning: "You're playing a dangerous game: trying to hold onto sand by tightening your grip. But common sense tells us that the tighter you grip, the faster the sand slips away. Your frequent confirmations and check-ins might be pushing your partner away.",
            suggestion: "Try to let go. Trust is like a muscle - it needs to be exercised. The next time you want to check up on them, force yourself to resist and do something else instead. Every act of restraint is training your 'trust muscle'.",
            tone: "Metaphorical Warning Type"
        }
    ],

    // ==========================================
    // Level 4: High Level (RPI 71-85)
    // ==========================================
    4: [
        {
            meaning: "Your possessiveness has reached a point that needs serious attention. You might frequently check your partner's phone, question their whereabouts, and even get angry over small things. You tell yourself 'this is because I love them too much,' but this high-pressure interaction pattern is rapidly draining your relationship.",
            suggestion: "This is a serious reminder: if you don't make changes immediately, your interaction pattern will become increasingly exhausting. Try to give each other more freedom and refocus your attention back on yourself. When you become sparkling again, your relationship will also be more relaxed and beautiful.",
            tone: "Serious Reminder Type"
        },
        {
            meaning: "Let's be honest: you're using the name of 'love' to do things that drain the relationship. Monitoring phones, excessive questioning... these behaviors are gradually consuming your partner's patience with you. You might think 'if they really loved me, they should understand me,' but put yourself in their shoes: how long could you tolerate someone doing this to you?",
            suggestion: "It's time to face reality. What you need isn't a 'more obedient' partner, but to shift your energy from monitoring to self-development. For your own sake, seriously address and change this interaction pattern, because this anxiety is mainly torturing yourself.",
            tone: "Direct Introspective Type"
        },
        {
            meaning: "I can feel the fear and insecurity inside you. You act this way not because you're bad, but because you're too afraid - afraid of being ignored, afraid of not being good enough. You try to gain security by controlling your partner. But ironically, the tighter you hold on, the heavier your interactions become.",
            suggestion: "You deserve to be loved and to have a healthy relationship. But first, you need to learn to love yourself and trust yourself. True security can only come from your inner strength, not your partner's phone password or location reports.",
            tone: "Gentle Understanding Type"
        },
        {
            meaning: "Your relationship pattern has already shown red flags. You've made yourself the 'police' of this relationship, while your partner has become the 'suspect.' Every day is spent in interrogation and defense, and this high-pressure environment will quickly diminish the sweetness of love.",
            suggestion: "Take off your police badge. Love isn't law enforcement; it doesn't need evidence. Try giving your partner even one day of complete trust and see what happens. You'll discover that the ease brought by trust is far more valuable than the pain brought by suspicion.",
            tone: "Role Metaphor Type"
        },
        {
            meaning: "Your RPI score shows that you crave intimacy but fear being hurt. This contradiction makes you erratic: sometimes extremely good to them, sometimes emotionally explosive. This is a huge emotional test for your partner.",
            suggestion: "Please learn more relationship skills. When emotions run high, give yourself a '10-minute cooling period' and communicate after you've calmed down. Use reason to manage emotions, don't let emotions dominate the relationship.",
            tone: "Skill Guidance Type"
        }
    ],

    // ==========================================
    // Level 5: Very High Level (RPI 86-100) - Softened
    // ==========================================
    5: [
        {
            meaning: "You're someone who can be 'crazy in love,' easily completely consumed by this relationship. You might invest most of your happiness and energy into your partner, causing yourself to easily fall into emotional whirlpools. Your love is deep, but your way of expressing it might be too heavy, making both of you feel breathless.",
            suggestion: "It's time to press the 'personal life restart button.' Shift 40% of the 80% attention you give your partner to yourself. Challenge yourself to try a completely new sport or hobby, and you'll soon discover that when you love yourself more, your attractiveness will multiply.",
            tone: "Gentle Self-Focus Type"
        },
        {
            meaning: "In your world, this relationship takes up too much space, causing your personal radiance to be somewhat overshadowed. Once your partner is not around, you might feel intense emptiness and anxiety. This state drains yourself and also makes what was once an easy relationship become exhausting.",
            suggestion: "Please give yourself a long vacation, taking a short break from your 'relationship duties.' Create a 'happiness list' with things that can make you happy alone. Remember, the way you originally attracted them was your independently shining self.",
            tone: "Charm Recovery Type"
        },
        {
            meaning: "I must tell you a secret: the most tired person right now is yourself. You spend too much time worrying, guessing, and confirming, and this anxiety is draining your energy. This heavy interaction pattern will make both you and your partner lose the joy of love.",
            suggestion: "Let's play a little game: set yourself a 'trust week' challenge. For one week, force yourself to have 'selective blindness' about your partner's whereabouts and social activities, using the saved energy to laugh heartily with friends or learn a new skill. You'll discover that life is far more wonderful than you imagine.",
            tone: "Light Challenge Type"
        },
        {
            meaning: "Your love is like an airtight net - though intended to protect the relationship, it makes the person inside lose breathing space. You might unconsciously make your partner feel strongly confined. Love is about wanting both people to be free, not trapping each other.",
            suggestion: "Please 'air out' your relationship. You can have an honest chat with your partner (in a light tone): 'I've noticed I've been a bit too clingy lately. I plan to give you more freedom and also give myself more space.' Taking the initiative to adjust will show your partner your willingness to improve for the relationship.",
            tone: "Relationship Ventilation Type"
        },
        {
            meaning: "You might unknowingly put all your eggs in the 'love' basket. Once this basket wobbles a bit, you'll feel it's the end of the world. What you need are a few more sturdy 'baskets' - like friendship, career, personal achievements.",
            suggestion: "For your own happiness, you must now rebalance your life. Pick up interests you once set aside, or get to know some new friends. Only when you become a fulfilled individual again will your love become relaxed, interesting, and indestructible.",
            tone: "Self-Value Enhancement Type"
        }
    ]
};

/**
 * Deep Analysis Library for Dimension Combinations
 */
const dimensionCombinationLibrary = {
    tripleHigh: {
        title: "🚨 Alert: Comprehensive Possessive Personality",
        description: "You show high levels in control, jealousy, and dependency dimensions - this is the most alarming combination pattern. You not only want to control everything about your partner but are also extremely afraid of losing them, with your life completely revolving around this relationship. Under this pattern, both you and your partner bear enormous emotional pressure.",
        risks: [
            "Your partner may feel severe pressure and confinement",
            "Your physical and mental health are being eroded by anxiety, possibly leading to insomnia, mood swings, etc.",
            "If this pattern continues, it will seriously affect the long-term development of the relationship"
        ],
        advice: "Strongly recommend seeking professional psychological counseling help. This combination pattern often has deep psychological reasons and requires systematic psychological guidance and self-growth."
    },

    controlButIndependent: {
        title: "👑 Contradiction: Independent Controller",
        description: "This is an interesting combination: you yourself are very independent, with your own life and social circle, but you want to control everything about your partner. You might be career-oriented, accustomed to controlling situations, and want to 'have the final say' in the relationship too. You can't live without your partner, but you demand that your partner cannot live without you.",
        rootCause: "This pattern usually stems from: controlling personality, perfectionist tendencies, or past experiences of 'being hurt' in relationships that made you decide 'this time I'll take the initiative'.",
        advice: "Recognize a fact: love is not a power game, nor a competition of who needs whom more. A truly equal relationship is two independent people choosing to be together, not one person 'allowing' another to be by their side."
    },

    jealousButNotControlling: {
        title: "💔 Pain: Repressed Anxious Person",
        description: "You're extremely jealous inside but pretend not to care on the surface; you want to know everything about them but are too embarrassed to ask directly; you get jealous but don't dare to say it, only suffering silently. You're afraid that 'being too clingy will scare them away,' so you choose to suppress your true feelings.",
        consequences: "The biggest problem with this pattern is: your partner might be completely unaware of your true feelings, and when you finally explode, they'll find it 'inexplicable.' Meanwhile, your repression is gradually consuming your confidence in this relationship.",
        advice: "Learn to express your needs and insecurities healthily. Saying 'I'm a bit concerned' is not embarrassing - what really needs attention is pretending not to care and then suddenly breaking down one day. Mature communication is the foundation of relationships."
    },

    anxiousAttachment: {
        title: "😰 Classic: Anxious Attachment Personality",
        description: "You're a textbook case of 'anxious attachment' - your life completely revolves around your partner, while you're also extremely afraid of being abandoned. You need constant reassurance of their love, but no matter how they guarantee it, you can never truly feel at ease.",
        psychologicalRoots: "Anxious attachment usually stems from: childhood parental neglect or inconsistent companionship, past experiences of betrayal in relationships, or naturally high sensitivity.",
        healingPath: [
            "Realize: your partner is not your 'savior'; they cannot fill the void inside you",
            "Establish your own life center: work, hobbies, friends, self-growth",
            "Learn 'self-soothing': when anxiety strikes, calm emotions with mindfulness breathing, journaling, etc.",
            "Consider psychological counseling related to attachment theory, which can be very helpful"
        ]
    },

    balanced: {
        title: "✨ Ideal: Mature Lover",
        description: "Congratulations! You maintain healthy levels across all four dimensions. You can give your partner freedom while expressing your own needs; you get jealous but don't lose control; you care about this relationship but also have your own life.",
        strengths: [
            "You understand: love is icing on the cake, not a life raft",
            "You believe: true intimacy is a choice, not control",
            "You know: relationships need two whole people, not two halves"
        ],
        advice: "Maintain the status quo, but also be aware: major life changes might temporarily break this balance. When pressure comes, remember to return to these principles: communication, trust, independence, respect."
    },

    controlButNotJealous: {
        title: "🎯 Special: Rational Controller",
        description: "Your controlling desire doesn't come from jealousy or insecurity, but from 'I think my way is right.' You might not mind your partner chatting with the opposite sex, but you demand they live according to your plans.",
        warning: "Your partner might not leave you because of 'jealousy,' but they might leave you because of 'exhaustion.' Nobody wants to date a 'boss,' even if that boss loves them very much. Love needs equality, not management."
    }
};

/**
 * Deep Analysis of Dimensions - Detailed breakdown of each dimension
 */
const dimensionDeepAnalysis = {
    control: {
        veryLow: {
            score: "0-10",
            title: "Complete Let-Go Type",
            description: "You hardly intervene in any of your partner's decisions and behaviors. You believe everyone should maintain independence, and excessive interference would undermine the foundation of equality in the relationship.",
            positives: ["Partner feels fully respected and free", "Relationship is built on trust rather than control"],
            cautions: ["Ensure 'indifference' isn't mistaken for 'respecting freedom'", "Express appropriate concern to let your partner know you care about them"]
        },
        low: {
            score: "11-25",
            title: "Boundary-Respecting Type",
            description: "You give your partner most of their autonomy, but express your thoughts on important matters. You know when to let go and when to participate.",
            positives: ["Well-balanced, caring without overstepping boundaries", "Partner willingly consults you on matters"],
            cautions: ["Continue maintaining this sense of propriety", "Under stress, be careful not to suddenly want to control everything"]
        },
        medium: {
            score: "26-35",
            title: "Moderate Participation Type",
            description: "You want to participate in most of your partner's life decisions, and while you respect their opinions, your views often have more influence.",
            concerns: ["Your partner might start feeling pressure that 'everything needs your approval'", "Your 'suggestions' might be perceived as 'demands'"],
            improvement: ["Ask yourself: Do I need to participate in this?", "Practice saying 'You decide, I support you'"]
        },
        high: {
            score: "36-43",
            title: "Dominant Leading Type",
            description: "You have strong controlling desires over your partner's life, from daily arrangements to important decisions, you want to participate or even lead.",
            redFlags: ["Your partner may have already lost much autonomy", "Your relationship is more like 'parent-child' than 'couple'"],
            urgentChange: ["This is already unhealthy control that needs immediate change", "Recommend seeking psychological counseling to explore the roots of controlling behavior"]
        },
        veryHigh: {
            score: "44-50",
            title: "Comprehensive Control Type",
            description: "You attempt to control everything about your partner. This is no longer love, but control, requiring serious reflection and seeking help.",
            severity: "This is a serious problem, recommend seeking professional psychological counseling"
        }
    },

    jealousy: {
        veryLow: {
            score: "0-16",
            title: "Complete Trust Type",
            description: "You rarely feel jealous and believe in your partner's loyalty. You think it's normal for them to interact with the opposite sex.",
            strength: "This is a very healthy state, built on a solid foundation of trust"
        },
        low: {
            score: "17-27",
            title: "Occasionally Jealous Type",
            description: "You get jealous but can control it rationally. This 'little jealousy' actually adds fun to the relationship.",
            balance: "This is a healthy level of jealousy, showing you care without being paranoid"
        },
        medium: {
            score: "28-38",
            title: "Sensitive Suspicious Type",
            description: "You're quite sensitive to your partner's interactions with the opposite sex and tend to overinterpret normal behaviors.",
            improvement: ["Ask yourself: Is my jealousy based on facts or imagination?", "Learn to distinguish 'normal social interaction' from 'flirtatious behavior'"]
        },
        high: {
            score: "39-47",
            title: "Strongly Jealous Type",
            description: "You have strong jealousy and often feel anxious or angry due to your partner's normal contact with the opposite sex.",
            rootCause: "Strong jealousy often stems from deep-seated insecurity"
        },
        veryHigh: {
            score: "48-55",
            title: "Excessively Jealous Type",
            description: "Your jealousy has reached a level that needs serious attention; recommend seeking professional help."
        }
    },

    dependency: {
        veryLow: {
            score: "0-16",
            title: "Highly Independent Type",
            description: "You maintain strong independence with your own life center. Your partner is an important part of your life, but not everything.",
            strength: "This independence makes your relationship more equal and lasting"
        },
        low: {
            score: "17-27",
            title: "Moderately Dependent Type",
            description: "You depend on your partner's emotional support but can also handle your own life independently.",
            ideal: "This is the healthiest level of dependency"
        },
        medium: {
            score: "28-38",
            title: "Noticeably Dependent Type",
            description: "You have strong dependency on your partner, and your happiness largely comes from this relationship.",
            risks: ["Once the relationship has problems, you'll find it hard to cope", "Your partner might feel pressured by 'being needed too much'"]
        },
        high: {
            score: "39-47",
            title: "Excessively Dependent Type",
            description: "Your life completely revolves around your partner; without them, you feel lost.",
            dangers: ["You've lost yourself", "This pressure makes your partner want to escape"]
        },
        veryHigh: {
            score: "48-55",
            title: "Extremely Dependent Type",
            description: "You're completely unable to leave your partner and need to take this issue seriously."
        }
    },

    security: {
        veryHigh: {
            score: "0-15",
            title: "High Security Type",
            description: "You're full of confidence in this relationship and rarely doubt your partner's feelings.",
            foundation: "This sense of security is the cornerstone of a healthy relationship"
        },
        high: {
            score: "16-25",
            title: "Basically Secure Type",
            description: "You're quite confident in the relationship. Although you worry occasionally, you can mostly stay calm.",
            stability: "This is a normal and healthy level of security"
        },
        medium: {
            score: "26-35",
            title: "Mildly Anxious Type",
            description: "You often worry about losing your partner and need frequent reassurance of their love to feel at ease.",
            pattern: "This is a typical 'anxious attachment' pattern"
        },
        low: {
            score: "36-43",
            title: "Seriously Insecure Type",
            description: "You severely lack security and always worry that your partner will leave.",
            suffering: "You live in pain, and your partner also feels pressure"
        },
        veryLow: {
            score: "44-50",
            title: "Extremely Fearful Type",
            description: "You live in extreme fear of being abandoned; recommend seeking professional help."
        }
    }
};

/**
 * Personalized Advice Library - Complete Version (Ensure no encoding issues)
 * 5 random advice sets for each Level, corresponding with enhancedRPIAnalysis
 */
const personalizedGoalsLibrary = {

    // ==========================================
    // Level 1: Perfect Health (RPI 0-35)
    // ==========================================
    1: [
        // [Advice Set 1: Zen Master Edition]
        {
            reminder: "Your relationship state is very healthy, but being too zen has a small risk: your partner might mistake you for 'not caring enough.' After all, not everyone can understand the advanced romance of 'I don't check on you because I trust you.'",

            actionPlan: `🌟 This week's task: Proactively create a small surprise
For example, suddenly say "I miss you tonight, let's go out for dinner." It doesn't need to be grand - just let them know: your calmness isn't indifference, but mature love.

💬 Communication upgrade: Occasionally "pretend" to be a little clingy
Next time they come home late, try joking: "Hmph, where were you? Are you cheating on me?" Then hug them with a smile. This kind of clinginess with security will make your relationship warmer.

📚 Advanced reading: "Intimate Relationships"
You're already doing great. This book can help you understand why some people just can't learn your kind of ease. Understanding differences will make you more patient when encountering anxious partners.`,

            goldenQuote: "True love is two complete people choosing to be together, not two halves making a whole."
        },

        // [Advice Set 2: Independent Personality Edition]
        {
            reminder: "You're the type of person who's 'great with you, can live wonderfully without you too.' But remember: a partner isn't a roommate. Occasionally expressing 'I need you' won't make you seem weak, but will let them feel the happiness of being needed.",

            actionPlan: `🎯 This month's challenge: Reveal vulnerability once
Find a time and sincerely tell them: "Last time you helped me with that, I felt really warm inside." Or act clingy when sick: "I'm a bit uncomfortable, can you stay with me?" This kind of vulnerability isn't shameful, but will bring you closer.

❤️ Love ritual: Establish fixed date nights
Once a week or every two weeks, without fail, schedule time that's "just for us two." It could be watching movies, walking, or just cooking at home. The point isn't the activity itself, but the ritual of "I'm saving this time for you."

🎁 Little trick: Occasionally proactively report your whereabouts
Not because they asked, but you voluntarily sharing: "I'm at XX, just wanted to tell you." This kind of non-essential sharing will let them feel the sweetness of "being on your mind."`,

            goldenQuote: "Independence isn't distance, but loving another complete person with your complete self. Getting closer occasionally won't make you lose your freedom."
        },

        // [Advice Set 3: Trust Model Edition]
        {
            reminder: "You interpret what 'trust' means through your actions. You don't check phones, don't monitor, don't suspiciously overthink. But trust is two-way - while you give them full trust, ensure they feel it too. Sometimes, moderate 'caring' is also proof of love.",

            actionPlan: `🗣️ Communication golden phrase: "I trust you, but I also care about you"
Find a relaxed time and talk with them: "I don't often ask where you are, not because I don't care, but because I trust you. But if you're willing to tell me proactively, I'd be happy." This expresses both trust and care.

💝 Small surprise list: Prepare 5 low-cost romances
• Write a small card and hide it in their bag
• Suddenly order their favorite takeout
• Send a voice message: "Nothing, just wanted to hear your voice"
• Wake up early on weekends and make breakfast
• Buy them a small gift (under $50 type)

🎮 Relationship game: 36 questions
There's a famous "36 questions to make strangers fall in love" online - you can play an advanced version. Choose 3 questions each week and chat before bed. You'll find that even old couples can discover freshness.`,

            goldenQuote: "You've already achieved 90 points of trust, and the remaining 10 points of sweet clinginess can make your relationship go from excellent to perfect."
        },

        // [Advice Set 4: Mature Love Edition]
        {
            reminder: "Your view of love is very mature: loving someone isn't possessing them, but appreciating them. But maturity ≠ being calm to the point of boring. Love needs a little bit of 'irrational' romance. Occasionally being willful or impulsive will make your relationship more vibrant.",

            actionPlan: `🎪 Unlock new experiences: Do something you wouldn't normally do
• If you're usually very rational, take a spontaneous weekend trip
• If you're homebodies, suddenly sign up for a couples yoga class
• If you're very serious, go wild at an amusement park for a day
Break routine and create freshness.

📸 Memory bank: Create an "Our Moments" album
Not just simple photos, but record those small moments: their silly smile, the mess of you cooking together, the sunset outside and their profile. Years later when you look back, these are the most precious things.

🌙 Late-night heart-to-heart: Monthly "phone-free night"
Choose an evening, both of you put your phones in another room, and talk face-to-face until sleepy. Talk about childhood, dreams, future plans. You'll find the deepest connections happen in the simplest conversations.`,

            goldenQuote: "Mature love is letting go, but don't forget to hold hands occasionally. Too rational a relationship loses the warmth that love should have."
        },

        // [Advice Set 5: Easy Party Edition]
        {
            reminder: "If relationships had scholarships, you'd definitely get full funding every year. But being too perfect has a bug: sometimes it makes the other person feel 'I seem dispensable.' After all, that's human nature - people don't cherish what comes too easily.",

            actionPlan: `🎲 Create small tests (the benevolent kind)
• Occasionally be "cold" for half a day, then suddenly be very enthusiastic at night: "Miss you like crazy!"
• Mysteriously say "I have a secret," build suspense, then say: "The secret is I love you"
• Pretend to be angry and see how they coax you (but be moderate, don't overdo it)
These little playful moments can add bubbles to ordinary days.

🎨 Creative dates: Do things you've never done
Make a checklist, check off one each month: learn a new dish together, wander through neighborhoods you've never been to, camp indoors at home, draw each other, watch a movie neither of you is interested in and see who falls asleep first.

💌 Love post office: Write a letter to your future partner
Each write a letter to "us in 5 years," seal it and agree to open it together on a certain date. This ritual will become a small anchor point in your relationship.`,

            goldenQuote: "You're already perfect, now it's time for some 'bonus questions' - those little romances that make love sparkle."
        }
    ],

    // ==========================================
    // Level 2: Good Balance (RPI 36-50)
    // ==========================================
    2: [
        // [Advice Set 1: Golden Balance Edition]
        {
            reminder: "You've found the most comfortable state in love - caring, but not excessive; attentive, but not controlling. You get jealous over some of your partner's behaviors but can handle these emotions rationally. This 'just right' kind of love gives you both intimacy without suffocating each other.",

            actionPlan: `🎯 Emotion management: Establish a "cooling-off period"
When you feel upset, give yourself 10 minutes to cool down. Ask yourself: "Is my current emotion based on facts or imagination?" Usually these 10 minutes can help you stop 80% of things you'll regret saying.

💬 Communication upgrade: Use "I feel" instead of "You always"
For example, instead of saying "You always ignore me," change it to "When you work late, I feel a bit lonely." This way of expressing helps them listen instead of fighting back.

📅 Relationship maintenance: Monthly "our review"
Find a relaxed time to talk about what each of you did well this month, and also discuss areas for improvement. It's like giving your relationship a SPA - regular maintenance makes it last longer.`,

            goldenQuote: "You're already on the right track to a healthy relationship. Maintain this sense of balance, and learn to communicate maturely when feeling insecure, rather than suppressing or exploding."
        },

        // [Advice Set 2: Moderate Caring Edition]
        {
            reminder: "Your possessiveness is like seasoning salt - the right amount is perfect. You're not the 'so zen it's cold' type, nor the 'so loving it's suffocating' type. You mind when they chat with the opposite sex, but won't have a meltdown; you want to know where they are, but won't GPS track them. This balance is just right.",

            actionPlan: `🎭 Emotion recognition: Give your little jealousy pot a name
When jealousy appears, humorously say to yourself: "Oh, little jealousy pot is out again." This self-awareness helps you step out of emotions to see the problem, rather than being drowned by emotions.

🗨️ Expression Skills: Turn complaints into requests
Instead of saying "Why don't you spend more time with me," change it to "Let's do something together this weekend, I miss you." Same need, positive expression is easier to be fulfilled.

🎁 Surprise reserve: Prepare 3 ways to say "I love you"
Not just saying "I love you," try: giving them a massage, making their favorite food, or just quietly watching TV with them. Love has a thousand ways of expression, find your exclusive language.`,

            goldenQuote: "Staying as you are is great. When you occasionally feel insecure, try asking yourself first: 'Did I really discover a problem, or am I just scaring myself?' Most of the time, you'll find it's the latter. Take a deep breath, then go about your business."
        },

        // [Advice Set 3: Real Lover Edition]
        {
            reminder: "You're a very genuine lover. You have all the human emotions - little jealousies, little tempers - but that's exactly what makes you cute. You haven't been carried away by possessiveness; when reason returns, you always make respectful choices. Your partner feels that you both care about them and are very reasonable.",

            actionPlan: `😊 Cute expression: When you're jealous, why not directly act cute
Instead of sulking, directly say "I'm jealous." This frank expression is often more effective than cold wars, and can turn jealousy into playfulness.

🎯 Relationship positioning: Clarify your "safety boundaries"
Talk with them: What kind of interactions with the opposite sex can you both accept? What are the red lines? Turning vague unease into clear consensus can reduce a lot of unnecessary suspicion.

🌱 Growing together: Learn something new together
Sign up for a couples class (dance, baking, photography all work), in the process of learning new skills, you'll discover new sides of each other, and the relationship will become closer.`,

            goldenQuote: "When you feel jealous, why not directly act cute and say 'I'm jealous' instead of sulking. This frank expression is often more effective than cold wars, and can turn jealousy into playfulness."
        },

        // [Advice Set 4: Balance Art Edition]
        {
            reminder: "Your RPI score shows you're at the 'golden ratio point'. You have vigilance, which protects the relationship from external interference; but you don't have aggression, which protects your partner from internal pressure. You know when to be firm on principle issues and when to let things slide on small matters.",

            actionPlan: `🧘 Inner cultivation: Cultivate "emotional resilience"
Not being insensitive to their feelings, but being insensitive to external noise. Small interactions on social media, photos from colleague dinners - learn to "see them, but not take them to heart." This resilience is a required course for mature love.

💡 Empathy: Do "role reversal" once a week
Imagine if you were them, how would you feel facing your demands/emotions? This exercise can help you better understand their situation.

🎪 Life seasoning: Introduce "third-party happiness"
A world of two people easily falls into aesthetic fatigue. Introduce new elements: raise a pet, follow a drama together, or meet new friends. With common interests, the relationship will be more vibrant.`,

            goldenQuote: "Continue cultivating this wisdom. When encountering things that cause disagreement, practice empathy more often. Your balancing ability is your greatest advantage in maintaining long-term relationships."
        },

        // [Advice Set 5: Getting Better Edition]
        {
            reminder: "Your relationship is in a very good stage. There's security, but not numbness; there's caring, but not control. This state shows you've passed the out-of-control phase of the passionate period, and haven't yet reached the numbness of an old couple. Cherish this stage well.",

            actionPlan: `📖 Relationship journal: Record "our small blessings"
Not writing a diary, but recording those heart-touching moments: a warm word they said, a thoughtful gesture, or something that made you both laugh until your stomach hurt. Looking back months later, it's full of love.

🎯 Goal synchronization: Quarterly "our meeting"
Not a serious meeting, just finding time to chat: What do you want to do together next? What goals need to be achieved? This ritual will make you feel like you're "fighting side by side."

🌸 Keep it fresh: Regularly do "first times"
First time to a certain place, first time trying a certain food, first time challenging something together. These "first times" will continuously inject freshness into the relationship.`,

            goldenQuote: "You're in the most beautiful stage: with the afterglow of passion and the backdrop of trust. Keep this rhythm, and love will become richer and thicker."
        }
    ],

    // ==========================================
    // Level 3: Moderately High (RPI 51-70)
    // ==========================================
    3: [
        // [Advice Set 1: Crossroads Edition]
        {
            reminder: "Your possessiveness index is at the moderately high level, which means you're standing at a crossroads: to the left is healthy concern, to the right is excessive control. Right now, you're quite sensitive to your partner's behaviors and want to keep track of their movements. Although not yet to the point of suffocating them, there are moments when they might already feel pressure.",

            actionPlan: `⚠️ Timely braking: Recognize signs of "rising control desire"
When you find yourself starting to frequently check their social media, asking about their whereabouts, or getting anxious because they didn't reply immediately, that's the signal. Tell yourself: "Pause, I need to calm down."

🌳 Cultivate hobbies: Rediscover happiness that "doesn't depend on them"
Starting this week, find a hobby that's completely yours (fitness, painting, learning a language all work). Spend at least 3 hours on it each week. The more fulfilled you are, the less you'll focus all your attention on your partner.

💬 Honest dialogue: "I've been a bit anxious lately"
Find an appropriate time and honestly tell them: "I've noticed I've been a bit clingy/suspicious lately, which might make you uncomfortable. I'm trying to adjust, but if I go too far, please remind me." This self-awareness will make them understand you better.`,

            goldenQuote: "This is a critical point that needs attention. If not careful, your 'caring' might slowly turn into 'monitoring.' It's recommended to start cultivating your own hobbies and establish an independent social circle. Remember: The more fulfilled you are, the less you'll focus all your attention on your partner."
        },

        // [Advice Set 2: Honest Confrontation Edition]
        {
            reminder: "To be honest, you care a bit too much about your partner. A social media post, a like, a late return home - all these can create waves in your heart. It's not that you don't trust them, but that you're too afraid of losing them. This anxiety is gradually affecting the quality of your time together.",

            actionPlan: `🛑 Stop, take a deep breath
Ask yourself: What am I really afraid of? Am I afraid they'll change their heart, or that I'm not good enough? Finding the root of your fear is the only way to truly solve the problem. Maybe what you need isn't a 'more honest' partner, but a stronger version of yourself.

📵 Digital detox: Set "no phone time"
From 8 PM to 10 PM every day, put your phone in another room. Don't check their social media, don't read chat records, don't wait for message replies. Use these two hours to do something that makes you happy. You'll discover the world won't collapse because you're not staring at your phone.

🎯 Rebuild confidence: Create an "I'm great" list
Write down 10 things you do well (unrelated to your partner). Work achievements, personal skills, friends' evaluations... anything that proves "I have value." Read it every day, reminding yourself: I deserve to be loved, not because I can control others, but because I'm inherently good.`,

            goldenQuote: "Stop, take a deep breath. Ask yourself: What am I really afraid of? Am I afraid they'll change their heart, or that I'm not good enough? Finding the root of your fear is the only way to truly solve the problem. Maybe what you need isn't a 'more honest' partner, but a stronger version of yourself."
        },

        // [Advice Set 3: Gray Zone Edition]
        {
            reminder: "You're in the 'gray zone' of possessiveness - not yet bad enough to break the relationship, but already starting to affect your daily interactions. Your partner might feel a bit tired being with you, needing to constantly watch your emotions; and you're also tired, always spending your days worrying, doubting, and feeling anxious.",

            actionPlan: `🎭 Role play: Be a "zero possessiveness" person for a day
Pick a weekend and deliberately practice not asking about their whereabouts at all, not checking their phone, not asking about anything. Act like you're a 'zen lover.' Experience that relaxed feeling, and you'll find the sky won't fall.

🧘 Meditation practice: 10 minutes daily of "letting go of attachments"
Find a quiet place, close your eyes and breathe deeply. Imagine putting all your worries and suspicions about them into a balloon, then let it go and watch it fly away. This isn't giving up loving them, but letting go of the attachment to control.

📞 Seek help from friends: Find an "emotional trash can"
When you want to check on them again, or feel angry, first call a rational friend and vent for 10 minutes. Let the friend help you judge: have you really discovered a problem, or are you just scaring yourself? Usually it's the latter.`,

            goldenQuote: "It's time to make a change. This anxiety will drain your energy and turn you into someone you don't even like. Start small: don't check their social media today, don't ask about their whereabouts this weekend - try it, you'll see the sky won't fall."
        },

        // [Advice Set 4: Inner Child Edition]
        {
            reminder: "Inside you might live an 'insecure child.' When your partner is out of sight, this child starts crying, making you want to hold on tighter. This isn't because you're dominant, but precisely because you're soft and vulnerable inside.",

            actionPlan: `🧸 Soothe the inner child: Self-dialogue practice
When anxiety strikes, imagine you're comforting a scared child. Tell them: "I know you're afraid of being abandoned, but you're safe. Your partner loves you, even when they're not physically with you right now." Use adult reason to soothe your inner emotions.

💪 Build self-worth: Do something "to be proud of yourself"
It could be completing a work goal, learning a new skill, or helping a friend. Let yourself feel that "I have value, even when they're not by my side."

🎨 Emotional outlet: Find a healthy way to vent
Write in a journal, draw, run, play games... find a way to release anxiety that doesn't harm the relationship. Don't make your partner your only emotional outlet; that's too heavy for them.`,

            goldenQuote: "Try to soothe that inner child instead of controlling your partner to relieve the pain. Tell yourself: 'I am worthy of love, even when they're not physically with me right now.' This ability to self-soothe is a required course for your growth."
        },

        // [Advice Set 5: Hourglass Effect Edition]
        {
            reminder: "You're playing a dangerous game: trying to hold onto sand by tightening your grip. But common sense tells us that the tighter you grip, the faster the sand slips away. Your frequent confirmations and check-ins might be pushing your partner away.",

            actionPlan: `✋ Letting go practice: Trust muscle training
Trust is like a muscle - it needs to be exercised. The next time you want to check on them, force yourself to resist and do something else instead. Every act of restraint is training your 'trust muscle.' A month later, you'll find this impulse has weakened significantly.

🎯 Shift focus: Invest energy in yourself
Create a 30-day self-improvement plan: read 3 books, learn to cook 5 new dishes, or lose 5 pounds. Shift the energy you spend staring at them to investing in yourself. A month later, you'll become more attractive, not more anxious.

📝 Record growth: Write "Today I didn't..." daily
"Today I didn't check their chat records," "Today I didn't ask about their whereabouts"... record one impulse you resisted each day. Looking back a month later, you'll be proud of your progress.`,

            goldenQuote: "Try to let go. Trust is like a muscle - it needs to be exercised. The next time you want to check on them, force yourself to resist and do something else instead. Every act of restraint is training your 'trust muscle'."
        }
    ],

    // ==========================================
    // Level 4: High Level (RPI 71-85)
    // ==========================================
    4: [
        // [Advice Set 1: Serious Warning Edition]
        {
            reminder: "Your possessiveness has reached a point that needs serious attention. You might frequently check your partner's phone, question their whereabouts, and even get angry over small things. You tell yourself 'this is because I love them too much,' but this high-pressure interaction pattern is rapidly draining your relationship.",

            actionPlan: `🚨 Emergency brake: Recognize the seriousness
This is no longer at the level of "small jealousy." If you don't make changes immediately, your interaction pattern will become increasingly exhausting. Imagine this: if someone treated you this way, how long could you endure it? It's time to see things from their perspective.

🧘 Emotion management: Establish a "cooling SOP"
Create a standard procedure: when you want to get angry/check on them, ① leave the scene ② take 10 deep breaths ③ drink a glass of water ④ ask yourself "is this worth it?" ⑤ if you still think it's worth it, communicate in a calm tone. These 5 steps can help you avoid 90% of impulsive behaviors.

🎯 Rebuild life: Schedule a "fully packed" week for yourself
Sign up for classes, meet friends, visit exhibitions, exercise... fill every day. When you're too busy to overthink, you'll find the relationship has actually become much more relaxed.`,

            goldenQuote: "This is a serious reminder: if you don't make changes immediately, your interaction pattern will become increasingly exhausting. Try to give each other more freedom and refocus your attention back on yourself. When you become sparkling again, your relationship will also be more relaxed and beautiful."
        },

        // [Advice Set 2: Direct Introspective Edition]
        {
            reminder: "Let's be honest: you're using the name of 'love' to do things that drain the relationship. Monitoring phones, excessive questioning... these behaviors are gradually consuming your partner's patience with you. You might think 'if they really loved me, they should understand me,' but put yourself in their shoes: how long could you tolerate someone doing this to you?",

            actionPlan: `🪞 Brutal mirror: Record yourself when angry
Next time you lose emotional control, ask a friend to help you record it (video or audio). After you calm down, watch that hysterical person. Ask yourself: Is this who I want to be? This kind of shocking education is often more effective than any preaching.

📵 Forced isolation: Physically stay away from temptation
Set their social accounts to "don't see their updates," delete location sharing, you can even give your phone to a friend to keep for a few hours. Use physical isolation to combat psychological impulses. It will be uncomfortable at first, but after persisting for a week, you'll adapt.

💬 Honest communication: "I know I have a problem"
Find time to seriously tell them: "I know my recent behavior has been very tiring for you. I'm trying to change, but it might take time. If I mess up again, please tell me directly instead of enduring it." This kind of honesty is the first step to rebuilding trust.`,

            goldenQuote: "It's time to face reality. What you need isn't a 'more obedient' partner, but to shift your energy from monitoring to self-development. For your own sake, seriously address and change this interaction pattern, because this anxiety is mainly torturing yourself."
        },

        // [Advice Set 3: Gentle Understanding Edition]
        {
            reminder: "I can feel the fear and insecurity inside you. You act this way not because you're bad, but because you're too afraid - afraid of being ignored, afraid of not being good enough. You try to gain security by controlling your partner. But ironically, the tighter you hold on, the heavier your interactions become.",

            actionPlan: `💝 Self-healing: Find the source of your fear
Calm down and ask yourself: What am I really afraid of? Was it lack of love in childhood? Hurt by an ex? Or lack of confidence in yourself? Only by finding the root can you prescribe the right medicine. If necessary, seek help from a psychological counselor - there's no shame in this.

🌱 Small steps forward: Set "micro-goals"
Don't expect to become a zen lover overnight. Start with small goals: don't check your phone today, don't ask about their whereabouts tomorrow, try to believe what they say the day after tomorrow. Reward yourself for each small goal completed.

🤝 Seek support: Tell them you're trying
"I know my anxiety has brought pressure on you. I'm seeking help (seeing a psychologist/reading books/practicing meditation). This process might have setbacks, and I hope you can understand." Letting them know you're trying will make them more willing to accompany you through this period.`,

            goldenQuote: "You deserve to be loved and to have a healthy relationship. But first, you need to learn to love yourself and trust yourself. True security can only come from your inner strength, not your partner's phone password or location reports."
        },

        // [Advice Set 4: Role Metaphor Edition]
        {
            reminder: "Your relationship pattern has already shown red flags. You've made yourself the 'police' of this relationship, while your partner has become the 'suspect.' Every day is spent in interrogation and defense, and this high-pressure environment will quickly diminish the sweetness of love.",

            actionPlan: `👮 Take off your police badge: Stop law enforcement
Love isn't law enforcement; it doesn't need evidence. Try giving your partner even one day of complete trust - no checking phones, no asking about whereabouts, no questioning explanations. Record your feelings that day: did the sky fall? Or was it actually not that scary?

🎭 Change the script: From interrogator to listener
Stop using questioning tones. Next time you want to ask "Where did you go? Who were you with?" change it to "How was your day? Anything happy happen?" It's the same way of understanding them, but gentle inquiry is more effective than interrogation.

📚 Self-education: Understand "controlling personality"
Read some psychology books (recommend "Attached," "The Fear of Intimacy"), understand why you have this tendency. Knowledge is the first step to change.`,

            goldenQuote: "Take off your police badge. Love isn't law enforcement; it doesn't need evidence. Try giving your partner even one day of complete trust and see what happens. You'll discover that the ease brought by trust is far more valuable than the pain brought by suspicion."
        },

        // [Advice Set 5: Erratic Edition]
        {
            reminder: "Your RPI score shows that you crave intimacy but fear being hurt. This contradiction makes you erratic: sometimes extremely good to them, sometimes emotionally explosive. This is a huge emotional test for your partner.",

            actionPlan: `📊 Emotion tracking: Monitor your fluctuation patterns
Every evening, spend 5 minutes recording your emotional state for the day (1-10 points) and triggers. After a week, review and you'll find some patterns: what situations make you lose control easily? Is it work stress? Menstrual cycle? Or specific behaviors of theirs? Finding patterns helps you prevent in advance.

🎯 Set boundaries: Establish "emotion traffic lights"
Agree on a system with them:
• Green light: I'm in a good state, can discuss any topic
• Yellow light: I'm a bit irritable, might speak harshly, but it's not directed at you
• Red light: I'm in a very bad emotional state, need to be alone for a while
This way they won't be confused, and you'll have buffer space.

🧘 Emotion first aid: Prepare your "calming toolkit"
Keep some things in your bag or car that can help you calm down quickly: mints, stress balls, headphones (with soothing music stored), or a small card with "Deep breath, it's not the end of the world." Use them when emotions run high.`,

            goldenQuote: "Please learn more relationship skills. When emotions run high, give yourself a '10-minute cooling period' and communicate after you've calmed down. Use reason to manage emotions, don't let emotions dominate the relationship."
        }
    ],

    // ==========================================
    // Level 5: Very High Level (RPI 86-100)
    // ==========================================
    5: [
        // [Advice Set 1: Gentle Focus Edition]
        {
            reminder: "You're someone who can be 'crazy in love,' easily completely consumed by this relationship. You might invest most of your happiness and energy into your partner, causing yourself to easily fall into emotional whirlpools. Your love is deep, but your way of expressing it might be too heavy, making both of you feel breathless.",

            actionPlan: `🎯 Life restart: Press the "personal life restart button"
Now it's time to take back your own life. Divide the 80% of attention you give your partner, with 40% for yourself. Sign up for classes, learn new skills, pick up old hobbies. Not for them, purely for yourself.

💪 Rebuild confidence: Complete one "I'm great" thing weekly
Set small goals: learn a new dish this week, finish a book, run 5 kilometers, or help a friend solve a problem. After completing each one, note "I accomplished XX" in your phone memo. A month later, you'll find you're much stronger than you imagined.

🌈 Expand social life: At least one "no-partner social" weekly
Meet old friends for meals, join interest groups, or just sit alone in a café. Rediscover the "you who can be happy without depending on anyone." Remember: what attracted them was the you who shines independently.`,

            goldenQuote: "It's time to press the 'personal life restart button.' Shift 40% of the 80% attention you give your partner to yourself. Challenge yourself to try a completely new sport or hobby, and you'll soon discover that when you love yourself more, your attractiveness will multiply."
        },

        // [Advice Set 2: Charm Recovery Edition]
        {
            reminder: "In your world, this relationship takes up too much space, causing your personal radiance to be somewhat overshadowed. Once your partner is not around, you might feel intense emptiness and anxiety. This state drains yourself and also makes what was once an easy relationship become exhausting.",

            actionPlan: `📅 Forced scheduling: 3 "my times" weekly
Monday, Wednesday, Friday evenings, this is "my time" - no meeting them, no chatting, focus on your own things. You can exercise, read, meet friends, study, or even daydream. It will be uncomfortable at first, but stick with it for a month, and you'll love this feeling.

💰 Invest in yourself: "Recharge" your account
Not just money, but time, energy, and attention. Take all the time you spend on anxiety, suspicion, checking up, and invest it back in yourself. Take a course, get a certification, or just take good care of your skin. When you become better, the relationship will naturally improve.

🎭 Role practice: Pretend you're single
This isn't really breaking up, but a thought experiment. If you were single right now, how would you arrange today? Where would you go? What would you do? Then actually do it. You'll discover you can live wonderfully without them.`,

            goldenQuote: "Please give yourself a long vacation, taking a short break from your 'relationship duties.' Create a 'happiness list' with things that can make you happy alone. Remember, the way you originally attracted them was your independently shining self."
        },

        // [Advice Set 3: Light Challenge Edition]
        {
            reminder: "I must tell you a secret: the most tired person right now is yourself. You spend too much time worrying, guessing, and confirming, and this anxiety is draining your energy. This heavy interaction pattern will make both you and your partner lose the joy of love.",

            actionPlan: `🎮 Gamified change: 30-day "trust challenge"
Turn change into a game. Make a check-in sheet, complete one small task daily:
• Days 1-3: Don't actively ask "what are you doing"
• Days 4-7: Don't check their social media
• Days 8-14: Don't contact them after 9 PM
• Days 15-21: Do something you want to do alone
• Days 22-30: Give them a completely free weekend
Give yourself a small reward for each day completed.

🎨 Creative outlet: Find an artistic release
Don't make your partner your only emotional trash can. Draw, write, sing, dance... any way that lets you release emotions works. Transform that anxiety, unease, and suspicion into creative energy.

🤝 Walk together: Find a "fellow sufferer" friend
If you have friends with this personality type, agree to supervise each other. Every time you want to check on them, call your friend and chat for 10 minutes first. Let your friend be your "reason agent."`,

            goldenQuote: "Let's play a little game: set yourself a 'trust week' challenge. For one week, force yourself to have 'selective blindness' about your partner's whereabouts and social activities, using the saved energy to laugh heartily with friends or learn a new skill. You'll discover that life is far more wonderful than you imagine."
        },

        // [Advice Set 4: Relationship Ventilation Edition]
        {
            reminder: "Your love is like an airtight net - though intended to protect the relationship, it makes the person inside lose breathing space. You might unconsciously make your partner feel strongly confined. Love is about wanting both people to be free, not trapping each other.",

            actionPlan: `🌬️ Relationship ventilation: Proactively propose "breathing time"
Don't wait until they can't stand it and suggest breaking up. Proactively propose: "This weekend we'll each hang out with friends, no contact, no checking up, meet Sunday evening to share our happy times." This proactive letting go will actually make them more grateful.

💬 Honest dialogue: Admit your anxiety
Find an appropriate time and say calmly: "I've noticed I've been a bit too clingy lately. I'm trying to adjust, to give you more freedom and also give myself more space. If you feel I'm 'relapsing,' please remind me directly."

🎯 Set boundaries: Make rules for yourself
Write them down and post them somewhere visible:
• Don't check their social media late at night
• Don't ask the same question more than twice
• When they say "I'm busy," accept it without further questions
• Give yourself 2 hours daily not to think about them
These are the bottom lines you set for yourself, follow them.`,

            goldenQuote: "Please 'air out' your relationship. You can have an honest chat with your partner (in a light tone): 'I've noticed I've been a bit too clingy lately. I plan to give you more freedom and also give myself more space.' Taking the initiative to adjust will show your partner your willingness to improve for the relationship."
        },

        // [Advice Set 5: Self-Value Enhancement Edition]
        {
            reminder: "You might unknowingly put all your eggs in the 'love' basket. Once this basket wobbles a bit, you'll feel it's the end of the world. What you need are a few more sturdy 'baskets' - like friendship, career, personal achievements.",

            actionPlan: `📚 Arm yourself with knowledge: Systematically study "secure attachment"
Recommended reading list:
• "Attached: The New Science of Adult Attachment"
• "The Courage to Be Disliked"
• "Understanding Life"
Understand where your anxiety comes from to know how to solve it. Read 30 minutes daily, take reading notes. Knowledge is the beginning of change.

💼 Career focus: Step up your work/studies
Set a 3-month career goal: promotion, learning new skills, completing a project. Shift the energy you spend staring at your partner to improving yourself. When you have a sense of achievement at work, obsession with love will naturally lessen.

🏃 Physical revolution: Establish exercise habits
Anxiety is largely a physical problem. Exercise 3 times a week, 30+ minutes each time. Running, swimming, yoga, boxing... any exercise that makes you sweat. When your body is healthy, your mental state will also improve a lot.`,

            goldenQuote: "For your own happiness, you must now rebalance your life. Immediately pick up interests you once set aside, or get to know some new friends. Only when you become a fulfilled individual again will your love become relaxed, interesting, and indestructible."
        }
    ]
};

/**
 * Modified generateGoals function - using new advice library
 */
function generateGoals(rpi, level) {
    // Randomly select a set of advice from the corresponding Level
    const goalsOptions = personalizedGoalsLibrary[level];

    if (!goalsOptions || goalsOptions.length === 0) {
        // If no corresponding advice available, return default content
        return `💡 Personalized Advice
Based on your RPI score, we recommend:
• Maintain a balanced relationship
• Give each other appropriate space
• Learn to express emotional needs healthily`;
    }

    // Randomly select one set
    const selected = goalsOptions[Math.floor(Math.random() * goalsOptions.length)];

    // Return formatted text directly
    const reminder = selected.reminder || selected.reminder || 'No specific reminder available';
    const action = selected.actionPlan || selected.actionPlan || 'No specific action plan available';
    const quote = selected.goldenQuote || selected.goldenQuote || 'No specific quote available';

    return `⚠️ Gentle Reminder
${reminder}

📋 Action Plan
${action}

💎 Golden Quote
${quote}`;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        personalizedGoalsLibrary,
        generateGoals
    };
}

if (typeof window !== 'undefined') {
    window.personalizedGoalsLibrary = personalizedGoalsLibrary;
    window.generateGoals = generateGoals;
}

console.log('✅ personalizedGoalsLibrary loaded - 5 Levels total, 5 advice sets per Level');

/**
 * Identify complex dimension combination patterns
 */
function identifyDimensionPatterns(dimensions) {
    const d = dimensions;
    const patterns = [];

    // Triple high combination: control, jealousy, dependency all high
    if (d.control.percent > 70 && d.jealousy.percent > 70 && d.dependency.percent > 70) {
        patterns.push(dimensionCombinationLibrary.tripleHigh);
    }

    // High control low dependency: independent controller
    else if (d.control.percent > 70 && d.dependency.percent < 40) {
        patterns.push(dimensionCombinationLibrary.controlButIndependent);
    }

    // Low control high jealousy: repressed anxious person
    else if (d.control.percent < 40 && d.jealousy.percent > 70) {
        patterns.push(dimensionCombinationLibrary.jealousButNotControlling);
    }

    // High dependency low security: anxious attachment
    else if (d.dependency.percent > 70 && d.security.percent > 70) {
        patterns.push(dimensionCombinationLibrary.anxiousAttachment);
    }

    // Four dimensions balanced: mature lover
    else if (Math.max(d.control.percent, d.jealousy.percent, d.dependency.percent, d.security.percent) < 60) {
        patterns.push(dimensionCombinationLibrary.balanced);
    }

    // High control low jealousy: rational controller
    else if (d.control.percent > 70 && d.jealousy.percent < 40) {
        patterns.push(dimensionCombinationLibrary.controlButNotJealous);
    }

    return patterns;
}

/**
 * Get deep analysis for dimension
 */
function getDimensionDeepAnalysis(dimensionName, score) {
    const analysis = dimensionDeepAnalysis[dimensionName];
    if (!analysis) return null;

    // Determine which level based on score
    if (score <= 10) return analysis.veryLow;
    if (score <= 25) return analysis.low;
    if (score <= 35) return analysis.medium;
    if (score <= 43) return analysis.high;
    return analysis.veryHigh;
}

/**
 * Generate personalized analysis content
 */
function generatePersonalizedAnalysis(rpi, level, dimensions) {
    // Randomly or sequentially select a description from enhancedRPIAnalysis
    const rpiDescriptions = enhancedRPIAnalysis[level];
    const selected = rpiDescriptions[Math.floor(Math.random() * rpiDescriptions.length)];

    return {
        meaning: selected.meaning,
        levelAdvice: selected.suggestion,
        goals: generateGoals(rpi, level),
        tone: selected.tone
    };
}

/**
 * Determine RPI level (1-5)
 */
function determineLevel(rpi) {
    if (rpi < 36) return 1;      // Healthy level
    if (rpi < 51) return 2;      // Good level
    if (rpi < 71) return 3;      // Moderately high
    if (rpi < 86) return 4;      // Needs attention
    return 5;                     // Serious level
}

/**
 * Get level name
 */
function getLevelName(level) {
    const names = {
        1: "Healthy (Free & Easy)",
        2: "Good (Just Right)",
        3: "Moderate (Needs Attention)",
        4: "High (Needs Serious Attention)",
        5: "Very High (Love to the Extreme)"
    };
    return names[level] || "Unknown";
}

/**
 * Get level color
 */
function getLevelColor(level) {
    const colors = {
        1: "#64c864",   // Green
        2: "#90c890",   // Light green
        3: "#ffc864",   // Yellow
        4: "#ff9264",   // Orange
        5: "#ff6b9d"    // Red
    };
    return colors[level] || "#999";
}

/**
 * Calculate percentile
 */
function calculatePercentile(rpi) {
    // Simplified version: estimated based on normal distribution
    const percentile = Math.min(95, Math.max(5, Math.round((rpi / 100) * 100)));
    return `Exceeds ${percentile}% of test takers`;
}

/**
 * Main calculation function: Calculate RPI and all related data
 */
function calculateRPI(answers, testMode = 'self') {
    console.log('=== Starting RPI Calculation ===');
    console.log('Answer array:', answers);
    console.log('Test mode:', testMode);

    // Ensure there are 42 answers
    if (!answers || answers.length !== 42) {
        console.error('❌ Incorrect number of answers, need 42 answers, current:', answers?.length);
        return null;
    }

    // Calculate scores for four dimensions
    const dimensions = calculateDimensions(answers);
    console.log('Dimension calculation results:', dimensions);

    // Calculate total RPI score (weighted average of four dimensions)
    const rpi = Math.round(
        (dimensions.control.score +
         dimensions.jealousy.score +
         dimensions.dependency.score +
         dimensions.security.score) / 2
    );

    console.log('RPI total score:', rpi);

    // Determine level
    const level = determineLevel(rpi);
    console.log('Level:', level);

    // Identify dimension combination patterns
    const patterns = identifyDimensionPatterns(dimensions);
    console.log('Identified patterns:', patterns);

    // Add deep analysis and combination patterns for each dimension
    Object.keys(dimensions).forEach(key => {
        dimensions[key].deepAnalysis = getDimensionDeepAnalysis(key, dimensions[key].score);
        dimensions[key].patterns = patterns;
    });

    // Generate personalized analysis
    const personalizedAnalysis = generatePersonalizedAnalysis(rpi, level, dimensions);

    // Return complete result
    const result = {
        rpi,
        level,
        levelName: getLevelName(level),
        levelColor: getLevelColor(level),
        percentile: calculatePercentile(rpi),
        testMode,
        timestamp: new Date().toISOString(),
        dimensions,
        personalizedAnalysis
    };

    console.log('=== Final Result ===');
    console.log(result);

    return result;
}

/**
 * Calculate scores for four dimensions - Fixed version
 */
function calculateDimensions(answers) {
    console.log('Starting dimension calculation, total answers:', answers.length);

    // Question assignment
    // Control Desire: Q1-Q11 (11 questions, index 0-10)
    // Jealousy Intensity: Q12-Q22 (11 questions, index 11-21)
    // Emotional Dependency: Q23-Q33 (11 questions, index 22-32)
    // Relationship Security: Q34-Q42 (9 questions, index 33-41)

    const controlAnswers = answers.slice(0, 11);
    const jealousyAnswers = answers.slice(11, 22);
    const dependencyAnswers = answers.slice(22, 33);
    const securityAnswers = answers.slice(33, 42);

    console.log('Number of questions per dimension:', {
        control: controlAnswers.length,
        jealousy: jealousyAnswers.length,
        dependency: dependencyAnswers.length,
        security: securityAnswers.length
    });

    // Calculate raw scores for each dimension (average of 1-5 scale)
    const controlRaw = calculateAverage(controlAnswers);
    const jealousyRaw = calculateAverage(jealousyAnswers);
    const dependencyRaw = calculateAverage(dependencyAnswers);
    const securityRaw = calculateAverage(securityAnswers);

    console.log('Raw average scores:', {
        control: controlRaw,
        jealousy: jealousyRaw,
        dependency: dependencyRaw,
        security: securityRaw
    });

    // Convert to 0-50 scale
    // Formula: (average score - 1) * (50 / 4) = (average score - 1) * 12.5
    const controlScore = Math.round((controlRaw - 1) * 12.5);
    const jealousyScore = Math.round((jealousyRaw - 1) * 12.5);
    const dependencyScore = Math.round((dependencyRaw - 1) * 12.5);
    const securityScore = Math.round((securityRaw - 1) * 12.5);

    console.log('Converted scores (0-50):', {
        control: controlScore,
        jealousy: jealousyScore,
        dependency: dependencyScore,
        security: securityScore
    });

    return {
        control: {
            score: controlScore,
            percent: Math.round((controlScore / 50) * 100),
            description: getDimensionDescription('control', controlScore)
        },
        jealousy: {
            score: jealousyScore,
            percent: Math.round((jealousyScore / 50) * 100),
            description: getDimensionDescription('jealousy', jealousyScore)
        },
        dependency: {
            score: dependencyScore,
            percent: Math.round((dependencyScore / 50) * 100),
            description: getDimensionDescription('dependency', dependencyScore)
        },
        security: {
            score: securityScore,
            percent: Math.round((securityScore / 50) * 100),
            description: getDimensionDescription('security', securityScore)
        }
    };
}

/**
 * Calculate average score
 */
function calculateAverage(answers) {
    if (!answers || answers.length === 0) {
        console.error('Answer array is empty');
        return 1;
    }
    const sum = answers.reduce((acc, val) => acc + (val || 1), 0);
    return sum / answers.length;
}

/**
 * Get dimension description
 */
function getDimensionDescription(dimensionName, score) {
    const descriptions = {
        control: {
            low: "You give your partner full autonomy and respect their independence.",
            medium: "You hope to participate in some of your partner's decisions, but usually maintain boundaries.",
            high: "You have strong controlling tendencies, wanting to know and influence your partner's decisions. Recommend learning to respect their independence and give more trust and space."
        },
        jealousy: {
            low: "You rarely feel jealous and have full trust in your partner.",
            medium: "You get moderately jealous but can control emotions rationally.",
            high: "When your partner interacts with the opposite sex, you feel strong unease. Moderate jealousy shows you care, but excessive jealousy damages the foundation of trust."
        },
        dependency: {
            low: "You maintain good independence with your own life center.",
            medium: "You have some dependency on your partner but can maintain basic independence.",
            high: "You have strong emotional dependency on your partner but can still maintain basic independence. Continue cultivating your own hobbies and maintain space for self-growth."
        },
        security: {
            low: "You're full of confidence in the relationship with inner security and stability.",
            medium: "Your sense of security is at a normal level, with occasional worries.",
            high: "Your sense of security is at a medium level, occasionally worrying about losing your partner. Building inner security is key to reducing possessiveness."
        }
    };

    const level = score < 20 ? 'low' : score < 35 ? 'medium' : 'high';
    return descriptions[dimensionName][level];
}

/**
 * Save test results to localStorage
 */
function saveResult(result) {
    try {
        const history = JSON.parse(localStorage.getItem('rpiTestHistory') || '[]');
        history.unshift(result);

        // Keep only the most recent 10 records
        if (history.length > 10) {
            history.pop();
        }

        localStorage.setItem('rpiTestHistory', JSON.stringify(history));
        localStorage.setItem('latestRpiResult', JSON.stringify(result));
        console.log('✅ Results saved to localStorage');
    } catch (error) {
        console.error('❌ Failed to save results:', error);
    }
}

/**
 * Get historical test records
 */
function getTestHistory() {
    try {
        return JSON.parse(localStorage.getItem('rpiTestHistory') || '[]');
    } catch (error) {
        console.error('Failed to read history:', error);
        return [];
    }
}

/**
 * Get latest test result
 */
function getLatestResult() {
    try {
        return JSON.parse(localStorage.getItem('latestRpiResult') || 'null');
    } catch (error) {
        console.error('Failed to read latest result:', error);
        return null;
    }
}

// ============================================
// Export functions (for modular or browser environment)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        calculateRPI,
        saveResult,
        getTestHistory,
        getLatestResult,
        enhancedRPIAnalysis,
        dimensionCombinationLibrary,
        dimensionDeepAnalysis,
        generateGoals,
        identifyDimensionPatterns,
        getDimensionDeepAnalysis
    };
}

// Premium Report Handler
function handlePremiumReport() {
    alert('🚀 Premium version coming soon! \n\nFeatures include:\n• Complete possessiveness pattern analysis\n• Detailed relationship breakdown\n• Personalized development strategies\n• Partner compatibility assessment\n• Communication improvement guides\n• Relationship-building recommendations\n• Advanced insights for emotional health\n\nPrice: $1.90 (Limited time offer!)');
}

// Mount to window object in browser environment
if (typeof window !== 'undefined') {
    window.calculateRPI = calculateRPI;
    window.saveResult = saveResult;
    window.getTestHistory = getTestHistory;
    window.getLatestResult = getLatestResult;
    window.enhancedRPIAnalysis = enhancedRPIAnalysis;
    window.dimensionCombinationLibrary = dimensionCombinationLibrary;
    window.dimensionDeepAnalysis = dimensionDeepAnalysis;
    window.generateGoals = generateGoals;
    window.identifyDimensionPatterns = identifyDimensionPatterns;
    window.getDimensionDeepAnalysis = getDimensionDeepAnalysis;
    window.handlePremiumReport = handlePremiumReport;
}

console.log('✅ scoring.js loaded');