// src/routes/quiz.js
const express = require('express');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get active quiz
// @route   GET /api/quiz
// @access  Public
router.get('/', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ isActive: true });
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'No active quiz found'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving quiz'
    });
  }
});

// @desc    Submit quiz and compute recommendations
// @route   POST /api/quiz/submit
// @access  Private (requires authentication)
router.post('/submit', protect, async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user._id;

    // Validation
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Quiz ID and answers array are required'
      });
    }

    // Check if user already completed this quiz
    const existingResult = await QuizResult.findOne({ userId, quizId });
    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: 'Quiz already completed by this user'
      });
    }

    // Get quiz details for validation
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Compute recommendations
    const { scores, recommendations } = computeRecommendations(answers, quiz);
    
    // Generate course suggestions based on primary stream
    const courseSuggestions = generateCourseSuggestions(recommendations.primaryStream);

    // Create and save quiz result
    const quizResult = new QuizResult({
      userId,
      quizId,
      answers: answers.map(answer => ({
        questionId: answer.questionId,
        answer: answer.answer
      })),
      scores: {
        science: scores.science,
        commerce: scores.commerce,
        arts: scores.arts,
        vocational: scores.vocational
      },
      suggestions: {
        primary_stream: recommendations.primaryStream,
        confidence: recommendations.confidence,
        recommended_courses: courseSuggestions
      }
    });

    await quizResult.save();

    // Update user profile with recommendations
    await User.findByIdAndUpdate(userId, {
      quiz_completed: true,
      recommended_streams: [recommendations.primaryStream, recommendations.secondaryStream].filter(Boolean),
      profile_completed: true
    });

    // Send comprehensive response
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully and recommendations computed',
      data: {
        resultId: quizResult._id,
        scores: scores,
        recommendations: {
          primaryStream: recommendations.primaryStream,
          secondaryStream: recommendations.secondaryStream,
          confidence: Math.round(recommendations.confidence * 100),
          explanation: getStreamExplanation(recommendations.primaryStream)
        },
        suggestedCourses: courseSuggestions,
        nextSteps: generateNextSteps(recommendations.primaryStream)
      }
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing quiz submission'
    });
  }
});

// @desc    Get user's quiz results history
// @route   GET /api/quiz/results
// @access  Private
router.get('/results', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const results = await QuizResult.find({ userId })
      .populate('quizId', 'title description')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Get quiz results error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving quiz results'
    });
  }
});

// @desc    Get latest recommendation for user
// @route   GET /api/quiz/recommendation
// @access  Private
router.get('/recommendation', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const latestResult = await QuizResult.findOne({ userId })
      .populate('quizId', 'title')
      .sort({ createdAt: -1 });

    if (!latestResult) {
      return res.status(404).json({
        success: false,
        message: 'No quiz results found for this user'
      });
    }

    res.json({
      success: true,
      data: {
        primaryStream: latestResult.suggestions.primary_stream,
        confidence: latestResult.suggestions.confidence,
        recommendedCourses: latestResult.suggestions.recommended_courses,
        completedAt: latestResult.createdAt,
        explanation: getStreamExplanation(latestResult.suggestions.primary_stream)
      }
    });
  } catch (error) {
    console.error('Get recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving recommendation'
    });
  }
});

// Helper Functions

/**
 * Compute quiz scores and generate recommendations
 * @param {Array} answers - User's quiz answers
 * @param {Object} quiz - Quiz object with questions and scoring rules
 * @returns {Object} - Scores and recommendations
 */
function computeRecommendations(answers, quiz) {
  // Initialize scores
  const scores = {
    science: 0,
    commerce: 0,
    arts: 0,
    vocational: 0
  };

  // Process each answer
  answers.forEach(answer => {
    const questionId = parseInt(answer.questionId);
    const answerValue = answer.answer;

    // Find corresponding question in quiz
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question || !question.scoring) return;

    // Apply scoring based on question type
    if (question.type === 'multiple-choice') {
      const selectedIndex = parseInt(answerValue);
      if (selectedIndex >= 0 && selectedIndex < question.options.length) {
        // Add scores for selected option
        Object.keys(question.scoring).forEach(stream => {
          scores[stream] += (question.scoring[stream] || 0);
        });
      }
    } else if (question.type === 'likert') {
      const rating = parseInt(answerValue);
      if (rating >= 0 && rating <= 4) {
        // Scale scores based on likert rating (0-4 scale)
        Object.keys(question.scoring).forEach(stream => {
          const baseScore = question.scoring[stream] || 0;
          scores[stream] += (baseScore * rating) / 4; // Normalize to 0-1 scale
        });
      }
    }
  });

  // Generate recommendations
  const sortedStreams = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .filter(([,score]) => score > 0);

  const primaryStream = sortedStreams[0] ? sortedStreams[0][0] : 'arts';
  const secondaryStream = sortedStreams[1] ? sortedStreams[1][0] : null;
  
  // Calculate confidence score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const confidence = totalScore > 0 ? sortedStreams[0][1] / totalScore : 0.5;

  return {
    scores,
    recommendations: {
      primaryStream: capitalizeFirst(primaryStream),
      secondaryStream: secondaryStream ? capitalizeFirst(secondaryStream) : null,
      confidence: Math.min(confidence, 0.95) // Cap confidence at 95%
    }
  };
}

/**
 * Generate course suggestions based on recommended stream
 * @param {string} stream - Primary recommended stream
 * @returns {Array} - Array of suggested course names
 */
function generateCourseSuggestions(stream) {
  const courseSuggestions = {
    Science: [
      'B.Tech Computer Science',
      'MBBS (Medical)',
      'B.Sc Physics/Chemistry/Biology',
      'Engineering (Various Branches)',
      'B.Pharmacy'
    ],
    Commerce: [
      'B.Com (Bachelor of Commerce)',
      'BBA (Business Administration)',
      'CA (Chartered Accountancy)',
      'CS (Company Secretary)',
      'Economics Honours'
    ],
    Arts: [
      'BA English Literature',
      'BA Psychology',
      'BA History',
      'Mass Communication',
      'Fine Arts'
    ],
    Vocational: [
      'Diploma in Computer Applications',
      'ITI (Industrial Training)',
      'Polytechnic Diploma',
      'Hotel Management',
      'Fashion Design'
    ]
  };

  return courseSuggestions[stream] || [];
}

/**
 * Get explanation for recommended stream
 * @param {string} stream - Recommended stream
 * @returns {string} - Explanation text
 */
function getStreamExplanation(stream) {
  const explanations = {
    Science: "You show strong aptitude for analytical thinking, problem-solving, and scientific reasoning. Science stream offers diverse opportunities in technology, healthcare, research, and engineering fields.",
    Commerce: "Your interests align well with business, finance, and analytical skills. Commerce stream provides pathways to careers in business management, finance, economics, and entrepreneurship.",
    Arts: "You demonstrate creativity, communication skills, and interest in humanities. Arts stream offers opportunities in literature, social sciences, psychology, media, and creative fields.",
    Vocational: "Your practical approach and hands-on skills suggest vocational training would be ideal. This path offers specialized technical skills for immediate employment opportunities."
  };

  return explanations[stream] || "Based on your responses, this stream aligns well with your interests and abilities.";
}

/**
 * Generate next steps for the user
 * @param {string} stream - Primary recommended stream
 * @returns {Array} - Array of next step suggestions
 */
function generateNextSteps(stream) {
  return [
    `Research ${stream} courses and admission requirements`,
    'Explore colleges offering your recommended stream',
    'Connect with career counselors for detailed guidance',
    'Take subject-specific aptitude tests if required',
    'Plan your academic timeline and application process'
  ];
}

/**
 * Capitalize first letter of a string
 * @param {string} str - Input string
 * @returns {string} - Capitalized string
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = router;