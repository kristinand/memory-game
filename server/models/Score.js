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
    min: [0, "Score can not be lower than 0."],
  },
});

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;
