const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
    try {
        const { amount } = req.body;
        const newGoal = new Goal({ user: req.userId, amount });
        await newGoal.save();
        res.status(201).send(newGoal);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.userId });
        res.status(200).send(goals);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goalId, amount } = req.body;
        const updatedGoal = await Goal.findByIdAndUpdate(
            goalId,
            { amount },
            { new: true }
        );
        res.status(200).send(updatedGoal);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { goalId } = req.body;
        await Goal.findByIdAndDelete(goalId);
        res.status(200).send({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};
