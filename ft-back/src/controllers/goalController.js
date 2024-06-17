const Goal = require('../models/Goal');
const User = require('../models/User');


exports.createGoal = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const newGoal = new Goal({ userId: req.userId, name, amount });
        await newGoal.save();
        await User.findByIdAndUpdate(req.userId, { $push: { goals: newGoal._id } });

        res.status(201).json(newGoal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.userId });
        res.status(200).json(goals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(200).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const { name, amount, achieved } = req.body;
        const updatedGoal = await Goal.findByIdAndUpdate(goalId, { name, amount, achieved }, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(200).json(updatedGoal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const deletedGoal = await Goal.findByIdAndDelete(goalId);
        if (!deletedGoal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        await User.findByIdAndUpdate(req.userId, { $pull: { goals: goalId } });
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
