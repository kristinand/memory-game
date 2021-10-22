const Score = require('../models/Score.js');

exports.getAllRatings = async (req, res) => {
  const ratingData = await Score.find();
  res.send(ratingData);
};

exports.createRating = async (req, res) => {
  try {
    const score = await Score.findOneAndUpdate(
      { player: req.body.player },
      {
        $set: {
          score: req.body.score,
          date: Date.now(),
        },
      },
      { upsert: true },
    );
    await score.save();
    res.json(score);
  } catch (err) {
    console.error(err);
  }
};

exports.deleteRating = (req, res) => {};
