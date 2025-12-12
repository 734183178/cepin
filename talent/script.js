const TalentAssessment = () => {
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

  // 10 dimensions configuration
  const dimensions = {
    "Linguistic Intelligence": {
      name: "Linguistic Intelligence",
      icon: "💬",
      color: "#FF6B9D",
      description: "Speaking, writing, expression skills"
    },
    "Logical-Mathematical": {
      name: "Logical-Mathematical",
      icon: "🧮",
      color: "#FFA726",
      description: "Mathematics, reasoning, analytical skills"
    },
    "Spatial Intelligence": {
      name: "Spatial Intelligence",
      icon: "🎨",
      color: "#FFEB3B",
      description: "Direction sense, drawing, design skills"
    },
    "Intrapersonal Intelligence": {
      name: "Intrapersonal Intelligence",
      icon: "🧘",
      color: "#9C27B0",
      description: "Self-awareness, emotional management"
    },
    "Interpersonal Intelligence": {
      name: "Interpersonal Intelligence",
      icon: "🤝",
      color: "#FF5722",
      description: "Social skills, empathy, leadership"
    },
    "Bodily-Kinesthetic": {
      name: "Bodily-Kinesthetic",
      icon: "🏃",
      color: "#4CAF50",
      description: "Hands-on, movement, body control"
    },
    "Musical Intelligence": {
      name: "Musical Intelligence",
      icon: "🎵",
      color: "#00BCD4",
      description: "Musical sense, rhythm, sound sensitivity"
    },
    "Naturalistic Intelligence": {
      name: "Naturalistic Intelligence",
      icon: "🌿",
      color: "#8BC34A",
      description: "Plants & animals, environment, observation"
    },
    "Creative Innovation": {
      name: "Creative Innovation",
      icon: "✨",
      color: "#E91E63",
      description: "Imagination, originality, breakthrough thinking"
    },
    "Aesthetic Perception": {
      name: "Aesthetic Perception",
      icon: "🎭",
      color: "#673AB7",
      description: "Beauty sense, appreciation, artistic taste"
    }
  };

  // 50 questions
  const questions = [
    // Linguistic Intelligence (1-5)
    { id: 1, text: "I can clearly explain complex concepts to others", dimension: "Linguistic Intelligence" },
    { id: 2, text: "I enjoy expressing my thoughts through writing", dimension: "Linguistic Intelligence" },
    { id: 3, text: "In conversations or presentations, I can always find the right words", dimension: "Linguistic Intelligence" },
    { id: 4, text: "I'm good at storytelling and can capture the audience's attention", dimension: "Linguistic Intelligence" },
    { id: 5, text: "I can quickly understand and remember new vocabulary or terminology", dimension: "Linguistic Intelligence" },

    // Logical-Mathematical (6-10)
    { id: 6, text: "I enjoy solving math problems or logic puzzles", dimension: "Logical-Mathematical" },
    { id: 7, text: "I can quickly identify patterns and connections between things", dimension: "Logical-Mathematical" },
    { id: 8, text: "When making decisions, I'm used to analyzing pros and cons before acting", dimension: "Logical-Mathematical" },
    { id: 9, text: "I'm skilled at using data and facts to support my viewpoints", dimension: "Logical-Mathematical" },
    { id: 10, text: "I can easily understand complex charts and statistical data", dimension: "Logical-Mathematical" },

    // Spatial Intelligence (11-15)
    { id: 11, text: "I can easily visualize 3D objects in my mind", dimension: "Spatial Intelligence" },
    { id: 12, text: "I have a good sense of direction and rarely get lost", dimension: "Spatial Intelligence" },
    { id: 13, text: "I enjoy drawing, designing, or crafting things by hand", dimension: "Spatial Intelligence" },
    { id: 14, text: "I can quickly judge the size and distance of objects", dimension: "Spatial Intelligence" },
    { id: 15, text: "I'm skilled at organizing information visually (charts, mind maps)", dimension: "Spatial Intelligence" },

    // Intrapersonal Intelligence (16-20)
    { id: 16, text: "I often reflect on my own behavior and thoughts", dimension: "Intrapersonal Intelligence" },
    { id: 17, text: "I clearly know my own strengths and weaknesses", dimension: "Intrapersonal Intelligence" },
    { id: 18, text: "I can accurately identify my emotional state", dimension: "Intrapersonal Intelligence" },
    { id: 19, text: "I enjoy spending time alone and gain energy from it", dimension: "Intrapersonal Intelligence" },
    { id: 20, text: "I have clear goals and plans for my life", dimension: "Intrapersonal Intelligence" },

    // Interpersonal Intelligence (21-25)
    { id: 21, text: "I can quickly build friendly relationships with strangers", dimension: "Interpersonal Intelligence" },
    { id: 22, text: "I'm sensitive to others' emotional changes", dimension: "Interpersonal Intelligence" },
    { id: 23, text: "I enjoy teamwork and am good at coordinating different opinions", dimension: "Interpersonal Intelligence" },
    { id: 24, text: "Friends often confide in me or seek my advice", dimension: "Interpersonal Intelligence" },
    { id: 25, text: "I can comfortably handle various social situations", dimension: "Interpersonal Intelligence" },

    // Bodily-Kinesthetic (26-30)
    { id: 26, text: "I have good hand-eye coordination (like playing sports, driving)", dimension: "Bodily-Kinesthetic" },
    { id: 27, text: "I enjoy expressing myself through sports or dance", dimension: "Bodily-Kinesthetic" },
    { id: 28, text: "I can quickly learn new sports skills or movements", dimension: "Bodily-Kinesthetic" },
    { id: 29, text: "I enjoy making or fixing things with my hands", dimension: "Bodily-Kinesthetic" },
    { id: 30, text: "I habitually use body language to help express myself", dimension: "Bodily-Kinesthetic" },

    // Musical Intelligence (31-35)
    { id: 31, text: "I can easily remember song melodies", dimension: "Musical Intelligence" },
    { id: 32, text: "I'm sensitive to changes in pitch and tone", dimension: "Musical Intelligence" },
    { id: 33, text: "I play musical instruments or love singing", dimension: "Musical Intelligence" },
    { id: 34, text: "When I hear music, I unconsciously tap along to the beat", dimension: "Musical Intelligence" },
    { id: 35, text: "I can distinguish the sounds of different musical instruments", dimension: "Musical Intelligence" },

    // Naturalistic Intelligence (36-40)
    { id: 36, text: "I enjoy observing the growth and changes of plants and animals", dimension: "Naturalistic Intelligence" },
    { id: 37, text: "I can accurately identify different types of plants or animals", dimension: "Naturalistic Intelligence" },
    { id: 38, text: "I care about environmental protection and ecological balance", dimension: "Naturalistic Intelligence" },
    { id: 39, text: "I enjoy outdoor activities like hiking and camping", dimension: "Naturalistic Intelligence" },
    { id: 40, text: "I notice subtle changes in nature (like weather, seasons)", dimension: "Naturalistic Intelligence" },

    // Creative Innovation (41-45)
    { id: 41, text: "I often come up with novel and unique ideas", dimension: "Creative Innovation" },
    { id: 42, text: "I like to try different approaches to solve problems", dimension: "Creative Innovation" },
    { id: 43, text: "I'm not afraid to break conventions or challenge traditions", dimension: "Creative Innovation" },
    { id: 44, text: "I can discover new possibilities in everyday things", dimension: "Creative Innovation" },
    { id: 45, text: "I'm skilled at brainstorming and creative thinking", dimension: "Creative Innovation" },

    // Aesthetic Perception (46-50)
    { id: 46, text: "I'm sensitive to color combinations and visual aesthetics", dimension: "Aesthetic Perception" },
    { id: 47, text: "I enjoy appreciating artworks (paintings, sculptures, architecture, etc.)", dimension: "Aesthetic Perception" },
    { id: 48, text: "I can quickly judge the quality of designs or artworks", dimension: "Aesthetic Perception" },
    { id: 49, text: "I focus on the aesthetics and comfort of my living environment", dimension: "Aesthetic Perception" },
    { id: 50, text: "I can get emotional resonance from beautiful things", dimension: "Aesthetic Perception" }
  ];

  // Rating options
  const options = [
    { value: 1, label: 'A', text: 'Completely disagree' },
    { value: 2, label: 'B', text: 'Somewhat disagree' },
    { value: 3, label: 'C', text: 'Neutral' },
    { value: 4, label: 'D', text: 'Somewhat agree' },
    { value: 5, label: 'E', text: 'Completely agree' }
  ];

  // 12 talent types
  const talentTypes = {
    "Creative Artist": {
      icon: "🎨",
      dimensions: ["Creative Innovation", "Aesthetic Perception", "Spatial Intelligence"],
      description: "Rich imagination, excellent aesthetic sense, with artistic talent",
      careers: ["Designer", "Artist", "Curator", "Art Director", "Visual Designer"],
      color: "from-purple-400 to-pink-400"
    },
    "Expression Master": {
      icon: "🎭",
      dimensions: ["Linguistic Intelligence", "Interpersonal Intelligence", "Creative Innovation"],
      description: "Excellent at communication, highly influential, able to impact others",
      careers: ["Host/Streamer", "Screenwriter", "Marketing Planner", "PR Specialist", "New Media Operator"],
      color: "from-pink-400 to-red-400"
    },
    "Rational Analyst": {
      icon: "🧠",
      dimensions: ["Logical-Mathematical", "Intrapersonal Intelligence", "Spatial Intelligence"],
      description: "Meticulous thinking, independent thought, skilled at problem analysis",
      careers: ["Programmer", "Data Analyst", "Researcher", "Consultant", "Product Manager"],
      color: "from-blue-400 to-cyan-400"
    },
    "Musical Artist": {
      icon: "🎵",
      dimensions: ["Musical Intelligence", "Aesthetic Perception", "Creative Innovation"],
      description: "Strong sense of rhythm, artistic talent, sensitive to sounds",
      careers: ["Musician", "Sound Designer", "Voice Actor", "Music Producer", "Instrumentalist"],
      color: "from-indigo-400 to-purple-400"
    },
    "Nature Explorer": {
      icon: "🌿",
      dimensions: ["Naturalistic Intelligence", "Spatial Intelligence", "Intrapersonal Intelligence"],
      description: "Strong observation skills, loves nature, concerned about ecology",
      careers: ["Biologist", "Travel Blogger", "Horticulturist", "Environmental Worker", "Outdoor Instructor"],
      color: "from-green-400 to-emerald-400"
    },
    "Action-oriented Doer": {
      icon: "💪",
      dimensions: ["Bodily-Kinesthetic", "Interpersonal Intelligence", "Logical-Mathematical"],
      description: "Strong execution ability, team collaboration, focused on practice",
      careers: ["Athlete", "Project Manager", "Fitness Coach", "Event Planner", "Team Leader"],
      color: "from-orange-400 to-yellow-400"
    },
    "Inner Mentor": {
      icon: "🧘",
      dimensions: ["Intrapersonal Intelligence", "Interpersonal Intelligence", "Linguistic Intelligence"],
      description: "Strong empathy, good at listening, able to guide others",
      careers: ["Psychological Counselor", "Teacher", "HR", "Career Planner", "Social Worker"],
      color: "from-purple-400 to-indigo-400"
    },
    "Innovation Leader": {
      icon: "🚀",
      dimensions: ["Creative Innovation", "Logical-Mathematical", "Interpersonal Intelligence"],
      description: "Combines creativity and execution, skilled at leading teams",
      careers: ["Entrepreneur", "Product Manager", "Director", "Innovation Consultant", "Team Manager"],
      color: "from-red-400 to-orange-400"
    },
    "Knowledge Disseminator": {
      icon: "📚",
      dimensions: ["Linguistic Intelligence", "Logical-Mathematical", "Intrapersonal Intelligence"],
      description: "Clear logic, good at explaining, loves sharing knowledge",
      careers: ["Teacher", "Writer", "Blogger", "Trainer", "Knowledge Influencer"],
      color: "from-cyan-400 to-blue-400"
    },
    "Versatile Performer": {
      icon: "🎬",
      dimensions: [],
      description: "Multi-talented, highly adaptable, can develop in multiple fields",
      careers: ["Slash Career", "Freelancer", "Creative Director", "Multi-disciplinary Development"],
      color: "from-pink-400 via-purple-400 to-blue-400"
    },
    "Potential Developer": {
      icon: "🌟",
      dimensions: [],
      description: "Highly adaptable, still exploring personal direction",
      careers: ["Try different fields", "Discover true interests"],
      color: "from-yellow-400 to-green-400"
    },
    "Specialized Talent": {
      icon: "💎",
      dimensions: [],
      description: "Exceptionally talented in a specific field, recommended to focus and develop",
      careers: ["Become an expert in your area of strength"],
      color: "from-purple-400 to-pink-400"
    }
  };

  // Handle title click - activate hidden feature
  const handleTitleClick = () => {
    const now = Date.now();

    // If more than 10 seconds since last click, reset counter
    if (clickTime && now - clickTime > 10000) {
      setTitleClickCount(1);
      setClickTime(now);
    } else {
      const newCount = titleClickCount + 1;
      setTitleClickCount(newCount);
      setClickTime(now);

      // Show hidden button after 5 clicks
      if (newCount === 5) {
        setShowQuickTest(true);
        setTitleClickCount(0); // Reset counter
      }
    }
  };

  // Quick test - auto-fill answers and show results
  const handleQuickTest = () => {
    const quickAnswers = {};
    questions.forEach(q => {
      // Generate random answers from 1-5
      quickAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });

    console.log('Quick test generated answers:', quickAnswers);

    // First set answers to state
    setAnswers(quickAnswers);

    // Save results
    saveResult(quickAnswers);

    // Jump to results page
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
        if (key && key.startsWith('talent_test_')) {
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
        `talent_test_${Date.now()}`,
        JSON.stringify(record)
      );
      loadHistory();
    } catch (error) {
      console.log('Save failed:', error);
    }
  };

  const calculateResults = (finalAnswers = answers) => {
    console.log('calculateResults received answers:', finalAnswers);
    console.log('Number of answers:', Object.keys(finalAnswers).length);

    const dimensionScores = {};

    Object.keys(dimensions).forEach(dim => {
      dimensionScores[dim] = 0;
    });

    questions.forEach(q => {
      const score = finalAnswers[q.id] || 0;
      dimensionScores[q.dimension] += score;
    });

    console.log('Dimension total scores:', dimensionScores);

    const dimensionAvgScores = {};
    Object.keys(dimensions).forEach(dim => {
      dimensionAvgScores[dim] = (dimensionScores[dim] / 5).toFixed(1);
    });

    console.log('Dimension average scores:', dimensionAvgScores);

    const sortedDimensions = Object.entries(dimensionAvgScores)
      .sort(([,a], [,b]) => parseFloat(b) - parseFloat(a));

    const topDimensions = sortedDimensions.slice(0, 3);
    const talentType = determineTalentType(topDimensions);

    return {
      dimensionScores,
      dimensionAvgScores,
      topDimensions,
      talentType
    };
  };

  const determineTalentType = (topDimensions) => {
    const top3Names = topDimensions.map(([name]) => name);
    const top1Score = parseFloat(topDimensions[0][1]);

    if (top1Score >= 4.5) {
      return "Specialized Talent";
    }

    const highScoreCount = topDimensions.filter(([, score]) => parseFloat(score) >= 4.0).length;
    if (highScoreCount >= 3) {
      return "Versatile Performer";
    }

    for (const [typeName, typeInfo] of Object.entries(talentTypes)) {
      if (typeInfo.dimensions && typeInfo.dimensions.length > 0) {
        const matchCount = typeInfo.dimensions.filter(dim =>
          top3Names.includes(dim)
        ).length;

        if (matchCount >= 2) {
          return typeName;
        }
      }
    }

    if (top1Score >= 3.5) {
      return "Potential Developer";
    }

    return "Potential Developer";
  };

  React.useEffect(() => {
    if (currentPage === 'result' && chartRef.current && typeof Chart !== 'undefined') {
      const results = calculateResults();
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart
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
    const typeInfo = talentTypes[results.talentType];

    const text = `🌈 My talent test results are out!

I'm a【${results.talentType}】type ${typeInfo.icon}

✨ Top Talents:
${results.topDimensions.map(([dim, score], index) =>
  `${index + 1}. ${dimensions[dim].icon} ${dim} ${score} points`
).join('\n')}

${typeInfo.description}

Suitable Directions: ${typeInfo.careers.slice(0, 3).join(', ')}

#TalentTest #CareerPlanning #SelfDiscovery`;

    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Copy failed, please copy manually');
    });
  };

  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen rainbow-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('div', { className: "text-5xl sm:text-7xl mb-4" }, '🌈'),
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-4 cursor-pointer select-none",
            style: {userSelect: 'none'}
          }, 'Multi-Talent Ability Assessment'),
          React.createElement('p', { className: "text-sm sm:text-base text-gray-600" }, 'Discover your hidden talents · Find your best development direction')
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base mb-8" },
          React.createElement('div', { className: "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold mb-3 text-purple-800" }, '✨ Assessment Instructions'),
            React.createElement('ul', { className: "space-y-2 text-purple-700" },
              React.createElement('li', null, '• This assessment is based on Multiple Intelligence Theory, evaluating 10 dimensions of talent'),
              React.createElement('li', null, '• Total 50 questions, estimated 5-8 minutes to complete'),
              React.createElement('li', null, '• Please answer based on your true feelings, there are no right or wrong answers'),
              React.createElement('li', null, '• Results will be automatically saved, supporting history viewing')
            )
          ),

          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4" },
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
            className: "w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          }, '🚀 Start Assessment (50 Questions)'),

          historyRecords.length > 0 &&
            React.createElement('button', {
              onClick: () => setShowHistory(!showHistory),
              className: "w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors"
            }, `📊 View History (${historyRecords.length})`),

          showQuickTest &&
            React.createElement('button', {
              onClick: handleQuickTest,
              className: "w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-yellow-300 animate-pulse",
              title: "Egg feature: One-click generate random results"
            }, '⚡ Quick Test')
        ),

        showHistory && historyRecords.length > 0 &&
          React.createElement('div', { className: "mt-6 bg-gray-50 rounded-xl p-4" },
            React.createElement('h3', { className: "font-bold text-lg mb-3" }, 'Assessment History'),
            React.createElement('div', { className: "space-y-2 max-h-64 overflow-y-auto" },
              historyRecords.map((record, index) =>
                React.createElement('div', {
                  key: index,
                  className: "bg-white p-3 rounded-lg border flex justify-between items-center"
                },
                  React.createElement('div', null,
                    React.createElement('div', { className: "font-semibold" }, record.results.talentType),
                    React.createElement('div', { className: "text-sm text-gray-500" },
                      new Date(record.timestamp).toLocaleString('en-US')
                    )
                  ),
                  React.createElement('div', { className: "text-2xl" },
                    talentTypes[record.results.talentType]?.icon
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

    return (
      React.createElement('div', { className: "min-h-screen rainbow-gradient p-3 sm:p-6" },
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
                React.createElement('div', { className: "text-xs sm:text-sm text-gray-500" }, 'Total 50 Questions')
              )
            ),

            React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
              React.createElement('div', {
                className: "h-2 rounded-full transition-all duration-300",
                style: {
                  width: `${((currentQuestion + 1) / 50) * 100}%`,
                  background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
                }
              })
            ),
            React.createElement('div', {
              className: "text-xs sm:text-sm text-gray-500 mt-1 text-right"
            }, `${((currentQuestion + 1) / 50 * 100).toFixed(0)}% Complete`)
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
                  className: "w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200",
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
              }, '← Previous') :
              React.createElement('div', null),

            React.createElement('div', { className: "text-sm text-gray-400" },
              `${50 - currentQuestion - 1} questions remaining`
            )
          )
        )
      )
    );
  };

  const renderResult = () => {
    // Prefer using answers state, if empty then read from latest history record
    let finalAnswers = answers;

    // If answers is empty, try to read latest record from localStorage
    if (Object.keys(finalAnswers).length === 0) {
      try {
        const records = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('talent_test_')) {
            const data = localStorage.getItem(key);
            if (data) {
              records.push(JSON.parse(data));
            }
          }
        }
        records.sort((a, b) => b.timestamp - a.timestamp);
        if (records.length > 0) {
          finalAnswers = records[0].answers;
          console.log('Read answers from localStorage:', finalAnswers);
        }
      } catch (error) {
        console.log('Failed to read history answers:', error);
      }
    }

    const results = calculateResults(finalAnswers);
    const typeInfo = talentTypes[results.talentType];

    return (
      React.createElement('div', { className: "min-h-screen rainbow-gradient p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },

          React.createElement('div', {
            className: `bg-gradient-to-r ${typeInfo.color} rounded-2xl p-6 sm:p-8 mb-8 text-white`
          },
            React.createElement('div', { className: "text-center" },
              React.createElement('div', { className: "text-6xl sm:text-8xl mb-4" }, typeInfo.icon),
              React.createElement('h2', { className: "text-2xl sm:text-4xl font-bold mb-4" }, results.talentType),
              React.createElement('p', { className: "text-lg sm:text-xl mb-6 opacity-90" }, typeInfo.description),

              React.createElement('div', { className: "bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm" },
                React.createElement('h3', { className: "font-bold text-lg mb-3" }, '🎯 Suitable Development Directions'),
                React.createElement('div', { className: "flex flex-wrap justify-center gap-2" },
                  typeInfo.careers.map((career, index) =>
                    React.createElement('span', {
                      key: index,
                      className: "bg-white bg-opacity-30 px-4 py-2 rounded-full text-sm"
                    }, career)
                  )
                )
              )
            )
          ),

          React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" },
            React.createElement('div', { className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200" },
              React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 text-center" }, 'Ten-Dimension Ability Radar Chart'),
              React.createElement('div', { className: "relative h-80" },
                React.createElement('canvas', { ref: chartRef })
              )
            ),

            React.createElement('div', { className: "space-y-4" },
              React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '⭐ Your Top 3 Talents'),
              results.topDimensions.map(([dimName, score], index) => {
                const dimInfo = dimensions[dimName];
                const medals = ['🥇', '🥈', '🥉'];
                return (
                  React.createElement('div', {
                    key: dimName,
                    className: "bg-white border-2 rounded-xl p-4 shadow-sm",
                    style: {borderColor: dimInfo.color}
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
                          style: {color: dimInfo.color}
                        }, score),
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
                  )
                );
              })
            )
          ),

          React.createElement('div', { className: "mb-8" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" }, '📊 Complete Ability Assessment'),
            React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
              Object.entries(results.dimensionAvgScores)
                .sort(([,a], [,b]) => parseFloat(b) - parseFloat(a))
                .map(([dimName, score]) => {
                  const dimInfo = dimensions[dimName];
                  const scoreNum = parseFloat(score);
                  let level = 'Developing';
                  let levelColor = 'text-gray-500';
                  if (scoreNum >= 4.0) {
                    level = 'Top Talent';
                    levelColor = 'text-green-600';
                  } else if (scoreNum >= 3.0) {
                    level = 'In Progress';
                    levelColor = 'text-blue-600';
                  }

                  return (
                    React.createElement('div', {
                      key: dimName,
                      className: "bg-gray-50 rounded-lg p-4 border"
                    },
                      React.createElement('div', { className: "flex items-center justify-between mb-2" },
                        React.createElement('div', { className: "flex items-center space-x-2" },
                          React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                          React.createElement('span', { className: "font-semibold" }, dimName)
                        ),
                        React.createElement('div', { className: "flex items-center space-x-2" },
                          React.createElement('span', {
                            className: "font-bold text-lg",
                            style: {color: dimInfo.color}
                          }, score),
                          React.createElement('span', {
                            className: `text-xs px-2 py-1 rounded-full bg-white ${levelColor}`
                          }, level)
                        )
                      ),
                      React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-1.5" },
                        React.createElement('div', {
                          className: "h-1.5 rounded-full transition-all",
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
            }, "Want more accurate personalized talent analysis and professional development insights?\n" +
               "Upgrade to AI Intelligence Analysis version for deeper potential understanding"),
            React.createElement('div', { className: "flex flex-wrap justify-center gap-4 mb-8" },
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Complete talent potential analysis"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "15+ personalized development strategies"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Professional detailed report (20+ pages)"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Career matching and guidance tools"
              )
            ),
            React.createElement('button', {
              onClick: () => {
                alert('🚀 Premium version coming soon! \n\nFeatures include:\n• Complete multiple intelligence analysis\n• Detailed talent breakdown\n• Personalized development strategies\n• Career matching assessment\n• Professional learning recommendations\n• Skill development roadmap\n• Advanced insights for personal growth\n\nPrice: $1.90 (Limited time offer!)');
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
            }, '📋 Copy Results'),

            React.createElement('button', {
              onClick: () => {
                setCurrentPage('intro');
                setCurrentQuestion(0);
                setAnswers({});
              },
              className: "w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            }, '🔄 Retake Test')
          ),

          React.createElement('div', { className: "mt-8 text-center text-sm text-gray-500" },
            React.createElement('p', null, '💝 These assessment results have been automatically saved'),
            React.createElement('p', { className: "mt-1" }, 'Based on Multiple Intelligence Theory · For reference only · Explore more possibilities')
          )
        )
      )
    );
  };

  // Render different content based on current page
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

// Render application to page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TalentAssessment));