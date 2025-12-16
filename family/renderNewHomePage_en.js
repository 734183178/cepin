// 完全英文版的首页组件
const renderNewHomePage = () => (
  React.createElement('div', { className: "min-h-screen" },
    // Hero Section
    React.createElement('section', { className: "hero-gradient text-white py-20 px-4" },
      React.createElement('div', { className: "max-w-6xl mx-auto text-center" },
        React.createElement('h1', { className: "text-4xl md:text-6xl font-bold mb-6" },
          'Family Dynamics Assessment'
        ),
        React.createElement('p', { className: "text-xl md:text-2xl mb-8 opacity-90" },
          'Free 8-Minute Family Health Test'
        ),
        React.createElement('p', { className: "text-lg mb-12 opacity-80" },
          '🏡 Free scientific assessment with 48 questions across 8 dimensions. Get instant professional report.'
        ),

        // 统计数据
        React.createElement('div', { className: "grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto" },
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-3xl font-bold" }, '30,000+'),
            React.createElement('div', { className: "text-sm opacity-80" }, 'Users Assessed')
          ),
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-3xl font-bold" }, '90%'),
            React.createElement('div', { className: "text-sm opacity-80" }, 'Accuracy')
          ),
          React.createElement('div', { className: "text-center" },
            React.createElement('div', { className: "text-3xl font-bold" }, '8 Min'),
            React.createElement('div', { className: "text-sm opacity-80" }, 'Completion')
          )
        ),

        React.createElement('button', {
          onClick: () => {
            setAgreedToWarning(true);
            setCurrentPage('test');
          },
          className: "cta-button text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
        }, '🚀 Start Free Assessment'),

        React.createElement('p', { className: "mt-6 text-sm opacity-75" },
          'No Registration • Completely Anonymous • Instant Results'
        )
      )
    ),

    // What is Section
    React.createElement('section', { className: "py-16 px-4 bg-gray-50" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'What is Family Dynamics Assessment?'),
        React.createElement('div', { className: "grid md:grid-cols-2 gap-8 mb-8" },
          React.createElement('div', { className: "feature-card p-6" },
            React.createElement('div', { className: "text-4xl mb-4" }, '🌱'),
            React.createElement('h3', { className: "text-xl font-semibold mb-3" }, 'Family as an Ecosystem'),
            React.createElement('p', { className: "text-gray-600" },
              'Every person\'s emotions and behaviors influence each other, creating unique family patterns'
            )
          ),
          React.createElement('div', { className: "feature-card p-6" },
            React.createElement('div', { className: "text-4xl mb-4" }, '📊'),
            React.createElement('h3', { className: "text-xl font-semibold mb-3" }, 'Scientific Assessment Tool'),
            React.createElement('p', { className: "text-gray-600" },
              '48 carefully designed questions with professional analysis across 8 dimensions'
            )
          )
        ),
        React.createElement('div', { className: "highlight-box p-6 rounded-lg" },
          React.createElement('h3', { className: "text-lg font-semibold mb-4" }, '💡 Key Benefits'),
          React.createElement('div', { className: "grid md:grid-cols-2 gap-4" },
            React.createElement('div', { className: "flex items-start" },
              React.createElement('span', { className: "text-green-500 mr-2" }, '✓'),
              React.createElement('span', null, 'See how family shaped your personality')
            ),
            React.createElement('div', { className: "flex items-start" },
              React.createElement('span', { className: "text-green-500 mr-2" }, '✓'),
              React.createElement('span', null, 'Understand emotional reaction sources')
            ),
            React.createElement('div', { className: "flex items-start" },
              React.createElement('span', { className: "text-green-500 mr-2" }, '✓'),
              React.createElement('span', null, 'Find ways to break unhealthy patterns')
            ),
            React.createElement('div', { className: "flex items-start" },
              React.createElement('span', { className: "text-green-500 mr-2" }, '✓'),
              React.createElement('span', null, 'Get personalized improvement suggestions')
            )
          )
        )
      )
    ),

    // Why Section
    React.createElement('section', { className: "py-16 px-4" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'Why Understand Family Dynamics?'),
        React.createElement('div', { className: "grid md:grid-cols-2 gap-8 mb-8" },
          React.createElement('div', { className: "pain-points p-8 rounded-lg bg-red-50" },
            React.createElement('h3', { className: "text-xl font-semibold text-red-700 mb-4" }, '❌ Common Struggles'),
            React.createElement('ul', { className: "space-y-3 text-gray-700" },
              React.createElement('li', null, '▸ Always repeat the same relationship mistakes'),
              React.createElement('li', null, '▸ Can\'t break parental behavior patterns'),
              React.createElement('li', null, '▸ More sensitive/anxious than peers'),
              React.createElement('li', null, '▸ Feel guilty when setting boundaries')
            )
          ),
          React.createElement('div', { className: "solutions p-8 rounded-lg bg-green-50" },
            React.createElement('h3', { className: "text-xl font-semibold text-green-700 mb-4" }, '✅ Solutions'),
            React.createElement('ul', { className: "space-y-3" },
              React.createElement('li', { className: "flex items-start" },
                React.createElement('span', { className: "text-green-500 mr-2 font-bold" }, '✓'),
                React.createElement('span', null, 'Identify automated behaviors')
              ),
              React.createElement('li', { className: "flex items-start" },
                React.createElement('span', { className: "text-green-500 mr-2 font-bold" }, '✓'),
                React.createElement('span', null, 'Understand root causes')
              ),
              React.createElement('li', { className: "flex items-start" },
                React.createElement('span', { className: "text-green-500 mr-2 font-bold" }, '✓'),
                React.createElement('span', null, 'Break generational patterns')
              ),
              React.createElement('li', { className: "flex items-start" },
                React.createElement('span', { className: "text-green-500 mr-2 font-bold" }, '✓'),
                React.createElement('span', null, 'Build healthier connections')
              )
            )
          )
        ),

        // 用户反馈数据
        React.createElement('div', { className: "data-showcase p-8 rounded-lg text-white text-center" },
          React.createElement('h3', { className: "text-2xl font-semibold mb-6" }, '📊 User Feedback Data'),
          React.createElement('div', { className: "grid grid-cols-3 gap-8" },
            React.createElement('div', null,
              React.createElement('div', { className: "text-3xl font-bold" }, '90%'),
              React.createElement('p', null, 'Say results are accurate')
            ),
            React.createElement('div', null,
              React.createElement('div', { className: "text-3xl font-bold" }, '85%'),
              React.createElement('p', null, 'Gained deeper self-understanding')
            ),
            React.createElement('div', null,
              React.createElement('div', { className: "text-3xl font-bold" }, '78%'),
              React.createElement('p', null, 'Started positive changes')
            )
          )
        )
      )
    ),

    // How to Section
    React.createElement('section', { className: "py-16 px-4 bg-gray-50" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'Simple 3 Steps to Begin Your Journey'),
        React.createElement('div', { className: "grid md:grid-cols-3 gap-8" },
          React.createElement('div', { className: "step-card p-6 text-center" },
            React.createElement('div', { className: "step-number mx-auto mb-4" }, '1'),
            React.createElement('div', { className: "text-4xl mb-4" }, '📍'),
            React.createElement('h3', { className: "text-xl font-semibold mb-3" }, 'Start Assessment'),
            React.createElement('p', { className: "text-gray-600" },
              'Click "Start Free Assessment"<br/>Read important notice<br/>Prepare 8-12 minutes of quiet time'
            )
          ),
          React.createElement('div', { className: "step-card p-6 text-center" },
            React.createElement('div', { className: "step-number mx-auto mb-4" }, '2'),
            React.createElement('div', { className: "text-4xl mb-4" }, '✍️'),
            React.createElement('h3', { className: "text-xl font-semibold mb-3" }, 'Answer Honestly'),
            React.createElement('p', { className: "text-gray-600" },
              '48 questions, 8-12 minutes<br/>Answer with your first instinct<br/>System auto-saves your progress'
            )
          ),
          React.createElement('div', { className: "step-card p-6 text-center" },
            React.createElement('div', { className: "step-number mx-auto mb-4" }, '3'),
            React.createElement('div', { className: "text-4xl mb-4" }, '🎯'),
            React.createElement('h3', { className: "text-xl font-semibold mb-3" }, 'Get Insights'),
            React.createElement('p', { className: "text-gray-600" },
              'View detailed report immediately<br/>8-dimension radar visualization<br/>Personalized recommendations'
            )
          )
        ),
        React.createElement('div', { className: "text-center mt-12" },
          React.createElement('button', {
            onClick: () => {
              setAgreedToWarning(true);
              setCurrentPage('test');
            },
            className: "cta-button"
          }, 'Start Assessment Now →')
        )
      )
    ),

    // 8大维度
    React.createElement('section', { className: "py-16 px-4" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'Comprehensive Assessment Across 8 Key Dimensions'),
        React.createElement('div', { className: "grid md:grid-cols-4 gap-6" },
          ...Object.entries(dimensions).map(([key, dim]) =>
            React.createElement('div', {
              key: key,
              className: "dimension-card p-6 text-center rounded-lg"
            },
              React.createElement('div', { className: "text-3xl mb-3" }, dim.icon),
              React.createElement('h4', { className: "font-semibold mb-2" }, dim.name),
              React.createElement('p', { className: "text-sm text-gray-600" }, dim.description)
            )
          )
        )
      )
    ),

    // 用户评价
    React.createElement('section', { className: "py-16 px-4 bg-gray-50" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'Real Stories of Transformation'),
        React.createElement('div', { className: "grid md:grid-cols-3 gap-8" },
          React.createElement('div', { className: "testimonial-card p-6 rounded-lg" },
            React.createElement('div', { className: "text-yellow-400 mb-3" }, '⭐⭐⭐⭐⭐'),
            React.createElement('p', { className: "mb-4" },
              '"Finally understand why I always over-give in relationships! The assessment showed my people-pleasing patterns from childhood. Now learning to set boundaries."'
            ),
            React.createElement('p', { className: "font-semibold text-gray-700" }, '— Ms. Wang, 28, Marketing Manager')
          ),
          React.createElement('div', { className: "testimonial-card p-6 rounded-lg" },
            React.createElement('div', { className: "text-yellow-400 mb-3" }, '⭐⭐⭐⭐⭐'),
            React.createElement('p', { className: "mb-4" },
              '"As a father of two, I don\'t want to repeat my father\'s parenting style. This assessment revealed many subconscious patterns."'
            ),
            React.createElement('p', { className: "font-semibold text-gray-700" }, '— Mr. Li, 35, Software Engineer')
          ),
          React.createElement('div', { className: "testimonial-card p-6 rounded-lg" },
            React.createElement('div', { className: "text-yellow-400 mb-3" }, '⭐⭐⭐⭐⭐'),
            React.createElement('p', { className: "mb-4" },
              '"My therapist recommended this tool. The report was very accurate and helped us find the core issues faster."'
            ),
            React.createElement('p', { className: "font-semibold text-gray-700" }, '— Ms. Zhang, 32, Designer')
          )
        )
      )
    ),

    // FAQ
    React.createElement('section', { className: "py-16 px-4" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h2', { className: "section-title text-center mb-12" }, 'Frequently Asked Questions'),
        React.createElement('div', { className: "grid md:grid-cols-2 gap-6" },
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ Is this assessment completely free?'),
            React.createElement('div', { className: "text-gray-600" },
              'Yes! The full assessment and detailed report are completely free, no registration or payment required.'
            )
          ),
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ Is my privacy protected?'),
            React.createElement('div', { className: "text-gray-600" },
              'Absolutely! All data is stored on your local device. We don\'t collect or store any of your information.'
            )
          ),
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ Are the assessment results accurate?'),
            React.createElement('div', { className: "text-gray-600" },
              'Our assessment is based on psychological theory and extensive research with 90% accuracy. But remember, this is a self-exploration tool and cannot replace professional diagnosis.'
            )
          ),
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ What if the results aren\'t good?'),
            React.createElement('div', { className: "text-gray-600" },
              'Please don\'t worry! The assessment is to help you understand yourself, not to label you. We provide professional resources and improvement suggestions.'
            )
          ),
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ Can I retake the test?'),
            React.createElement('div', { className: "text-gray-600" },
              'Yes! You can retake the assessment anytime to track your growth and changes.'
            )
          ),
          React.createElement('div', { className: "faq-item p-6 rounded-lg" },
            React.createElement('div', { className: "font-semibold mb-2" }, '❓ How long to get results?'),
            React.createElement('div', { className: "text-gray-600" },
              'You\'ll receive a detailed report immediately after completing the assessment, including 8-dimension analysis and personalized recommendations.'
            )
          )
        )
      )
    ),

    // 最终CTA
    React.createElement('section', { className: "cta-gradient text-white py-20 px-4 text-center" },
      React.createElement('div', { className: "max-w-4xl mx-auto" },
        React.createElement('h2', { className: "text-3xl md:text-4xl font-bold mb-6" }, 'Ready to Understand Yourself Better?'),
        React.createElement('p', { className: "text-xl mb-8 opacity-90" }, 'Join 30,000+ users on their self-discovery journey'),
        React.createElement('button', {
          onClick: () => {
            setAgreedToWarning(true);
            setCurrentPage('test');
          },
          className: "bg-white text-pink-500 px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
        }, 'Start Free Now →'),
        React.createElement('p', { className: "mt-6 opacity-80" },
          '8 minutes that could change your understanding of yourself and your family'
        )
      )
    ),

    // Footer
    React.createElement('footer', { className: "bg-gray-800 text-gray-300 py-12 px-4" },
      React.createElement('div', { className: "max-w-4xl mx-auto text-center" },
        React.createElement('div', { className: "mb-8" },
          React.createElement('h4', { className: "text-lg font-semibold mb-4 text-white" }, '🔒 Privacy Protection'),
          React.createElement('p', { className: "text-sm" },
            'Completely Anonymous Test • Local Data Storage • Never Collect Personal Information'
          )
        ),
        React.createElement('div', { className: "pt-6 border-t border-gray-700 text-sm text-gray-400" },
          React.createElement('p', null, '© 2024 Family Dynamics Assessment Tool. Protecting your privacy is our commitment.')
        )
      )
    )
  )
);