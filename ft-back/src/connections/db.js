const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;


  mongoose.connect(MONGODB_URI, {
    ssl: false,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
};


module.exports = connectDB;
