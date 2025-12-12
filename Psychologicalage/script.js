// ==================== Configuration Data ====================
const CONFIG = {
    // Question data - 32 questions
    questions: [
        { id: 1, text: "What's your attitude toward new things?" },
        { id: 2, text: "What time do you usually go to bed?" },
        { id: 3, text: "When facing difficulties, you would?" },
        { id: 4, text: "What's your attitude toward trends?" },
        { id: 5, text: "On weekends, you prefer to?" },
        { id: 6, text: "How often do you use social media?" },
        { id: 7, text: "When listening to music, you prefer?" },
        { id: 8, text: "Your friend circle is usually?" },
        { id: 9, text: "When facing conflict, you tend to?" },
        { id: 10, text: "Your dressing style is?" },
        { id: 11, text: "When watching movies/shows, you like?" },
        { id: 12, text: "Regarding planning, you think?" },
        { id: 13, text: "Your attitude toward tech products?" },
        { id: 14, text: "Your eating habits are?" },
        { id: 15, text: "When facing criticism, you would?" },
        { id: 16, text: "Your reading habits are?" },
        { id: 17, text: "When traveling, you prefer?" },
        { id: 18, text: "Your attitude toward nostalgia?" },
        { id: 19, text: "When working/studying, you?" },
        { id: 20, text: "Your spending philosophy is?" },
        { id: 21, text: "Facing changes, you?" },
        { id: 22, text: "Your daily routine is?" },
        { id: 23, text: "Regarding health, you?" },
        { id: 24, text: "Your hobbies and interests are?" },
        { id: 25, text: "When facing stress, you?" },
        { id: 26, text: "Your learning attitude is?" },
        { id: 27, text: "Regarding traditions, you?" },
        { id: 28, text: "Your communication style is?" },
        { id: 29, text: "When facing failure, you?" },
        { id: 30, text: "Your life attitude is?" },
        { id: 31, text: "Regarding the future, you?" },
        { id: 32, text: "Do you think age is?" }
    ],

    // Options configuration - 5 options
    options: [
        { value: 5, label: 'A', text: 'Full of curiosity, eager to try' },
        { value: 4, label: 'B', text: 'Cautious observation, but willing to accept' },
        { value: 3, label: 'C', text: 'Indifferent, let nature take its course' },
        { value: 2, label: 'D', text: 'Skeptical, not very interested' },
        { value: 1, label: 'E', text: 'Resistant to change, prefer familiarity' }
    ],

    // Score weights for each question (adjustable per question)
    questionWeights: {
        1: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        2: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        3: { A: -3, B: -2, C: 0, D: 2, E: 3 },
        4: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        5: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        6: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        7: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        8: { A: -3, B: -2, C: 0, D: 2, E: 3 },
        9: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        10: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        11: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        12: { A: -3, B: -2, C: 0, D: 2, E: 3 },
        13: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        14: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        15: { A: -3, B: -2, C: 0, D: 2, E: 3 },
        16: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        17: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        18: { A: -3, B: -2, C: 0, D: 2, E: 4 },
        19: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        20: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        21: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        22: { A: -3, B: -2, C: 0, D: 2, E: 3 },
        23: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        24: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        25: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        26: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        27: { A: -3, B: -2, C: 0, D: 2, E: 4 },
        28: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        29: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        30: { A: -4, B: -2, C: 0, D: 2, E: 4 },
        31: { A: -5, B: -3, C: 0, D: 3, E: 5 },
        32: { A: -4, B: -2, C: 0, D: 2, E: 4 }
    }
};

// ==================== Global State ====================
let currentQuestionIndex = 0;
let answers = {}; // Store answers
let actualAge = 0; // Actual age

// ==================== Utility Functions ====================

// Show specified page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Listen for age input
document.getElementById('actualAge')?.addEventListener('input', function() {
    const age = parseInt(this.value);
    const startBtn = document.getElementById('startBtn');

    if (age >= 8 && age <= 100) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
});

// ==================== Start Test ====================
function startTest() {
    actualAge = parseInt(document.getElementById('actualAge').value);

    if (!actualAge || actualAge < 8 || actualAge > 100) {
        alert('Please enter a valid age (8-100 years old)');
        return;
    }

    // Reset state
    currentQuestionIndex = 0;
    answers = {};

    // Show quiz page
    showPage('quizPage');

    // Render first question
    renderQuestion();
}

// ==================== Quick Test ====================
function quickTest() {
    // Randomly set actual age (between 18-65)
    actualAge = Math.floor(Math.random() * (65 - 18 + 1)) + 18;

    // Reset state
    currentQuestionIndex = 0;
    answers = {};

    // Completely random answer selection, no forced control of differences
    CONFIG.questions.forEach(question => {
        // Randomly select an option
        const randomIndex = Math.floor(Math.random() * CONFIG.options.length);
        const selectedOption = CONFIG.options[randomIndex];
        answers[question.id] = selectedOption.label;
    });

    // Directly show results
    showResult();
}

// ==================== Render Question ====================
function renderQuestion() {
    const question = CONFIG.questions[currentQuestionIndex];
    const totalQuestions = CONFIG.questions.length;
    const answered = Object.keys(answers).length;
    const remaining = totalQuestions - answered;
    const progress = Math.round((answered / totalQuestions) * 100);

    // Update progress information
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('progressPercent').textContent = `${progress}%`;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('remainingCount').textContent = remaining;

    // Update question text
    document.getElementById('questionText').textContent = question.text;

    // Render options
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';

    CONFIG.options.forEach(option => {
        const li = document.createElement('li');
        li.className = 'option-item';

        const button = document.createElement('button');
        button.className = 'option-btn';
        button.onclick = () => selectOption(option.label);

        // If already selected, add selected style
        if (answers[question.id] === option.label) {
            button.classList.add('selected');
        }

        button.innerHTML = `
            <span class="option-label">${option.label}</span>
            <span class="option-text">${option.text}</span>
        `;

        li.appendChild(button);
        optionsList.appendChild(li);
    });

    // Update previous button state
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
}

// ==================== Select Option ====================
function selectOption(label) {
    const question = CONFIG.questions[currentQuestionIndex];

    // Save answer
    answers[question.id] = label;

    // Wait a short time for user to see selection effect
    setTimeout(() => {
        // If it's the last question, show results
        if (currentQuestionIndex === CONFIG.questions.length - 1) {
            showResult();
        } else {
            // Otherwise, go to next question
            currentQuestionIndex++;
            renderQuestion();
        }
    }, 300);
}

// ==================== Previous Question ====================
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

// ==================== Calculate Mental Age ====================
function calculateMentalAge() {
    let totalScore = 0;

    // Accumulate scores from all questions
    for (let questionId in answers) {
        const label = answers[questionId];
        const weight = CONFIG.questionWeights[questionId];
        if (weight && weight[label] !== undefined) {
            totalScore += weight[label];
        }
    }

    // Calculate mental age based on total score
    // Score range approximately: -160 to +160
    // Mental age = actual age + (total score / 4)
    let mentalAge = actualAge + Math.round(totalScore / 4);

    // Limit to reasonable range
    mentalAge = Math.max(8, Math.min(80, mentalAge));

    return mentalAge;
}

// ==================== Show Results ====================
function showResult() {
    const mentalAge = calculateMentalAge();
    const ageDiff = actualAge - mentalAge;

    // Switch to results page
    showPage('resultPage');

    // Display mental age and actual age
    document.getElementById('mentalAgeDisplay').textContent = `${mentalAge} years old`;
    document.getElementById('actualAgeDisplay').textContent = `${actualAge} years old`;

    // Choose emoji based on age difference
    let emoji = '🤔'; // Default emoji
    if (ageDiff > 15) {
        emoji = '😄'; // Very young
    } else if (ageDiff > 8) {
        emoji = '😊'; // Quite young
    } else if (ageDiff > 3) {
        emoji = '🙂'; // Slightly young
    } else if (ageDiff >= -3) {
        emoji = '😐'; // Basically consistent
    } else if (ageDiff >= -8) {
        emoji = '🤔'; // Slightly mature
    } else if (ageDiff >= -15) {
        emoji = '😔'; // Quite mature
    } else {
        emoji = '😰'; // Very mature
    }
    document.querySelector('.emoji-icon').textContent = emoji;

    // Set age difference text (with highlighted numbers)
    const ageDiffText = document.getElementById('ageDifferenceText');
    const absDiff = Math.abs(ageDiff);
    if (ageDiff > 0) {
        ageDiffText.innerHTML = `Your mental age is <span class="age-diff-number">${absDiff}</span> years younger`;
    } else if (ageDiff < 0) {
        ageDiffText.innerHTML = `Your mental age is <span class="age-diff-number">${absDiff}</span> years older`;
    } else {
        ageDiffText.innerHTML = 'Your mental age is <span class="age-diff-number">consistent</span> with your actual age';
    }

    // ==================== Mental Age Analysis and Suggestion Generation ====================
    function generateAgeAnalysis(age) {
        if (age <= 15) {
            return {
                analysis: 'Your mental age tends to be younger, viewing the world with purity and directness. You have natural curiosity about new things, express emotions openly without hiding, fully show happiness when happy, and easily reveal feelings when wronged. You rely more on companionship and guidance from those around you, tend to reference others\' opinions when making decisions, haven\'t yet formed an independent judgment system, and your understanding of life is still in a simple, stress-free stage.',
                suggestion: '• Don\'t rush to force yourself to "be mature," enjoy the current pure state, allow yourself to maintain a childlike perspective\n• When confused or experiencing emotional fluctuations, proactively communicate with trusted people, don\'t carry pressure alone\n• Try to do small things within your ability (like organizing your belongings, planning weekend itineraries) to gradually cultivate independence\n• Participate more in group activities or interest groups, learn to express yourself and understand others through social interaction'
            };
        } else if (age <= 20) {
            return {
                analysis: 'Your mental state is in a stage of coexisting exploration and confusion. You are full of desire to explore the world, willing to try new things, connect with new circles, and not afraid of unknown challenges. But at the same time, when facing life direction, self-identity and other issues, you easily feel confused and indecisive, emotional ups and downs are relatively obvious, and you may be influenced by others\' evaluations affecting self-judgment. Your way of handling things still carries some immaturity and lacks maturity.',
                suggestion: '• Boldly try things you\'re interested in, even if you can\'t see immediate results, the process of exploration itself is growth\n• Don\'t overly care about others\' opinions, listen more to your inner voice, and gradually build self-identity\n• When facing choices, try to list pros and cons before deciding, cultivate the habit of rational thinking\n• Learn to manage your emotions, for example, calm down for 5 minutes when emotionally agitated before responding'
            };
        } else if (age <= 25) {
            return {
                analysis: 'Your mental state is gradually moving toward independence, beginning to have clear self-awareness. You no longer blindly follow others, have initial clear cognition of your preferences and goals, and are willing to take responsibility for your choices. When facing problems in work or study, you will actively find solutions rather than relying solely on others. But in complex interpersonal or sudden situations, you may still appear inexperienced, occasionally fall into entanglement, and lack sufficient composure in doing things.',
                suggestion: '• Focus on your core goals, improve abilities in a targeted manner, avoid blind attempts that lead to scattered energy\n• When encountering difficult problems, don\'t hesitate to consult experienced people, learning from others\' experience can avoid detours\n• Learn to accept your imperfections, don\'t negate yourself because of one mistake, treat every experience as accumulation\n• Reasonably plan time, balance work, study and life, avoid over-exhausting yourself'
            };
        } else if (age <= 30) {
            return {
                analysis: 'Your mental state tends toward maturity, with more organized and planned handling of things. You have clearer direction in life, know what you want and what to give up, and have a strong sense of purpose. When facing pressure and challenges, you can maintain basic calm, won\'t be easily swayed by emotions, and will actively seek solutions to problems. Your sense of responsibility has significantly increased, whether for work, family or yourself, you can shoulder due responsibilities, and also understand boundaries in interpersonal relationships.',
                suggestion: '• While pursuing goals, don\'t neglect physical and mental state, regularly give yourself relaxation time, avoid being too tense\n• Learn to make appropriate trade-offs, don\'t pursue perfection in everything, focus energy on core matters\n• Communicate more with family and friends, maintain intimate relationships, they are important emotional support\n• Continuously learn new skills, maintain thinking flexibility, avoid being limited by fixed cognition'
            };
        } else if (age <= 35) {
            return {
                analysis: 'Your mental state is calm and pragmatic, handling things rigorously and comprehensively. After years of accumulation, you already possess strong problem-solving abilities. When facing complex situations, you can quickly grasp core contradictions and make rational judgments. You are mature and appropriate in interpersonal interactions, understand empathy, can handle various relationships properly, making people feel reliable. But sometimes you may lack some adventurous spirit due to excessive pursuit of stability, occasionally appearing somewhat conservative.',
                suggestion: '• Give yourself some "trial and error space," don\'t seek stability in everything, occasional breakthroughs may bring new opportunities\n• Learn to delegate appropriately, don\'t do everything yourself, trust others\' abilities and reduce your burden\n• While handling things rationally, pay more attention to your inner feelings, don\'t let "responsibility" hijack the warmth of life\n• Cultivate a hobby that allows you to completely relax, balancing the rhythm of work and life'
            };
        } else if (age <= 40) {
            return {
                analysis: 'Your mental state is calm and transparent, having formed your own principles and attitudes toward life. You no longer obsess over superficial gains and losses, but value inner peace and quality of life more. When facing life\'s ups and downs, you can accept them with a peaceful mindset, without excessive anxiety or complaint. Experienced and perceptive in viewing problems, you can provide valuable advice to people around you, and are seen as a "reliable support" in others\' eyes. But sometimes you may accept new things more slowly due to fixed experiences.',
                suggestion: '• Maintain curiosity about new things, proactively understand fresh trends, avoid thinking rigidification\n• Share your experience and wisdom with others, gain new sense of achievement in helping others\n• Focus on physical and mental health, develop regular work and exercise habits, lay foundation for long-term life\n• Enjoy current life more, don\'t worry excessively about the future, learn to find joy in the ordinary'
            };
        } else if (age <= 50) {
            return {
                analysis: 'Your mental state is open and tolerant, with deeper understanding of life. Having experienced the precipitation of time, you can calmly face various life situations without obsessing over past regrets or blindly worrying about the future. You treat people and matters with gentle tolerance, understand respecting different viewpoints and lifestyles, maintain a peaceful mindset, and are not easily disturbed by external trivialities. Your heart is strong enough, you can find peace in solitude and convey warmth when interacting with others.',
                suggestion: '• Continue maintaining a peaceful mindset, enjoy the current pace of life, don\'t deliberately pursue too many goals\n• Participate more in activities that bring physical and mental pleasure, such as gardening, calligraphy, travel, etc., to enrich spiritual life\n• Strengthen companionship with family, especially communication with younger generations, feel life\'s vitality in intergenerational interactions\n• You can organize your life insights, whether sharing with others or keeping for your own memories, they are precious wealth'
            };
        } else if (age <= 60) {
            return {
                analysis: 'Your mental state is calm and transparent, having reached a relatively mature realm of life. You see problems pointing directly to their essence, no longer confused by surface appearances, handle things unhurriedly with proper balance. You view fame and fortune more indifferently, focusing more on inner abundance and spiritual freedom. You treat people with sincerity and generosity, naturally possessing an aura that makes people feel at ease, can resolve conflicts with a peaceful mindset, and convey positive energy. Your life rhythm is calm, understanding how to coexist peacefully with yourself and the world.',
                suggestion: '• Maintain a calm life rhythm, arrange daily life according to your own state, don\'t force yourself to do things beyond your ability\n• Communicate more with like-minded people, enrich spiritual life, maintain youthful vitality in mindset\n• Focus on health preservation, regular diet and work, moderate exercise, protect physical and mental health\n• Enjoy this transparency gained through years of precipitation, live as your heart desires, feel life\'s most authentic beauty'
            };
        } else {
            return {
                analysis: 'Your mental state is transcendent and peaceful, possessing profound insight and understanding of life. You have transcended worldly calculations of gains and losses, valuing spiritual abundance and tranquility more. You treat people and matters with broad compassion, can view all things in the world with tolerance, without harsh demands or entanglements. Your heart is calm and strong, able to maintain a composed state regardless of circumstances, naturally possessing a power that stabilizes people\'s hearts, living as the image of your inner self.',
                suggestion: '• Continue maintaining this transcendent mindset, act according to your heart, not influenced by external disturbances\n• You can pass on your life wisdom in appropriate ways, providing guidance and warmth to others\n• Focus on things that bring inner joy, whether it\'s solitary meditation or casual conversation, enjoy the present\n• Maintain harmony and unity of body and mind, treat yourself kindly, and enjoy life\'s gifts in peace'
            };
        }
    }

    // ==================== Generate Descriptions and Suggestions Based on Mental Age ====================
    const ageAnalysis = generateAgeAnalysis(mentalAge);

    // Update content
    document.getElementById('resultDescription').textContent = ageAnalysis.analysis;
    document.getElementById('resultSuggestion').innerHTML = `
        <h4>Personalized Suggestions</h4>
        <p>${ageAnalysis.suggestion}</p>
    `;
}

// ==================== Restart Test ====================
function restartTest() {
    currentQuestionIndex = 0;
    answers = {};
    actualAge = 0;

    // Clear input
    document.getElementById('actualAge').value = '';
    document.getElementById('startBtn').disabled = true;

    // Return to intro page
    showPage('introPage');
}

// ==================== Global Variables ====================
let quickTestClickCount = 0;
let quickTestClickTimes = []; // Record click timestamps
const quickTestRequiredClicks = 5; // Required number of clicks
const quickTestTimeWindow = 10000; // Time window (milliseconds): 10 seconds

// ==================== Page Load Complete ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mental Age Test loaded');
});

// ==================== Premium Report Function ====================
function handlePremiumReport() {
    // Get current mental age for personalization
    const mentalAgeDisplay = document.getElementById('mentalAgeDisplay')?.textContent || 'Unknown';
    const actualAgeDisplay = document.getElementById('actualAgeDisplay')?.textContent || 'Unknown';

    // Create premium report modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-4xl mb-4">🧠</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Premium Mental Age Analysis</h3>
          <p class="text-gray-600">Unlock your complete psychological profile</p>
        </div>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <h4 class="font-bold text-gray-800 mb-3">What you'll get:</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li class="flex items-start"><span class="mr-2">✓</span> 20-page detailed mental age analysis</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Cognitive development assessment</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Emotional intelligence evaluation</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Personalized growth strategies</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Age-appropriate life recommendations</li>
            <li class="flex items-start"><span class="mr-2">✓</span> 30-day mental wellness challenge</li>
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
      alert('Payment integration coming soon! Your premium report will include detailed mental age analysis, cognitive development insights, and personalized growth strategies.');
      modal.remove();
    };
}

// ==================== Quick Test Hide/Show Function ====================
function toggleQuickTest() {
    const now = Date.now();

    // Add current click timestamp
    quickTestClickTimes.push(now);

    // Remove old timestamps outside 10 seconds
    quickTestClickTimes = quickTestClickTimes.filter(time => now - time < quickTestTimeWindow);

    // Check if clicked 5 times within 10 seconds
    if (quickTestClickTimes.length >= quickTestRequiredClicks) {
        // Show quick test button
        document.getElementById('quickTestBtn').style.display = 'block';
        console.log(`Quick Test activated`);
    } else {
        // First 4 clicks hide quick test button
        document.getElementById('quickTestBtn').style.display = 'none';
        console.log(`Quick Test not activated (${quickTestTimeWindow / 1000} seconds: clicked ${quickTestClickTimes.length} times, need ${quickTestRequiredClicks - quickTestClickTimes.length} more clicks)`);
    }
}