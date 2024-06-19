const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connect = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

const closeDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
      mongoServer = null;
    }
  }
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = { connect, closeDatabase, clearDatabase };
