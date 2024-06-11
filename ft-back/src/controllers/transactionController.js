const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.createTransaction = async (req, res) => {
    try {
        const { amount, category, description } = req.body;

        if (!amount || !category) {
            return res.status(400).send({ error: 'Amount and category are required' });
        }

        const newTransaction = new Transaction({
            userId: req.userId,
            amount,
            category,
            description
        });

        await newTransaction.save();
        await User.findByIdAndUpdate(req.userId, { $push: { transactions: newTransaction._id } });

        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { amount, category, description } = req.body;
        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { amount, category, description }, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        await User.findByIdAndUpdate(req.userId, { $pull: { transactions: transactionId } });

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
