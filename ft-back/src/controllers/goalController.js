const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
    try {
        const { amount, name } = req.body;

        if (!amount || !name) {
            return res.status(400).send({ error: 'Amount and name are required' });
        }

        const newGoal = new Goal({ user: req.userId, amount, name });
        await newGoal.save();
        res.status(201).send(newGoal);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.userId });
        res.status(200).send(goals);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goal_id, amount, name, achieved, achievedDate } = req.body;

        if (!goal_id) {
            return res.status(400).send({ error: 'Goal ID is required' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            goal_id,
            { amount, name, achieved, achievedDate },
            { new: true }
        );

        if (!updatedGoal) {
            return res.status(404).send({ error: 'Goal not found' });
        }

        res.status(200).send(updatedGoal);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { goal_id } = req.body;

        if (!goal_id) {
            return res.status(400).send({ error: 'Goal ID is required' });
        }

        const deletedGoal = await Goal.findByIdAndDelete(goal_id);

        if (!deletedGoal) {
            return res.status(404).send({ error: 'Goal not found' });
        }

        res.status(200).send({ message: 'Goal deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};
