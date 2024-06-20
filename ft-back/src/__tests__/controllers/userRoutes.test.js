const request = require("supertest");
const db = require("../utils/testDbSetup");
const User = require("../../models/User");

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

describe("User Routes", () => {
    beforeEach(async () => {
        accessToken = await db.seedUserAndGetToken(app);
    });

    describe("Get Profile", () => {
        it("Should get user profile", async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('username', 'testUser');
            expect(response.body).toHaveProperty('email', 'test@test.test');
        });

        it("Should return 404 if user not found", async () => {
            await User.deleteMany({});

            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("Update Password", () => {
        it("Should update the user password", async () => {
            const response = await request(app)
                .put('/api/users/update-password')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    currentPassword: "password123",
                    newPassword: "newpassword123"
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Password updated successfully');
        });

        it("Should not update password with invalid current password", async () => {
            const response = await request(app)
                .put('/api/users/update-password')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    currentPassword: "wrongpassword",
                    newPassword: "newpassword123"
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('error', 'Invalid current password');
        });

        it("Should not update password if user not found", async () => {
            await User.deleteMany({});

            const response = await request(app)
                .put('/api/users/update-password')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    currentPassword: "password123",
                    newPassword: "newpassword123"
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("Delete Account", () => {
        it("Should delete the user account", async () => {
            const response = await request(app)
                .delete('/api/users/delete')
                .set('Authorization', `Bearer ${accessToken}`);

            console.log("Response body:", response.body);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Account deleted successfully');

            const user = await User.findOne({ email: "test@test.test" });
            expect(user).toBeNull();
        });

        it("Should return 404 if user not found", async () => {
            await User.deleteMany({});

            const response = await request(app)
                .delete('/api/users/delete')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });
});
