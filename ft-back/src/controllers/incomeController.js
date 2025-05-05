const Income = require('../models/Income');
const User = require('../models/User');

exports.createIncome = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = req.user.role === 'ADMIN' && req.query.userId ? req.query.userId : callerId;
        const { source, amount } = req.body;
        const newIncome = new Income({ userId: targetUserId, source, amount });
        await newIncome.save();
        await User.findByIdAndUpdate(targetUserId, { $push: { incomes: newIncome._id } });
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const callerId = req.user.id;
        const targetUserId = req.user.role === 'ADMIN' && req.query.userId ? req.query.userId : callerId;
        const incomes = await Income.find({ userId: targetUserId });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getIncomeById = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const inc = await Income.findById(incomeId);
        if (!inc) return res.status(404).json({ error: 'Income not found' });
        if (req.user.role !== 'ADMIN' && inc.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        res.status(200).json(inc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const inc = await Income.findById(incomeId);
        if (!inc) return res.status(404).json({ error: 'Income not found' });
        if (req.user.role !== 'ADMIN' && inc.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { source, amount } = req.body;
        inc.source = source;
        inc.amount = amount;
        await inc.save();
        res.status(200).json(inc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const inc = await Income.findById(incomeId);
        if (!inc) return res.status(404).json({ error: 'Income not found' });
        if (req.user.role !== 'ADMIN' && inc.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        await Income.findByIdAndDelete(incomeId);
        await User.findByIdAndUpdate(inc.userId, { $pull: { incomes: incomeId } });
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
