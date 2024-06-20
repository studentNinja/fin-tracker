const GoalTransaction = require('../models/GoalTransaction');
const Goal = require('../models/Goal');

exports.createGoalTransaction = async (req, res) => {
    try {
        let { amount } = req.body;
        if (!amount) {
            return res.status(400).send({ error: 'Amount is required' });
        }

        const goal = await Goal.findOne({ achieved: false, userId: req.userId });
        if (!goal) {
            return res.status(400).json({ error: 'No goal exists' });
        }

        const goalId = goal._id;
        const goalTransactionsArray = await GoalTransaction.find({ goalId });
        const savedAmount = goalTransactionsArray.reduce((res, curr) => res + curr.amount, 0);

        if (savedAmount + amount >= goal.amount) {
            await Goal.findByIdAndUpdate(goalId, { achieved: true });
            amount = goal.amount - savedAmount;
        }

        if (savedAmount + amount < 0) {
            return res.status(400).json({ error: 'Not enough funds to complete operation' });
        }

        const newGoalTransaction = new GoalTransaction({
            userId: req.userId,
            goalId,
            amount
        });

        await newGoalTransaction.save();
        await Goal.findByIdAndUpdate(goalId, { $push: { goalTransactions: newGoalTransaction._id } });

        res.status(201).json(newGoalTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllGoalTransactions = async (req, res) => {
    try {
        const goalTransactions = await GoalTransaction.find({ userId: req.userId });
        res.status(200).json(goalTransactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCurrentGoalTransactions = async (req, res) => {
    try {
        const goal = await Goal.findOne({ userId: req.userId, achieved: false });
        if (!goal) {
            return res.status(400).json({ error: 'No goal exists' });
        }

        const goalTransactions = await GoalTransaction.find({ userId: req.userId, goalId: goal._id });
        res.status(200).json(goalTransactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
