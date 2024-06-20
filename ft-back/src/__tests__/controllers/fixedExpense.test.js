const request = require('supertest');
const User = require('../../models/User');
const db = require("../utils/testDbSetup");
const {seedUserAndGetToken, getUserIdByEmail} = require("../utils/testDbSetup");


describe('FixedExpense API Tests', () => {
    let userId;
    let token;
    let fixedExpenseId;
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


    test('Create Fixed Expense - Success', async () => {
        const response = await request(app)
            .post('/api/fixedexpenses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: userId,
                name: 'Rent',
                category: 'lifestyle',
                amount: 1200
            });
        fixedExpenseId = response.body._id;
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual('Rent');
    });

    test('Get All Fixed Expenses', async () => {
        const response = await request(app)
            .get('/api/fixedexpenses')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    test('Get Fixed Expense by ID - Success', async () => {
        const response = await request(app)
            .get(`/api/fixedexpenses/${fixedExpenseId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    test('Update Fixed Expense - Success', async () => {
        const response = await request(app)
            .put(`/api/fixedexpenses/${fixedExpenseId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Rent', category: 'Housing', amount: 1300 });
        expect(response.statusCode).toBe(200);
    });

    test('Delete Fixed Expense - Success', async () => {
        const response = await request(app)
            .delete(`/api/fixedexpenses/${fixedExpenseId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});