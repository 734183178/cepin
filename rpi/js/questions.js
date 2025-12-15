// questions.js - Romantic Possessiveness Test Questions Data (Dual-Mode Version)
// Supports both self-assessment and partner assessment modes

/**
 * Question data - Each question contains two versions
 * selfVersion: Self-assessment version (You would...)
 * partnerVersion: Partner assessment version (They would...)
 */
const questions = [
    // 🎯 Dimension 1: Control Desire (10 questions)
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "How do you feel when your partner goes out alone with friends of the opposite gender?",
            subtitle: "Understanding your daily reactions - Choose based on your true feelings"
        },
        partnerVersion: {
            question: "How does your partner react when you go out alone with friends of the opposite gender?",
            subtitle: "Understanding their daily reactions - Choose based on the actual situation"
        },
        options: {
            self: [
                "Completely don't mind, trust their judgment",
                "A bit concerned, but won't show it",
                "Feel uneasy, want to know the details",
                "Very concerned, will clearly express opposition",
                "Unacceptable, feel it's disrespectful to the relationship"
            ],
            partner: [
                "Completely don't mind, trust my judgment",
                "A bit concerned, but won't show it",
                "Feel uneasy, want to know the details",
                "Very concerned, will clearly express opposition",
                "Unacceptable, feel it's disrespectful to the relationship"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "Do you check your partner's phone or social media?",
            subtitle: "Understanding your daily reactions - Please answer honestly"
        },
        partnerVersion: {
            question: "Does your partner check your phone or social media?",
            subtitle: "Understanding their daily reactions - Please answer honestly"
        },
        options: {
            self: [
                "Never, it's a privacy issue",
                "Occasionally want to check, but will restrain myself",
                "Sometimes check with their permission",
                "Often check, feel couples shouldn't have secrets",
                "Secretly check, worried about finding something"
            ],
            partner: [
                "Never, they respect privacy",
                "Occasionally want to check, but will restrain themselves",
                "Sometimes check with my permission",
                "Often check, feel couples shouldn't have secrets",
                "Secretly check, worried about finding something"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "When your partner wants to attend a friend gathering alone, you would?",
            subtitle: "Understanding your daily reactions"
        },
        partnerVersion: {
            question: "When you want to attend a friend gathering alone, they would?",
            subtitle: "Understanding their daily reactions"
        },
        options: {
            self: [
                "Completely support, everyone needs their own social space",
                "A bit disappointed, but will support them going",
                "Hope they'll take me along",
                "Will ask many details: who's going, where, etc.",
                "Don't want them to go, feel they should spend more time with me"
            ],
            partner: [
                "Completely support, everyone needs their own social space",
                "A bit disappointed, but will support me going",
                "Hope I'll take them along",
                "Will ask many details: who's going, where, etc.",
                "Don't want me to go, feel I should spend more time with them"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "Do you want to know your partner's detailed daily schedule?",
            subtitle: "Understanding your daily reactions"
        },
        partnerVersion: {
            question: "Does your partner want to know your detailed daily schedule?",
            subtitle: "Understanding their daily reactions"
        },
        options: {
            self: [
                "Don't need to, trust they'll tell me important things",
                "Just want a general idea is fine",
                "Want to know the main arrangements",
                "Want to know a relatively detailed schedule",
                "Want to know where they are and what they're doing at all times"
            ],
            partner: [
                "Don't need to, trust I'll tell them important things",
                "Just want a general idea is fine",
                "Want to know the main arrangements",
                "Want to know a relatively detailed schedule",
                "Want to know where I am and what I'm doing at all times"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "When your partner wants to keep some private space, you feel?",
            subtitle: "Understanding your daily reactions"
        },
        partnerVersion: {
            question: "When you want to keep some private space, they feel?",
            subtitle: "Understanding their daily reactions"
        },
        options: {
            self: [
                "Completely understand, this is normal",
                "Can understand, though a bit curious",
                "Feel uneasy, worried they're hiding something",
                "Very uncomfortable, feel couples shouldn't have secrets",
                "Unacceptable, feel excluded"
            ],
            partner: [
                "Completely understand, this is normal",
                "Can understand, though a bit curious",
                "Feel uneasy, worried I'm hiding something",
                "Very uncomfortable, feel couples shouldn't have secrets",
                "Unacceptable, feel excluded"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "Do you intervene in your partner's clothing and dressing style?",
            subtitle: "Deep emotional mode"
        },
        partnerVersion: {
            question: "Does your partner intervene in your clothing and dressing style?",
            subtitle: "Deep emotional mode"
        },
        options: {
            self: [
                "Never, they have their own aesthetics and style",
                "Occasionally give suggestions",
                "Will subtly remind if too revealing",
                "Often express my preferences, hope they'll cooperate",
                "Will directly demand they dress according to my ideas"
            ],
            partner: [
                "Never, I have my own aesthetics and style",
                "Occasionally give suggestions",
                "Will subtly remind if too revealing",
                "Often express their preferences, hope I'll cooperate",
                "Will directly demand I dress according to their ideas"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "If your partner has close friends of the opposite gender, would you ask them to reduce contact?",
            subtitle: "Deep emotional mode"
        },
        partnerVersion: {
            question: "When you have close friends of the opposite gender, would they ask you to reduce contact?",
            subtitle: "Deep emotional mode"
        },
        options: {
            self: [
                "No, respect their friendship",
                "A bit concerned internally, but won't say",
                "Will express my concerns, hope they understand",
                "Will clearly request to reduce contact",
                "Will demand to cut off contact completely"
            ],
            partner: [
                "No, respect my friendship",
                "A bit concerned internally, but won't say",
                "Will express their concerns, hope I understand",
                "Will clearly request me to reduce contact",
                "Will demand me to cut off contact completely"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "Do you want to participate in all of your partner's decisions?",
            subtitle: "Deep emotional mode"
        },
        partnerVersion: {
            question: "Does your partner want to participate in all of your decisions?",
            subtitle: "Deep emotional mode"
        },
        options: {
            self: [
                "No need, they have the right to decide independently",
                "Hope they'll tell me, but respect their decisions",
                "Hope to discuss most things together",
                "Want to participate in all important decisions",
                "Want to control all decision-making power"
            ],
            partner: [
                "No need, I have the right to decide independently",
                "Hope I'll tell them, but respect my decisions",
                "Hope to discuss most things together",
                "Want to participate in all my important decisions",
                "Want to control all decision-making power"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "When your partner replies to messages slowly, you would?",
            subtitle: "Deep emotional mode"
        },
        partnerVersion: {
            question: "When you reply to messages slowly, they would?",
            subtitle: "Deep emotional mode"
        },
        options: {
            self: [
                "Understand they might be busy, not worried",
                "A bit anxious, but will wait",
                "Will send several messages to urge",
                "Will be very anxious, keep sending messages asking",
                "Will call to question why they're not replying"
            ],
            partner: [
                "Understand I might be busy, not worried",
                "A bit anxious, but will wait",
                "Will send several messages to urge",
                "Will be very anxious, keep sending messages asking",
                "Will call to question why I'm not replying"
            ]
        }
    },
    {
        dimension: "🎯 Control Desire Dimension",
        selfVersion: {
            question: "What's your attitude towards your partner's social media passwords?",
            subtitle: "Deep emotional mode"
        },
        partnerVersion: {
            question: "What's your partner's attitude towards your social media passwords?",
            subtitle: "Deep emotional mode"
        },
        options: {
            self: [
                "Don't need to know, it's personal privacy",
                "Would be nice to know, but won't insist",
                "Hope to know, increase transparency",
                "Feel couples should know each other's",
                "Must know, otherwise I feel insecure"
            ],
            partner: [
                "Don't need to know, it's personal privacy",
                "Would be nice to know, but won't insist",
                "Hope to know, increase transparency",
                "Feel couples should know each other's",
                "Must know, otherwise they feel insecure"
            ]
        }
    },

    // 💖 Dimension 2: Jealousy Intensity (11 questions)
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner likes posts from the opposite gender on social media, you would?",
            subtitle: "Exploring deep psychology"
        },
        partnerVersion: {
            question: "When you like posts from the opposite gender on social media, they would?",
            subtitle: "Exploring deep psychology"
        },
        options: {
            self: [
                "Completely don't mind, this is normal",
                "Noticed, but won't overthink",
                "A bit concerned, will notice if this happens often",
                "Very concerned, will ask why they liked it",
                "Very displeased, will demand them to unlike or explain"
            ],
            partner: [
                "Completely don't mind, this is normal",
                "Noticed, but won't overthink",
                "A bit concerned, will notice if I do this often",
                "Very concerned, will ask why I liked it",
                "Very displeased, will demand me to unlike or explain"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "Seeing your partner chatting happily with the opposite gender, how do you feel?",
            subtitle: "Exploring deep psychology"
        },
        partnerVersion: {
            question: "When they see you chatting happily with the opposite gender, how do they feel?",
            subtitle: "Exploring deep psychology"
        },
        options: {
            self: [
                "Great, shows they have good social skills",
                "A bit uncomfortable, but can understand",
                "Feel jealous, but try to control emotions",
                "Very jealous, will show unhappiness",
                "Very angry, will intervene immediately or question afterward"
            ],
            partner: [
                "Great, shows I have good social skills",
                "A bit uncomfortable, but can understand",
                "Feel jealous, but try to control emotions",
                "Very jealous, will show unhappiness",
                "Very angry, will intervene immediately or question afterward"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner mentions their ex, you would?",
            subtitle: "Exploring deep psychology"
        },
        partnerVersion: {
            question: "When you mention your ex, they would?",
            subtitle: "Exploring deep psychology"
        },
        options: {
            self: [
                "Normal attitude, that's their past",
                "A bit uncomfortable, but won't show it",
                "Will change the topic, don't want to hear",
                "Will be very unhappy, clearly express not wanting to hear",
                "Will be very bothered, even bring up old issues"
            ],
            partner: [
                "Normal attitude, that's my past",
                "A bit uncomfortable, but won't show it",
                "Will change the topic, don't want to hear",
                "Will be very unhappy, clearly express not wanting to hear",
                "Will be very bothered, even bring up old issues"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When you find photos of your partner with the opposite gender in their phone, you would?",
            subtitle: "Exploring deep psychology"
        },
        partnerVersion: {
            question: "When they find photos of you with the opposite gender in your phone, they would?",
            subtitle: "Exploring deep psychology"
        },
        options: {
            self: [
                "Don't mind, probably just regular friends",
                "Curious, but won't dig deeper",
                "Will ask who they are and what relationship",
                "Will demand explanation and hope they delete",
                "Very angry, question their loyalty"
            ],
            partner: [
                "Don't mind, probably just regular friends",
                "Curious, but won't dig deeper",
                "Will ask who they are and what relationship",
                "Will demand explanation and hope I delete",
                "Very angry, question my loyalty"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner is very attentive to a friend's birthday of the opposite gender, you would?",
            subtitle: "Exploring deep psychology"
        },
        partnerVersion: {
            question: "When you are very attentive to a friend's birthday of the opposite gender, they would?",
            subtitle: "Exploring deep psychology"
        },
        options: {
            self: [
                "Feel they value friends, which is good",
                "A bit jealous, but can understand",
                "Will compare how they treat me vs friends",
                "Will be unhappy, feel they're too good to friends",
                "Will question why they're so nice to others"
            ],
            partner: [
                "Feel I value friends, which is good",
                "A bit jealous, but can understand",
                "Will compare how I treat them vs friends",
                "Will be unhappy, feel I'm too good to friends",
                "Will question why I'm so nice to others"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner praises other people of the opposite gender, your reaction is?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you praise other people of the opposite gender, their reaction is?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Very normal, everyone can appreciate others",
                "A bit uncomfortable, but won't say anything",
                "Will sarcastically ask: What's so good about them?",
                "Will clearly express dislike for them saying that",
                "Will get angry, question if they're dissatisfied with me"
            ],
            partner: [
                "Very normal, everyone can appreciate others",
                "A bit uncomfortable, but won't say anything",
                "Will sarcastically ask: What's so good about them?",
                "Will clearly express dislike for me saying that",
                "Will get angry, question if I'm dissatisfied with them"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner receives work messages from colleagues of the opposite gender, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you receive work messages from colleagues of the opposite gender, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Completely don't mind, normal work communication",
                "Will glance, but won't overthink",
                "Will ask who it is and what about",
                "Will carefully read the chat content",
                "Will question why they're contacting after work hours"
            ],
            partner: [
                "Completely don't mind, normal work communication",
                "Will glance, but won't overthink",
                "Will ask who it is and what about",
                "Will carefully read the chat content",
                "Will question why I'm contacting after work hours"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When you see someone of the opposite gender showing interest in your partner, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When someone of the opposite gender shows interest in you, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Trust they'll handle it well, not worried",
                "Will pay attention to their reaction",
                "Will remind them to maintain distance",
                "Will be very nervous, try to intervene",
                "Will be very anxious, question them afterward"
            ],
            partner: [
                "Trust I'll handle it well, not worried",
                "Will pay attention to my reaction",
                "Will remind me to maintain distance",
                "Will be very nervous, try to intervene",
                "Will be very anxious, question me afterward"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner talks with people of the opposite gender at parties, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you talk with people of the opposite gender at parties, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Won't pay special attention, normal socializing",
                "Will glance occasionally, but won't disturb",
                "Will be quite concerned, might go over",
                "Will keep staring, ready to intervene anytime",
                "Will go directly to interrupt or pull them away"
            ],
            partner: [
                "Won't pay special attention, normal socializing",
                "Will glance occasionally, but won't disturb",
                "Will be quite concerned, might come over",
                "Will keep staring, ready to intervene anytime",
                "Will come directly to interrupt or pull me away"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "When your partner says they need to travel for work with colleagues of the opposite gender, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you say you need to travel for work with colleagues of the opposite gender, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Support their work, completely trust them",
                "A bit worried, but will support",
                "Will ask details, ensure others are going",
                "Will clearly express not feeling comfortable",
                "Will strongly oppose or ask them to change travel partners"
            ],
            partner: [
                "Support my work, completely trust me",
                "A bit worried, but will support",
                "Will ask details, ensure others are going",
                "Will clearly express not feeling comfortable",
                "Will strongly oppose or ask me to change travel partners"
            ]
        }
    },
    {
        dimension: "💖 Jealousy Intensity Dimension",
        selfVersion: {
            question: "Do you imagine scenarios where your partner might cheat?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they imagine scenarios where you might cheat?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Never, completely trust them",
                "Very rarely, only in special situations",
                "Occasionally, but can control these thoughts",
                "Often, makes me very uneasy",
                "Always, hard to stop these thoughts"
            ],
            partner: [
                "Never, completely trust me",
                "Very rarely, only in special situations",
                "Occasionally, but can control these thoughts",
                "Often, makes them very uneasy",
                "Always, hard to stop these thoughts"
            ]
        }
    },

    // 💥 Dimension 3: Emotional Dependence (11 questions)
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "When your partner is not around, you feel?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you are not around, they feel?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Completely normal, can be alone well",
                "A bit miss them, but can do my own things",
                "Often think of them, feel empty",
                "Very uncomfortable, always want to contact them",
                "Very distressed, can't focus on other things"
            ],
            partner: [
                "Completely normal, can be alone well",
                "A bit miss me, but can do their own things",
                "Often think of me, feel empty",
                "Very uncomfortable, always want to contact me",
                "Very distressed, can't focus on other things"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "When you don't receive messages from your partner for a day, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When they don't receive messages from you for a day, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Won't pay special attention, they might be busy",
                "Will miss them a bit, but won't rush",
                "Will proactively send messages to check",
                "Will feel uneasy, send frequent messages",
                "Will be very anxious, will call to question"
            ],
            partner: [
                "Won't pay special attention, I might be busy",
                "Will miss them a bit, but won't rush",
                "Will proactively send messages to check",
                "Will feel uneasy, send frequent messages",
                "Will be very anxious, will call to question"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Do you need your partner to express love frequently?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they need you to express love frequently?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Don't need to, feeling it is enough",
                "Happy to hear it occasionally",
                "Hope to hear it often",
                "Need frequent expressions of love to feel secure",
                "Need them to confirm their love for me multiple times daily"
            ],
            partner: [
                "Don't need to, feeling it is enough",
                "Happy to hear it occasionally",
                "Hope to hear it often",
                "Need frequent expressions of love to feel secure",
                "Need me to confirm my love for them multiple times daily"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "When making decisions, do you need your partner's opinion?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When making decisions, do they need your opinion?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Don't need to, I can decide independently",
                "Will consult on important matters",
                "Want to hear their thoughts on most things",
                "Need their participation in almost all decisions",
                "Cannot make decisions without their approval"
            ],
            partner: [
                "Don't need to, they can decide independently",
                "Will consult me on important matters",
                "Want to hear my thoughts on most things",
                "Need my participation in almost all decisions",
                "Cannot make decisions without my approval"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Does your happiness mainly come from your partner?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Does their happiness mainly come from you?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I have many sources of happiness",
                "They are one important source",
                "They are the main source, but not all",
                "Most of my happiness comes from them",
                "They are my only source of happiness"
            ],
            partner: [
                "No, they have many sources of happiness",
                "I am one important source",
                "I am the main source, but not all",
                "Most of their happiness comes from me",
                "I am their only source of happiness"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "When your partner is busy with work and neglects you, you would?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you are busy with work and neglect them, they would?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Completely understand, will arrange my own time",
                "A bit disappointed, but will support them",
                "Will feel neglected, hope they pay more attention to me",
                "Will be very unhappy, feel work shouldn't affect us",
                "Will be very angry, demand they prioritize me"
            ],
            partner: [
                "Completely understand, will arrange their own time",
                "A bit disappointed, but will support me",
                "Will feel neglected, hope I pay more attention to them",
                "Will be very unhappy, feel work shouldn't affect us",
                "Will be very angry, demand I prioritize them"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Would you give up your hobbies to spend time with them?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Would they give up their hobbies to spend time with you?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, we should both have our own space",
                "Occasionally, but not often",
                "Often, feel spending time with them is more important",
                "Always, my life revolves around them",
                "Have already given up all personal hobbies"
            ],
            partner: [
                "No, we should both have our own space",
                "Occasionally, but not often",
                "Often, feel spending time with me is more important",
                "Always, their life revolves around me",
                "Have already given up all personal hobbies"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Is it hard for you to enjoy activities without your partner?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Is it hard for them to enjoy activities without you?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I can enjoy many things alone",
                "Better with them, but I can manage alone",
                "Many activities are less fun without them",
                "Most activities need their company to be enjoyable",
                "I can't enjoy any activity at all without them"
            ],
            partner: [
                "No, they can enjoy many things alone",
                "Better with me, but they can manage alone",
                "Many activities are less fun without me",
                "Most activities need my company to be enjoyable",
                "They can't enjoy any activity at all without me"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Is your partner the focus of your life?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Are you the focus of their life?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I have a balanced life",
                "They are important, but not everything",
                "They are one of the main focuses",
                "They are my primary life focus",
                "My life completely revolves around them"
            ],
            partner: [
                "No, they have a balanced life",
                "I am important, but not everything",
                "I am one of the main focuses",
                "I am their primary life focus",
                "Their life completely revolves around me"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Do your partner's emotions seriously affect you?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do your emotions seriously affect them?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I can maintain my emotional stability",
                "It affects them, but they can adjust",
                "It significantly affects my mood",
                "Their emotions seriously affect my state",
                "When they're unhappy, I completely lose motivation to do anything"
            ],
            partner: [
                "No, they can maintain their emotional stability",
                "It affects them, but they can adjust",
                "It significantly affects their mood",
                "My emotions seriously affect their state",
                "When I'm unhappy, they completely lose motivation to do anything"
            ]
        }
    },
    {
        dimension: "💥 Emotional Dependence Dimension",
        selfVersion: {
            question: "Can you accept your partner having their own independent space?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Can they accept you having your own independent space?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Completely accept, it's necessary",
                "Can accept, though I'll miss them",
                "Barely accept, but feel uncomfortable",
                "Hard to accept, feel excluded",
                "Cannot accept, feel we should always be together"
            ],
            partner: [
                "Completely accept, it's necessary",
                "Can accept, though I'll miss them",
                "Barely accept, but feel uncomfortable",
                "Hard to accept, feel excluded",
                "Cannot accept, feel we should always be together"
            ]
        }
    },

    // 🛡️ Dimension 4: Relationship Security (10 questions)
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you worry about your partner leaving you?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they worry about you leaving them?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Never worry, very confident",
                "Rarely worry, basically at ease",
                "Occasionally worry",
                "Often worry, feel uneasy",
                "Always worry, it's my biggest fear"
            ],
            partner: [
                "Never worry, very confident",
                "Rarely worry, basically at ease",
                "Occasionally worry",
                "Often worry, feel uneasy",
                "Always worry, it's their biggest fear"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you often doubt your partner's feelings for you?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they often doubt your feelings for them?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Never doubt, completely trust",
                "Rarely doubt, basically believe",
                "Occasionally doubt",
                "Often doubt, need constant reassurance",
                "Always doubt, hard to believe what they say"
            ],
            partner: [
                "Never doubt, completely trust",
                "Rarely doubt, basically believe",
                "Occasionally doubt",
                "Often doubt, need constant reassurance",
                "Always doubt, hard to believe what I say"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do subtle changes in your partner's behavior make you anxious?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do subtle changes in your behavior make them anxious?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I don't overinterpret",
                "Occasionally notice, but don't get anxious",
                "Will notice and think about the reasons",
                "Will be very anxious, overinterpret",
                "Will be extremely anxious, let imagination run wild"
            ],
            partner: [
                "No, they don't overinterpret",
                "Occasionally notice, but don't get anxious",
                "Will notice and think about the reasons",
                "Will be very anxious, overinterpret",
                "Will be extremely anxious, let imagination run wild"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you feel you're not good enough for your partner?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they feel they're not good enough for you?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, we are equals",
                "Occasionally think this way",
                "Sometimes feel I'm not good enough",
                "Often think this way, feel inferior",
                "Always feel I don't deserve them"
            ],
            partner: [
                "No, we are equals",
                "Occasionally think this way",
                "Sometimes feel I'm not good enough",
                "Often think this way, feel inferior",
                "Always feel they don't deserve me"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Are you afraid of being abandoned by your partner?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Are they afraid of being abandoned by you?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Not afraid, believe in our relationship",
                "A little worried, but not strongly",
                "Sometimes afraid",
                "Often afraid, makes me very uneasy",
                "Very afraid, this is my deepest fear"
            ],
            partner: [
                "Not afraid, believe in our relationship",
                "A little worried, but not strongly",
                "Sometimes afraid",
                "Often afraid, makes them very uneasy",
                "Very afraid, this is their deepest fear"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you need your partner to constantly confirm their love for you?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they need you to constantly confirm your love for them?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Don't need to, I can feel it",
                "Happy to hear it occasionally",
                "Hope to confirm often",
                "Need frequent confirmation to feel at ease",
                "Need confirmation multiple times daily"
            ],
            partner: [
                "Don't need to, they can feel it",
                "Happy to hear it occasionally",
                "Hope to confirm often",
                "Need frequent confirmation to feel at ease",
                "Need confirmation multiple times daily"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "When your partner seems cold, do you think the relationship is ending?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "When you seem cold, do they think the relationship is ending?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, maybe they're just in a bad mood",
                "A little worried, but won't overthink",
                "Will worry if I did something wrong",
                "Will be very anxious, feel we might break up",
                "Will be extremely panicked, think the relationship is ending"
            ],
            partner: [
                "No, maybe I'm just in a bad mood",
                "A little worried, but won't overthink",
                "Will worry if they did something wrong",
                "Will be very anxious, feel we might break up",
                "Will be extremely panicked, think the relationship is ending"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you worry about losing your partner over small things?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they worry about losing you over small things?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "No, I feel very secure",
                "Rarely, basically don't worry",
                "Occasionally worry excessively",
                "Often feel uneasy over small things",
                "Any small thing makes me worry about losing them"
            ],
            partner: [
                "No, they feel very secure",
                "Rarely, basically don't worry",
                "Occasionally worry excessively",
                "Often feel uneasy over small things",
                "Any small thing makes them worry about losing me"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Do you believe what your partner says?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Do they believe what you say?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Completely believe, never doubt",
                "Basically believe, rarely question",
                "Sometimes doubt",
                "Often doubt, need verification",
                "Hard to believe, always doubt"
            ],
            partner: [
                "Completely believe, never doubt",
                "Basically believe, rarely question",
                "Sometimes doubt",
                "Often doubt, need verification",
                "Hard to believe, always doubt"
            ]
        }
    },
    {
        dimension: "🛡️ Relationship Security Dimension",
        selfVersion: {
            question: "Are you confident about the future of this relationship?",
            subtitle: "Complete profile construction"
        },
        partnerVersion: {
            question: "Are they confident about the future of this relationship?",
            subtitle: "Complete profile construction"
        },
        options: {
            self: [
                "Very confident, believe it will last",
                "Quite confident, optimistic",
                "A bit uncertain",
                "Often worry about the future",
                "Not confident at all, always feel we'll break up"
            ],
            partner: [
                "Very confident, believe it will last",
                "Quite confident, optimistic",
                "A bit uncertain",
                "Often worry about the future",
                "Not confident at all, always feel we'll break up"
            ]
        }
    }
];

/**
 * Get questions for specified mode
 * @param {string} mode - 'self' or 'partner'
 * @returns {Array} Formatted question array
 */
function getQuestions(mode = 'self') {
    return questions.map((q, index) => {
        const version = mode === 'partner' ? q.partnerVersion : q.selfVersion;
        const options = mode === 'partner' ? q.options.partner : q.options.self;
        
        return {
            id: index + 1,
            dimension: q.dimension,
            question: version.question,
            subtitle: version.subtitle,
            options: options
        };
    });
}

// Dimension information
const dimensionInfo = {
    control: {
        name: "Control Desire",
        emoji: "🎯",
        range: [0, 10],
        maxScore: 50
    },
    jealousy: {
        name: "Jealousy Intensity",
        emoji: "💖",
        range: [10, 21],
        maxScore: 55
    },
    dependency: {
        name: "Emotional Dependence",
        emoji: "💥",
        range: [21, 32],
        maxScore: 55
    },
    security: {
        name: "Relationship Security",
        emoji: "🛡️",
        range: [32, 42],
        maxScore: 50
    }
};

// Export data (supports multiple module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions, getQuestions, dimensionInfo };
}

// Browser environment
if (typeof window !== 'undefined') {
    window.testQuestions = questions;
    window.getQuestions = getQuestions;
    window.dimensionInfo = dimensionInfo;
}