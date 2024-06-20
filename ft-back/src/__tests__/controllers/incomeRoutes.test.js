const request = require("supertest");
const db = require("../utils/testDbSetup");
const User = require("../../models/User");
const Income = require("../../models/Income");

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

describe("Income Routes", () => {
    beforeEach(async () => {
        accessToken = await db.seedUserAndGetToken(app);
    });

    describe("Create Income", () => {
        it("Should create an income entry", async () => {
            const response = await request(app)
                .post('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Дохід",
                    amount: 3000
                });


            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('source', 'Дохід');
            expect(response.body).toHaveProperty('amount', 3000);
        });
    });

    describe("Get Incomes", () => {
        it("Should get all income entries for a user", async () => {
            await request(app)
                .post('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Дохід",
                    amount: 3000
                });

            const response = await request(app)
                .get('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2); 
            expect(response.body[0]).toHaveProperty('source', 'Дохід');
        });
    });

    describe("Get Income By ID", () => {
        it("Should get an income entry by ID", async () => {
            const createResponse = await request(app)
                .post('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Дохід",
                    amount: 3000
                });

            const incomeId = createResponse.body._id;

            const response = await request(app)
                .get(`/api/incomes/${incomeId}`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('source', 'Дохід');
        });

        it("Should return 404 if income entry not found", async () => {
            const response = await request(app)
                .get(`/api/incomes/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Income not found');
        });
    });

    describe("Update Income", () => {
        it("Should update an income entry by ID", async () => {
            const createResponse = await request(app)
                .post('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Дохід",
                    amount: 3000
                });

            const incomeId = createResponse.body._id;

            const response = await request(app)
                .put(`/api/incomes/${incomeId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Updated Дохід",
                    amount: 3500
                });

            console.log('Update Income Response:', response.body);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('source', 'Updated Дохід');
            expect(response.body).toHaveProperty('amount', 3500);
        });

        it("Should return 404 if income entry not found", async () => {
            const response = await request(app)
                .put(`/api/incomes/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Updated Дохід",
                    amount: 3500
                });


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Income not found');
        });
    });

    describe("Delete Income", () => {
        it("Should delete an income entry by ID", async () => {
            const createResponse = await request(app)
                .post('/api/incomes')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    source: "Дохід",
                    amount: 3000
                });

            const incomeId = createResponse.body._id;

            const response = await request(app)
                .delete(`/api/incomes/${incomeId}`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Income deleted successfully');

            const income = await Income.findById(incomeId);
            expect(income).toBeNull();
        });

        it("Should return 404 if income entry not found", async () => {
            const response = await request(app)
                .delete(`/api/incomes/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Income not found');
        });
    });
});
