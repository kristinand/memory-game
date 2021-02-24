const express = require('express');
const connectDB = require('./db.js');
const Score = require('./models/Score.js');

const app = express();

connectDB();

//init middleware / bodyParser
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
          date: Date.now()
        },
      },
      {
        upsert: true,
      }
    )
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => console.error(err));
});

app.get('/rating', async (req, res) => {
  const ratingData = await Score.find();
  res.send(ratingData);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
