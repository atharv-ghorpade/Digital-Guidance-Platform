// src/utils/seedQuiz.js
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
require('dotenv').config();

const sampleQuiz = {
  title: "Career Aptitude & Interest Assessment",
  description: "Discover your ideal academic stream based on your interests and aptitudes",
  isActive: true,
  questions: [
    {
      id: 1,
      text: "Which subject do you find most interesting?",
      type: "multiple-choice",
      options: [
        "Mathematics and Physics",
        "Business and Economics", 
        "Literature and History",
        "Practical Skills and Technology"
      ],
      scoring: {
        science: 3,
        commerce: 1,
        arts: 0,
        vocational: 2
      }
    },
    {
      id: 2,
      text: "How much do you enjoy solving complex mathematical problems?",
      type: "likert",
      options: ["Not at all", "Slightly", "Moderately", "Very much", "Extremely"],
      scoring: {
        science: 3,
        commerce: 2,
        arts: 0,
        vocational: 1
      }
    },
    {
      id: 3,
      text: "Are you interested in starting your own business someday?",
      type: "multiple-choice",
      options: ["Yes", "No"],
      scoring: {
        science: 0,
        commerce: 3,
        arts: 1,
        vocational: 2
      }
    },
    {
      id: 4,
      text: "Which activity appeals to you most?",
      type: "multiple-choice",
      options: [
        "Conducting scientific experiments",
        "Analyzing market trends",
        "Writing creative stories",
        "Building or repairing things"
      ],
      scoring: {
        science: 3,
        commerce: 2,
        arts: 1,
        vocational: 3
      }
    },
    {
      id: 5,
      text: "How comfortable are you with public speaking?",
      type: "likert",
      options: ["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"],
      scoring: {
        science: 1,
        commerce: 3,
        arts: 2,
        vocational: 1
      }
    }
  ]
};

const seedQuiz = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing quizzes...');
    await Quiz.deleteMany({});
    
    console.log('📝 Inserting sample quiz...');
    const quiz = new Quiz(sampleQuiz);
    await quiz.save();
    
    console.log('✅ Sample quiz seeded successfully!');
    console.log(`📋 Quiz ID: ${quiz._id}`);
    console.log(`📊 Total questions: ${quiz.questions.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Quiz seeding failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

seedQuiz();
