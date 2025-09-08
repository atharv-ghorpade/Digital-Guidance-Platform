const College = require('../models/College');

// Get colleges near user location
const getNearbyColleges = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 50000 } = req.query; // maxDistance in meters
    
    const colleges = await College.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(10);
    
    res.json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search colleges by name or location
const searchColleges = async (req, res) => {
  try {
    const { q, state, district } = req.query;
    let query = {};
    
    if (q) {
      query.name = new RegExp(q, 'i'); // Case-insensitive search
    }
    if (state) query.state = new RegExp(state, 'i');
    if (district) query.district = new RegExp(district, 'i');
    
    const colleges = await College.find(query).limit(20);
    
    res.json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getNearbyColleges, searchColleges };
