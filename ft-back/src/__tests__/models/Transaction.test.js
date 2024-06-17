const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Transaction = require('../../models/Transaction');
const validCategories = require('../../config/expenseCategories');

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

describe('Transaction Model Test', () => {
    beforeEach(async () => {
        await Transaction.deleteMany({});
    });

    test('should create and save a Transaction successfully', async () => {
        const validTransaction = new Transaction({
            userId: new mongoose.Types.ObjectId(),
            amount: 1000,
            category: validCategories[0],
            description: 'Test transaction'
        });
        const savedTransaction = await validTransaction.save();

        expect(savedTransaction._id).toBeDefined();
        expect(savedTransaction.userId).toBeDefined();
        expect(savedTransaction.amount).toBe(1000);
        expect(savedTransaction.category).toBe(validCategories[0]);
        expect(savedTransaction.description).toBe('Test transaction');
        expect(savedTransaction.date).toBeDefined();
    });

    test('should fail to create a Transaction without required fields', async () => {
        const invalidTransaction = new Transaction({
            description: 'Test transaction without required fields'
        });

        let err;
        try {
            await invalidTransaction.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.amount).toBeDefined();
        expect(err.errors.category).toBeDefined();
    });

    test('should fail to create a Transaction with invalid category', async () => {
        const invalidTransaction = new Transaction({
            userId: new mongoose.Types.ObjectId(),
            amount: 1000,
            category: 'invalidCategory',
            description: 'Invalid category'
        });

        let err;
        try {
            await invalidTransaction.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.category).toBeDefined();
    });

    test('should update an existing Transaction', async () => {
        const transaction = new Transaction({
            userId: new mongoose.Types.ObjectId(),
            amount: 1000,
            category: validCategories[0],
            description: 'Original description'
        });
        const savedTransaction = await transaction.save();

        savedTransaction.amount = 2000;
        savedTransaction.description = 'Updated description';
        const updatedTransaction = await savedTransaction.save();

        expect(updatedTransaction.amount).toBe(2000);
        expect(updatedTransaction.description).toBe('Updated description');
    });

    test('should delete a Transaction', async () => {
        const transaction = new Transaction({
            userId: new mongoose.Types.ObjectId(),
            amount: 1000,
            category: validCategories[0],
            description: 'Transaction to be deleted'
        });
        const savedTransaction = await transaction.save();

        await Transaction.findByIdAndDelete(savedTransaction._id);

        const foundTransaction = await Transaction.findById(savedTransaction._id);
        expect(foundTransaction).toBeNull();
    });
});
