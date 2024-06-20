const request = require('supertest');
const db = require('../utils/testDbSetup');
const Goal = require('../../models/Goal');

let app;
let accessToken;
let userId;
let goalId;

beforeAll(async () => {
    app = await db.connect();

    const userResponse = await request(app)
        .post('/api/auth/register')
        .send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            capital:"10000",
            saving_goal:"10000"
        });

    accessToken = userResponse.body.accessToken;
    userId = userResponse.body.user._id;
});

afterAll(async () => {
    await db.closeDatabase();
});

afterEach(async () => {
    await db.clearDatabase();
});

describe('Goal Transaction Routes', () => {
    beforeEach(async () => {
        const goalResponse = await request(app)
            .post('/api/goals')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'Test Goal',
                amount: 10000,
                userId: userId
            });

        goalId = goalResponse.body._id;
    });

    describe('Create Goal Transaction', () => {
        it('Should create a goal transaction', async () => {
            const response = await request(app)
                .post('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ amount: 5000 });


            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('amount', 5000);
        });

        it('Should return 400 if no goal exists', async () => {
            await Goal.deleteMany({ userId: userId });

            const response = await request(app)
                .post('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ amount: 5000 });


            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'No goal exists');
        });

        it('Should return 400 if not enough funds', async () => {
            const response = await request(app)
                .post('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ amount: -5000 });


            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Not enough funds to complete operation');
        });
    });

    describe('Get All Goal Transactions', () => {
        it('Should get all goal transactions for a user', async () => {
            await request(app)
                .post('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ amount: 5000 });

            const response = await request(app)
                .get('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty('amount', 5000);
        });
    });

    describe('Get Current Goal Transactions', () => {
        it('Should get current goal transactions for a user', async () => {
            await request(app)
                .post('/api/goal-transactions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ amount: 5000 });

            const response = await request(app)
                .get('/api/goal-transactions/goal')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty('amount', 5000);
        });

        it('Should return 400 if no current goal exists', async () => {
            await Goal.deleteMany({ userId: userId });

            const response = await request(app)
                .get('/api/goal-transactions/goal')
                .set('Authorization', `Bearer ${accessToken}`);


            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'No goal exists');
        });
    });
});
