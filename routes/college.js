const express = require('express');
const { getNearbyColleges, searchColleges } = require('../controllers/collegeController');

const router = express.Router();

// GET /api/colleges/nearby?lat=28.7041&lng=77.1025&maxDistance=10000
router.get('/nearby', getNearbyColleges);

// GET /api/colleges/search?q=delhi&state=delhi
router.get('/search', searchColleges);

module.exports = router;