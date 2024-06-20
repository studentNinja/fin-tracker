const request = require('supertest');
const User = require('../../models/User');
const db = require("../utils/testDbSetup");
const {seedUserAndGetToken, getUserIdByEmail} = require("../utils/testDbSetup");

describe('Goal API', () => {
    let token;
    let userId;
    let goalId;
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

    test('Create Goal', async () => {
        const response = await request(app)
            .post('/api/goals')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: userId,
                name: 'Save for vacation',
                amount: 2000
            });
        goalId = response.body._id;
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual('Save for vacation');
    });

    test('Get Goals', async () => {
        const response = await request(app)
            .get('/api/goals')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Save for vacation'
            })
        ]));
    });

    test('Get Goal by ID', async () => {
        const response = await request(app)
            .get(`/api/goals/${goalId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('Save for vacation');
    });

    test('Update Goal', async () => {
        const response = await request(app)
            .put(`/api/goals/${goalId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Save for new car',
                amount: 5000,
                achieved: false
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('Save for new car');
        expect(response.body.amount).toBe(5000);
    });

    test('Delete Goal', async () => {
        const response = await request(app)
            .delete(`/api/goals/${goalId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Goal deleted successfully');
    });
});


