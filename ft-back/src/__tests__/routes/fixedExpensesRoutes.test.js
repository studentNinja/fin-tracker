const request = require("supertest");
const db = require("../utils/testDbSetup");
const User = require("../../models/User");
const FixedExpense = require("../../models/FixedExpense");

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

describe("FixedExpense Routes", () => {
    beforeEach(async () => {
        accessToken = await db.seedUserAndGetToken(app);
    });

    describe("Create FixedExpense", () => {
        it("Should create a fixed expense", async () => {
            const response = await request(app)
                .post('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Rent",
                    category: "fixed",
                    amount: 1000
                });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('name', 'Rent');
            expect(response.body).toHaveProperty('category', 'fixed');
            expect(response.body).toHaveProperty('amount', 1000);
        });
    });

    describe("Get FixedExpenses", () => {
        it("Should get all fixed expenses for a user", async () => {
            // Create a fixed expense first
            await request(app)
                .post('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Rent",
                    category: "fixed",
                    amount: 1000
                });

            const response = await request(app)
                .get('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty('name', 'Rent');
        });
    });

    describe("Get FixedExpense By ID", () => {
        it("Should get a fixed expense by ID", async () => {
            const createResponse = await request(app)
                .post('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Rent",
                    category: "fixed",
                    amount: 1000
                });

            const fixedExpenseId = createResponse.body._id;

            const response = await request(app)
                .get(`/api/fixedexpenses/${fixedExpenseId}`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('name', 'Rent');
        });

        it("Should return 404 if fixed expense not found", async () => {
            const response = await request(app)
                .get(`/api/fixedexpenses/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Fixed expense not found');
        });
    });

    describe("Update FixedExpense", () => {
        it("Should update a fixed expense by ID", async () => {
            const createResponse = await request(app)
                .post('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Rent",
                    category: "fixed",
                    amount: 1000
                });

            const fixedExpenseId = createResponse.body._id;

            const response = await request(app)
                .put(`/api/fixedexpenses/${fixedExpenseId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Updated Rent",
                    category: "fixed",
                    amount: 1200
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('name', 'Updated Rent');
            expect(response.body).toHaveProperty('amount', 1200);
        });

        it("Should return 404 if fixed expense not found", async () => {
            const response = await request(app)
                .put(`/api/fixedexpenses/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Updated Rent",
                    category: "fixed",
                    amount: 1200
                });

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Fixed expense not found');
        });
    });

    describe("Delete FixedExpense", () => {
        it("Should delete a fixed expense by ID", async () => {
            const createResponse = await request(app)
                .post('/api/fixedexpenses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    name: "Rent",
                    category: "fixed",
                    amount: 1000
                });

            const fixedExpenseId = createResponse.body._id;

            const response = await request(app)
                .delete(`/api/fixedexpenses/${fixedExpenseId}`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Fixed expense deleted successfully');

            const fixedExpense = await FixedExpense.findById(fixedExpenseId);
            expect(fixedExpense).toBeNull();
        });

        it("Should return 404 if fixed expense not found", async () => {
            const response = await request(app)
                .delete(`/api/fixedexpenses/60d5ec49f10a2b1ef8a59d33`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Fixed expense not found');
        });
    });
});
