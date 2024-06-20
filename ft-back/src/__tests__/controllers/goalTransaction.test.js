const request = require('supertest');
const User = require('../../models/User');
const Goal = require('../../models/Goal');
const GoalTransaction = require('../../models/GoalTransaction');
const db = require("../utils/testDbSetup");
const { seedUserAndGetToken, getUserIdByEmail } = require("../utils/testDbSetup");

describe('GoalTransaction API', () => {
    let token;
    let userId;
    let goalId;
    let app;

    beforeAll(async () => {
        app = await db.connect();
        token = await seedUserAndGetToken(app);
        userId = await getUserIdByEmail('test@test.test');

        const goal = await Goal.create({
            userId: userId,
            name: "Test Goal",
            targetAmount: 10000
        });
        goalId = goal._id;

        await GoalTransaction.create({
            userId: userId,
            goalId: goalId,
            amount: 1000,
            category: "goal"
        });
    });

    afterAll(async () => {
        await User.findOneAndDelete({ _id: userId });
        await Goal.deleteMany({ userId: userId });
        await GoalTransaction.deleteMany({ userId: userId });
        await db.closeDatabase();
    });

    test('Create GoalTransaction - Valid Transaction', async () => {
        const response = await request(app)
            .post('/api/goal-transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: userId,
                goalId: goalId,
                amount: 1000
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.amount).toEqual(1000);
    });

    test('Create GoalTransaction - Without Amount', async () => {
        const response = await request(app)
            .post('/api/goal-transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: userId,
                goalId: goalId
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Amount is required");
    });

    test('Get All GoalTransactions for User', async () => {
        const response = await request(app)
            .get('/api/goal-transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                amount: 1000
            })
        ]));
    });

    test('Get Current Goal Transactions', async () => {
        const response = await request(app)
            .get(`/api/goal-transactions/goal`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});
