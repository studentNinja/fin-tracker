
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const createServer = require("../../app");
const request = require("supertest")

let mongoServer;

const connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return createServer(); // Return the app instance
};

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

const seedUserAndGetToken = async (app) => {
    const response = await request(app).post('/api/auth/register').send({
        username: "testUser",
        email: "test@test.test",
        password: "password123",
        capital: "1000",
        saving_goal: "10000"
    });
    return response.body.accessToken;
};

module.exports = {
    connect,
    closeDatabase,
    clearDatabase,
    seedUserAndGetToken,
};
