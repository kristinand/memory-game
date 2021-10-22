const Score = require('../models/Score.js');
const catchAsync = require('../utils/catchAsync');

exports.getAllRatings = catchAsync(async (req, res, next) => {
  const ratings = await Score.find();

  res.status(200).json({
    status: 'success',
    content: {
      total: ratings.length,
      items: ratings,
    },
  });
});

exports.createRating = catchAsync(async (req, res, next) => {
  const ratingData = await Score.findOneAndUpdate(
    { player: req.body.player },
    {
      $set: {
        score: req.body.score,
        date: Date.now(),
      },
    },
    { upsert: true },
  );
  await ratingData.save();

  res.status(200).json({
    status: 'success',
    constnet: {
      data: ratingData,
    },
  });
});

exports.deleteRating = (req, res) => {};
