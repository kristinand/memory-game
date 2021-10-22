const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;