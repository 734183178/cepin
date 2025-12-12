const { useState, useEffect, useRef } = React;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-6"
      },
        React.createElement('div', {
          className: "bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
        },
          React.createElement('div', { className: "text-6xl mb-4" }, '⚠️'),
          React.createElement('h2', { className: "text-2xl font-bold text-gray-800 mb-4" }, 'Sorry, something went wrong'),
          React.createElement('p', { className: "text-gray-600 mb-6" },
            'The application encountered an error. Please refresh the page to try again.'
          ),
          React.createElement('button', {
            onClick: () => window.location.reload(),
            className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
          }, '🔄 Refresh Page')
        )
      );
    }

    return this.props.children;
  }
}

const FamilyHealthAssessment = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [agreedToWarning, setAgreedToWarning] = useState(false);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const titleClickTimerRef = useRef(null);
  const chartRef = useRef(null);

  const dimensions = {
    "Low Self-Worth": {
      name: "Low Self-Worth",
      icon: "💔",
      color: "#3B82F6",
      description: "Self-deprecation, shame, criticism"
    },
    "Excessive Control": {
      name: "Excessive Control",
      icon: "🎭",
      color: "#F59E0B",
      description: "Controlling others' emotions and behaviors"
    },
    "Avoidant Attachment": {
      name: "Avoidant Attachment",
      icon: "🚪",
      color: "#8B5CF6",
      description: "Emotional distance, difficulty with intimacy"
    },
    "Overreactivity": {
      name: "Overreactivity",
      icon: "⚡",
      color: "#EF4444",
      description: "Emotional sensitivity, easily triggered"
    },
    "Boundary Confusion": {
      name: "Boundary Confusion",
      icon: "🌊",
      color: "#FBBF24",
      description: "Inability to set healthy boundaries"
    },
    "Self-Blame": {
      name: "Self-Blame",
      icon: "😔",
      color: "#EC4899",
      description: "Taking excessive responsibility"
    },
    "Emotional Ambivalence": {
      name: "Emotional Ambivalence",
      icon: "🌀",
      color: "#06B6D4",
      description: "Conflicting emotional experiences"
    },
    "Self-Concealment": {
      name: "Self-Concealment",
      icon: "🎭",
      color: "#10B981",
      description: "Suppressing authentic needs and feelings"
    }
  };

  const options = [
    { value: 1, label: 'A', text: 'Completely Disagree' },
    { value: 2, label: 'B', text: 'Mostly Disagree' },
    { value: 3, label: 'C', text: 'Sometimes' },
    { value: 4, label: 'D', text: 'Often' },
    { value: 5, label: 'E', text: 'Completely Agree' }
  ];

  const getLevelInfo = (score) => {
    if (score >= 4.2) return { level: 'Severe', class: 'badge-severe', desc: 'Very High' };
    if (score >= 3.5) return { level: 'High', class: 'badge-high', desc: 'High' };
    if (score >= 2.8) return { level: 'Moderate', class: 'badge-moderate', desc: 'Moderate' };
    if (score >= 2.0) return { level: 'Mild', class: 'badge-mild', desc: 'Mild' };
    return { level: 'Healthy', class: 'badge-healthy', desc: 'Healthy' };
  };

  const getOverallHealth = (avgScore) => {
    if (avgScore >= 4.0) return { level: 'Needs Professional Support', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (avgScore >= 3.2) return { level: 'Recommend Seeking Help', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    if (avgScore >= 2.5) return { level: 'Room for Growth', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (avgScore >= 1.8) return { level: 'Relatively Healthy', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    return { level: 'Good Health', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const questions = [
    { id: 1, text: "I often feel I'm not good enough, no matter how hard I try, I can't meet the standards", dimension: "Low Self-Worth" },
    { id: 2, text: "I habitually downplay my achievements, thinking it's just luck", dimension: "Low Self-Worth" },
    { id: 3, text: "Other people's criticism makes me suffer for a long time and I find it hard to let go", dimension: "Low Self-Worth" },
    { id: 4, text: "I always feel I don't deserve good things or good relationships", dimension: "Low Self-Worth" },
    { id: 5, text: "I find it hard to accept compliments from others, thinking they're just being polite", dimension: "Low Self-Worth" },
    { id: 6, text: "I feel deeply ashamed of my appearance and abilities", dimension: "Low Self-Worth" },
    { id: 7, text: "I influence others through manipulation or giving advice", dimension: "Excessive Control" },
    { id: 8, text: "When things don't go as I planned, I feel anxious and uneasy", dimension: "Excessive Control" },
    { id: 9, text: "I find it hard to accept others having different ideas or choices", dimension: "Excessive Control" },
    { id: 10, text: "I use care as an excuse to excessively interfere in others' lives", dimension: "Excessive Control" },
    { id: 11, text: "I need to know every detail of things, otherwise I feel out of control", dimension: "Excessive Control" },
    { id: 12, text: "When others don't follow my advice, I feel angry or sad", dimension: "Excessive Control" },
    { id: 13, text: "I find it difficult to express my true emotional needs to others", dimension: "Avoidant Attachment" },
    { id: 14, text: "In intimate relationships, I always want to maintain a certain distance", dimension: "Avoidant Attachment" },
    { id: 15, text: "I tend to use busyness to avoid deep emotional connections", dimension: "Avoidant Attachment" },
    { id: 16, text: "I don't believe anyone can truly understand and accept me", dimension: "Avoidant Attachment" },
    { id: 17, text: "When relationships become too intimate, I want to escape", dimension: "Avoidant Attachment" },
    { id: 18, text: "I find it difficult to ask others for help, even when I really need it", dimension: "Avoidant Attachment" },
    { id: 19, text: "Small things can make me emotionally break down or become furious", dimension: "Overreactivity" },
    { id: 20, text: "My emotions fluctuate greatly and I find it hard to stay stable", dimension: "Overreactivity" },
    { id: 21, text: "Unintentional words from others make me feel deeply hurt", dimension: "Overreactivity" },
    { id: 22, text: "I connect current conflicts with past wounds", dimension: "Overreactivity" },
    { id: 23, text: "I easily feel rejected or abandoned", dimension: "Overreactivity" },
    { id: 24, text: "In conflicts, I say extreme things or act impulsively", dimension: "Overreactivity" },
    { id: 25, text: "I find it hard to say \"no\" to others' requests", dimension: "Boundary Confusion" },
    { id: 26, text: "I often sacrifice my own needs to maintain relationships", dimension: "Boundary Confusion" },
    { id: 27, text: "I'm not clear about what I should be responsible for and what I shouldn't", dimension: "Boundary Confusion" },
    { id: 28, text: "I allow others to violate my time, space, or emotions", dimension: "Boundary Confusion" },
    { id: 29, text: "I get overly involved in others' problems and neglect my own life", dimension: "Boundary Confusion" },
    { id: 30, text: "I can't distinguish which emotions are mine and which belong to others", dimension: "Boundary Confusion" },
    { id: 31, text: "I always feel many problems are my fault", dimension: "Self-Blame" },
    { id: 32, text: "Even when it's not my responsibility, I feel deep guilt", dimension: "Self-Blame" },
    { id: 33, text: "I blame myself for my family's unhappiness", dimension: "Self-Blame" },
    { id: 34, text: "I find it hard to forgive myself for past mistakes", dimension: "Self-Blame" },
    { id: 35, text: "I often live in regret of \"if only I had...\"", dimension: "Self-Blame" },
    { id: 36, text: "I feel disappointing my family is unforgivable", dimension: "Self-Blame" },
    { id: 37, text: "I have both love and hate for my family, very conflicted emotions", dimension: "Emotional Ambivalence" },
    { id: 38, text: "I both crave intimacy and fear being hurt", dimension: "Emotional Ambivalence" },
    { id: 39, text: "I want to be independent while also being unable to leave my family", dimension: "Emotional Ambivalence" },
    { id: 40, text: "My memories of the past are filled with conflicting emotions", dimension: "Emotional Ambivalence" },
    { id: 41, text: "I often vacillate between anger and compassion", dimension: "Emotional Ambivalence" },
    { id: 42, text: "I want to change the relationship but fear change will bring more hurt", dimension: "Emotional Ambivalence" },
    { id: 43, text: "I habitually suppress my true emotions", dimension: "Self-Concealment" },
    { id: 44, text: "When I feel wronged or angry, I dare not express it and don't know how to", dimension: "Self-Concealment" },
    { id: 45, text: "I deliberately hide my needs and pretend not to care", dimension: "Self-Concealment" },
    { id: 46, text: "I fear being rejected if I show my true self", dimension: "Self-Concealment" },
    { id: 47, text: "I always wear a mask when dealing with people, including those close to me", dimension: "Self-Concealment" },
    { id: 48, text: "I don't know what the real me looks like", dimension: "Self-Concealment" }
  ];

  const dimensionDetails = {
    "Low Self-Worth": {
      manifestation: "Your self-worth is very low, making you overly sensitive to others' emotions. You habitually suppress your emotions; when you feel wronged or angry, you dare not express them and don't know how to. You habitually suppress your needs; when others violate your time, space, energy, or resources, you don't defend yourself and don't dare to.",
      cause: "Low self-worth may stem from parental neglect during childhood or adolescence. Forced to become independent early with no support, you had to become a 'little adult,' shouldering many responsibilities and becoming invincible.",
      impact: "Your inner self often lives in conflict - on one hand craving others' affection, on the other hand doubting them and fearing they dislike you. You have a strong competitive nature, often compare yourself to others, measure your worth by achievements, care about your image, but also generously express your inner feelings."
    },
    "Excessive Control": {
      manifestation: "Sometimes you influence others through manipulation or giving advice, making them follow your opinions or controlling how events unfold.",
      cause: "Excessive control may stem from parental neglect during childhood or adolescence. Forced to become independent early with no support, you had to become a 'little adult,' shouldering many responsibilities and becoming invincible.",
      impact: "On one hand, excessive control of events or focus on others makes you too concerned about them while neglecting your own needs. On the other hand, when things don't go well, you easily develop pessimistic tendencies, which may cause inexplicable anger in your psyche and create negative thinking patterns."
    },
    "Avoidant Attachment": {
      manifestation: "You tend to maintain distance in intimate relationships, finding it difficult to truly rely on and trust others. You may use busyness, rationalization, etc., to avoid deep emotional connections.",
      cause: "This may stem from unstable responses from caregivers during childhood, or experiencing separation too early, leading you to learn self-protection and no longer easily depend on others.",
      impact: "This pattern may make you feel lonely in relationships, making it difficult to establish deep intimate connections, and may also make intimate people feel rejected and distant."
    },
    "Overreactivity": {
      manifestation: "Your emotional responses to external stimuli are intense and persistent; small things can trigger large emotional fluctuations. You may connect current situations with past trauma.",
      cause: "This may stem from long-term exposure to high-pressure or unsafe environments during childhood, causing your emotional system to remain in a high state of alert.",
      impact: "This over-sensitivity may affect interpersonal relationships, making you prone to losing control in conflicts, and may also leave you feeling exhausted."
    },
    "Boundary Confusion": {
      manifestation: "You find it difficult to distinguish between your own and others' responsibilities, emotions, and needs. You may habitually sacrifice for others or become overly involved in others' problems.",
      cause: "This may stem from your boundaries frequently being violated during childhood, or being asked to take on responsibilities beyond your age.",
      impact: "Blurry boundaries can leave you feeling drained, easily losing yourself in relationships, and making it difficult to protect your rights."
    },
    "Self-Blame": {
      manifestation: "You habitually attribute problems to yourself, even when many things are not your responsibility. You may be unable to let go of past mistakes.",
      cause: "This may stem from being excessively blamed during childhood, or being hinted that family problems were caused by you.",
      impact: "Excessive self-blame consumes your psychological energy, making it difficult to enjoy life, and may also lead to depression and anxiety."
    },
    "Emotional Ambivalence": {
      manifestation: "You have conflicting and complex emotions toward important people or things - both love and hate, both craving and resisting.",
      cause: "This may stem from inconsistent treatment from caregivers during childhood - both care and harm.",
      impact: "This emotional entanglement can make you feel pain and confusion in relationships, making it difficult to make clear decisions."
    },
    "Self-Concealment": {
      manifestation: "You habitually hide your true self, suppressing authentic emotions and needs. You may not know what the real you looks like.",
      cause: "This may stem from your true self not being accepted during childhood, learning to wear a mask to gain approval and safety.",
      impact: "Long-term self-suppression can lead to alienation from yourself and others, and may also trigger physical and mental health problems."
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('family_health_')) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsed = JSON.parse(data);
              if (parsed.timestamp && parsed.answers && parsed.results) {
                records.push(parsed);
              }
            }
          } catch (e) {
            console.log('Failed to read record:', key, e);
          }
        }
      }
      records.sort((a, b) => b.timestamp - a.timestamp);
      setHistoryRecords(records);
    } catch (error) {
      console.log('History function temporarily unavailable:', error);
      setHistoryRecords([]);
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
      const key = `family_health_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(record));
      loadHistory();

      const allKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('family_health_')) {
          allKeys.push(k);
        }
      }
      if (allKeys.length > 20) {
        allKeys.sort().slice(0, allKeys.length - 20).forEach(k => {
          try {
            localStorage.removeItem(k);
          } catch (e) {
            console.log('Failed to clear old record:', k);
          }
        });
      }
    } catch (error) {
      console.log('Save failed:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Storage space is full, cannot save assessment record. Please clear browser cache and try again.');
      }
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
      dimensionAvgScores[dim] = (dimensionScores[dim] / 6).toFixed(2);
    });

    const sortedDimensions = Object.entries(dimensionAvgScores)
      .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a));

    const topDimensions = sortedDimensions.slice(0, 3);

    const avgScore = (Object.values(dimensionAvgScores)
      .reduce((sum, score) => sum + parseFloat(score), 0) / 8).toFixed(2);

    return {
      dimensionScores,
      dimensionAvgScores,
      topDimensions,
      sortedDimensions,
      avgScore
    };
  };

  const handleTitleClick = () => {
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);

    if (titleClickTimerRef.current) {
      clearTimeout(titleClickTimerRef.current);
    }

    if (newCount === 5) {
      setShowQuickTest(true);
      setTitleClickCount(0);
    }

    titleClickTimerRef.current = setTimeout(() => {
      setTitleClickCount(0);
    }, 10000);
  };

  const handleQuickTest = () => {
    const quickAnswers = {};
    questions.forEach(q => {
      quickAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });

    saveResult(quickAnswers);
    setCurrentPage('result');
    setAnswers(quickAnswers);
    setShowQuickTest(false);
  };

  const handleStartTest = () => {
    if (!agreedToWarning) {
      alert('Please read and agree to the mental health notice first');
      return;
    }
    setCurrentPage('test');
    setCurrentQuestion(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 200);
    } else {
      saveResult(newAnswers);
      setCurrentPage('result');
    }
  };

  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen healing-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('div', { className: "text-5xl sm:text-7xl mb-4" }, '🏡'),
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4 cursor-pointer transition-transform hover:scale-105"
          },
            'Family of Origin Health Assessment'
          ),
          React.createElement('p', { className: "text-sm sm:text-base text-gray-600" },
            'Explore Your Inner Self · A Mirror for Self-Care'
          )
        ),

        React.createElement('div', { className: "warning-box rounded-xl p-4 sm:p-6 mb-6 fade-in" },
          React.createElement('div', { className: "flex items-start space-x-3" },
            React.createElement('div', { className: "text-2xl flex-shrink-0" }, '⚠️'),
            React.createElement('div', { className: "flex-1" },
              React.createElement('h3', { className: "text-lg font-bold text-amber-900 mb-3" },
                'Mental Health Notice'
              ),
              React.createElement('ul', { className: "space-y-2 text-sm text-amber-800" },
                React.createElement('li', null, '• This assessment is for self-exploration only and cannot replace professional psychological counseling'),
                React.createElement('li', null, '• If you feel strong discomfort during the assessment, please stop at any time'),
                React.createElement('li', null, '• Assessment results may touch on sensitive topics, please proceed in a safe environment'),
                React.createElement('li', null, '• If professional help is needed, we recommend seeking support from a mental health counselor')
              ),
              React.createElement('div', { className: "mt-4 flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  id: "agreeWarning",
                  checked: agreedToWarning,
                  onChange: (e) => setAgreedToWarning(e.target.checked),
                  className: "w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500",
                  'aria-label': "Agree to mental health notice"
                }),
                React.createElement('label', {
                  htmlFor: "agreeWarning",
                  className: "ml-2 text-sm font-medium text-amber-900 cursor-pointer"
                },
                  'I have read and understood the above notice'
                )
              )
            )
          )
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6 text-gray-700 mb-8" },
          React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold mb-3 text-blue-900" },
              '📋 Assessment Instructions'
            ),
            React.createElement('ul', { className: "space-y-2 text-blue-800 text-sm sm:text-base" },
              React.createElement('li', null, '• This assessment evaluates family of origin influence across 8 dimensions'),
              React.createElement('li', null, '• 48 questions total, estimated completion time: 8-12 minutes'),
              React.createElement('li', null, '• Please answer based on your true feelings - there are no right or wrong answers'),
              React.createElement('li', null, '• Results will be automatically saved with support for viewing history')
            )
          ),

          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4" },
            Object.entries(dimensions).map(([key, dim]) =>
              React.createElement('div', {
                key: key,
                className: "dimension-card bg-white border-2 rounded-lg p-3 text-center hover:shadow-lg",
                style: { borderColor: dim.color }
              },
                React.createElement('div', { className: "text-3xl mb-2" }, dim.icon),
                React.createElement('div', {
                  className: "font-semibold text-sm",
                  style: { color: dim.color }
                }, dim.name),
                React.createElement('div', { className: "text-xs text-gray-500 mt-1" },
                  dim.description
                )
              )
            )
          )
        ),

        React.createElement('div', { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center" },
          React.createElement('button', {
            onClick: handleStartTest,
            disabled: !agreedToWarning,
            className: `w-full sm:w-auto font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg ${agreedToWarning
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`,
            'aria-label': "Start assessment"
          },
            '🚀 Start Assessment (48 Questions)'
          ),

          showQuickTest && React.createElement('button', {
            onClick: handleQuickTest,
            className: "w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          },
            '⚡ Quick Test (Random)'
          ),

          historyRecords.length > 0 && React.createElement('button', {
            onClick: () => setShowHistory(!showHistory),
            className: "w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors",
            'aria-label': showHistory ? 'Hide history' : 'View history'
          },
            `📊 View History (${historyRecords.length})`
          )
        ),

        showHistory && historyRecords.length > 0 && React.createElement('div', { className: "mt-6 bg-gray-50 rounded-xl p-4 fade-in" },
          React.createElement('h3', { className: "font-bold text-lg mb-3" }, 'Assessment History'),
          React.createElement('div', { className: "space-y-2 max-h-64 overflow-y-auto" },
            historyRecords.map((record, index) => {
              const health = getOverallHealth(parseFloat(record.results.avgScore));
              return React.createElement('div', {
                key: index,
                className: "bg-white p-3 rounded-lg border flex justify-between items-center hover:shadow-md transition-shadow"
              },
                React.createElement('div', null,
                  React.createElement('div', { className: "font-semibold flex items-center space-x-2" },
                    React.createElement('span', { className: health.color }, health.level),
                    React.createElement('span', { className: "text-gray-400 text-sm" },
                      `(Avg: ${record.results.avgScore})`
                    )
                  ),
                  React.createElement('div', { className: "text-sm text-gray-500" },
                    new Date(record.timestamp).toLocaleString('en-US')
                  )
                ),
                React.createElement('button', {
                  onClick: () => {
                    setAnswers(record.answers);
                    setCurrentPage('result');
                  },
                  className: "text-purple-600 hover:text-purple-800 text-sm font-medium"
                },
                  'View Details →'
                )
              );
            })
          )
        )
      )
    )
  );

  const renderTest = () => {
    const currentQ = questions[currentQuestion];
    const dimInfo = dimensions[currentQ.dimension];

    return React.createElement('div', { className: "min-h-screen healing-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 fade-in" },
        React.createElement('div', { className: "mb-6 sm:mb-8" },
          React.createElement('div', { className: "flex items-center justify-between mb-4" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
              React.createElement('span', { className: "font-semibold text-gray-700" },
                dimInfo.name
              )
            ),
            React.createElement('div', { className: "text-right" },
              React.createElement('div', {
                className: "text-lg sm:text-xl font-bold",
                style: { color: dimInfo.color }
              },
                `Question ${currentQuestion + 1}`
              ),
              React.createElement('div', { className: "text-xs sm:text-sm text-gray-500" },
                'Total: 48 Questions'
              )
            )
          ),

          React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
            React.createElement('div', {
              className: "h-2 rounded-full transition-all duration-300",
              style: {
                width: `${((currentQuestion + 1) / 48) * 100}%`,
                background: `linear-gradient(90deg, ${dimInfo.color}, ${dimInfo.color}dd)`
              }
            })
          ),
          React.createElement('div', { className: "text-xs sm:text-sm text-gray-500 mt-1 text-right" },
            `${((currentQuestion + 1) / 48 * 100).toFixed(0)}% Complete`
          )
        ),

        React.createElement('div', { className: "mb-8" },
          React.createElement('h3', { className: "text-lg sm:text-2xl font-medium text-gray-800 text-center mb-8 leading-relaxed px-2" },
            currentQ.text
          ),

          React.createElement('div', { className: "space-y-3" },
            options.map((option) =>
              React.createElement('button', {
                key: option.value,
                onClick: () => handleAnswer(option.value),
                className: "w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-offset-2",
                style: {
                  borderColor: answers[currentQ.id] === option.value ? dimInfo.color : undefined,
                  backgroundColor: answers[currentQ.id] === option.value ? `${dimInfo.color}15` : undefined
                },
                'aria-pressed': answers[currentQ.id] === option.value,
                role: "button"
              },
                React.createElement('div', { className: "flex items-center" },
                  React.createElement('span', {
                    className: "font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-colors flex-shrink-0",
                    style: {
                      backgroundColor: answers[currentQ.id] === option.value ? dimInfo.color : `${dimInfo.color}20`,
                      color: answers[currentQ.id] === option.value ? '#fff' : dimInfo.color
                    }
                  },
                    option.label
                  ),
                  React.createElement('span', { className: "text-sm sm:text-base text-gray-800 break-words" },
                    option.text
                  )
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
          ) : React.createElement('div', null),

          React.createElement('div', { className: "text-sm text-gray-400" },
            `${48 - currentQuestion - 1} questions remaining`
          )
        )
      )
    );
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
            datasets: [
              {
                label: 'Your Score',
                data: chartData,
                borderColor: 'rgba(139, 92, 246, 1)',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                pointBackgroundColor: dimensionNames.map(
                  dim => dimensions[dim].color
                ),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: dimensionNames.map(
                  dim => dimensions[dim].color
                ),
                pointRadius: 6,
                pointHoverRadius: 8
              },
              {
                label: 'Reference',
                data: Array(8).fill(2.5),
                borderColor: 'rgba(251, 191, 36, 0.6)',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                pointRadius: 0,
                borderDash: [5, 5]
              }
            ]
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
                  font: { size: 11 }
                },
                pointLabels: {
                  font: { size: 10 }
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
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
    const health = getOverallHealth(parseFloat(results.avgScore));

    const text = `🏡 My Family of Origin Health Assessment Results

Overall Assessment: ${health.level}
Average Score: ${results.avgScore} / 5.0

📊 Top 3 Focus Dimensions:
${results.topDimensions.map(([dim, score], index) =>
        `${index + 1}. ${dimensions[dim].icon} ${dim} - ${score} points`
      ).join('\n')}

This is a mirror to help us better understand ourselves 🪞
#FamilyOfOrigin #SelfGrowth #HealingJourney`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ Results copied to clipboard!');
      }).catch((err) => {
        console.error('Copy failed:', err);
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  };

  const handlePremiumReport = () => {
    const results = calculateResults();
    const health = getOverallHealth(parseFloat(results.avgScore));

    // Create premium report modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Premium Assessment Report</h3>
          <p class="text-gray-600">Unlock your complete family of origin analysis</p>
        </div>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <h4 class="font-bold text-gray-800 mb-3">What you'll get:</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li class="flex items-start"><span class="mr-2">✓</span> 15-page detailed family patterns report</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Healing & growth recommendations</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Relationship compatibility insights</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Emotional healing improvement plan</li>
            <li class="flex items-start"><span class="mr-2">✓</span> Professional recovery strategies</li>
            <li class="flex items-start"><span class="mr-2">✓</span> 30-day personal healing challenge</li>
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
      alert('Payment integration coming soon! Your premium report will include detailed analysis, healing recommendations, and personalized recovery strategies.');
      modal.remove();
    };
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('✅ Results copied to clipboard!');
    } catch (err) {
      console.error('Copy failed:', err);
      alert('❌ Copy failed, please manually copy the content');
    }
    document.body.removeChild(textArea);
  };

  const renderResult = () => {
    let finalAnswers = answers;

    if (Object.keys(finalAnswers).length === 0) {
      try {
        const records = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('family_health_')) {
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
    const health = getOverallHealth(parseFloat(results.avgScore));

    return React.createElement('div', { className: "min-h-screen healing-gradient p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 fade-in" },

        React.createElement('div', { className: `${health.bgColor} rounded-2xl p-6 sm:p-8 mb-8 border-2 border-gray-200` },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-6xl sm:text-8xl mb-4" }, '🪞'),
            React.createElement('h2', { className: `text-2xl sm:text-4xl font-bold mb-4 ${health.color}` },
              health.level
            ),
            React.createElement('div', { className: "text-lg sm:text-xl text-gray-700 mb-6" },
              'Your overall average score:',
              React.createElement('span', { className: `font-bold text-2xl ml-2 ${health.color}` },
                results.avgScore
              ),
              React.createElement('span', { className: "text-gray-500" }, ' / 5.0')
            ),

            parseFloat(results.avgScore) >= 3.5 && React.createElement('div', { className: "bg-white bg-opacity-70 rounded-xl p-4 backdrop-blur-sm" },
              React.createElement('p', { className: "text-gray-700 leading-relaxed" },
                '💡 We recommend seeking professional psychological counseling support. Professional counselors can help you better understand and heal the impacts from your family of origin.'
              )
            )
          )
        ),

        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" },
          React.createElement('div', { className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 text-center" },
              'Your Family of Origin Wound Structure Chart'
            ),
            React.createElement('div', { className: "relative h-80" },
              React.createElement('canvas', { ref: chartRef })
            ),
            React.createElement('p', { className: "text-sm text-gray-600 text-center mt-3" },
              'Closer to the top indicates greater wounds'
            )
          ),

          React.createElement('div', { className: "space-y-4" },
            React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" },
              '⭐ Top 3 Focus Dimensions'
            ),
            results.topDimensions.map(([dimName, score], index) => {
              const dimInfo = dimensions[dimName];
              const levelInfo = getLevelInfo(parseFloat(score));
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
                      React.createElement('div', { className: "text-sm text-gray-600" },
                        dimInfo.description
                      )
                    )
                  ),
                  React.createElement('div', { className: "text-right" },
                    React.createElement('div', {
                      className: "text-2xl font-bold",
                      style: { color: dimInfo.color }
                    },
                      score
                    ),
                    React.createElement('div', { className: `result-badge ${levelInfo.class} mt-1` },
                      levelInfo.desc
                    )
                  )
                ),
                React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2 mt-3" },
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

        React.createElement('div', { className: "mb-8 space-y-6" },
          React.createElement('h3', { className: "text-2xl font-bold text-gray-800 mb-4" },
            '📖 In-depth Analysis of Key Dimensions'
          ),
          results.topDimensions.map(([dimName, score]) => {
            const dimInfo = dimensions[dimName];
            const detail = dimensionDetails[dimName];
            const levelInfo = getLevelInfo(parseFloat(score));

            return React.createElement('div', {
              key: dimName,
              className: "bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-l-4 shadow-sm",
              style: { borderLeftColor: dimInfo.color }
            },
              React.createElement('div', { className: "flex items-center justify-between mb-4" },
                React.createElement('div', { className: "flex items-center space-x-3" },
                  React.createElement('span', { className: "text-4xl" }, dimInfo.icon),
                  React.createElement('div', null,
                    React.createElement('h4', { className: "text-xl font-bold", style: { color: dimInfo.color } },
                      dimName
                    ),
                    React.createElement('span', { className: `result-badge ${levelInfo.class} mt-1` },
                      `Wound Level: ${levelInfo.desc}`
                    )
                  )
                )
              ),

              React.createElement('div', { className: "space-y-4 text-gray-700" },
                React.createElement('div', null,
                  React.createElement('h5', { className: "font-semibold text-gray-800 mb-2 flex items-center" },
                    React.createElement('span', { className: "mr-2" }, '▲'),
                    'Manifestations'
                  ),
                  React.createElement('p', { className: "leading-relaxed pl-6" },
                    detail.manifestation
                  )
                ),

                React.createElement('div', null,
                  React.createElement('h5', { className: "font-semibold text-gray-800 mb-2 flex items-center" },
                    React.createElement('span', { className: "mr-2" }, '◆'),
                    'Root Causes'
                  ),
                  React.createElement('p', { className: "leading-relaxed pl-6" },
                    detail.cause
                  )
                ),

                React.createElement('div', null,
                  React.createElement('h5', { className: "font-semibold text-gray-800 mb-2 flex items-center" },
                    React.createElement('span', { className: "mr-2" }, '●'),
                    'Impact & Suggestions'
                  ),
                  React.createElement('p', { className: "leading-relaxed pl-6" },
                    detail.impact
                  )
                )
              )
            );
          })
        ),

        React.createElement('div', { className: "mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4" },
            '📊 Complete Dimension Assessment'
          ),
          React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
            results.sortedDimensions.map(([dimName, score]) => {
              const dimInfo = dimensions[dimName];
              const scoreNum = parseFloat(score);
              const levelInfo = getLevelInfo(scoreNum);

              return React.createElement('div', {
                key: dimName,
                className: "bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
              },
                React.createElement('div', { className: "flex items-center justify-between mb-2" },
                  React.createElement('div', { className: "flex items-center space-x-2" },
                    React.createElement('span', { className: "text-2xl" }, dimInfo.icon),
                    React.createElement('span', { className: "font-semibold" }, dimName)
                  ),
                  React.createElement('div', { className: "flex items-center space-x-2" },
                    React.createElement('span', {
                      className: "font-bold text-lg",
                      style: { color: dimInfo.color }
                    },
                      score
                    ),
                    React.createElement('span', { className: `result-badge ${levelInfo.class}` },
                      levelInfo.level
                    )
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
              );
            })
          )
        ),

        React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8" },
          React.createElement('h3', { className: "text-xl font-bold text-gray-800 mb-4 flex items-center" },
            React.createElement('span', { className: "mr-2" }, '💡'),
            'Healing & Growth Recommendations'
          ),
          React.createElement('div', { className: "space-y-3 text-gray-700" },
            React.createElement('p', { className: "leading-relaxed" },
              React.createElement('strong', null, '1. Acceptance & Awareness:'),
              ' Recognizing these patterns is the first step toward healing. Be gentle with yourself - these responses are protective mechanisms you developed to survive.'
            ),
            React.createElement('p', { className: "leading-relaxed" },
              React.createElement('strong', null, '2. Seek Support:'),
              parseFloat(results.avgScore) >= 3.5
                ? 'Your score is quite high, we strongly recommend seeking help from professional mental health counselors. Professional support can make the healing journey safer and more effective.'
                : 'Consider joining support groups or seeking psychological counseling to explore and heal with professional guidance.'
            ),
            React.createElement('p', { className: "leading-relaxed" },
              React.createElement('strong', null, '3. Build New Patterns:'),
              ' Through mindfulness practices, emotional journaling, and other methods, gradually build healthier coping mechanisms. Change takes time, so give yourself sufficient patience.'
            )
          )
        ),

        React.createElement('div', { className: "mb-8" },
          React.createElement('div', {
            className: "upgrade-card",
            style: {
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              padding: '40px',
              borderRadius: '25px',
              textAlign: 'center',
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
              'Want to get more precise personalized analysis and professional healing plans?',
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
              }, React.createElement('span', {}, '✓'), 'Deep family pattern analysis'),
              React.createElement('div', {
                className: "upgrade-feature",
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#ffd700',
                  fontSize: '15px'
                }
              }, React.createElement('span', {}, '✓'), '15+ customized healing suggestions'),
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
              }, React.createElement('span', {}, '✓'), 'Relationship recovery strategies')
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
          )
        ),

        React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center items-center" },
          React.createElement('button', {
            onClick: copyResultText,
            className: "w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
          },
            '📋 Copy Results Text'
          ),

          React.createElement('button', {
            onClick: () => {
              setCurrentPage('intro');
              setCurrentQuestion(0);
              setAnswers({});
              setAgreedToWarning(false);
              window.scrollTo(0, 0);
            },
            className: "w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
          },
            '🔄 Retake Assessment'
          )
        ),

        React.createElement('div', { className: "mt-8 text-center text-sm text-gray-500 space-y-2" },
          React.createElement('p', null, '💝 Assessment results have been automatically saved'),
          React.createElement('p', { className: "max-w-2xl mx-auto" },
            'This assessment is for self-exploration purposes only and cannot replace professional diagnosis. If you need professional help, please seek support from a mental health counselor.'
          ),
          React.createElement('p', { className: "text-xs text-gray-400 mt-4" },
            'Healing is a process, please be gentle with yourself 🌱'
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
root.render(
  React.createElement(ErrorBoundary, null,
    React.createElement(FamilyHealthAssessment)
  )
);