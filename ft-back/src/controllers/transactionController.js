const Transaction = require('../models/Transaction');
const validCategories = require('../config/expenseCategories');

exports.createTransaction = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        if (!validCategories.includes(category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        const newTransaction = new Transaction({
            user_id: req.userId,
            amount,
            category,
            description
        });
        await newTransaction.save();
        res.status(201).send(newTransaction);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const transactions = await Transaction.find({ user_id: req.userId })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Transaction.countDocuments({ user_id: req.userId });

        res.status(200).send({
            transactions,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(400).send(err);
    }
};