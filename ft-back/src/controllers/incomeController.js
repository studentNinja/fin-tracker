const Income = require('../models/Income');
const User = require('../models/User');


exports.createIncome = async (req, res) => {
    try {
        const { source, amount } = req.body;

        if (!source || !amount) {
            return res.status(400).json({ error: 'Source and amount are required' });
        }

        const newIncome = new Income({ userId: req.userId, source, amount });
        await newIncome.save();
        await User.findByIdAndUpdate(req.userId, { $push: { incomes: newIncome._id } });

        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.userId });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { _id, source, amount } = req.body;

        if (!_id || !source || !amount) {
            return res.status(400).json({ error: 'ID, source, and amount are required' });
        }

        const updatedIncome = await Income.findByIdAndUpdate(_id, { source, amount }, { new: true });
        if (!updatedIncome) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.status(200).json(updatedIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const deletedIncome = await Income.findByIdAndDelete(_id);
        if (!deletedIncome) {
            return res.status(404).json({ error: 'Income not found' });
        }
        await User.findByIdAndUpdate(req.userId, { $pull: { incomes: _id } });

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
