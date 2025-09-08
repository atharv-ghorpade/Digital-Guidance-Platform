// server.js - Express 5 Compatible
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Import and mount all API routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

const quizRoutes = require('./src/routes/quiz');
app.use('/api/quiz', quizRoutes);

const courseRoutes = require('./src/routes/course');
app.use('/api/courses', courseRoutes);

// Uncomment when you create the college routes file
// const collegeRoutes = require('./src/routes/college');
// app.use('/api/colleges', collegeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint - Updated to include all available routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 SIH Digital Guidance Platform API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      quiz: {
        getQuiz: 'GET /api/quiz',
        submitQuiz: 'POST /api/quiz/submit',
        getResults: 'GET /api/quiz/results',
        getRecommendation: 'GET /api/quiz/recommendation'
      },
      courses: {
        getByStream: 'GET /api/courses/:stream'
      },
      colleges: 'Coming soon...'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// Handle 404 - Express 5 compatible way
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
});
