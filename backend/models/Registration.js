const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  destination: {
    type: String,
    required: true,
    enum: ['bali', 'paris', 'kyoto', 'santorini']
  },
  travelers: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  date: {
    type: Date,
    required: true
  },
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
