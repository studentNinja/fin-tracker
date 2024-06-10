const Transaction = require('../models/Transaction');
const validCategories = require('../config/expenseCategories');
const User = require('../models/User');

exports.createTransaction = async (req, res) => {
    try {
        const { amount, category, description } = req.body;

        if (!amount || !category) {
            return res.status(400).send({ error: 'Amount and category are required' });
        }

        if (!validCategories.includes(category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        const newTransaction = new Transaction({
            userId: req.userId,
            amount,
            category,
            description
        });

        await newTransaction.save();

        await User.findByIdAndUpdate(req.userId, { $push: { transactions: newTransaction._id } });

        res.status(201).send(newTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.userId;

        const transactions = await Transaction.find({ userId: userId })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Transaction.countDocuments({ userId: userId });

        res.status(200).send({
            transactions,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};
