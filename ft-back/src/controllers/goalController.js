const Goal = require('../models/Goal');
const User = require('../models/User');

exports.createGoal = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId =
            req.user.role === 'ADMIN' && req.query.userId
                ? req.query.userId
                : callerId;

        const { name, amount } = req.body;
        const goal = new Goal({ userId: targetUserId, name, amount });
        await goal.save();
        await User.findByIdAndUpdate(targetUserId, { $push: { goals: goal._id } });
        res.status(201).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId =
            req.user.role === 'ADMIN' && req.query.userId
                ? req.query.userId
                : callerId;

        const goals = await Goal.find({ userId: targetUserId });
        res.status(200).json(goals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });

        if (req.user.role !== 'ADMIN' && goal.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        res.status(200).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });

        if (req.user.role !== 'ADMIN' && goal.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { name, amount, achieved } = req.body;
        goal.name = name;
        goal.amount = amount;
        goal.achieved = achieved;
        await goal.save();
        res.status(200).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });

        if (req.user.role !== 'ADMIN' && goal.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await Goal.findByIdAndDelete(goalId);
        await User.findByIdAndUpdate(req.user.id, { $pull: { goals: goalId } });
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
