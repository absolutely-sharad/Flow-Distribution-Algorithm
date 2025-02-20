const mongoose = require('mongoose');

// Define the schema for the Astrologer model
const astrologerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  flowDistributionFactor: {
    type: Number,
    default: 1
  }
});

// Create the Astrologer model
const Astrologer = mongoose.model('Astrologer', astrologerSchema);

module.exports = Astrologer;