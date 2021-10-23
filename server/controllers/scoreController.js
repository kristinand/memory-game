const Score = require('../models/Score.js');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');

exports.getAllRatings = catchAsync(async (req, res, next) => {
  // one more way to sort
  // const ratings = await Score.aggregate([{ $sort: req.query?.sort || { score: 1 } }]);

  if (!req.query?.sort) {
    req.query.sort = 'score';
  }

  const features = new APIFeatures(Score.find(), req.query).sort().paginate();
  const ratings = await features.query;

  const total = await Score.countDocuments();

  res.status(200).json({
    status: 'success',
    content: { total, ratings },
  });
});

exports.saveRating = catchAsync(async (req, res, next) => {
  const { player, score } = req.body;

  const ratingData = await Score.findOneAndUpdate(
    { player },
    {
      $set: {
        score,
      },
    },
    { upsert: true, new: true },
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
