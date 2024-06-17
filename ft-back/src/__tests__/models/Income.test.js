const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Income = require('../../models/Income');


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

describe('Income Model Test', () => {
    beforeEach(async () => {
        await Income.deleteMany({});
    });

    test('should create and save an Income successfully', async () => {
        const validIncome = new Income({
            userId: new mongoose.Types.ObjectId(),
            source: 'Salary',
            amount: 5000
        });
        const savedIncome = await validIncome.save();

        expect(savedIncome._id).toBeDefined();
        expect(savedIncome.userId).toBeDefined();
        expect(savedIncome.source).toBe('Salary');
        expect(savedIncome.amount).toBe(5000);
        expect(savedIncome.category).toBe('income');
        expect(savedIncome.date).toBeDefined();
    });

    test('should fail to create an Income without required fields', async () => {
        const invalidIncome = new Income({
        });

        let err;
        try {
            await invalidIncome.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.source).toBeDefined();
        expect(err.errors.amount).toBeDefined();
    });

    test('should fail to create an Income with invalid category', async () => {
        const invalidIncome = new Income({
            userId: new mongoose.Types.ObjectId(),
            source: 'Investment',
            amount: 7000,
            category: 'invalidCategory'
        });

        let err;
        try {
            await invalidIncome.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.category).toBeDefined();
    });

    test('should update an existing Income', async () => {
        const income = new Income({
            userId: new mongoose.Types.ObjectId(),
            source: 'Salary',
            amount: 5000,
            category: 'income'
        });
        const savedIncome = await income.save();

        savedIncome.amount = 6000;
        const updatedIncome = await savedIncome.save();

        expect(updatedIncome.amount).toBe(6000);
    });

    test('should delete an Income', async () => {
        const income = new Income({
            userId: new mongoose.Types.ObjectId(),
            source: 'Salary',
            amount: 5000,
            category: 'income'
        });
        const savedIncome = await income.save();

        await Income.findByIdAndDelete(savedIncome._id);

        const foundIncome = await Income.findById(savedIncome._id);
        expect(foundIncome).toBeNull();
    });
});
