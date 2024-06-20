const request = require('supertest');
const User = require('../../models/User');
const db = require("../utils/testDbSetup");
const {seedUserAndGetToken, getUserIdByEmail} = require("../utils/testDbSetup");

describe('Transaction API Tests', () => {
    let userId;
    let token;
    let transactionId;
    let app;

    beforeAll(async () => {
        app = await db.connect();
        token = await seedUserAndGetToken(app);
        userId = await getUserIdByEmail('test@test.test');
    });

    afterAll(async () => {
        await User.findOneAndDelete({ _id: userId });
        await db.closeDatabase();
    });

    test('Create Transaction - Success', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 100,
                category: 'food',
                description: 'Weekly food supplies'
            });
        transactionId = response.body._id;
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('amount', 100);
    });

    test('Create Transaction - Fail (missing required fields)', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: 'Incomplete data'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('Amount and category are required');
    });

    test('Get All Transactions', async () => {
        const response = await request(app)
            .get('/api/transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: transactionId
            })
        ]));
    });

    test('Get Transaction by ID - Success', async () => {
        const response = await request(app)
            .get(`/api/transactions/${transactionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', transactionId);
    });

    test('Update Transaction - Success', async () => {
        const response = await request(app)
            .put(`/api/transactions/${transactionId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 150,
                category: 'Food',
                description: 'Apple'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('amount', 150);
    });

    test('Delete Transaction - Success', async () => {
        const response = await request(app)
            .delete(`/api/transactions/${transactionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Transaction deleted successfully');
    });

    test('Get Transaction by ID - Not Found', async () => {
        const response = await request(app)
            .get(`/api/transactions/${transactionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Transaction not found');
    });
});
