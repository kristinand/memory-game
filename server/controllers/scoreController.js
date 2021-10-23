const Score = require('../models/Score.js');
const catchAsync = require('../utils/catchAsync');

exports.getAllRatings = catchAsync(async (req, res, next) => {
  const ratings = await Score.find();

  res.status(200).json({
    status: 'success',
    content: { ratings },
  });
});

exports.setRating = catchAsync(async (req, res, next) => {
  const { player, score } = req.body;

  const ratingData = await Score.findOneAndUpdate(
    { player },
    {
      $set: {
        score,
      },
    },
    { upsert: true },
  );
  await ratingData.save();

  res.status(200).json({
    status: 'success',
    contnet: null,
  });
});

exports.deleteRating = (req, res) => {};
