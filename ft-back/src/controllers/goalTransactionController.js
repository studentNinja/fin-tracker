const GoalTransaction = require('../models/GoalTransaction');
const Goal = require('../models/Goal');
const User = require('../models/User');

exports.createGoalTransaction = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = req.user.role === 'ADMIN' && req.query.userId ? req.query.userId : callerId;
        let { amount } = req.body;
        if (amount === undefined) {
            return res.status(400).json({ error: 'Amount is required' });
        }
        const goal = await Goal.findOne({ achieved: false, userId: targetUserId });
        if (!goal) {
            return res.status(400).json({ error: 'No goal exists' });
        }
        const goalId = goal._id;
        const transactions = await GoalTransaction.find({ goalId });
        const savedAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        if (savedAmount + amount >= goal.amount) {
            await Goal.findByIdAndUpdate(goalId, { achieved: true });
            amount = goal.amount - savedAmount;
        }
        if (savedAmount + amount < 0) {
            return res.status(400).json({ error: 'Not enough funds to complete operation' });
        }
        const newTransaction = new GoalTransaction({
            userId: targetUserId,
            goalId,
            amount
        });
        await newTransaction.save();
        await Goal.findByIdAndUpdate(goalId, {
            $push: { goalTransactions: newTransaction._id }
        });
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllGoalTransactions = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = req.user.role === 'ADMIN' && req.query.userId ? req.query.userId : callerId;
        const transactions = await GoalTransaction.find({ userId: targetUserId });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCurrentGoalTransactions = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = req.user.role === 'ADMIN' && req.query.userId ? req.query.userId : callerId;
        const goal = await Goal.findOne({ userId: targetUserId, achieved: false });
        if (!goal) {
            return res.status(400).json({ error: 'No goal exists' });
        }
        const transactions = await GoalTransaction.find({ userId: targetUserId, goalId: goal._id });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
