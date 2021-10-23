const Score = require('../models/Score.js');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');
const { listenerCount } = require('../app.js');

exports.getAllRatings = catchAsync(async (req, res) => {
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

exports.saveRating = catchAsync(async (req, res) => {
  const doc = await Score.findOne({ player: req.body.player });

  if (doc) {
    doc.score = req.body.score;
    await doc;
  } else {
    await Score.create(req.body);
  }

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
