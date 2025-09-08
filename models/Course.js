const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  stream: { 
    type: String, 
    enum: ['Science', 'Commerce', 'Arts', 'Vocational'],
    required: true 
  },
  duration: String,
  eligibility: String,
  typical_careers: [String],
  higher_study: [String],
  govt_exams: [String],
  average_fees: Number
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
