// src/models/QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [{
    questionId: {
      type: Number,
      required: true
    },
    answer: {
      type: mongoose.Schema.Types.Mixed, // Can be string, number, boolean
      required: true
    }
  }],
  scores: {
    science: {
      type: Number,
      default: 0,
      min: 0
    },
    commerce: {
      type: Number,
      default: 0,
      min: 0
    },
    arts: {
      type: Number,
      default: 0,
      min: 0
    },
    vocational: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  suggestions: {
    primary_stream: {
      type: String,
      required: true,
      enum: ['Science', 'Commerce', 'Arts', 'Vocational']
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5
    },
    recommended_courses: [String]
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate submissions
quizResultSchema.index({ userId: 1, quizId: 1 }, { unique: true });

// Index for efficient querying by user and date
quizResultSchema.index({ userId: 1, createdAt: -1 });

// Index for analytics
quizResultSchema.index({ 'suggestions.primary_stream': 1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);

