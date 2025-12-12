const { useState, useEffect, useRef } = React;

const SCL90Assessment = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showQuickTestBtn, setShowQuickTestBtn] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const chartRef = useRef(null);

  const questions = [
    { id: 1, text: "Headaches", factor: "Somatization" },
    { id: 2, text: "Nervousness or restlessness", factor: "Obsessive-Compulsive" },
    { id: 3, text: "Unwanted thoughts or words repeating in your mind", factor: "Obsessive-Compulsive" },
    { id: 4, text: "Dizziness or faintness", factor: "Somatization" },
    { id: 5, text: "Loss of sexual interest or pleasure", factor: "Depression" },
    { id: 6, text: "Being critical of others", factor: "Hostility" },
    { id: 7, text: "Feeling that others control your thoughts", factor: "Psychoticism" },
    { id: 8, text: "Blaming others for your troubles", factor: "Hostility" },
    { id: 9, text: "Memory problems", factor: "Obsessive-Compulsive" },
    { id: 10, text: "Worrying about your appearance or neatness", factor: "Obsessive-Compulsive" },
    { id: 11, text: "Feeling easily annoyed or irritated", factor: "Anxiety" },
    { id: 12, text: "Chest pain", factor: "Somatization" },
    { id: 13, text: "Feeling afraid in open spaces or on the streets", factor: "Phobic Anxiety" },
    { id: 14, text: "Feeling low in energy or slowed down", factor: "Depression" },
    { id: 15, text: "Thoughts of ending your life", factor: "Depression" },
    { id: 16, text: "Hearing voices that other people don't hear", factor: "Psychoticism" },
    { id: 17, text: "Trembling or shaking", factor: "Anxiety" },
    { id: 18, text: "Feeling that most people cannot be trusted", factor: "Paranoid Ideation" },
    { id: 19, text: "Poor appetite", factor: "Sleep & Appetite" },
    { id: 20, text: "Crying easily", factor: "Depression" },
    { id: 21, text: "Feeling shy or uncomfortable with the opposite sex", factor: "Interpersonal Sensitivity" },
    { id: 22, text: "Feeling that people are taking advantage of you or want to harm you", factor: "Paranoid Ideation" },
    { id: 23, text: "Suddenly feeling scared for no reason", factor: "Anxiety" },
    { id: 24, text: "Temper outbursts that you cannot control", factor: "Hostility" },
    { id: 25, text: "Being afraid to go out of the house alone", factor: "Phobic Anxiety" },
    { id: 26, text: "Blaming yourself for things", factor: "Depression" },
    { id: 27, text: "Pains in your lower back", factor: "Somatization" },
    { id: 28, text: "Feeling that you are unable to complete tasks", factor: "Obsessive-Compulsive" },
    { id: 29, text: "Feeling lonely", factor: "Depression" },
    { id: 30, text: "Feeling blue or trapped", factor: "Depression" },
    { id: 31, text: "Worrying too much about things", factor: "Anxiety" },
    { id: 32, text: "Feeling no interest in things", factor: "Depression" },
    { id: 33, text: "Feeling fearful", factor: "Anxiety" },
    { id: 34, text: "Your feelings are easily hurt", factor: "Interpersonal Sensitivity" },
    { id: 35, text: "Feeling that people know your private thoughts without you telling them", factor: "Psychoticism" },
    { id: 36, text: "Feeling that others do not understand you or are unsympathetic", factor: "Interpersonal Sensitivity" },
    { id: 37, text: "Feeling that people are unfriendly or dislike you", factor: "Interpersonal Sensitivity" },
    { id: 38, text: "Having to do things very slowly to ensure they are done correctly", factor: "Obsessive-Compulsive" },
    { id: 39, text: "Heart pounding or racing", factor: "Anxiety" },
    { id: 40, text: "Nausea or upset stomach", factor: "Somatization" },
    { id: 41, text: "Feeling inferior to others", factor: "Interpersonal Sensitivity" },
    { id: 42, text: "Soreness in your muscles", factor: "Somatization" },
    { id: 43, text: "Feeling that people are watching you or talking about you", factor: "Paranoid Ideation" },
    { id: 44, text: "Trouble falling asleep", factor: "Sleep & Appetite" },
    { id: 45, text: "Having to check and double-check what you do", factor: "Obsessive-Compulsive" },
    { id: 46, text: "Difficulty making decisions", factor: "Obsessive-Compulsive" },
    { id: 47, text: "Feeling afraid to travel on buses, subways, or trains", factor: "Phobic Anxiety" },
    { id: 48, text: "Trouble getting your breath", factor: "Anxiety" },
    { id: 49, text: "Hot or cold spells", factor: "Somatization" },
    { id: 50, text: "Avoiding places or activities because they frighten you", factor: "Phobic Anxiety" },
    { id: 51, text: "Your mind going blank", factor: "Psychoticism" },
    { id: 52, text: "Numbness or tingling in parts of your body", factor: "Somatization" },
    { id: 53, text: "Feeling a lump in your throat", factor: "Somatization" },
    { id: 54, text: "Feeling hopeless about the future", factor: "Depression" },
    { id: 55, text: "Trouble concentrating", factor: "Obsessive-Compulsive" },
    { id: 56, text: "Feeling weak in parts of your body", factor: "Somatization" },
    { id: 57, text: "Feeling tense or keyed up", factor: "Anxiety" },
    { id: 58, text: "Feeling heavy in your arms or legs", factor: "Somatization" },
    { id: 59, text: "Thoughts of death or dying", factor: "Depression" },
    { id: 60, text: "Overeating", factor: "Sleep & Appetite" },
    { id: 61, text: "Feeling uncomfortable when people are watching you or talking about you", factor: "Interpersonal Sensitivity" },
    { id: 62, text: "Having thoughts that are not your own", factor: "Psychoticism" },
    { id: 63, text: "Urge to hit or harm someone", factor: "Hostility" },
    { id: 64, text: "Waking up too early", factor: "Sleep & Appetite" },
    { id: 65, text: "Having to wash or count things repeatedly", factor: "Obsessive-Compulsive" },
    { id: 66, text: "Sleep that is restless or disturbed", factor: "Sleep & Appetite" },
    { id: 67, text: "Thoughts of breaking or damaging things", factor: "Hostility" },
    { id: 68, text: "Having ideas that others do not have", factor: "Psychoticism" },
    { id: 69, text: "Feeling nervous when people are around you", factor: "Interpersonal Sensitivity" },
    { id: 70, text: "Feeling uncomfortable in crowds or public places", factor: "Phobic Anxiety" },
    { id: 71, text: "Feeling everything is an effort", factor: "Depression" },
    { id: 72, text: "Spells of terror or panic", factor: "Anxiety" },
    { id: 73, text: "Feeling uncomfortable about eating or drinking in public", factor: "Phobic Anxiety" },
    { id: 74, text: "Getting into frequent arguments", factor: "Hostility" },
    { id: 75, text: "Feeling nervous when you are alone", factor: "Phobic Anxiety" },
    { id: 76, text: "Feeling that people do not give you proper credit for your achievements", factor: "Paranoid Ideation" },
    { id: 77, text: "Feeling lonely even when you are with people", factor: "Depression" },
    { id: 78, text: "Feeling so restless you can't sit still", factor: "Anxiety" },
    { id: 79, text: "Feeling worthless", factor: "Depression" },
    { id: 80, text: "Feeling that familiar surroundings are strange or unreal", factor: "Psychoticism" },
    { id: 81, text: "Shouting or throwing things", factor: "Hostility" },
    { id: 82, text: "Feeling afraid you might faint in public", factor: "Phobic Anxiety" },
    { id: 83, text: "Feeling that people want to take advantage of you", factor: "Paranoid Ideation" },
    { id: 84, text: "Being bothered by thoughts about sex", factor: "Psychoticism" },
    { id: 85, text: "Feeling you should be punished for your sins", factor: "Paranoid Ideation" },
    { id: 86, text: "Feeling you must do things quickly", factor: "Obsessive-Compulsive" },
    { id: 87, text: "Feeling that something serious is wrong with your body", factor: "Somatization" },
    { id: 88, text: "Never feeling close to another person", factor: "Interpersonal Sensitivity" },
    { id: 89, text: "Feeling guilty", factor: "Paranoid Ideation" },
    { id: 90, text: "Feeling your mind is not working right", factor: "Psychoticism" }
  ];

  const options = [
    { value: 1, label: 'A', text: 'Not at all' },
    { value: 2, label: 'B', text: 'A little bit' },
    { value: 3, label: 'C', text: 'Moderately' },
    { value: 4, label: 'D', text: 'Quite a bit' },
    { value: 5, label: 'E', text: 'Extremely' }
  ];

  const factors = {
    "Somatization": {
      name: "Somatization",
      items: [],
      description: "Subjective physical discomfort including various pain and physical symptoms",
      suggestions: ["Appropriate physical exercise", "Relaxation training", "Regular sleep schedule", "Medical examination when necessary"]
    },
    "Obsessive-Compulsive": {
      name: "Obsessive-Compulsive",
      items: [],
      description: "Obsessive thoughts and compulsive behaviors including repetitive thinking and actions",
      suggestions: ["Cognitive behavioral therapy", "Relaxation training", "Attention diversion", "Establish healthy lifestyle habits"]
    },
    "Interpersonal Sensitivity": {
      name: "Interpersonal Sensitivity",
      items: [],
      description: "Feelings of discomfort and inferiority in social interactions",
      suggestions: ["Improve communication skills", "Build self-confidence", "Participate in social activities", "Seek professional psychological support"]
    },
    "Depression": {
      name: "Depression",
      items: [],
      description: "Depressed mood, loss of interest, hopelessness and other depression-related symptoms",
      suggestions: ["Maintain positive attitude", "Regular exercise", "Adequate sleep", "Seek professional help"]
    },
    "Anxiety": {
      name: "Anxiety",
      items: [],
      description: "Anxiety-related symptoms including tension, unease, and fear",
      suggestions: ["Deep breathing exercises", "Meditation and relaxation", "Regular sleep schedule", "Reduce stimulating foods"]
    },
    "Hostility": {
      name: "Hostility",
      items: [],
      description: "Hostile emotions and behaviors including anger, impulsivity, and aggressiveness",
      suggestions: ["Emotion management skills", "Communication skills training", "Find healthy emotional outlets", "Professional psychological counseling"]
    },
    "Phobic Anxiety": {
      name: "Phobic Anxiety",
      items: [],
      description: "Excessive fear of specific objects, places, or situations",
      suggestions: ["Gradual exposure therapy", "Relaxation training", "Cognitive restructuring", "Seek professional treatment"]
    },
    "Paranoid Ideation": {
      name: "Paranoid Ideation",
      items: [],
      description: "Paranoid thinking including suspicion, distrust, and self-centeredness",
      suggestions: ["Cognitive behavioral therapy", "Build trust relationships", "Rational thinking training", "Professional psychological help"]
    },
    "Psychoticism": {
      name: "Psychoticism",
      items: [],
      description: "Psychotic symptoms including thought and perception abnormalities",
      suggestions: ["Seek immediate professional medical help", "Follow medical advice for medication", "Family support and companionship", "Regular follow-up appointments"]
    },
    "Sleep & Appetite": {
      name: "Sleep & Appetite",
      items: [],
      description: "Sleep and appetite-related problems",
      suggestions: ["Regular sleep schedule", "Healthy eating habits", "Pre-sleep relaxation", "Avoid stimulants"]
    }
  };

  questions.forEach(q => {
    if (factors[q.factor]) {
      factors[q.factor].items.push(q.id);
    }
  });

  const handleTitleClick = () => {
    const now = Date.now();
    // Reset count if more than 10 seconds have passed since last click
    if (now - lastClickTime > 10000) {
      setTitleClickCount(1);
      setLastClickTime(now);
    } else {
      const newCount = titleClickCount + 1;
      setTitleClickCount(newCount);
      setLastClickTime(now);

      // Show quick test button after 5 clicks
      if (newCount >= 5) {
        setShowQuickTestBtn(true);
      }
    }
  };

  const handleStartTest = () => {
    setCurrentPage('test');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleQuickTest = () => {
    // Automatically fill all answers randomly
    const newAnswers = {};
    questions.forEach(q => {
      newAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });
    setAnswers(newAnswers);
    setCurrentPage('result');
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentPage('result');
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const factorScores = {};

    Object.keys(factors).forEach(factor => {
      factorScores[factor] = 0;
    });

    questions.forEach(q => {
      const score = answers[q.id] || 1;
      totalScore += score;
      if (factorScores[q.factor] !== undefined) {
        factorScores[q.factor] += score;
      }
    });

    const avgScore = (totalScore / 90).toFixed(2);

    const factorAvgScores = {};
    Object.keys(factors).forEach(factor => {
      const itemCount = factors[factor].items.length;
      if (itemCount > 0) {
        factorAvgScores[factor] = (factorScores[factor] / itemCount).toFixed(2);
      }
    });

    return { totalScore, avgScore, factorScores, factorAvgScores };
  };

  const getLevel = (avgScore) => {
    const score = parseFloat(avgScore);
    if (score >= 1.0 && score < 2.0) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (score >= 2.0 && score < 3.0) return { level: 'Mild', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (score >= 3.0 && score < 4.0) return { level: 'Moderate', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    if (score >= 4.0 && score <= 5.0) return { level: 'Severe', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
  };

  const getOverallAssessment = (totalScore, avgScore) => {
    const score = parseFloat(avgScore);
    const total = parseInt(totalScore);

    if (total <= 160 && score < 2.0) {
      return {
        level: "Good Mental Health",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Your overall mental health is good, with all indicators within normal range. Continue maintaining a positive attitude and healthy lifestyle habits.",
        icon: "😊"
      };
    } else if (total <= 200 && score < 3.0) {
      return {
        level: "Needs Attention",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "You may be experiencing some psychological stress in certain areas. It's recommended to adjust your life rhythm and find appropriate stress reduction methods.",
        icon: "🤔"
      };
    } else if (total <= 250 && score < 4.0) {
      return {
        level: "Recommend Consultation",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        description: "Your mental health needs attention. It's recommended to seek help from professional psychological counselors for more in-depth assessment and guidance.",
        icon: "😟"
      };
    } else {
      return {
        level: "Needs Professional Help",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Your mental health requires professional medical assistance. It's recommended to seek medical help promptly for detailed mental health assessment and treatment.",
        icon: "😰"
      };
    }
  };

  useEffect(() => {
    if (currentPage === 'result' && chartRef.current) {
      const results = calculateResults();
      const ctx = chartRef.current.getContext('2d');

      Chart.getChart(ctx)?.destroy();

      const factorNames = Object.keys(factors);
      const factorData = factorNames.map(factor => parseFloat(results.factorAvgScores[factor]));

      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: factorNames.map(factor => factors[factor].name),
          datasets: [{
            label: 'Your Score',
            data: factorData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(59, 130, 246)'
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
  }, [currentPage]);

  const renderIntro = () => (
    React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('h1', {
            onClick: handleTitleClick,
            className: "text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 cursor-pointer hover:text-blue-600 transition-colors"
          }, 'SCL-90 Symptom Self-Rating Scale'),
          React.createElement('p', { className: "text-sm sm:text-base text-gray-600" }, 'Professional Mental Health Assessment Tool')
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base" },
          React.createElement('p', { className: "text-base sm:text-lg" },
            'SCL-90 (Symptom Checklist 90) is a widely used psychological health self-rating scale containing 90 items covering various aspects including sensation, emotion, thinking, consciousness, behavior, lifestyle, interpersonal relationships, sleep and appetite.'
          ),

          React.createElement('div', { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800" }, '⚠️ Important Reminder'),
            React.createElement('ul', { className: "space-y-2 text-blue-700" },
              React.createElement('li', null, '• This scale is an assessment tool to help understand your emotional state'),
              React.createElement('li', null, '• Test results are for reference only and do not represent an actual diagnosis'),
              React.createElement('li', null, '• If you have serious psychological distress, please seek professional medical help promptly')
            )
          ),

          React.createElement('p', null,
            'Please read each description carefully and select the most appropriate answer based on your actual feelings during the ', React.createElement('strong', null, 'past week'), '.'
          ),

          React.createElement('div', { className: "bg-gray-50 p-4 sm:p-6 rounded-lg" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-semibold mb-3 sm:mb-4" }, 'Scoring Criteria:'),
            React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3" },
              React.createElement('div', { className: "flex items-center space-x-2" },
                React.createElement('span', { className: "w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center" }, 'A'),
                React.createElement('span', { className: "font-medium" }, 'Not at all:'),
                React.createElement('span', { className: "text-sm" }, 'Not at all or very rarely')
              ),
              React.createElement('div', { className: "flex items-center space-x-2" },
                React.createElement('span', { className: "w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center" }, 'B'),
                React.createElement('span', { className: "font-medium" }, 'A little bit:'),
                React.createElement('span', { className: "text-sm" }, 'A small amount of time')
              ),
              React.createElement('div', { className: "flex items-center space-x-2" },
                React.createElement('span', { className: "w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center" }, 'C'),
                React.createElement('span', { className: "font-medium" }, 'Moderately:'),
                React.createElement('span', { className: "text-sm" }, 'A considerable amount of time')
              ),
              React.createElement('div', { className: "flex items-center space-x-2" },
                React.createElement('span', { className: "w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" }, 'D'),
                React.createElement('span', { className: "font-medium" }, 'Quite a bit:'),
                React.createElement('span', { className: "text-sm" }, 'Most of the time')
              ),
              React.createElement('div', { className: "flex items-center space-x-2 sm:col-span-2" },
                React.createElement('span', { className: "w-6 h-6 bg-red-700 text-white text-xs font-bold rounded-full flex items-center justify-center" }, 'E'),
                React.createElement('span', { className: "font-medium" }, 'Extremely:'),
                React.createElement('span', { className: "text-sm" }, 'All of the time')
              )
            )
          )
        ),

        React.createElement('div', { className: "mt-6 sm:mt-8 text-center" },
          React.createElement('button', {
            onClick: handleStartTest,
            className: "bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          },
            'Start Test (90 questions)'
          ),
          showQuickTestBtn && React.createElement('div', { className: "mt-4 p-4 bg-purple-100 border-2 border-purple-300 rounded-lg" },
            React.createElement('p', { className: "text-sm text-purple-700 mb-3 font-semibold" }, '🎯 Quick Test Mode Unlocked!'),
            React.createElement('button', {
              onClick: handleQuickTest,
              className: "bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors duration-200 shadow-lg hover:shadow-xl"
            },
              'Quick Test - Auto Random Fill'
            )
          )
        )
      )
    )
  );

  const renderTest = () => (
    React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },
        React.createElement('div', { className: "text-center mb-6 sm:mb-8" },
          React.createElement('h2', {
            onClick: handleTitleClick,
            className: "text-xl sm:text-3xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          }, 'SCL-90 Symptom Self-Rating Scale'),
          React.createElement('div', { className: "text-gray-600" },
            React.createElement('span', { className: "text-lg sm:text-xl font-semibold" }, `Question ${currentQuestion + 1}`),
            React.createElement('span', { className: "ml-2 sm:ml-4 text-sm sm:text-base" }, 'of 90 questions')
          ),
          React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2 mt-3 sm:mt-4" },
            React.createElement('div', {
              className: "bg-blue-500 h-2 rounded-full transition-all duration-300",
              style: { width: `${((currentQuestion + 1) / 90) * 100}%` }
            })
          ),
          React.createElement('div', { className: "text-xs sm:text-sm text-gray-500 mt-1" },
            `${((currentQuestion + 1) / 90 * 100).toFixed(1)}% Complete`
          )
        ),

        React.createElement('div', { className: "mb-6 sm:mb-8" },
          React.createElement('h3', { className: "text-lg sm:text-2xl font-medium text-gray-800 text-center mb-6 sm:mb-8 leading-relaxed px-2" },
            questions[currentQuestion].text
          ),

          React.createElement('div', { className: "space-y-3 sm:space-y-4" },
            options.map(option =>
              React.createElement('button', {
                key: option.value,
                onClick: () => handleAnswer(option.value),
                className: "w-full text-left p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 active:scale-98"
              },
                React.createElement('div', { className: "flex items-center" },
                  React.createElement('span', {
                    className: "font-bold text-base sm:text-lg text-blue-600 mr-3 sm:mr-4 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"
                  }, option.label),
                  React.createElement('span', { className: "text-sm sm:text-base text-gray-800" }, option.text)
                )
              )
            )
          )
        ),

        React.createElement('div', { className: "flex justify-between items-center" },
          currentQuestion > 0 ? React.createElement('button', {
            onClick: () => setCurrentQuestion(currentQuestion - 1),
            className: "text-gray-500 hover:text-gray-700 transition-colors text-sm sm:text-base py-2 px-4 rounded-lg hover:bg-gray-100"
          },
            '← Previous'
          ) : React.createElement('div', null),

          React.createElement('div', { className: "text-xs sm:text-sm text-gray-400" },
            `${90 - currentQuestion - 1} questions remaining`
          )
        )
      )
    )
  );

  const renderResult = () => {
    const results = calculateResults();
    const overallAssessment = getOverallAssessment(results.totalScore, results.avgScore);

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6" },
      React.createElement('div', { className: "max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8" },

        React.createElement('div', {
          className: `${overallAssessment.bgColor} ${overallAssessment.borderColor} border-2 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8`
        },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-4xl sm:text-6xl mb-2 sm:mb-4" }, overallAssessment.icon),
            React.createElement('h2', {
              className: `text-xl sm:text-3xl font-bold ${overallAssessment.color} mb-2 sm:mb-4`
            }, overallAssessment.level),
            React.createElement('div', { className: "flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-3 sm:mb-4" },
              React.createElement('div', { className: "text-center" },
                React.createElement('div', { className: "text-2xl sm:text-4xl font-bold text-gray-800" }, results.totalScore),
                React.createElement('div', { className: "text-xs sm:text-sm text-gray-600" }, 'Total Score')
              ),
              React.createElement('div', { className: "text-center" },
                React.createElement('div', { className: "text-2xl sm:text-4xl font-bold text-gray-800" }, results.avgScore),
                React.createElement('div', { className: "text-xs sm:text-sm text-gray-600" }, 'Average Score')
              )
            ),
            React.createElement('p', {
              className: `${overallAssessment.color} text-sm sm:text-base leading-relaxed`
            }, overallAssessment.description)
          )
        ),

        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8" },
          React.createElement('div', { className: "bg-gray-50 rounded-xl p-4 sm:p-6" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center" }, 'Dimensional Assessment Chart'),
            React.createElement('div', { className: "relative h-64 sm:h-80" },
              React.createElement('canvas', { ref: chartRef })
            )
          ),

          React.createElement('div', { className: "space-y-3 sm:space-y-4" },
            React.createElement('h3', { className: "text-lg sm:text-xl font-bold text-gray-800 mb-4" }, 'Detailed Factor Analysis'),
            React.createElement('div', { className: "space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto" },
              Object.keys(factors).map(factor => {
                const avgScore = results.factorAvgScores[factor];
                const level = getLevel(avgScore);
                return React.createElement('div', {
                  key: factor,
                  className: `${level.bgColor} ${level.borderColor} border rounded-lg p-3 sm:p-4`
                },
                  React.createElement('div', { className: "flex justify-between items-center mb-2" },
                    React.createElement('h4', {
                      className: `font-semibold text-sm sm:text-base ${level.textColor}`
                    }, factors[factor].name),
                    React.createElement('div', { className: "flex items-center space-x-2" },
                      React.createElement('span', { className: "text-sm sm:text-base font-bold" }, avgScore),
                      React.createElement('span', {
                        className: `px-2 py-1 rounded-full text-white text-xs ${level.color}`
                      }, level.level)
                    )
                  ),
                  React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
                    React.createElement('div', {
                      className: `h-2 rounded-full ${level.color}`,
                      style: { width: `${(avgScore / 5) * 100}%` }
                    })
                  )
                );
              })
            )
          )
        ),

        React.createElement('div', { className: "space-y-4 sm:space-y-6" },
          React.createElement('h3', { className: "text-xl sm:text-2xl font-bold text-gray-800" }, 'Detailed Analysis and Recommendations'),

          React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" },
            Object.keys(factors).map(factor => {
              const avgScore = results.factorAvgScores[factor];
              const level = getLevel(avgScore);
              const factorInfo = factors[factor];

              if (parseFloat(avgScore) >= 2.0) {
                return React.createElement('div', {
                  key: factor,
                  className: `${level.bgColor} ${level.borderColor} border rounded-xl p-4 sm:p-6`
                },
                  React.createElement('div', { className: "flex justify-between items-start mb-3" },
                    React.createElement('h4', {
                      className: `text-lg font-bold ${level.textColor}`
                    }, factorInfo.name),
                    React.createElement('span', {
                      className: `px-3 py-1 rounded-full text-white text-sm ${level.color}`
                    }, level.level)
                  ),

                  React.createElement('p', { className: "text-sm text-gray-700 mb-4 leading-relaxed" },
                    factorInfo.description
                  ),

                  React.createElement('div', null,
                    React.createElement('h5', { className: "font-semibold text-gray-800 mb-2 text-sm" }, '💡 Improvement Suggestions:'),
                    React.createElement('ul', { className: "text-sm text-gray-700 space-y-1" },
                      factorInfo.suggestions.map((suggestion, index) =>
                        React.createElement('li', {
                          key: index,
                          className: "flex items-start"
                        },
                          React.createElement('span', { className: "text-green-500 mr-2" }, '•'),
                          suggestion
                        )
                      )
                    )
                  )
                );
              }
              return null;
            })
          )
        ),

        React.createElement('div', { className: "mt-6 sm:mt-8 bg-gray-50 rounded-xl p-4 sm:p-6" },
          React.createElement('h4', { className: "font-bold text-gray-800 mb-3 text-sm sm:text-base" }, '📊 Scoring Criteria:'),
          React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "w-3 h-3 bg-green-500 rounded" }),
              React.createElement('span', null, React.createElement('strong', null, 'Good:'), ' 1.0-2.0')
            ),
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "w-3 h-3 bg-yellow-500 rounded" }),
              React.createElement('span', null, React.createElement('strong', null, 'Mild:'), ' 2.0-3.0')
            ),
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "w-3 h-3 bg-orange-500 rounded" }),
              React.createElement('span', null, React.createElement('strong', null, 'Moderate:'), ' 3.0-4.0')
            ),
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('span', { className: "w-3 h-3 bg-red-500 rounded" }),
              React.createElement('span', null, React.createElement('strong', null, 'Severe:'), ' 4.0-5.0')
            )
          ),

          React.createElement('div', { className: "mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg" },
            React.createElement('p', { className: "text-xs sm:text-sm text-gray-700 leading-relaxed" },
              React.createElement('strong', null, 'Reference Standard:'),
              'According to international standards, SCL-90 total score exceeding 160 points or item average exceeding 2.0 suggests further evaluation; total score exceeding 200 indicates significant psychological issues and seeking counseling is recommended; scores exceeding 250 are considered severe and require detailed medical assessment and professional treatment.'
            )
          )
        ),

        // AI升级版块
        React.createElement('div', {
          className: "mt-6 sm:mt-8 border-2 rounded-xl p-6 sm:p-8",
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
            React.createElement('h4', {
              className: "text-2xl sm:text-3xl font-bold mb-4",
              style: { color: "#ffd700" }
            }, "Unlock AI Deep Analysis Report"),
            React.createElement('p', {
              className: "text-lg text-gray-700 mb-8 leading-relaxed"
            }, "Want more accurate personalized analysis and professional mental health insights?\n" +
               "Upgrade to AI Intelligence Analysis version for deeper psychological understanding"),
            React.createElement('div', { className: "flex flex-wrap justify-center gap-4 mb-8" },
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Complete mental health profile analysis"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "15+ personalized wellness strategies"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Professional detailed report (20+ pages)"
              ),
              React.createElement('div', { className: "flex items-center text-yellow-700 text-sm font-medium" },
                React.createElement('span', { className: "mr-2" }, "✓"),
                "Progress tracking and monitoring tools"
              )
            ),
            React.createElement('button', {
              onClick: () => {
                alert('🚀 Premium version coming soon! \n\nFeatures include:\n• Complete SCL-90 symptom analysis\n• Detailed mental health breakdown\n• Personalized wellness strategies\n• Progress monitoring tools\n• Professional therapeutic recommendations\n• Mental health resource directory\n• Advanced insights for emotional wellbeing\n\nPrice: $1.90 (Limited time offer!)');
              },
              className: "inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all text-white",
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

        React.createElement('div', { className: "mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4" },
          React.createElement('button', {
            onClick: () => {
              setCurrentPage('intro');
              setCurrentQuestion(0);
              setAnswers({});
            },
            className: "bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
          },
            'Restart Test'
          ),

          React.createElement('div', { className: "text-xs sm:text-sm text-gray-500" },
            'This test result is for reference only. If you have serious psychological distress, please seek professional medical help promptly.'
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
root.render(React.createElement(SCL90Assessment));