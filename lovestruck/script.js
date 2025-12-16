// Test data
const questions = [
    // Dependency (6 questions)
    { id: 1, text: "After falling in love, your social media posts become all about your partner", dimension: "Dependency" },
    { id: 2, text: "If your partner doesn't reply for three hours, you start overthinking", dimension: "Dependency" },
    { id: 3, text: "You feel life is incomplete without being in a relationship", dimension: "Dependency" },
    { id: 4, text: "You change your lifestyle habits and routines because of your relationship", dimension: "Dependency" },
    { id: 5, text: "You need constant attention and response from your partner to feel secure", dimension: "Dependency" },
    { id: 6, text: "You put your partner's matters first and your own matters second", dimension: "Dependency" },

    // Romantic Fantasy (5 questions)
    { id: 7, text: "You believe soulmates exist in this world", dimension: "Romantic Fantasy" },
    { id: 8, text: "You often fantasize about various romantic relationship scenarios", dimension: "Romantic Fantasy" },
    { id: 9, text: "You believe true love can conquer all difficulties", dimension: "Romantic Fantasy" },
    { id: 10, text: "You expect your partner to guess your thoughts without you saying anything", dimension: "Romantic Fantasy" },
    { id: 11, text: "You set many romantic expectations for future relationships", dimension: "Romantic Fantasy" },

    // Breakup Resilience (5 questions)
    { id: 12, text: "After a breakup, you need a long time to move on", dimension: "Breakup Resilience" },
    { id: 13, text: "Breakups seriously affect your life and work state", dimension: "Breakup Resilience" },
    { id: 14, text: "You have difficulty accepting the end of a romantic relationship", dimension: "Breakup Resilience" },
    { id: 15, text: "After a breakup, you often look back at old chat records and photos", dimension: "Breakup Resilience" },
    { id: 16, text: "You doubt your own worth because of a breakup", dimension: "Breakup Resilience" },

    // Commitment Level (6 questions)
    { id: 17, text: "When in love, you invest yourself completely and treat your partner as your entire life", dimension: "Commitment Level" },
    { id: 18, text: "You're willing to give up many things for love", dimension: "Commitment Level" },
    { id: 19, text: "You make many sacrifices and compromises for your partner", dimension: "Commitment Level" },
    { id: 20, text: "You're willing to be with your partner anytime, even if it disrupts your plans", dimension: "Commitment Level" },
    { id: 21, text: "You often prepare small surprises and gifts for your partner", dimension: "Commitment Level" },
    { id: 22, text: "You spend a lot of time and energy nurturing the relationship", dimension: "Commitment Level" },

    // Rationality Level (5 questions)
    { id: 23, text: "You decide to enter a relationship based on momentary emotions", dimension: "Rationality Level" },
    { id: 24, text: "When in love, you easily overlook your partner's flaws and problems", dimension: "Rationality Level" },
    { id: 25, text: "You lower your standards to save the relationship", dimension: "Rationality Level" },
    { id: 26, text: "Even if friends don't approve of the relationship, you'll persist", dimension: "Rationality Level" },
    { id: 27, text: "You find it hard to maintain objective judgment when in love", dimension: "Rationality Level" },

    // Self-Preservation (5 questions)
    { id: 28, text: "After entering a relationship, you reduce contact with friends", dimension: "Self-Preservation" },
    { id: 29, text: "You give up your own interests and hobbies to accommodate your partner", dimension: "Self-Preservation" },
    { id: 30, text: "You find it difficult to maintain independent personal space in a relationship", dimension: "Self-Preservation" },
    { id: 31, text: "You change your clothing style based on your partner's preferences", dimension: "Self-Preservation" },
    { id: 32, text: "When in love, you value your partner's opinions more than your own", dimension: "Self-Preservation" }
];

// Options
const options = [
    { value: 1, label: '1', text: 'Strongly Disagree' },
    { value: 2, label: '2', text: 'Somewhat Disagree' },
    { value: 3, label: '3', text: 'Neutral' },
    { value: 4, label: '4', text: 'Somewhat Agree' },
    { value: 5, label: '5', text: 'Strongly Agree' }
];

// Dimension information
const dimensions = {
    "Dependency": {
        name: "Dependency",
        description: "Reflects your level of dependence and clinginess toward your partner in relationships",
        suggestions: ["Maintain appropriate distance", "Cultivate independence", "Develop personal hobbies", "Maintain social circle"]
    },
    "Romantic Fantasy": {
        name: "Romantic Fantasy",
        description: "Reflects your idealization level and romantic expectations toward love",
        suggestions: ["Accept realistic love", "View relationships rationally", "Lower perfectionist expectations", "Cherish the present moment"]
    },
    "Breakup Resilience": {
        name: "Breakup Resilience",
        description: "Reflects your ability to cope with the end of relationships",
        suggestions: ["Build mental resilience", "Establish support systems", "Cultivate interests and hobbies", "Learn to let go of the past"]
    },
    "Commitment Level": {
        name: "Commitment Level",
        description: "Reflects your degree of dedication and effort in relationships",
        suggestions: ["Balance giving and receiving", "Practice self-protection", "Invest rationally", "Maintain boundaries"]
    },
    "Rationality Level": {
        name: "Rationality Level",
        description: "Reflects your rational thinking ability when in love",
        suggestions: ["Maintain clear judgment", "Listen to others' opinions", "Watch for red flags", "Make rational decisions"]
    },
    "Self-Preservation": {
        name: "Self-Preservation",
        description: "Reflects your ability to maintain your identity in relationships",
        suggestions: ["Maintain personal space", "Uphold self-worth", "Balance love and life", "Maintain independence"]
    }
};

// Level configuration
const levels = [
    {
        level: 1,
        name: "Rational & Clear-headed",
        emoji: "🧠",
        minScore: 20,
        maxScore: 25,
        color: "#4CAF50",
        bgColor: "#E8F5E9",
        borderColor: "#A5D6A7",
        description: "Congratulations! You are very rational and clear-headed in relationships, knowing how to balance love and life. You don't easily get swayed by emotions and can maintain independent thinking. Keep this clarity, but don't forget to be emotional occasionally and enjoy the beauty of love~"
    },
    {
        level: 2,
        name: "Mild Love-brained",
        emoji: "💙",
        minScore: 26,
        maxScore: 35,
        color: "#2196F3",
        bgColor: "#E3F2FD",
        borderColor: "#90CAF9",
        description: "You're starting to show some love-brained tendencies! You invest certain energy in relationships but can still maintain rationality. You know how to enjoy the sweetness of love and when to stop. This is a great state, keep it up~"
    },
    {
        level: 3,
        name: "Mild to Moderate Love-brained",
        emoji: "💜",
        minScore: 36,
        maxScore: 45,
        color: "#9C27B0",
        bgColor: "#F3E5F5",
        borderColor: "#CE93D8",
        description: "Your love-brained nature is starting to show! You invest quite a bit in relationships and have some romantic little fantasies. While you can still maintain some rationality, sometimes you get influenced by emotions. It's recommended to maintain appropriate distance and give yourself some space~"
    },
    {
        level: 4,
        name: "Moderate Love-brained",
        emoji: "💕",
        minScore: 46,
        maxScore: 55,
        color: "#FF6B9D",
        bgColor: "#FFE5EC",
        borderColor: "#FFB6C1",
        description: "You're a standard love-brained person! You invest a lot in relationships, and your partner's every move affects your emotions. You enjoy the feeling of being in love and are willing to give for your partner. But be careful not to be overly dependent - maintaining some independence will make the relationship healthier~"
    },
    {
        level: 5,
        name: "Moderate to Severe Love-brained",
        emoji: "💖",
        minScore: 56,
        maxScore: 65,
        color: "#E91E63",
        bgColor: "#FCE4EC",
        borderColor: "#F48FB1",
        description: "Your love-brained index is quite high! Love occupies a very important position in your life, and you'll make many changes and sacrifices for love. This sincerity is precious, but remember to love yourself and don't completely lose yourself in relationships~"
    },
    {
        level: 6,
        name: "Severe Love-brained",
        emoji: "💗",
        minScore: 66,
        maxScore: 75,
        color: "#F44336",
        bgColor: "#FFEBEE",
        borderColor: "#EF9A9A",
        description: "You're a severe love-brained person! Love has become almost your entire life, and you invest yourself completely in relationships, even ignoring other important things. It's recommended to cultivate some personal interests and maintain social circles to have a more balanced life~"
    },
    {
        level: 7,
        name: "Extremely Severe Love-brained",
        emoji: "💘",
        minScore: 76,
        maxScore: 85,
        color: "#D32F2F",
        bgColor: "#FFCDD2",
        borderColor: "#E57373",
        description: "Warning! Your love-brained index has exploded! You completely lose rationality in relationships and might make some impulsive decisions. It's strongly recommended that you pause, think calmly, and find yourself again. Remember: healthy love is mutual growth, not self-depletion!"
    },
    {
        level: 8,
        name: "Ultimate Love-brained",
        emoji: "💝",
        minScore: 86,
        maxScore: 95,
        color: "#C62828",
        bgColor: "#FFEBEE",
        borderColor: "#EF5350",
        description: "You've reached the ultimate level of love-brained! Love is your belief, and everything else can make way for love. This state is actually quite dangerous and you're easily hurt in relationships. It's recommended to seek professional psychological counseling and learn to build healthy intimate relationships~"
    },
    {
        level: 9,
        name: "Max Level Love-brained",
        emoji: "🌪️",
        minScore: 96,
        maxScore: 100,
        color: "#B71C1C",
        bgColor: "#FFEBEE",
        borderColor: "#EF5350",
        description: "Max level love-brained! You're completely immersed in the vortex of love and can't extricate yourself. This is not a healthy state and might seriously affect your life and work. Please seek help, rediscover yourself, learn to be independent and self-loving. Remember: you deserve a better you!"
    }
];

// Global variables
let currentQuestion = 0;
let answers = {};
let chartInstance = null;

// DOM elements
const pages = {
    intro: document.getElementById('intro-page'),
    test: document.getElementById('test-page'),
    result: document.getElementById('result-page'),
    history: document.getElementById('history-page')
};

// Page switch
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
    window.scrollTo(0, 0);
}

// Start test - original button (removed from HTML)
// document.getElementById('start-btn').addEventListener('click', () => {
//     currentQuestion = 0;
//     answers = {};
//     showPage('test');
//     renderQuestion();
// });

// Start test - immediate button
document.getElementById('start-btn-immediate').addEventListener('click', () => {
    currentQuestion = 0;
    answers = {};
    showPage('test');
    renderQuestion();
});

// Render question
function renderQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length * 100).toFixed(1);

    document.getElementById('current-num').textContent = currentQuestion + 1;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-percent').textContent = progress + '%';
    document.getElementById('remaining').textContent = questions.length - currentQuestion - 1;
    document.getElementById('question-text').textContent = question.text;

    // Render options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-label">${option.label}</span>
            <span>${option.text}</span>
        `;
        btn.addEventListener('click', () => handleAnswer(option.value));
        optionsContainer.appendChild(btn);
    });

    // Previous question button
    const prevBtn = document.getElementById('prev-btn');
    if (currentQuestion > 0) {
        prevBtn.style.visibility = 'visible';
    } else {
        prevBtn.style.visibility = 'hidden';
    }
}

// Handle answer
function handleAnswer(value) {
    answers[questions[currentQuestion].id] = value;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

// Previous question
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

// Calculate results
function calculateResults() {
    let rawScore = 0;
    const dimensionScores = {};

    // Initialize dimension scores
    Object.keys(dimensions).forEach(dim => {
        dimensionScores[dim] = { score: 0, count: 0 };
    });

    // Calculate raw score and dimension scores
    questions.forEach(q => {
        const score = answers[q.id] || 1;
        rawScore += score;
        dimensionScores[q.dimension].score += score;
        dimensionScores[q.dimension].count++;
    });

    // Convert raw score to 100-point scale
    // Raw score range: 32-160, convert to 20-100
    const totalScore = Math.round(((rawScore - 32) / (160 - 32)) * (100 - 20) + 20);

    // Calculate dimension average scores
    const dimensionAvgScores = {};
    Object.keys(dimensionScores).forEach(dim => {
        const { score, count } = dimensionScores[dim];
        dimensionAvgScores[dim] = (score / count).toFixed(2);
    });

    return { totalScore, dimensionAvgScores };
}

// Get level
function getLevel(totalScore) {
    return levels.find(level =>
        totalScore >= level.minScore && totalScore <= level.maxScore
    ) || levels[0];
}

// Get dimension level
function getDimensionLevel(avgScore) {
    const score = parseFloat(avgScore);
    if (score < 2.0) return { level: 'Very Low', color: '#4CAF50' };
    if (score < 3.0) return { level: 'Low', color: '#2196F3' };
    if (score < 3.5) return { level: 'Moderate', color: '#FBC02D' };
    if (score < 4.0) return { level: 'High', color: '#FF9800' };
    return { level: 'Very High', color: '#F44336' };
}

// Show results
function showResults() {
    const results = calculateResults();
    const level = getLevel(results.totalScore);

    // Render overall result
    const overallResult = document.getElementById('overall-result');
    overallResult.style.background = level.bgColor;
    overallResult.style.border = `2px solid ${level.borderColor}`;
    overallResult.innerHTML = `
        <div class="result-emoji">${level.emoji}</div>
        <div class="result-level" style="color: ${level.color}">
            ${level.name}
        </div>
        <div class="result-scores">
            <div class="score-item">
                <div class="score-value">${results.totalScore}</div>
                <div class="score-label">Total Score</div>
            </div>
        </div>
        <div class="result-description" style="color: ${level.color}">
            ${level.description}
        </div>
    `;

    // Render radar chart
    renderRadarChart(results.dimensionAvgScores);

    // Render dimensions list
    renderDimensions(results.dimensionAvgScores);

    // Render suggestions
    renderSuggestions(results.dimensionAvgScores);

    // Save history record
    saveHistory(results.totalScore, level);

    showPage('result');
}

// Render radar chart
function renderRadarChart(dimensionAvgScores) {
    const ctx = document.getElementById('radar-chart');

    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = Object.keys(dimensions).map(dim => dimensions[dim].name);
    const data = Object.keys(dimensions).map(dim => parseFloat(dimensionAvgScores[dim]));

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: data,
                borderColor: '#FF6B9D',
                backgroundColor: 'rgba(255, 107, 157, 0.2)',
                pointBackgroundColor: '#FF6B9D',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF6B9D'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
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
}

// Render dimensions list
function renderDimensions(dimensionAvgScores) {
    const container = document.getElementById('dimensions-container');
    container.innerHTML = '';

    Object.keys(dimensions).forEach(dim => {
        const avgScore = dimensionAvgScores[dim];
        const dimLevel = getDimensionLevel(avgScore);
        const percentage = (parseFloat(avgScore) / 5 * 100).toFixed(0);

        const item = document.createElement('div');
        item.className = 'dimension-item';
        item.style.backgroundColor = dimLevel.color + '10';
        item.style.borderColor = dimLevel.color;

        item.innerHTML = `
            <div class="dimension-header">
                <span class="dimension-name" style="color: ${dimLevel.color}">${dimensions[dim].name}</span>
                <div class="dimension-score-badge">
                    <span class="dimension-score">${avgScore}</span>
                    <span class="dimension-level" style="background: ${dimLevel.color}">${dimLevel.level}</span>
                </div>
            </div>
            <div class="dimension-progress">
                <div class="dimension-progress-fill" style="width: ${percentage}%; background: ${dimLevel.color}"></div>
            </div>
        `;

        container.appendChild(item);
    });
}

// Render suggestions
function renderSuggestions(dimensionAvgScores) {
    const container = document.getElementById('suggestions-section');

    // Find dimensions with highest scores
    const highScoreDimensions = Object.keys(dimensionAvgScores)
        .filter(dim => parseFloat(dimensionAvgScores[dim]) >= 3.5)
        .sort((a, b) => parseFloat(dimensionAvgScores[b]) - parseFloat(dimensionAvgScores[a]))
        .slice(0, 2);

    if (highScoreDimensions.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #4CAF50;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h3 style="color: #4CAF50; margin-bottom: 0.5rem;">Great State!</h3>
                <p style="color: #666;">You maintain good balance across all dimensions, keep up this state~</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '<h3 class="section-title">💡 Improvement Suggestions</h3><div class="suggestion-grid"></div>';
    const grid = container.querySelector('.suggestion-grid');

    highScoreDimensions.forEach(dim => {
        const dimLevel = getDimensionLevel(dimensionAvgScores[dim]);
        const card = document.createElement('div');
        card.className = 'suggestion-card';
        card.style.backgroundColor = dimLevel.color + '10';
        card.style.borderColor = dimLevel.color;

        card.innerHTML = `
            <h4 style="color: ${dimLevel.color}">${dimensions[dim].name}</h4>
            <p>${dimensions[dim].description}</p>
            <ul>
                ${dimensions[dim].suggestions.map(sug => `<li>${sug}</li>`).join('')}
            </ul>
        `;

        grid.appendChild(card);
    });
}

// Save history record
function saveHistory(totalScore, level) {
    const history = JSON.parse(localStorage.getItem('loveBrainHistory') || '[]');

    const record = {
        date: new Date().toLocaleString('en-US'),
        timestamp: Date.now(),
        totalScore: totalScore,
        level: level.level,
        levelName: level.name,
        emoji: level.emoji
    };

    history.unshift(record);

    // Keep only last 10 records
    if (history.length > 10) {
        history.splice(10);
    }

    localStorage.setItem('loveBrainHistory', JSON.stringify(history));
}

// Show history records
function showHistory() {
    const history = JSON.parse(localStorage.getItem('loveBrainHistory') || '[]');
    const container = document.getElementById('history-container');

    if (history.length === 0) {
        container.innerHTML = `
            <div class="history-empty">
                <div class="history-empty-icon">📝</div>
                <p>No test records yet~</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Go take a test now!</p>
            </div>
        `;
    } else {
        container.innerHTML = history.map((record, index) => `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-date">${record.date}</span>
                    <button class="history-delete-btn" onclick="deleteHistory(${index})">🗑️</button>
                </div>
                <div class="history-result">
                    <div class="history-level">
                        ${record.emoji} ${record.levelName}
                    </div>
                    <div class="history-score">
                        Total Score: ${record.totalScore}
                    </div>
                </div>
            </div>
        `).join('');
    }

    showPage('history');
}

// Delete history record
function deleteHistory(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        const history = JSON.parse(localStorage.getItem('loveBrainHistory') || '[]');
        history.splice(index, 1);
        localStorage.setItem('loveBrainHistory', JSON.stringify(history));
        showHistory();
    }
}

// Auto test feature - show selection popup
document.getElementById('auto-test-btn').addEventListener('click', () => {
    showAutoTestModal();
});

// Show auto test selection popup
function showAutoTestModal() {
    const modal = document.getElementById('auto-test-modal');
    modal.classList.add('active');
}

// Close auto test popup
function closeAutoTestModal() {
    const modal = document.getElementById('auto-test-modal');
    modal.classList.remove('active');
}

// Execute auto test
function runAutoTest(mode) {
    currentQuestion = 0;
    answers = {};

    // Generate scores based on different modes
    questions.forEach(q => {
        let score;
        switch(mode) {
            case 'low':
                // Low score: mainly between 1-2
                score = Math.random() < 0.7 ? 1 : 2;
                break;
            case 'medium':
                // Medium score: mainly between 2-4
                score = Math.floor(Math.random() * 3) + 2;
                break;
            case 'high':
                // High score: mainly between 4-5
                score = Math.random() < 0.7 ? 5 : 4;
                break;
            case 'random':
            default:
                // Random: random between 1-5
                score = Math.floor(Math.random() * 5) + 1;
                break;
        }
        answers[q.id] = score;
    });

    // Close popup and show results
    closeAutoTestModal();
    showResults();
}

// Event listeners
// document.getElementById('history-btn').addEventListener('click', showHistory); // Removed - no longer exists in HTML
document.getElementById('history-btn-quick').addEventListener('click', showHistory);
document.getElementById('view-history-btn').addEventListener('click', showHistory);
document.getElementById('back-to-intro-btn').addEventListener('click', () => showPage('intro'));

document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestion = 0;
    answers = {};
    showPage('intro');
});

// Auto test popup event listeners
document.getElementById('close-modal-btn').addEventListener('click', closeAutoTestModal);
document.getElementById('auto-test-low').addEventListener('click', () => runAutoTest('low'));
document.getElementById('auto-test-medium').addEventListener('click', () => runAutoTest('medium'));
document.getElementById('auto-test-high').addEventListener('click', () => runAutoTest('high'));
document.getElementById('auto-test-random').addEventListener('click', () => runAutoTest('random'));

// Click popup background to close
document.getElementById('auto-test-modal').addEventListener('click', (e) => {
    if (e.target.id === 'auto-test-modal') {
        closeAutoTestModal();
    }
});

// Upgrade section functionality
// Handle upgrade button click
document.getElementById('upgrade-btn').addEventListener('click', () => {
    showPremiumModal();
});

// Show premium purchase modal
function showPremiumModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'premium-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closePremiumModal()">×</button>

            <div class="modal-header">
                <div class="modal-icon">🎯</div>
                <h2 class="modal-title">Premium Love Brain Analysis Report</h2>
                <p class="modal-subtitle">Unlock Your Complete Personality Analysis</p>
            </div>

            <div class="modal-features">
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>15-page detailed personality analysis report</span>
                </div>
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>Love relationship development advice</span>
                </div>
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>Relationship compatibility insights</span>
                </div>
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>Emotional intelligence improvement plan</span>
                </div>
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>Celebrity personality comparison analysis</span>
                </div>
                <div class="modal-feature-item">
                    <span class="mr-2">✓</span>
                    <span>30-day personal growth challenge</span>
                </div>
            </div>

            <div class="modal-pricing">
                <div>
                    <p class="modal-price-original">Original price: $4.90</p>
                    <p class="modal-price-current">Only $1.90</p>
                </div>
                <div class="modal-discount">
                    <p class="modal-discount-label">Limited time offer</p>
                    <p class="modal-discount-value">Save 61%</p>
                </div>
            </div>

            <div class="modal-actions">
                <button class="modal-btn-purchase" onclick="purchasePremiumReport()">
                    🚀 Get Premium Report - $1.90
                </button>
                <button class="modal-btn-cancel" onclick="closePremiumModal()">
                    Maybe later
                </button>
            </div>

            <div class="modal-footer">
                <p>🔒 30-day satisfaction guarantee | Instant delivery</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);

    // Click background to close modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePremiumModal();
        }
    });
}

// Close premium modal
function closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Purchase premium report
function purchasePremiumReport() {
    alert('Payment integration coming soon! Your premium report will include detailed analysis, love advice, and personalized growth strategies.');
    closePremiumModal();
}