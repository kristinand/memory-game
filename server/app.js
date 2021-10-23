const express = require('express'); // https://expressjs.com/ru/
const rateLimit = require('express-rate-limit');
const scoreRouter = require('./routes/scoreRouter');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public`));
  app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
}

app.use('/api/rating', scoreRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
