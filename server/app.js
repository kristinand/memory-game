const express = require('express'); // https://expressjs.com/ru/
const rateLimit = require('express-rate-limit');
const scoreRouter = require('./routes/scoreRouter.js');

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
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.use('/api/rating', scoreRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on the server!`,
  });
});

module.exports = app;
