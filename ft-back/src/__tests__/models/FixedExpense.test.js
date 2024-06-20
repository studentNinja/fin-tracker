const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const FixedExpense = require('../../models/FixedExpense');
const validCategories = require('../../config/expenseCategories');

let mongoServer;

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('FixedExpense Model Test', () => {
    beforeEach(async () => {
        await FixedExpense.deleteMany({});
    });

    test('should create and save a FixedExpense successfully', async () => {
        const validExpense = new FixedExpense({
            userId: new mongoose.Types.ObjectId(),
            name: 'Rent',
            category: validCategories[0],
            amount: 1000,
        });
        const savedExpense = await validExpense.save();

        expect(savedExpense._id).toBeDefined();
        expect(savedExpense.userId).toBeDefined();
        expect(savedExpense.name).toBe('Rent');
        expect(savedExpense.category).toBe(validCategories[0]);
        expect(savedExpense.amount).toBe(1000);
    });

    test('should fail to create a FixedExpense without required fields', async () => {
        const invalidExpense = new FixedExpense({
            name: 'Rent',
        });

        let err;
        try {
            await invalidExpense.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.category).toBeDefined();
        expect(err.errors.amount).toBeDefined();
    });

    test('should fail to create a FixedExpense with invalid category', async () => {
        const invalidExpense = new FixedExpense({
            userId: new mongoose.Types.ObjectId(),
            name: 'Rent',
            category: 'InvalidCategory',
            amount: 1000,
        });

        let err;
        try {
            await invalidExpense.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.category).toBeDefined();
    });

    test('should update an existing FixedExpense', async () => {
        const expense = new FixedExpense({
            userId: new mongoose.Types.ObjectId(),
            name: 'Rent',
            category: validCategories[0],
            amount: 1000,
        });
        const savedExpense = await expense.save();

        savedExpense.amount = 1200;
        const updatedExpense = await savedExpense.save();

        expect(updatedExpense.amount).toBe(1200);
    });

    test('should delete a FixedExpense', async () => {
        const expense = new FixedExpense({
            userId: new mongoose.Types.ObjectId(),
            name: 'Rent',
            category: validCategories[0],
            amount: 1000,
        });
        const savedExpense = await expense.save();

        await FixedExpense.findByIdAndDelete(savedExpense._id);

        const foundExpense = await FixedExpense.findById(savedExpense._id);
        expect(foundExpense).toBeNull();
    });
});
