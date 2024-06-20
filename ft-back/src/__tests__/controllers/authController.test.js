const mongoose = require("mongoose");
const request = require("supertest");
const createServer = require("../../app");

require("dotenv").config();

let app;

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    app = createServer();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Register User", () => {
    it("Should register User", async() => {
        const response = await request(app).post('/api/auth/register').send({
            username: "testUser",
            email: "test@test.test",
            password: "password123",
            capital: "1000",
            saving_goal: "10000"
        });

        expect(response.statusCode).toBe(201);
    }, 60000);
});
