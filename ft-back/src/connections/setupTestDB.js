const { connectDB, disconnectDB } = require('./db');

const setupTestDB = () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });
};

module.exports = setupTestDB;
