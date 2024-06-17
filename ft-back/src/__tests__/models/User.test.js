const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User');


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Model Test', () => {
    beforeEach(async () => {
        await User.deleteMany({});

    });

    test('should create and save a User successfully', async () => {
        const validUser = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            capital: 10000
        });
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('testuser');
        expect(savedUser.email).toBe('testuser@example.com');
        expect(savedUser.capital).toBe(10000);
        expect(savedUser.saving_goal).toBe(100000); // Default value
        expect(savedUser.registration_date).toBeDefined();
        expect(savedUser.password).toBeDefined(); // Password should be hashed
    });

    test('should fail to create a User without required fields', async () => {
        const invalidUser = new User({
        });

        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.username).toBeDefined();
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.capital).toBeDefined();
    });
    test('should fail to create a User woth password length less than 8', async () => {
        const invalidUser = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: '123',
            capital: 10000
        });

        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.password).toBeDefined();

    });


    test('should hash password before saving', async () => {
        const password = 'password123';
        const user = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: password,
            capital: 10000
        });
        await user.save();

        const isPasswordMatch = await user.comparePassword(password);
        expect(isPasswordMatch).toBe(true);
    });

    test('should update an existing User', async () => {
        const user = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            capital: 10000
        });
        const savedUser = await user.save();

        savedUser.capital = 15000;
        const updatedUser = await savedUser.save();

        expect(updatedUser.capital).toBe(15000);
    });

    test('should delete a User', async () => {
        const user = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            capital: 10000
        });
        const savedUser = await user.save();

        await User.findByIdAndDelete(savedUser._id);

        const foundUser = await User.findById(savedUser._id);
        expect(foundUser).toBeNull();
    });
});
