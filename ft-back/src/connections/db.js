const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

let mongoServer;

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === 'test') {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri).then(() => {
      console.log('In-memory MongoDB connected');
    }).catch((err) => {
      console.error('In-memory MongoDB connection error:', err);
      process.exit(1);
    });
  } else {
    mongoose.connect(MONGODB_URI, {
      ssl: true,
    }).then(() => {
      console.log('MongoDB connected');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };
