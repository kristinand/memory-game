const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log('Mongo DB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
