const SRIAssessment = () => {
  const [currentPage, setCurrentPage] = React.useState('intro');
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showHistory, setShowHistory] = React.useState(false);
  const [historyRecords, setHistoryRecords] = React.useState([]);
  const chartRef = React.useRef(null);

  // Hidden feature: Quick test
  const [titleClickCount, setTitleClickCount] = React.useState(0);
  const [clickTime, setClickTime] = React.useState(null);
  const [showQuickTest, setShowQuickTest] = React.useState(false);

  // Four dimension configuration
  const dimensions = {
    "Sexual Attitude Reversal": {
      name: "Sexual Attitude Reversal",
      icon: "🌸",
      color: "#FF6B9D",
      description: "Open/conservative attitude towards sexuality"
    },
    "Sexual Guilt": {
      name: "Sexual Guilt",
      icon: "😔",
      color: "#FF8E72",
      description: "Guilt feelings related to sexuality"
    },
    "Sexual Shame": {
      name: "Sexual Shame",
      icon: "😳",
      color: "#FF8E91",
      description: "Shame feelings related to sexuality"
    },
    "Inhibition Dominance": {
      name: "Inhibition Dominance",
      icon: "🔒",
      color: "#F8679E",
      description: "Sexual inhibition/sexual arousal system"
    }
  };

  // 24 questions
  const questions = [
    // Sexual Attitude Reversal (1-6)
    { id: 1, text: "I think \"forbidden fruits\" are often overly mystified", dimension: "Sexual Attitude Reversal" },
    { id: 2, text: "In literature or art, I can naturally appreciate physical beauty", dimension: "Sexual Attitude Reversal" },
    { id: 3, text: "I believe \"intimate contact\" between consenting adults is a personal choice", dimension: "Sexual Attitude Reversal" },
    { id: 4, text: "I can openly discuss \"those topics\" with trusted friends", dimension: "Sexual Attitude Reversal" },
    { id: 5, text: "I think some \"taboos\" in traditional views can be re-examined", dimension: "Sexual Attitude Reversal" },
    { id: 6, text: "I don't feel uncomfortable because of others' \"intimate behaviors\"", dimension: "Sexual Attitude Reversal" },

    // Sexual Guilt (7-12)
    { id: 7, text: "I sometimes feel uneasy about \"inappropriate thoughts\" in my mind", dimension: "Sexual Guilt" },
    { id: 8, text: "When my body has certain \"natural reactions\", I feel guilty", dimension: "Sexual Guilt" },
    { id: 9, text: "I think enjoying \"physical pleasure\" needs to be restrained", dimension: "Sexual Guilt" },
    { id: 10, text: "I worry that my deep \"desires\" might be discovered by others", dimension: "Sexual Guilt" },
    { id: 11, text: "I blame myself for some \"crossing-boundary experiences\" in the past", dimension: "Sexual Guilt" },
    { id: 12, text: "I think excessively pursuing \"sensory experiences\" is immoral", dimension: "Sexual Guilt" },

    // Sexual Shame (13-18)
    { id: 13, text: "I find it difficult to talk about certain parts of my body", dimension: "Sexual Shame" },
    { id: 14, text: "During intimate moments, I find it hard to completely let go of my guard", dimension: "Sexual Shame" },
    { id: 15, text: "I worry that my partner might be disappointed with \"that aspect\" of me", dimension: "Sexual Shame" },
    { id: 16, text: "Expressing \"physical needs\" to my partner makes me feel embarrassed", dimension: "Sexual Shame" },
    { id: 17, text: "I tend to prefer \"intimate activities\" in dim lighting", dimension: "Sexual Shame" },
    { id: 18, text: "When topics involve \"bedroom matters\", I always want to change the subject", dimension: "Sexual Shame" },

    // Inhibition Dominance (19-24)
    { id: 19, text: "My interest in \"that area\" is relatively low or unstable", dimension: "Inhibition Dominance" },
    { id: 20, text: "Work stress or emotional fluctuations can completely make me lose \"that mood\"", dimension: "Inhibition Dominance" },
    { id: 21, text: "I need very special circumstances to get \"in the mood\"", dimension: "Inhibition Dominance" },
    { id: 22, text: "Small distractions in the environment can make me lose \"interest\"", dimension: "Inhibition Dominance" },
    { id: 23, text: "Compared to \"sexual intimacy\", I value other life goals more", dimension: "Inhibition Dominance" },
    { id: 24, text: "I think \"sexual activities\" are not necessities in life", dimension: "Inhibition Dominance" }
  ];

  // Rating options
  const options = [
    { value: 1, label: 'A', text: 'Completely disagree' },
    { value: 2, label: 'B', text: 'Somewhat disagree' },
    { value: 3, label: 'C', text: 'Neutral' },
    { value: 4, label: 'D', text: 'Somewhat agree' },
    { value: 5, label: 'E', text: 'Completely agree' }
  ];

  // 6 sexual attitude types
  const attitudeTypes = {
    "Extremely Open Type": {
      icon: "🦋",
      scoreRange: "0-19",
      description: "Holds an extremely open attitude towards sexuality, almost completely free from traditional constraints. While enjoying this freedom, it's important to maintain respect, safety, and responsibility in intimate relationships.",
      characteristics: [
        "Holds an extremely open attitude towards sexuality",
        "Completely free from guilt or shame",
        "Can freely discuss and explore sexual topics",
        "Challenges traditional sexual concepts",
        "Pursues sexual autonomy and sexual freedom"
      ],
      suggestions: [
        "Maintain safety while being open",
        "Respect others' boundaries and choices",
        "Maintain communication and consensus in relationships",
        "Protect your own physical and mental health",
        "Understand and respect people with different sexual attitudes"
      ],
      color: "from-purple-400 to-pink-400"
    },
    "Open Explorer": {
      icon: "🌸",
      scoreRange: "20-34",
      description: "Holds an open attitude towards sexuality, with less trouble from guilt and shame. You can naturally view sexuality and comfortably discuss and explore when appropriate.",
      characteristics: [
        "Holds an open and accepting attitude towards sexuality",
        "Rarely feels guilt or shame",
        "Can openly discuss sexual topics",
        "Expresses comfortably in intimate relationships",
        "Views sexuality as a natural part of life"
      ],
      suggestions: [
        "Maintain this healthy sexual attitude",
        "Focus on communication and respect in relationships",
        "Respect your partner's pace and boundaries",
        "Continue learning healthy sexual knowledge",
        "Help others establish healthy sexual concepts"
      ],
      color: "from-pink-400 to-rose-400"
    },
    "Balanced Coordinator": {
      icon: "⚖️",
      scoreRange: "35-55",
      description: "Sexual attitude is between conservative and open, able to understand different viewpoints and modern ideas. Sex has a moderate place in life, and you can flexibly adjust your attitudes and behaviors according to situations.",
      characteristics: [
        "Sexual attitude is between conservative and open",
        "Can understand different viewpoints and positions",
        "Relatively flexible and adaptable in intimate relationships",
        "Has independent thinking about sexual topics",
        "Can adjust attitudes in different situations"
      ],
      suggestions: [
        "Continue maintaining this balanced mindset",
        "Adjust your attitude according to needs",
        "Communicate honestly with your partner about mutual expectations",
        "Respect both parties' needs and boundaries",
        "Balance is wisdom, and you're doing great"
      ],
      color: "from-amber-400 to-orange-400"
    },
    "Low Desire Type": {
      icon: "🕊️",
      scoreRange: "56-70",
      description: "Relatively low sexual desire, tending towards conservative attitudes. This indicates you won't be troubled by sexual desires, and sex occupies a moderate position in your life.",
      characteristics: [
        "Lower level of sexual desire",
        "Tends to maintain traditional views",
        "Neither overly repressed nor overly open",
        "Relatively cautious about sexual topics",
        "Believes sex should happen in specific relationships"
      ],
      suggestions: [
        "This is a completely normal sexual attitude type",
        "No need to force yourself to change",
        "Clearly express your own pace in relationships",
        "Find partners who understand your pace",
        "Respect your own comfort zone"
      ],
      color: "from-cyan-400 to-blue-400"
    },
    "Significantly Repressed Type": {
      icon: "🔒",
      scoreRange: "71-85",
      description: "Shows obvious sexual repression tendencies, possibly influenced by guilt, shame, or traditional concepts. This repression may affect your intimate relationship quality and personal happiness.",
      characteristics: [
        "Holds a relatively conservative attitude towards sexuality",
        "Easily generates guilt or shame",
        "Difficult to relax in intimate relationships",
        "Tends to avoid sexual topics",
        "May be deeply influenced by upbringing environment"
      ],
      suggestions: [
        "Try to understand the reasons for your attitude formation",
        "Read scientific materials related to sexual education",
        "Communicate with trusted people or professionals",
        "Gradually challenge restrictive beliefs",
        "Remember: Healthy sexual attitudes contribute to happiness"
      ],
      color: "from-indigo-400 to-purple-400"
    },
    "Highly Repressed Type": {
      icon: "🚫",
      scoreRange: "86-100",
      description: "Shows severe sexual repression, possibly deeply bound by guilt, shame, or traditional concepts. This high level of repression may negatively affect physical and mental health and intimate relationships. Professional support is recommended.",
      characteristics: [
        "Holds a very conservative or resistant attitude towards sexuality",
        "Strong feelings of guilt and shame",
        "Difficult to obtain satisfaction in intimate relationships",
        "Completely avoids sexual topics",
        "May affect overall quality of life"
      ],
      suggestions: [
        "Recommend consulting mental health professionals",
        "Understand the psychological roots of sexual repression",
        "Gradually establish healthy sexual cognition",
        "Give yourself time and patience",
        "Remember: Seeking help is a sign of bravery"
      ],
      color: "from-red-400 to-pink-400"
    }
  };

  // Handle title click - activate hidden feature
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

  // Quick test
  const handleQuickTest = () => {
    const quickAnswers = {};
    questions.forEach(q => {
      quickAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });

    setAnswers(quickAnswers);
    saveResult(quickAnswers);
    setCurrentPage('result');
  };

  // Load history records
  React.useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sri_test_')) {
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
        `sri_test_${Date.now()}`,
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
      let score = finalAnswers[q.id] || 0;

      // Sexual Attitude Reversal dimension needs reverse scoring
      if (q.dimension === "Sexual Attitude Reversal") {
        score = 6 - score;
      }

      dimensionScores[q.dimension] += score;
    });

    const dimensionAvgScores = {};
    Object.keys(dimensions).forEach(dim => {
      dimensionAvgScores[dim] = (dimensionScores[dim] / 6).toFixed(1);
    });

    // Calculate SRI total score (0-100)
    // Sum range of four dimension average scores is 4-20
    const totalRawScore = Object.values(dimensionAvgScores).reduce((sum, score) => {
      return sum + parseFloat(score);
    }, 0);

    // Convert to 0-100 range
    // Minimum: (4-4)/(20-4) * 100 = 0 points (extremely open)
    // Maximum: (20-4)/(20-4) * 100 = 100 points (highly repressed)
    const sriScore = Math.round(((totalRawScore - 4) / 16) * 100);

    return {
      dimensionScores,
      dimensionAvgScores,
      sriScore
    };
  };

  const determineAttitudeType = () => {
    const results = calculateResults();
    const score = results.sriScore;

    if (score >= 86) return "Highly Repressed Type";
    if (score >= 71) return "Significantly Repressed Type";
    if (score >= 56) return "Low Desire Type";
    if (score >= 35) return "Balanced Coordinator";
    if (score >= 20) return "Open Explorer";
    return "Extremely Open Type";
  };

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

      try {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dimensionNames,
            datasets: [{
              label: 'Your Score',
              data: chartData,
              backgroundColor: [
                'rgba(255, 107, 157, 0.7)',
                'rgba(255, 142, 114, 0.7)',
                'rgba(255, 142, 145, 0.7)',
                'rgba(248, 103, 158, 0.7)'
              ],
              borderColor: [
                '#FF6B9D',
                '#FF8E72',
                '#FF8E91',
                '#F8679E'
              ],
              borderWidth: 2,
              borderRadius: 8
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                max: 5,
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 12
                  }
                }
              },
              y: {
                ticks: {
                  font: {
                    size: 12
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
    const attitudeType = determineAttitudeType();
    const typeInfo = attitudeTypes[attitudeType];

    const text = `💕 My Sexual Repression Index test results are out!

My sexual attitude type is【${attitudeType}】${typeInfo.icon}

Sexual Repression Index (SRI): ${results.sriScore} points

${typeInfo.description}

Suggestions:
${typeInfo.suggestions.slice(0, 3).join('\n')}

#SexualAttitudeTest #SelfExploration #MentalHealth`;

    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Copy failed, please copy manually');
    });
  };

  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen pink-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('div', { className: "text-5xl sm:text-7xl mb-4" }, '💕'),
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent mb-2 sm:mb-4 cursor-pointer select-none",
            style: {userSelect: 'none'}
          }, 'Sexual Repression Index Assessment'),
          React.createElement('p', { className: "text-sm sm:text-base text-gray-600" }, 'Understand your sexual attitude · Explore more possibilities')
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base mb-8" },
          React.createElement('div', { className: "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold mb-3 text-pink-800" }, '✨ Assessment Instructions'),
            React.createElement('ul', { className: "space-y-2 text-pink-700" },
              React.createElement('li', null, '• This assessment is based on Sexual Repression Index theory, evaluating 4 dimensions'),
              React.createElement('li', null, '• 24 questions total, estimated 3-5 minutes to complete'),
              React.createElement('li', null, '• Please answer based on your true feelings, there are no right or wrong answers'),
              React.createElement('li', null, '• Results are automatically saved, supporting historical record viewing'),
              React.createElement('li', null, '• This assessment is for reference only and does not constitute medical or psychological advice')
            )
          ),

          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4" },
            Object.entries(dimensions).map(([key, dim]) =>
              React.createElement('div', {
                key: key,
                className: "dimension-card bg-white border-2 rounded-lg p-3 text-center",
                style: {borderColor: dim.color}
              },
                React.createElement('div', { className: "text-3xl mb-2" }, dim.icon),
                React.createElement('div', { className: "font-semibold text-sm", style: {color: dim.color} }, dim.name)
              )
            )
          )
        ),

        React.createElement('div', { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center" },
          React.createElement('button', {
            onClick: handleStartTest,
            className: "w-full sm:w-auto bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 hover:from-pink-600 hover:via-red-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          }, '🚀 Start Assessment (24 questions)'),

          historyRecords.length > 0 &&
            React.createElement('button', {
              onClick: () => setShowHistory(!showHistory),
              className: "w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors"
            }, `📊 View History Records (${historyRecords.length})`),

          showQuickTest &&
            React.createElement('button', {
              onClick: handleQuickTest,
              className: "w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-yellow-300 animate-pulse",
              title: "Easter egg feature: One-click random result generation"
            }, '⚡ Quick Test')
        ),

        showHistory && historyRecords.length > 0 &&
          React.createElement('div', { className: "mt-6 bg-gray-50 rounded-xl p-4" },
            React.createElement('h3', { className: "font-bold text-lg mb-3" }, 'Historical Assessment Records'),
            React.createElement('div', { className: "space-y-2 max-h-64 overflow-y-auto" },
              historyRecords.map((record, index) =>
                React.createElement('div', {
                  key: index,
                  className: "bg-white p-3 rounded-lg border flex justify-between items-center"
                },
                  React.createElement('div', null,
                    React.createElement('div', { className: "font-semibold" }, `SRI: ${record.results.sriScore}`),
                    React.createElement('div', { className: "text-sm text-gray-500" },
                      new Date(record.timestamp).toLocaleString('en-US')
                    )
                  ),
                  React.createElement('div', { className: "text-2xl" }, '💕')
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

    return (
      React.createElement('div', { className: "min-h-screen pink-gradient p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
          React.createElement('div', { className: "mb-6 sm:mb-8" },
            React.createElement('div', { className: "flex items-center justify-between mb-4" },
              React.createElement('div', { className: "flex items-center space-x-2" },
                React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                React.createElement('span', { className: "font-semibold text-gray-700" }, dimInfo.name)
              ),
              React.createElement('div', { className: "text-right" },
                React.createElement('div', {
                  className: "text-lg sm:text-xl font-bold",
                  style: {color: dimInfo.color}
                }, `Question ${currentQuestion + 1}`),
                React.createElement('div', { className: "text-xs sm:text-sm text-gray-500" }, 'Total 24 questions')
              )
            ),

            React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
              React.createElement('div', {
                className: "h-2 rounded-full transition-all duration-300",
                style: {
                  width: `${((currentQuestion + 1) / 24) * 100}%`,
                  background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
                }
              })
            ),
            React.createElement('div', {
              className: "text-xs sm:text-sm text-gray-500 mt-1 text-right"
            }, `${((currentQuestion + 1) / 24 * 100).toFixed(0)}% completed`)
          ),

          React.createElement('div', { className: "mb-8" },
            React.createElement('h3', { className: "text-lg sm:text-2xl font-medium text-gray-800 text-center mb-8 leading-relaxed px-2" },
              currentQ.text
            ),

            React.createElement('div', { className: "space-y-3" },
              options.map(option =>
                React.createElement('button', {
                  key: option.value,
                  onClick: () => handleAnswer(option.value),
                  className: "w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-200",
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
                    }, option.label),
                    React.createElement('span', { className: "text-base text-gray-800" }, option.text)
                  )
                )
              )
            )
          ),

          React.createElement('div', { className: "flex justify-between items-center" },
            currentQuestion > 0 ?
              React.createElement('button', {
                onClick: () => setCurrentQuestion(currentQuestion - 1),
                className: "text-gray-500 hover:text-gray-700 transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
              }, '← Previous Question') :
              React.createElement('div', null),

            React.createElement('div', { className: "text-sm text-gray-400" },
              `${24 - currentQuestion - 1} questions remaining`
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
          if (key && key.startsWith('sri_test_')) {
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
    const attitudeType = determineAttitudeType();
    const typeInfo = attitudeTypes[attitudeType];

    return (
      React.createElement('div', { className: "min-h-screen pink-gradient p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },

          React.createElement('div', {
            className: `bg-gradient-to-r ${typeInfo.color} rounded-2xl p-6 sm:p-8 mb-8 text-white`
          },
            React.createElement('div', { className: "text-center" },
              React.createElement('div', { className: "text-6xl sm:text-8xl mb-4" }, typeInfo.icon),
              React.createElement('h2', { className: "text-2xl sm:text-4xl font-bold mb-4" }, attitudeType),
              React.createElement('div', {
                className: "text-5xl sm:text-6xl font-bold mb-2",
                style: {}
              }, results.sriScore),
              React.createElement('div', { className: "text-lg sm:text-xl opacity-90 mb-4" }, 'Sexual Repression Index'),
              React.createElement('p', { className: "text-base sm:text-lg opacity-90" }, typeInfo.description)
            )
          ),

          React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" },
            React.createElement('div', { className: "bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200" },
              React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 text-center" }, 'Four-Dimension Assessment'),
              React.createElement('div', { className: "relative h-80" },
                React.createElement('canvas', { ref: chartRef })
              )
            ),

            React.createElement('div', { className: "space-y-4" },
              React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '📊 Dimension Scores'),
              Object.entries(results.dimensionAvgScores)
                .map(([dimName, score]) => {
                  const dimInfo = dimensions[dimName];
                  const scoreNum = parseFloat(score);
                  return (
                    React.createElement('div', {
                      key: dimName,
                      className: "bg-white border-2 rounded-xl p-4",
                      style: {borderColor: dimInfo.color}
                    },
                      React.createElement('div', { className: "flex items-center justify-between mb-2" },
                        React.createElement('div', { className: "flex items-center space-x-2" },
                          React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                          React.createElement('span', { className: "font-semibold" }, dimName)
                        ),
                        React.createElement('span', {
                          className: "font-bold text-lg",
                          style: {color: dimInfo.color}
                        }, score)
                      ),
                      React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
                        React.createElement('div', {
                          className: "h-2 rounded-full transition-all",
                          style: {
                            width: `${(scoreNum / 5) * 100}%`,
                            backgroundColor: dimInfo.color
                          }
                        })
                      )
                    )
                  );
                })
            )
          ),

          React.createElement('div', {
            className: "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-6 mb-8"
          },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '💡 Key Characteristics'),
            React.createElement('ul', { className: "space-y-2 text-gray-700" },
              typeInfo.characteristics.map((char, index) =>
                React.createElement('li', {
                  key: index,
                  className: "flex items-start"
                },
                  React.createElement('span', { className: "text-pink-500 mr-3 font-bold" }, '✓'),
                  React.createElement('span', null, char)
                )
              )
            )
          ),

          React.createElement('div', {
            className: "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8"
          },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '🌟 Personalized Suggestions'),
            React.createElement('ul', { className: "space-y-2 text-gray-700" },
              typeInfo.suggestions.map((sug, index) =>
                React.createElement('li', {
                  key: index,
                  className: "flex items-start"
                },
                  React.createElement('span', { className: "text-amber-600 mr-3 font-bold" }, '→'),
                  React.createElement('span', null, sug)
                )
              )
            )
          ),

          // AI升级版块
        React.createElement('div', {
          className: "border-2 rounded-xl p-6 mb-8",
          style: {
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)",
            borderColor: "rgba(255, 215, 0, 0.3)"
          }
        },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', {
              className: "inline-block px-6 py-3 rounded-full text-sm font-bold mb-6",
              style: {
                background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                color: "#000"
              }
            }, "⭐ Upgrade to Get"),
            React.createElement('h3', {
              className: "text-2xl sm:text-3xl font-bold mb-4",
              style: { color: "#ffd700" }
            }, "Unlock AI Deep Analysis Report"),
            React.createElement('p', {
              className: "text-lg text-gray-700 mb-8 leading-relaxed"
            }, "Want more accurate personalized analysis and professional stress management insights?\n" +
               "Upgrade to AI Intelligence Analysis version for deeper psychological understanding"),
            React.createElement('div', { className: "flex flex-wrap justify-center gap-4 mb-8" },
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Complete stress response analysis"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "15+ personalized coping strategies"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Professional detailed report (20+ pages)"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Progress tracking and wellness tools"
              )
            ),
            React.createElement('button', {
              onClick: () => {
                alert('🚀 Premium version coming soon! \n\nFeatures include:\n• Complete SRI stress response analysis\n• Detailed stress breakdown\n• Personalized coping strategies\n• Progress monitoring tools\n• Professional therapeutic recommendations\n• Wellness resource directory\n• Advanced insights for stress management\n\nPrice: $1.90 (Limited time offer!)');
              },
              className: "inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all",
              style: {
                background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                color: "#000",
                borderRadius: "30px"
              }
            },
              React.createElement('span', { className: "mr-2" }, "🚀"),
              "Unlock Now"
            )
          )
        ),

          React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center items-center" },
            React.createElement('button', {
              onClick: copyResultText,
              className: "w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            }, '📋 Copy Result Text'),

            React.createElement('button', {
              onClick: () => {
                setCurrentPage('intro');
                setCurrentQuestion(0);
                setAnswers({});
              },
              className: "w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            }, '🔄 Retest')
          ),

          React.createElement('div', { className: "mt-8 text-center text-sm text-gray-500" },
            React.createElement('p', null, '💝 This assessment result has been automatically saved'),
            React.createElement('p', { className: "mt-1" }, 'This assessment is for reference only and does not constitute medical advice · Explore more possibilities')
          )
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
root.render(React.createElement(SRIAssessment));
