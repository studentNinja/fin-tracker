// const request = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../../app');
// const connectDB = require('../../connections/db');
// const User = require('../../models/User');

// let testUserEmail;
// describe('Auth API', () => {
//     beforeAll(async () => {
//         await connectDB();
//     }, 300000);

//     afterAll(async () => {
//         if (testUserEmail) {
//             await User.findOneAndDelete({ email: testUserEmail });
//         }
//         await mongoose.connection.close();
//         server.close();
//     }, 300000);

//     describe('POST /api/auth/register', () => {
//         it('should register a new user', async () => {
//             const res = await request(app)
//                 .post('/api/auth/register')
//                 .send({
//                     username: 'testuser7',
//                     email: 'test7@example.com',
//                     password: 'Password1235',
//                     capital: 1000
//                 });

//             expect(res.status).toBe(201);
//             expect(res.body).toHaveProperty('user.username', 'testuser7');
//             expect(res.body).toHaveProperty('user.email', 'test7@example.com');
//             testUserEmail = res.body.user.email;
//         }, 300000);

//         it('should not register a user with existing email', async () => {
//             await request(app)
//                 .post('/api/auth/register')
//                 .send({
//                     username: 'testuser',
//                     email: 'test1@example.com',
//                     password: 'Password123',
//                     capital: 1000
//                 });

//             const res = await request(app)
//                 .post('/api/auth/register')
//                 .send({
//                     username: 'testuser',
//                     email: 'test1@example.com',
//                     password: 'Password123',
//                     capital: 1000
//                 });

//             expect(res.status).toBe(400);
//             expect(res.body).toHaveProperty('error');
//         }, 300000);
//     });

//     describe('POST /api/auth/login', () => {
//         it('should login a user', async () => {
//             const res = await request(app)
//                 .post('/api/auth/login')
//                 .send({
//                     email: 'test1@example.com',
//                     password: 'Password123'
//                 });

//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty('accessToken');
//             expect(res.body).toHaveProperty('refreshToken');
//         }, 300000);

//         it('should not login with incorrect password', async () => {
//             const res = await request(app)
//                 .post('/api/auth/login')
//                 .send({
//                     email: 'test1@example.com',
//                     password: 'wrongpassword'
//                 });

//             expect(res.status).toBe(401);
//             expect(res.body).toHaveProperty('error');
//         }, 300000);
//     });
// });

