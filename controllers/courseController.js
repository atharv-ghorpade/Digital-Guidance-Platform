const Course = require('../models/course');

const getCoursesByStream = async (req, res) => {
  try {
    const { stream } = req.params;
    const courses = await Course.find({ stream });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCoursesByStream };
