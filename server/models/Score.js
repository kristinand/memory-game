const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  player: {
    type: String,
    required: [true, 'Please, enter your name.'],
    unique: true,
    minLength: [3, 'Your name should contain at least 3 characters.'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z]+/.test(v);
      },
      message: 'Only latin characters allowed',
    },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Score can not be lower than 0.'],
  },
});

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;
