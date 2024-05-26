const Goal = require('../models/Goal');
const User = require('../models/User');

exports.createGoal = async (req, res) => {
    try {
        const { amount, name } = req.body;

        if (!amount || !name) {
            return res.status(400).send({ error: 'Amount and name are required' });
        }

        const newGoal = new Goal({ user_id: req.userId, amount, name });
        await newGoal.save();
        await User.findByIdAndUpdate(req.userId, { $push: { goals: newGoal._id } });
        res.status(201).send(newGoal);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user_id: req.userId });
        res.status(200).send(goals);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { _id, amount, name, achieved, achievedDate } = req.body;

        if (!_id) {
            return res.status(400).send({ error: 'Goal ID is required' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            _id,
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
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send({ error: 'Goal ID is required' });
        }

        const deletedGoal = await Goal.findByIdAndDelete(_id);

        if (!deletedGoal) {
            return res.status(404).send({ error: 'Goal not found' });
        }

        res.status(200).send({ message: 'Goal deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};
