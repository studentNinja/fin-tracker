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

afterEach(async () => {
    await db.clearDatabase();
});

describe("Transaction Routes", () => {
    beforeEach(async () => {
        accessToken = await db.seedUserAndGetToken(app);
    });

    describe("Create Transaction", () => {
        it("Should create a transaction", async () => {
            const response = await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 500,
                    category: "food",
                    description: "Groceries"
                });


            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('amount', 500);
            expect(response.body).toHaveProperty('category', 'food');
            expect(response.body).toHaveProperty('description', 'Groceries');
        });

        it("Should return 400 if amount or category is missing", async () => {
            const response = await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    description: "Groceries"
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Amount and category are required');
        });
    });

    describe("Get Transactions", () => {
        it("Should get all transactions for a user", async () => {
            await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 500,
                    category: "food",
                    description: "Groceries"
                });

            const response = await request(app)
                .get('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty('amount', 500);
            expect(response.body[0]).toHaveProperty('category', 'food');
            expect(response.body[0]).toHaveProperty('description', 'Groceries');
        });
    });

    describe("Get Transaction By ID", () => {
        it("Should get a transaction by ID", async () => {
            const transactionResponse = await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 500,
                    category: "food",
                    description: "Groceries"
                });

            const transactionId = transactionResponse.body._id;

            const response = await request(app)
                .get(`/api/transactions/${transactionId}`)
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('amount', 500);
            expect(response.body).toHaveProperty('category', 'food');
            expect(response.body).toHaveProperty('description', 'Groceries');
        });

        it("Should return 404 if transaction not found", async () => {
            const response = await request(app)
                .get('/api/transactions/60c72b2f5f1b2c001c8e4df5')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Transaction not found');
        });
    });

    describe("Update Transaction", () => {
        it("Should update a transaction by ID", async () => {
            const transactionResponse = await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 500,
                    category: "food",
                    description: "Groceries"
                });

            const transactionId = transactionResponse.body._id;

            const response = await request(app)
                .put(`/api/transactions/${transactionId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 600,
                    category: "transport",
                    description: "Bus fare"
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('amount', 600);
            expect(response.body).toHaveProperty('category', 'transport');
            expect(response.body).toHaveProperty('description', 'Bus fare');
        });

        it("Should return 404 if transaction not found", async () => {
            const response = await request(app)
                .put('/api/transactions/60c72b2f5f1b2c001c8e4df5')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 600,
                    category: "transport",
                    description: "Bus fare"
                });

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Transaction not found');
        });
    });

    describe("Delete Transaction", () => {
        it("Should delete a transaction by ID", async () => {
            const transactionResponse = await request(app)
                .post('/api/transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    amount: 500,
                    category: "food",
                    description: "Groceries"
                });

            const transactionId = transactionResponse.body._id;

            const response = await request(app)
                .delete(`/api/transactions/${transactionId}`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Transaction deleted successfully');
        });

        it("Should return 404 if transaction not found", async () => {
            const response = await request(app)
                .delete('/api/transactions/60c72b2f5f1b2c001c8e4df5')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Transaction not found');
        });
    });
});
