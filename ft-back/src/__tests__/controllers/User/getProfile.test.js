import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../../../app';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';
import setupTestDB from '../../../connections/setupTestDB';

const app = createServer();

setupTestDB();

describe('Profile API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Створення тестового користувача
    userId = new mongoose.Types.ObjectId();
    const user = new User({
      _id: userId,
      email: 'test@example.com',
      password: 'password123',
      transactions: [],
      fixed_expenses: [],
      goals: [],
      incomes: [],
    });
    await user.save();

    // Генерація JWT токена
    token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
  });

  describe('GET /api/users/profile', () => {
    it('should return user profile', async () => {
      const { statusCode, body } = await supertest(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.email).toBe('test@example.com');
    });

    it('should return 401 if token is missing', async () => {
      const { statusCode } = await supertest(app)
        .get('/api/users/profile');

      expect(statusCode).toBe(401);
    });

    it('should return 401 if token is invalid', async () => {
      const invalidToken = 'invalidToken';
      const { statusCode } = await supertest(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(statusCode).toBe(401);
    });
  });
});
