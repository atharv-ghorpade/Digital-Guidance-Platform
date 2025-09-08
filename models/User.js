// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define what a user looks like in database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  class_level: {
    type: String,
    enum: ['10th', '12th', 'graduate']
  },
  // Additional fields for SIH project
  dob: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  interests: [String],
  location: {
    state: String,
    district: String,
    city: String
  },
  quiz_completed: {
    type: Boolean,
    default: false
  },
  recommended_streams: [String],
  profile_completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);