const mongoose = require('mongoose');
const College = require('../models/College');
const Course = require('../models/course');
const Quiz = require('../models/Quiz');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Add your seed data here
    await College.deleteMany({});
    await Course.deleteMany({});
    
    console.log('✅ Seed data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
