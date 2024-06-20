const request = require("supertest");
const db = require("../utils/testDbSetup");
const User = require("../../models/User");
const Goal = require("../../models/Goal");

let app;
let accessToken;

beforeAll(async () => {
    app = await db.connect();
});

afterAll(async () => {
    await db.closeDatabase();
});

afterEach(async () => {
    await db.clearDatabase();
});

describe("Goal Routes", () => {
    beforeEach(async () => {
        accessToken = await db.seedUserAndGetToken(app);
    });

    describe("Create Goal", () => {
        it("Should create a goal", async () => {
            const response = await request(app)
                .post('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Ціль",
                    amount: 100000
                });


            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('name', 'Ціль');
            expect(response.body).toHaveProperty('amount', 100000);
        });
    });

    describe("Get Goals", () => {
        it("Should get all goals for a user", async () => {
            await request(app)
                .post('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Ціль",
                    amount: 100000
                });

            const response = await request(app)
                .get('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2); 
            expect(response.body[0]).toHaveProperty('name', 'Ціль');
        });
    });

    describe("Get Goal By ID", () => {
        it("Should get a goal by ID", async () => {
            const createResponse = await request(app)
                .post('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Ціль",
                    amount: 100000
                });

            const goalId = createResponse.body._id;

            const response = await request(app)
                .get(`/api/goals/${goalId}`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('name', 'Ціль');
        });

        it("Should return 404 if goal not found", async () => {
            const response = await request(app)
                .get(`/api/goals/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Goal not found');
        });
    });

    describe("Update Goal", () => {
        it("Should update a goal by ID", async () => {
            const createResponse = await request(app)
                .post('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Ціль",
                    amount: 100000
                });

            const goalId = createResponse.body._id;

            const response = await request(app)
                .put(`/api/goals/${goalId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Updated House",
                    amount: 120000,
                    achieved: true
                });


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('name', 'Updated House');
            expect(response.body).toHaveProperty('amount', 120000);
            expect(response.body).toHaveProperty('achieved', true);
        });

        it("Should return 404 if goal not found", async () => {
            const response = await request(app)
                .put(`/api/goals/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Updated House",
                    amount: 120000,
                    achieved: true
                });


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Goal not found');
        });
    });

    describe("Delete Goal", () => {
        it("Should delete a goal by ID", async () => {
            const createResponse = await request(app)
                .post('/api/goals')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Ціль",
                    amount: 100000
                });

            const goalId = createResponse.body._id;

            const response = await request(app)
                .delete(`/api/goals/${goalId}`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Goal deleted successfully');

            const goal = await Goal.findById(goalId);
            expect(goal).toBeNull();
        });

        it("Should return 404 if goal not found", async () => {
            const response = await request(app)
                .delete(`/api/goals/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Goal not found');
        });
    });
});
