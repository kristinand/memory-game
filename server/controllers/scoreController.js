const Score = require('../models/Score.js');
const catchAsync = require('../utils/catchAsync');

exports.getAllRatings = catchAsync(async (req, res, next) => {
  // const ratings = await Score.aggregate([{ $sort: req.query?.sort || { score: 1 } }]);
  const ratings = await Score.find().sort(req.query?.sort || 'score');

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

exports.deleteRating = catchAsync(async (req, res) => {
  const rating = await Score.findByIdAndDelete(req.params.id);

  if (!rating) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    content: null,
  });
});
