const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const GoalTransaction = require('../../models/goalTransaction');

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

describe('GoalTransaction Model Test', () => {
    beforeEach(async () => {
        await GoalTransaction.deleteMany({});
    });

    test('should create and save a GoalTransaction successfully', async () => {
        const validGoalTransaction = new GoalTransaction({
            userId: new mongoose.Types.ObjectId(),
            goalId: new mongoose.Types.ObjectId(),
            amount: 5000,
            category: 'goal'
        });
        const savedGoalTransaction = await validGoalTransaction.save();

        expect(savedGoalTransaction._id).toBeDefined();
        expect(savedGoalTransaction.userId).toBeDefined();
        expect(savedGoalTransaction.goalId).toBeDefined();
        expect(savedGoalTransaction.amount).toBe(5000);
        expect(savedGoalTransaction.category).toBe('goal');
        expect(savedGoalTransaction.date).toBeDefined();
    });

    test('should fail to create a GoalTransaction without required fields', async () => {
        const invalidGoalTransaction = new GoalTransaction({
        });

        let err;
        try {
            await invalidGoalTransaction.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.goalId).toBeDefined();
        expect(err.errors.amount).toBeDefined();
        expect(err.errors.category).toBeUndefined();
    });

    test('should fail to create a GoalTransaction with invalid category', async () => {
        const invalidGoalTransaction = new GoalTransaction({
            userId: new mongoose.Types.ObjectId(),
            goalId: new mongoose.Types.ObjectId(),
            amount: 5000,
            category: 'invalidCategory'
        });

        let err;
        try {
            await invalidGoalTransaction.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.category).toBeDefined();
    });

    test('should update an existing GoalTransaction', async () => {
        const goalTransaction = new GoalTransaction({
            userId: new mongoose.Types.ObjectId(),
            goalId: new mongoose.Types.ObjectId(),
            amount: 5000,
            category: 'goal'
        });
        const savedGoalTransaction = await goalTransaction.save();

        savedGoalTransaction.amount = 6000;
        const updatedGoalTransaction = await savedGoalTransaction.save();

        expect(updatedGoalTransaction.amount).toBe(6000);
    });

    test('should delete a GoalTransaction', async () => {
        const goalTransaction = new GoalTransaction({
            userId: new mongoose.Types.ObjectId(),
            goalId: new mongoose.Types.ObjectId(),
            amount: 5000,
            category: 'goal'
        });
        const savedGoalTransaction = await goalTransaction.save();

        await GoalTransaction.findByIdAndDelete(savedGoalTransaction._id);

        const foundGoalTransaction = await GoalTransaction.findById(savedGoalTransaction._id);
        expect(foundGoalTransaction).toBeNull();
    });
});
