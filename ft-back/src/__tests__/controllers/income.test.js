const request = require('supertest');
const User = require('../../models/User');
const db = require("../utils/testDbSetup");
const {seedUserAndGetToken, getUserIdByEmail} = require("../utils/testDbSetup");

describe('Income API', () => {
  let token;
  let userId;
  let incomeId;
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

  test('Create Income', async () => {
    const response = await request(app)
        .post('/api/incomes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: userId,
          source: 'Job',
          amount: 1500
        });
    incomeId = response.body._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.source).toEqual('Job');
  });

  test('Get Incomes', async () => {
    const response = await request(app)
        .get('/api/incomes')
        .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        source: 'Job'
      })
    ]));
  });

  test('Get Income by ID', async () => {
    const response = await request(app)
        .get(`/api/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.source).toEqual('Job');
  });

  test('Update Income', async () => {
    const response = await request(app)
        .put(`/api/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          source: 'Freelance',
          amount: 2000
        });
    expect(response.statusCode).toBe(200);
    expect(response.body.source).toEqual('Freelance');
  });

  test('Delete Income', async () => {
    const response = await request(app)
        .delete(`/api/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Income deleted successfully');
  });
});
