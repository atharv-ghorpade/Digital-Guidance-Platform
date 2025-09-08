const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  text: String,
  type: {
    type: String,
    enum: ['likert', 'multiple-choice'],
    default: 'likert'
  },
  options: [String],
  scoring: {
    science: { type: Number, default: 0 },
    commerce: { type: Number, default: 0 },
    arts: { type: Number, default: 0 },
    vocational: { type: Number, default: 0 }
  }
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
