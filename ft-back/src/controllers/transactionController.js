const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.createTransaction = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = (req.user.role === 'ADMIN' && req.query.userId)
            ? req.query.userId
            : callerId;
        const { amount, category, description } = req.body;
        if (amount === undefined || !category) {
            return res.status(400).json({ error: 'Amount and category are required' });
        }
        const newTransaction = new Transaction({
            userId: targetUserId,
            amount,
            category,
            description
        });
        await newTransaction.save();
        await User.findByIdAndUpdate(targetUserId, {
            $push: { transactions: newTransaction._id }
        });
        return res.status(201).json(newTransaction);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = (req.user.role === 'ADMIN' && req.query.userId)
            ? req.query.userId
            : callerId;
        const transactions = await Transaction.find({ userId: targetUserId });
        return res.status(200).json(transactions);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const tx = await Transaction.findById(transactionId);
        if (!tx) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        if (req.user.role !== 'ADMIN' && tx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        return res.status(200).json(tx);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const tx = await Transaction.findById(transactionId);
        if (!tx) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        if (req.user.role !== 'ADMIN' && tx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { amount, category, description } = req.body;
        tx.amount = amount;
        tx.category = category;
        tx.description = description;
        await tx.save();
        return res.status(200).json(tx);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const tx = await Transaction.findById(transactionId);
        if (!tx) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        if (req.user.role !== 'ADMIN' && tx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        await Transaction.findByIdAndDelete(transactionId);
        await User.findByIdAndUpdate(tx.userId, {
            $pull: { transactions: transactionId }
        });
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
