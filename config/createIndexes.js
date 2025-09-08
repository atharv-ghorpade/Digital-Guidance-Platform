const mongoose = require('mongoose');

const createIndexes = async () => {
  try {
    // User indexes
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    
    // College indexes
    await mongoose.connection.collection('colleges').createIndex({ location: '2dsphere' });
    await mongoose.connection.collection('colleges').createIndex({ state: 1, district: 1 });
    
    console.log('✅ Indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
};

module.exports = createIndexes;
