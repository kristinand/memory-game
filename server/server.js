const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: '.env' });

const DB = process.env.MONGO_URI;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connected');
    });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
