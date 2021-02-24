const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
	player: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	score: {
		type: Number,
	}
});

module.exports = Score = mongoose.model('score', ScoreSchema);