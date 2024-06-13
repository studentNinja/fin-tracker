const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
const connectDB = async () => {
    mongoose.connect(MONGODB_URI, {
        ssl: true,
    }).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
    });
};

module.exports = connectDB;
