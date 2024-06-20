const request = require("supertest");
const db = require("../utils/testDbSetup");

let app;
let accessToken;

beforeAll(async () => {
    app = await db.connect();
});

afterAll(async () => {
    await db.closeDatabase();
});

beforeEach(async () => {
    await db.clearDatabase();
});

describe("Auth Routes", () => {
    describe("Register User", () => {
        it("Should register a user and return a JWT token", async () => {
            const response = await request(app).post('/api/auth/register').send({
                username: "testUser",
                email: "test@test.test",
                password: "password123",
                capital: "1000",
                saving_goal: "10000"
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.accessToken).toBeDefined();
            const tokenParts = response.body.accessToken.split('.');
            expect(tokenParts.length).toBe(3);
        });
    });

    describe("Login User", () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send({
                username: "testUser",
                email: "test@test.test",
                password: "password123",
                capital: "1000",
                saving_goal: "10000"
            });
        });

        it("Should login a user and return a JWT token", async () => {
            const response = await request(app).post('/api/auth/login').send({
                email: "test@test.test",
                password: "password123",
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.accessToken).toBeDefined();
            const tokenParts = response.body.accessToken.split('.');
            expect(tokenParts.length).toBe(3);
        });

        it("Should not login a user with invalid credentials", async () => {
            const response = await request(app).post('/api/auth/login').send({
                email: "test@test.test",
                password: "wrongpassword",
            });

            expect(response.statusCode).toBe(401);
            expect(response.body.accessToken).toBeUndefined();
            expect(response.body.error).toBe('Invalid credentials');
        });
    });

    describe("Refresh Token", () => {
        beforeEach(async () => {
            accessToken = await db.seedUserAndGetToken(app);
        });

        it("Should refresh a valid token", async () => {
            const refreshTokenResponse = await request(app).post('/api/auth/login').send({
                email: "test@test.test",
                password: "password123",
            });

            const refreshToken = refreshTokenResponse.body.refreshToken;

            const response = await request(app).post('/api/auth/refresh').send({
                refreshToken: refreshToken,
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.accessToken).toBeDefined();
            const tokenParts = response.body.accessToken.split('.');
            expect(tokenParts.length).toBe(3);
        });

        it("Should not refresh an invalid token", async () => {
            const response = await request(app).post('/api/auth/refresh').send({
                refreshToken: "invalidtoken",
            });

            expect(response.statusCode).toBe(401);
            expect(response.body.accessToken).toBeUndefined();
            expect(response.body.error).toBe('Invalid or expired refresh token');
        });
    });
});
