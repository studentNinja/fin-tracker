const FixedExpense = require('../models/FixedExpense');
const User = require('../models/User');

exports.createFixedExpense = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId =
            req.user.role === 'ADMIN' && req.query.userId
                ? req.query.userId
                : callerId;

        const { name, category, amount } = req.body;
        const newFixedExpense = new FixedExpense({
            userId: targetUserId,
            name,
            category,
            amount
        });
        await newFixedExpense.save();
        await User.findByIdAndUpdate(targetUserId, {
            $push: { fixed_expenses: newFixedExpense._id }
        });
        res.status(201).json(newFixedExpense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId =
            req.user.role === 'ADMIN' && req.query.userId
                ? req.query.userId
                : callerId;

        const fixedExpenses = await FixedExpense.find({ userId: targetUserId });
        res.status(200).json(fixedExpenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getFixedExpenseById = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const fx = await FixedExpense.findById(fixedExpenseId);
        if (!fx) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        if (req.user.role !== 'ADMIN' && fx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        res.status(200).json(fx);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateFixedExpense = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const fx = await FixedExpense.findById(fixedExpenseId);
        if (!fx) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        if (req.user.role !== 'ADMIN' && fx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { name, category, amount } = req.body;
        fx.name = name;
        fx.category = category;
        fx.amount = amount;
        await fx.save();
        res.status(200).json(fx);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteFixedExpense = async (req, res) => {
    try {
        const { fixedExpenseId } = req.params;
        const fx = await FixedExpense.findById(fixedExpenseId);
        if (!fx) {
            return res.status(404).json({ error: 'Fixed expense not found' });
        }
        if (req.user.role !== 'ADMIN' && fx.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await FixedExpense.findByIdAndDelete(fixedExpenseId);
        await User.findByIdAndUpdate(fx.userId, {
            $pull: { fixed_expenses: fixedExpenseId }
        });
        res.status(200).json({ message: 'Fixed expense deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
