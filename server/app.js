const express = require('express'); // https://expressjs.com/ru/
const Score = require('./models/Score.js');

const app = express();

app.use(express.json({ extended: false }));

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
