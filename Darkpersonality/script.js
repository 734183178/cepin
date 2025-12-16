const DarkPersonalityAssessment = () => {
  const [currentPage, setCurrentPage] = React.useState('intro');
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showHistory, setShowHistory] = React.useState(false);
  const [historyRecords, setHistoryRecords] = React.useState([]);
  const [quickTestMode, setQuickTestMode] = React.useState(false);
  const [titleClickCount, setTitleClickCount] = React.useState(0);
  const [titleClickTimer, setTitleClickTimer] = React.useState(null);
  const chartRef = React.useRef(null);

  // 10 dark personality dimensions configuration
  const dimensions = {
    "Machiavellianism": {
      name: "Machiavellianism",
      icon: "🎭",
      color: "#7C3AED",
      description: "Manipulating others, strategic thinking, power-oriented behavior"
    },
    "Narcissism": {
      name: "Narcissism",
      icon: "👑",
      color: "#F59E0B",
      description: "Self-centeredness, superiority complex, need for admiration"
    },
    "Psychopathy": {
      name: "Psychopathy",
      icon: "🎯",
      color: "#DC2626",
      description: "Cold-heartedness, impulsivity, lack of empathy"
    },
    "Sadism": {
      name: "Sadism",
      icon: "⚡",
      color: "#B91C1C",
      description: "Enjoying others' pain, aggressive behavior"
    },
    "Egoism": {
      name: "Egoism",
      icon: "💎",
      color: "#9333EA",
      description: "Extreme selfishness, prioritizing personal interests only"
    },
    "Moral Disengagement": {
      name: "Moral Disengagement",
      icon: "🎪",
      color: "#EA580C",
      description: "Rationalizing immoral behavior, avoiding responsibility"
    },
    "Entitlement": {
      name: "Entitlement",
      icon: "🏆",
      color: "#D97706",
      description: "Believing one deserves special treatment, privileged thinking"
    },
    "Spitefulness": {
      name: "Spitefulness",
      icon: "🗡️",
      color: "#991B1B",
      description: "Intentionally harming others, vengeful mentality"
    },
    "Self-Centeredness": {
      name: "Self-Centeredness",
      icon: "🌟",
      color: "#A855F7",
      description: "Lack of attention to and empathy for others"
    },
    "Resentment": {
      name: "Resentment",
      icon: "⚔️",
      color: "#7C2D12",
      description: "Hostile attitude toward others and the world"
    }
  };

  // 50 questions - 5 questions per dimension
  const questions = [
    // Machiavellianism (1-5)
    { id: 1, text: "To achieve important goals, it's acceptable to deceive others when necessary", dimension: "Machiavellianism" },
    { id: 2, text: "I'm good at reading people and exploiting their weaknesses", dimension: "Machiavellianism" },
    { id: 3, text: "In competition, strategy is more important than morality", dimension: "Machiavellianism" },
    { id: 4, text: "I'm skilled at manipulating situations to make things go my way", dimension: "Machiavellianism" },
    { id: 5, text: "Breaking rules is fine as long as you don't get caught", dimension: "Machiavellianism" },

    // Narcissism (6-10)
    { id: 6, text: "I am more talented and capable than most people", dimension: "Narcissism" },
    { id: 7, text: "I like to be the center of attention", dimension: "Narcissism" },
    { id: 8, text: "My achievements deserve more recognition", dimension: "Narcissism" },
    { id: 9, text: "I am very confident about my appearance and image", dimension: "Narcissism" },
    { id: 10, text: "People should respect and admire me more", dimension: "Narcissism" },

    // Psychopathy (11-15)
    { id: 11, text: "I rarely feel guilty or regretful about my actions", dimension: "Psychopathy" },
    { id: 12, text: "I enjoy risky and thrilling activities", dimension: "Psychopathy" },
    { id: 13, text: "Others' suffering rarely evokes emotional empathy in me", dimension: "Psychopathy" },
    { id: 14, text: "I often make impulsive decisions without considering consequences", dimension: "Psychopathy" },
    { id: 15, text: "Under pressure, I remain calm and rational", dimension: "Psychopathy" },

    // Sadism (16-20)
    { id: 16, text: "I find it amusing when others feel embarrassed or make fools of themselves", dimension: "Sadism" },
    { id: 17, text: "I enjoy completely dominating opponents in games or competitions", dimension: "Sadism" },
    { id: 18, text: "Punishing those who offend me brings me satisfaction", dimension: "Sadism" },
    { id: 19, text: "Sometimes I want to see certain people taught a lesson", dimension: "Sadism" },
    { id: 20, text: "Making someone speechless in a debate gives me pleasure", dimension: "Sadism" },

    // Egoism (21-25)
    { id: 21, text: "My needs and interests always come first", dimension: "Egoism" },
    { id: 22, text: "If helping others would harm my interests, I would refuse", dimension: "Egoism" },
    { id: 23, text: "Everyone should prioritize themselves", dimension: "Egoism" },
    { id: 24, text: "I rarely sacrifice my time or resources for others", dimension: "Egoism" },
    { id: 25, text: "When distributing resources, I ensure I get the most", dimension: "Egoism" },

    // 道德推脱 (26-30)
    { id: 26, text: "As long as it's for a just cause, the means don't matter", dimension: "Moral Disengagement" },
    { id: 27, text: "Sometimes circumstances force people to make immoral choices", dimension: "Moral Disengagement" },
    { id: 28, text: "If everyone is doing it, it's not wrong", dimension: "Moral Disengagement" },
    { id: 29, text: "My inappropriate behavior is often provoked by others", dimension: "Moral Disengagement" },
    { id: 30, text: "Compared to greater evils, my minor faults are negligible", dimension: "Moral Disengagement" },

    // 心理特权感 (31-35)
    { id: 31, text: "I deserve special treatment and privileges", dimension: "Entitlement" },
    { id: 32, text: "Rules should be more flexible for me", dimension: "Entitlement" },
    { id: 33, text: "I shouldn't have to wait in line like everyone else", dimension: "Entitlement" },
    { id: 34, text: "I expect others to meet my needs", dimension: "Entitlement" },
    { id: 35, text: "Ordinary standards don't apply to me", dimension: "Entitlement" },

    // 恶意 (36-40)
    { id: 36, text: "If someone hurts me, I'll find ways to get revenge", dimension: "Spitefulness" },
    { id: 37, text: "I enjoy making those who bullied me suffer", dimension: "Spitefulness" },
    { id: 38, text: "Even at my own expense, I'll ensure my enemies suffer more", dimension: "Spitefulness" },
    { id: 39, text: "Given the opportunity, I'll create trouble for those who offend me", dimension: "Spitefulness" },
    { id: 40, text: "I remember everyone who has treated me badly", dimension: "Spitefulness" },

    // 自我为中心 (41-45)
    { id: 41, text: "I find it difficult to genuinely care about others' feelings", dimension: "Self-Centeredness" },
    { id: 42, text: "In conversations, I prefer to talk about myself", dimension: "Self-Centeredness" },
    { id: 43, text: "Others' problems are none of my business", dimension: "Self-Centeredness" },
    { id: 44, text: "I rarely ask others about how they're doing", dimension: "Self-Centeredness" },
    { id: 45, text: "I'm not very interested in others' difficulties", dimension: "Self-Centeredness" },

    // 怨恨 (46-50)
    { id: 46, text: "The world is unfair to me", dimension: "Resentment" },
    { id: 47, text: "I feel resentful toward people who are more successful than me", dimension: "Resentment" },
    { id: 48, text: "People are always taking advantage of me", dimension: "Resentment" },
    { id: 49, text: "I often feel angry about society and the system", dimension: "Resentment" },
    { id: 50, text: "I feel I haven't received the recognition I deserve", dimension: "Resentment" }
  ];

  // Rating options
  const options = [
    { value: 1, label: 'A', text: 'Strongly Disagree' },
    { value: 2, label: 'B', text: 'Disagree' },
    { value: 3, label: 'C', text: 'Neutral' },
    { value: 4, label: 'D', text: 'Agree' },
    { value: 5, label: 'E', text: 'Strongly Agree' }
  ];

  // Personality type definitions
  const personalityTypes = {
    "Dark Overlord": {
      icon: "👑",
      dimensions: ["Machiavellianism", "Narcissism", "Psychopathy"],
      description: "High in all three dimensions with strong dark personality traits",
      careers: ["Senior Management", "Politician", "Investor", "Strategic Advisor"],
      color: "from-purple-600 to-red-600"
    },
    "Strategic Master": {
      icon: "🎭",
      dimensions: ["Machiavellianism", "Moral Disengagement", "Entitlement"],
      description: "Skilled in strategy and manipulation, pursuing goals by any means",
      careers: ["Business Negotiator", "PR Consultant", "Political Strategist"],
      color: "from-purple-500 to-indigo-600"
    },
    "Narcissistic Leader": {
      icon: "🌟",
      dimensions: ["Narcissism", "Entitlement", "Self-Centeredness"],
      description: "Extremely confident and self-centered, seeking attention and admiration",
      careers: ["Corporate CEO", "Performer", "Social Media Influencer"],
      color: "from-yellow-500 to-orange-500"
    },
    "Cold Executor": {
      icon: "🎯",
      dimensions: ["Psychopathy", "Sadism", "Spitefulness"],
      description: "Lacks empathy, acts decisively and coldly",
      careers: ["Surgeon", "Special Forces", "Crisis Management"],
      color: "from-red-600 to-gray-800"
    },
    "Selfish Individual": {
      icon: "💎",
      dimensions: ["Egoism", "Entitlement", "Self-Centeredness"],
      description: "Extremely selfish, only concerned with personal interests",
      careers: ["Investment Trading", "Independent Entrepreneur"],
      color: "from-purple-500 to-pink-500"
    }
  };

  // 核心逻辑函数
  const loadHistory = () => {
    try {
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dark_personality_')) {
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

  const handleTitleClick = () => {
    const now = Date.now();
    if (titleClickTimer) {
      clearTimeout(titleClickTimer);
    }
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);
    if (newCount >= 5) {
      setQuickTestMode(true);
      setTitleClickCount(0);
      alert('🚀 Quick test mode activated!');
    } else {
      const timer = setTimeout(() => {
        setTitleClickCount(0);
      }, 10000);
      setTitleClickTimer(timer);
    }
  };

  const handleQuickTest = () => {
    if (!window.confirm('Are you sure you want to run a quick test? The system will automatically fill in all answers randomly.')) {
      return;
    }
    const randomAnswers = {};
    questions.forEach(q => {
      randomAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });
    setAnswers(randomAnswers);
    saveResult(randomAnswers);
    setCurrentPage('result');
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
        `dark_personality_${Date.now()}`,
        JSON.stringify(record)
      );
      loadHistory();
    } catch (error) {
      console.log('Save failed:', error);
    }
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
    Object.keys(dimensions).forEach(dim => {
      dimensionAvgScores[dim] = (dimensionScores[dim] / 5).toFixed(2);
    });
    const dScore = (Object.values(dimensionAvgScores)
      .reduce((sum, score) => sum + parseFloat(score), 0) / 10).toFixed(2);
    const sortedDimensions = Object.entries(dimensionAvgScores)
      .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a));
    const topDimensions = sortedDimensions.slice(0, 3);
    const personalityType = determinePersonalityType(sortedDimensions, dScore);
    return {
      dimensionScores,
      dimensionAvgScores,
      topDimensions,
      dScore,
      personalityType,
      percentile: calculatePercentile(dScore)
    };
  };

  const determinePersonalityType = (sortedDimensions, dScore) => {
    const top3Names = sortedDimensions.slice(0, 3).map(([name]) => name);
    const dScoreNum = parseFloat(dScore);
    if (dScoreNum >= 4.0) {
      return "Dark Overlord";
    }
    for (const [typeName, typeInfo] of Object.entries(personalityTypes)) {
      if (typeInfo.dimensions && typeInfo.dimensions.length > 0) {
        const matchCount = typeInfo.dimensions.filter(dim =>
          top3Names.includes(dim)
        ).length;
        if (matchCount >= 2) {
          return typeName;
        }
      }
    }
    if (dScoreNum >= 3.5) {
      return "High Dark Traits";
    } else if (dScoreNum >= 2.5) {
      return "Moderate Dark Traits";
    } else {
      return "Low Dark Traits";
    }
  };

  const calculatePercentile = (dScore) => {
    const score = parseFloat(dScore);
    const mean = 2.5;
    const sd = 0.8;
    const z = (score - mean) / sd;
    let percentile = 50 + (z * 34);
    percentile = Math.max(0, Math.min(100, percentile));
    return Math.round(percentile);
  };

  // 图表初始化
  React.useEffect(() => {
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

      const colors = dimensionNames.map(dim => dimensions[dim].color);

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
              pointBackgroundColor: colors,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: colors,
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
                min: 0,
                max: 5,
                ticks: {
                  stepSize: 1,
                  color: '#9ca3af',
                  backdropColor: 'transparent',
                  font: {
                    size: 12
                  }
                },
                pointLabels: {
                  color: '#d1d5db',
                  font: {
                    size: 11,
                    weight: 'bold'
                  }
                },
                grid: {
                  color: 'rgba(156, 163, 175, 0.2)'
                },
                angleLines: {
                  color: 'rgba(156, 163, 175, 0.2)'
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.label}: ${context.parsed.r.toFixed(2)} points`;
                  }
                }
              }
            }
          }
        });
      } catch (error) {
        console.log('Chart creation failed:', error);
      }
    }
  }, [currentPage, answers]);

  React.useEffect(() => {
    loadHistory();
  }, []);

  // 渲染组件
  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen dark-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-5xl mx-auto w-full" },
        !showHistory ? React.createElement(React.Fragment, null,
          React.createElement('div', { className: "flex items-center justify-center min-h-[70vh]" },
            React.createElement('div', { className: "w-full" },
              React.createElement('div', { className: "text-center mb-4 sm:mb-8" },
                React.createElement('div', { className: "inline-block mb-3 sm:mb-6" },
                  React.createElement('div', { className: "text-5xl sm:text-8xl mb-2 sm:mb-4 animate-pulse" }, '🌑'),
                  React.createElement('div', { className: "h-1 w-20 sm:w-24 mx-auto bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 rounded-full" })
                ),
                React.createElement('h1', {
                  className: "text-2xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-relaxed cursor-pointer select-none",
                  onClick: handleTitleClick
                },
                  'Dark Personality Assessment'
                ),
                React.createElement('p', { className: "text-base sm:text-xl text-gray-300 mb-1 sm:mb-2" }, 'Dark Personality Assessment'),
                React.createElement('p', { className: "text-xs sm:text-base text-gray-400" },
                  'Based on Dark Ten-Factor Theory · Scientific Assessment of Dark Personality Traits'
                )
              ),
              React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-10 mb-4 sm:mb-8 neon-border purple-glow" },
                React.createElement('div', { className: "mb-4 block sm:hidden" },
                  React.createElement('div', { className: "text-center text-gray-300 text-sm leading-relaxed" },
                    React.createElement('p', { className: "mb-2" },
                      React.createElement('strong', { className: "text-purple-400" }, 'Based on Dark Ten-Factor Model')
                    ),
                    React.createElement('p', { className: "text-xs text-gray-400" },
                      '50 Questions · 10 Dimensions · ~8 Minutes · Local Storage'
                    )
                  )
                ),
                React.createElement('div', { className: "bg-red-900 bg-opacity-20 border border-red-500 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-0 sm:mb-6" },
                  React.createElement('h3', { className: "text-base sm:text-lg font-bold mb-2 sm:mb-3 text-red-300 flex items-center" },
                    React.createElement('span', { className: "mr-2" }, '⚠️'),
                    'Important Disclaimer'
                  ),
                  React.createElement('ul', { className: "space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm" },
                    React.createElement('li', null, '• This assessment is for self-awareness and psychological research only, not for diagnosis'),
                    React.createElement('li', { className: "hidden sm:block" }, '• High or low scores don\'t indicate good or bad - everyone has unique personality traits'),
                    React.createElement('li', { className: "hidden sm:block" }, '• Dark traits can be advantageous in certain situations (e.g., leadership, decisiveness)'),
                    React.createElement('li', { className: "hidden sm:block" }, '• If you feel concerned, consider seeking professional psychological counseling')
                  )
                )
              ),
              React.createElement('div', { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6" },
                React.createElement('button', {
                  onClick: handleStartTest,
                  className: "w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center justify-center space-x-2"
                },
                  React.createElement('span', null, '🚀'),
                  React.createElement('span', null, 'Start Assessment (50 Questions)')
                ),
                quickTestMode && React.createElement('button', {
                  onClick: handleQuickTest,
                  className: "w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 flex items-center justify-center space-x-2"
                },
                  React.createElement('span', null, '⚡'),
                  React.createElement('span', null, 'Quick Test')
                ),
                historyRecords.length > 0 && React.createElement('button', {
                  onClick: () => setShowHistory(!showHistory),
                  className: "w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 sm:py-5 px-8 sm:px-10 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-600 text-sm sm:text-base"
                },
                  React.createElement('span', null, '📊'),
                  React.createElement('span', null, `History (${historyRecords.length})`)
                )
              )
            )
          )
        ) : React.createElement(React.Fragment, null,
          React.createElement('div', { className: "mb-4" },
            React.createElement('button', {
              onClick: () => setShowHistory(false),
              className: "w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-600 text-sm sm:text-base"
            },
              React.createElement('span', null, '←'),
              React.createElement('span', null, 'Back to Home')
            )
          ),
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 neon-border purple-glow mb-4" },
            React.createElement('h2', { className: "text-2xl sm:text-4xl font-bold mb-6 text-white flex items-center" },
              React.createElement('span', { className: "mr-3" }, '📊'),
              'History Records'
            ),
            React.createElement('div', { className: "space-y-4" },
              historyRecords.length > 0 ? historyRecords.map((record, idx) => {
                const recordDate = new Date(record.timestamp);
                const dateStr = recordDate.toLocaleString('zh-CN');
                const recordResults = record.results || calculateResults(record.answers);
                return React.createElement('div', {
                  key: record.timestamp,
                  className: "bg-gray-800 bg-opacity-50 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-purple-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
                },
                  React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3" },
                    React.createElement('div', null,
                      React.createElement('div', { className: "text-base sm:text-lg font-semibold text-white" },
                        `Record ${historyRecords.length - idx}`
                      ),
                      React.createElement('div', { className: "text-xs sm:text-sm text-gray-400" },
                        dateStr
                      )
                    ),
                    React.createElement('div', { className: "mt-2 sm:mt-0 text-right" },
                      React.createElement('div', {
                        className: "text-2xl sm:text-3xl font-bold",
                        style: { color: '#8B5CF6' }
                      },
                        recordResults.dScore
                      ),
                      React.createElement('div', { className: "text-xs text-gray-400" },
                        `Percentile: ${recordResults.percentile}%`
                      )
                    )
                  ),
                  React.createElement('div', { className: "flex flex-wrap gap-2 items-center" },
                    React.createElement('span', { className: "inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-900 to-purple-800 text-purple-200 border border-purple-600" },
                      recordResults.personalityType || 'Calculating...'
                    ),
                    React.createElement('span', { className: "text-gray-400 text-xs" }, '·'),
                    recordResults.topDimensions && recordResults.topDimensions.slice(0, 3).map(([dim, score]) =>
                      React.createElement('span', {
                        key: dim,
                        className: "text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded"
                      },
                        `${dim}: ${score}`)
                    )
                  )
                );
              }) : React.createElement('div', { className: "text-center py-12" },
                React.createElement('div', { className: "text-5xl mb-4" }, '📭'),
                React.createElement('p', { className: "text-gray-400 text-lg" },
                  'No History Records'
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
    const progress = ((currentQuestion + 1) / questions.length * 100).toFixed(1);

    return (
      React.createElement('div', { className: "min-h-screen dark-gradient p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-3xl mx-auto" },
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 neon-border" },
            React.createElement('div', { className: "flex items-center justify-between mb-6" },
              React.createElement('div', { className: "flex items-center space-x-3" },
                React.createElement('span', { className: "text-4xl" }, dimInfo.icon),
                React.createElement('div', null,
                  React.createElement('div', { className: "text-white font-bold text-lg sm:text-xl" },
                    dimInfo.name
                  )
                )
              ),
              React.createElement('div', { className: "text-right" },
                React.createElement('div', {
                  className: "text-2xl sm:text-3xl font-bold mb-1",
                  style: { color: dimInfo.color }
                },
                  `${currentQuestion + 1} / 50`
                ),
                React.createElement('div', { className: "text-xs text-gray-400" },
                  `Dimension ${Math.floor(currentQuestion / 5) + 1}`
                )
              )
            ),
            React.createElement('div', { className: "mb-4" },
              React.createElement('div', { className: "w-full bg-gray-700 rounded-full h-3 overflow-hidden" },
                React.createElement('div', {
                  className: "h-3 rounded-full transition-all duration-500 ease-out relative",
                  style: {
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
                  }
                },
                React.createElement('div', { className: "absolute inset-0 bg-white opacity-20 animate-pulse" })
              ),
              React.createElement('div', { className: "flex justify-between items-center mt-2 text-xs sm:text-sm" },
                React.createElement('span', { className: "text-gray-400" }, `${progress}% Complete`),
                React.createElement('span', { className: "text-gray-400" }, `${50 - currentQuestion - 1} Questions Remaining`)
              )
            ),
            React.createElement('div', { className: "bg-gray-800 bg-opacity-50 rounded-lg p-3 border border-gray-700" },
              React.createElement('div', { className: "text-gray-300 text-xs sm:text-sm" },
                React.createElement('span', { className: "text-purple-400 font-semibold" }, 'Currently Assessing:'),
                dimInfo.description
              )
            )
          ),
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 mb-6 neon-border purple-glow" },
            React.createElement('div', { className: "mb-10" },
              React.createElement('div', { className: "text-center mb-4" },
                React.createElement('span', {
                  className: "inline-block px-4 py-2 rounded-full text-xs font-semibold",
                  style: {
                    backgroundColor: dimInfo.color + '20',
                    color: dimInfo.color,
                    border: `1px solid ${dimInfo.color}40`
                  }
                },
                  `Question ${currentQ.id}`
                )
              ),
              React.createElement('h3', { className: "text-xl sm:text-2xl lg:text-3xl font-medium text-white text-center leading-relaxed px-2 min-h-[80px] flex items-center justify-center" },
                currentQ.text
              )
            ),
            React.createElement('div', { className: "space-y-3 sm:space-y-4" },
              options.map(option => {
                const isSelected = answers[currentQ.id] === option.value;
                return React.createElement('button', {
                  key: option.value,
                  onClick: () => handleAnswer(option.value),
                  className: `answer-option w-full text-left p-4 sm:p-5 border-2 rounded-xl transition-all duration-200 ${isSelected ? 'border-opacity-100 shadow-lg' : 'border-gray-700 hover:border-gray-600'}`,
                  style: {
                    borderColor: isSelected ? dimInfo.color : undefined,
                    backgroundColor: isSelected ? `${dimInfo.color}15` : 'rgba(31, 41, 55, 0.5)',
                    boxShadow: isSelected ? `0 0 20px ${dimInfo.color}40` : undefined
                  }
                },
                  React.createElement('div', { className: "flex items-center" },
                    React.createElement('div', {
                      className: "font-bold text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-all",
                      style: {
                        backgroundColor: isSelected ? dimInfo.color : `${dimInfo.color}30`,
                        color: isSelected ? 'white' : dimInfo.color,
                        border: `2px solid ${isSelected ? dimInfo.color : `${dimInfo.color}60`}`
                      }
                    },
                      option.label
                    ),
                    React.createElement('div', null,
                      React.createElement('div', { className: "text-base sm:text-lg text-white font-medium mb-1" },
                        option.text
                      ),
                      React.createElement('div', { className: "text-xs text-gray-400" },
                        option.value === 1 && 'This is completely not like me',
                        option.value === 2 && 'I don\'t quite agree with this description',
                        option.value === 3 && 'Not sure / Sometimes yes, sometimes no',
                        option.value === 4 && 'I somewhat agree with this description',
                        option.value === 5 && 'This is very much like me'
                      )
                    )
                  )
                );
              })
            )
          ),
          React.createElement('div', { className: "flex justify-between items-center" },
            currentQuestion > 0 ? React.createElement('button', {
              onClick: () => setCurrentQuestion(currentQuestion - 1),
              className: "bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-gray-600"
            },
              React.createElement('span', null, '←'),
              React.createElement('span', null, 'Previous')
            ) : React.createElement('button', {
              onClick: () => {
                if (window.confirm('Are you sure you want to exit? Current progress will not be saved.')) {
                  setCurrentPage('intro');
                  setAnswers({});
                }
              },
              className: "bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-gray-600"
            },
              React.createElement('span', null, '✕'),
              React.createElement('span', null, 'Exit')
            ),
            React.createElement('div', { className: "text-right" },
              answers[currentQ.id] ? React.createElement('div', { className: "text-green-400 text-sm flex items-center space-x-2" },
                React.createElement('span', null, '✓'),
                React.createElement('span', null, 'Answered')
              ) : React.createElement('div', { className: "text-gray-500 text-sm" },
                React.createElement('span', null, 'Please select an answer')
              )
            )
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
          if (key && key.startsWith('dark_personality_')) {
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
    const typeInfo = personalityTypes[results.personalityType] || {
      icon: "🌑",
      description: "您的人格特征独特",
      careers: ["多元发展"],
      color: "from-gray-700 to-gray-900"
    };

    const generateShareText = (results, typeInfo) => {
      return `🌑 Dark Personality Assessment Results

【Personality Type】${results.personalityType} ${typeInfo.icon}
${typeInfo.description}

【Key Data】
• D-Score Total: ${results.dScore} / 5.0
• Percentile: ${results.percentile}%

【Top 3 Traits】
${results.topDimensions.map(([dim, score], idx) =>
    `${idx + 1}. ${dimensions[dim].icon} ${dim} - ${score} points`
  ).join('\n')}

【Suitable Fields】
${typeInfo.careers.slice(0, 3).join(' · ')}

---
💡 Understand your dark side, explore your true self
⚠️ Assessment results are for reference only, not a diagnosis

#DarkPersonality #PsychologyTest #SelfAwareness`;
    };

    return (
      React.createElement('div', { className: "min-h-screen dark-gradient p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-7xl mx-auto" },
          React.createElement('div', {
            className: `bg-gradient-to-r ${typeInfo.color} rounded-2xl p-8 sm:p-12 mb-8 text-white shadow-2xl neon-border`
          },
            React.createElement('div', { className: "text-center" },
              React.createElement('div', { className: "text-7xl sm:text-9xl mb-6 animate-pulse" }, typeInfo.icon),
              React.createElement('h2', { className: "text-3xl sm:text-5xl font-bold mb-4" },
                results.personalityType
              ),
              React.createElement('p', { className: "text-lg sm:text-2xl mb-6 opacity-90" },
                typeInfo.description
              ),
              React.createElement('div', { className: "flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6" },
                React.createElement('div', { className: "bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm min-w-[200px]" },
                  React.createElement('div', { className: "text-sm opacity-80 mb-2" }, 'D-Score Total'),
                  React.createElement('div', { className: "text-5xl font-bold" }, results.dScore),
                  React.createElement('div', { className: "text-xs opacity-70 mt-1" }, 'Max 5.0')
                ),
                React.createElement('div', { className: "bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm min-w-[200px]" },
                  React.createElement('div', { className: "text-sm opacity-80 mb-2" }, 'Percentile Rank'),
                  React.createElement('div', { className: "text-5xl font-bold" }, `${results.percentile}%`),
                  React.createElement('div', { className: "text-xs opacity-70 mt-1" }, `Above ${results.percentile}% of people`)
                )
              )
            )
          ),
          React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" },
            React.createElement('button', {
              onClick: () => {
                const text = generateShareText(results, typeInfo);
                navigator.clipboard.writeText(text).then(() => {
                  alert('✅ Results copied to clipboard!');
                }).catch(() => {
                  alert('❌ Copy failed, please copy manually');
                });
              },
              className: "w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/50 flex items-center justify-center space-x-2"
            },
              React.createElement('span', null, '📋'),
              React.createElement('span', null, 'Copy Results')
            ),
            React.createElement('button', {
              onClick: () => {
                setCurrentPage('intro');
                setCurrentQuestion(0);
                setAnswers({});
              },
              className: "w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center space-x-2"
            },
              React.createElement('span', null, '🔄'),
              React.createElement('span', null, 'Retest')
            )
          ),
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 neon-border" },
            React.createElement('h3', { className: "text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center" },
              React.createElement('span', { className: "mr-3" }, '📊'),
              'Personality Dimensions Radar Chart'
            ),
            React.createElement('div', { className: "w-full h-[400px] sm:h-[500px]" },
              React.createElement('canvas', { ref: chartRef })
            )
          ),
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 neon-border" },
            React.createElement('h3', { className: "text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center" },
              React.createElement('span', { className: "mr-3" }, '🎯'),
              'Top 3 Prominent Traits'
            ),
            React.createElement('div', { className: "space-y-6" },
              results.topDimensions.map(([dimName, score], idx) => {
                const dimInfo = dimensions[dimName];
                const percentage = (parseFloat(score) / 5 * 100).toFixed(0);
                return React.createElement('div', {
                  key: dimName,
                  className: "dimension-card rounded-xl p-5 border-2 border-gray-700"
                },
                  React.createElement('div', { className: "flex items-center justify-between mb-3" },
                    React.createElement('div', { className: "flex items-center space-x-3" },
                      React.createElement('div', {
                        className: "text-4xl sm:text-5xl flex-shrink-0"
                      },
                        dimInfo.icon
                      ),
                      React.createElement('div', null,
                        React.createElement('div', { className: "text-lg sm:text-xl font-bold text-white" },
                          `${idx + 1}. ${dimName}`
                        ),
                                              )
                    ),
                    React.createElement('div', { className: "text-right" },
                      React.createElement('div', {
                        className: "text-3xl sm:text-4xl font-bold",
                        style: { color: dimInfo.color }
                      },
                        score
                      ),
                      React.createElement('div', { className: "text-xs text-gray-400" },
                        '/ 5.0'
                      )
                    )
                  ),
                  React.createElement('div', { className: "mb-3" },
                    React.createElement('div', { className: "w-full bg-gray-700 rounded-full h-3 overflow-hidden" },
                      React.createElement('div', {
                        className: "h-3 rounded-full transition-all duration-1000",
                        style: {
                          width: `${percentage}%`,
                          backgroundColor: dimInfo.color
                        }
                      })
                    )
                  ),
                  React.createElement('p', { className: "text-gray-300 text-sm" },
                    dimInfo.description
                  )
                );
              })
            )
          ),
          React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 neon-border" },
            React.createElement('h3', { className: "text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center" },
              React.createElement('span', { className: "mr-3" }, '📈'),
              'All Dimension Scores'
            ),
            React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
              Object.entries(results.dimensionAvgScores)
                .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
                .map(([dimName, score]) => {
                  const dimInfo = dimensions[dimName];
                  const percentage = (parseFloat(score) / 5 * 100).toFixed(0);
                  return React.createElement('div', {
                    key: dimName,
                    className: "bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700"
                  },
                    React.createElement('div', { className: "flex items-center justify-between mb-2" },
                      React.createElement('div', { className: "flex items-center space-x-2" },
                        React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                        React.createElement('span', { className: "text-white font-semibold text-sm" },
                          dimName
                        )
                      ),
                      React.createElement('span', {
                        className: "text-xl font-bold",
                        style: { color: dimInfo.color }
                      },
                        score
                      )
                    ),
                    React.createElement('div', { className: "w-full bg-gray-700 rounded-full h-2 overflow-hidden" },
                      React.createElement('div', {
                        className: "h-2 rounded-full transition-all duration-1000",
                        style: {
                          width: `${percentage}%`,
                          backgroundColor: dimInfo.color
                        }
                      })
                    )
                  );
                })
            )
          ),
          typeInfo.careers && React.createElement('div', { className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 neon-border" },
            React.createElement('h3', { className: "text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center" },
              React.createElement('span', { className: "mr-3" }, '💼'),
              'Suitable Development Fields'
            ),
            React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
              typeInfo.careers.map((career, idx) =>
                React.createElement('div', {
                  key: idx,
                  className: "bg-gradient-to-br from-purple-900 to-purple-800 bg-opacity-30 rounded-lg p-4 border border-purple-600 border-opacity-30 text-center"
                },
                  React.createElement('div', { className: "text-lg font-semibold text-purple-300" },
                    career
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  // 主渲染函数
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

// 渲染应用到页面
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(DarkPersonalityAssessment));