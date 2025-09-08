const express = require('express');
const { getCoursesByStream } = require('../controllers/courseController');

const router = express.Router();

router.get('/stream/:stream', getCoursesByStream);

module.exports = router;
