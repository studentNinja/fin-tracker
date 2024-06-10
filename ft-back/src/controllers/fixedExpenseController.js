const FixedExpense = require('../models/FixedExpense');
const User = require('../models/User');


exports.createFixedExpense = async (req, res) => {
    try {
        const { name, category, amount } = req.body;

        if (!name || !category || !amount) {
            return res.status(400).send({ error: 'Name, category, and amount are required' });
        }

        if (!validCategories.includes(category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        const newFixedExpense = new FixedExpense({ userId: req.userId, name, category, amount });
        await newFixedExpense.save();
        await User.findByIdAndUpdate(req.userId, { $push: { fixed_expenses: newFixedExpense._id } });
        res.status(201).json(newFixedExpense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        const fixedExpenses = await FixedExpense.find({ userId: req.userId });
        res.status(200).json(fixedExpenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getFixedExpenseById = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const fixedExpense = await FixedExpense.findById(fixedExpenseId);
        if (!fixedExpense) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        res.status(200).json(fixedExpense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateFixedExpense = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const { name, category, amount } = req.body;
        const updatedFixedExpense = await FixedExpense.findByIdAndUpdate(fixedExpenseId, { name, category, amount }, { new: true });
        if (!updatedFixedExpense) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        res.status(200).json(updatedFixedExpense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteFixedExpense = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const deletedFixedExpense = await FixedExpense.findByIdAndDelete(fixedExpenseId);
        if (!deletedFixedExpense) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        await User.findByIdAndUpdate(req.userId, { $pull: { fixed_expenses: fixedExpenseId } });
        res.status(200).json({ message: 'Fixed expense deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
