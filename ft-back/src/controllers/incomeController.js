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

exports.getIncomeById = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const income = await Income.findById(incomeId);
        if (!income) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const { source, amount } = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(incomeId, { source, amount }, { new: true });
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
        const { incomeId } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(incomeId);
        if (!deletedIncome) {
            return res.status(404).json({ error: 'Income not found' });
        }
        await User.findByIdAndUpdate(req.userId, { $pull: { incomes: incomeId} });
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
