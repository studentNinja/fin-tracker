const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Goal = require('../../models/Goal');

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

describe('Goal Model Test', () => {
    beforeEach(async () => {
        await Goal.deleteMany({});
    });

    test('should create and save a Goal successfully', async () => {
        const validGoal = new Goal({
            userId: new mongoose.Types.ObjectId(),
            name: 'Save for a car',
            amount: 200000,
            goalTransactions: new mongoose.Types.ObjectId(),
        });
        const savedGoal = await validGoal.save();

        expect(savedGoal._id).toBeDefined();
        expect(savedGoal.userId).toBeDefined();
        expect(savedGoal.name).toBe('Save for a car');
        expect(savedGoal.amount).toBe(200000);
        expect(savedGoal.achieved).toBe(false);
        expect(savedGoal.goalTransactions).toBeDefined();
        expect(savedGoal.startDate).toBeDefined();
        expect(savedGoal.achievedDate).toBeUndefined();
    });

    test('should fail to create a Goal without required fields', async () => {
        const invalidGoal = new Goal({
            name: 'New house',
        });

        let err;
        try {
            await invalidGoal.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.amount).toBeUndefined();
    });

    test('should update an existing Goal', async () => {
        const goal = new Goal({
            userId: new mongoose.Types.ObjectId(),
            name: 'New car',
            amount: 200000,
            achieved: false,
            goalTransactions: new mongoose.Types.ObjectId(),
        });
        const savedGoal = await goal.save();

        savedGoal.amount = 250000;
        const updatedGoal = await savedGoal.save();

        expect(updatedGoal.amount).toBe(250000);
    });

    test('should delete a Goal', async () => {
        const goal = new Goal({
            userId: new mongoose.Types.ObjectId(),
            name: 'New car',
            amount: 200000,
            achieved: false,
            goalTransactions: new mongoose.Types.ObjectId(),
        });
        const savedGoal = await goal.save();

        await Goal.findByIdAndDelete(savedGoal._id);

        const foundGoal = await Goal.findById(savedGoal._id);
        expect(foundGoal).toBeNull();
    });

});
