const express = require('express');
const connectDB = require('./db.js');
const Score = require('./models/Score.js');

const app = express();

connectDB();

//init middleware / bodyParser
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.put('/game', (req, res) => {
  Score
    .findOneAndUpdate(
      { player: req.body.player },
      {
        $set: {
          score: req.body.score,
        },
      },
      {
        upsert: true,
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
});

app.get('/rating', async (req, res) => {
  const ratingData = await Score.find();
  res.send(ratingData);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
