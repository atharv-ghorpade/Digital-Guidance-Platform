const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  facilities: {
    hostel: { type: Boolean, default: false },
    library: { type: Boolean, default: true },
    labs: { type: Boolean, default: false },
    sports: { type: Boolean, default: false },
    canteen: { type: Boolean, default: false }
  },
  established_year: Number,
  type: { type: String, enum: ['Government', 'Private', 'Aided'], default: 'Government' },
  affiliation: String,
  cutoff_info: {
    general: Number,
    obc: Number,
    sc: Number,
    st: Number
  }
}, { timestamps: true });

// Create geospatial index for location-based queries
collegeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('College', collegeSchema);
