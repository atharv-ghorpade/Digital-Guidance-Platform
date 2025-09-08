const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ isActive: true });
    res.json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    // Quiz scoring logic here
    // Save results to QuizResult collection
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getQuiz, submitQuiz };
