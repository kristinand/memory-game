const express = require('express'); // https://expressjs.com/ru/
const rateLimit = require('express-rate-limit');
const Score = require('./models/Score.js');

const app = express();

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});
app.use('/api', limiter);

// Bode parser: reading data from body into req.body
app.use(
  express.json({
      limit: '10kb',
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.put('/game', async (req, res) => {
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
});

app.get('/rating', async (req, res) => {
  const ratingData = await Score.find();
  res.send(ratingData);
});

module.exports = app;
