const FixedExpense = require('../models/FixedExpense');

exports.createFixedExpense = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const newFixedExpense = new FixedExpense({ user: req.userId, name, amount });
        await newFixedExpense.save();
        res.status(201).send(newFixedExpense);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        const fixedExpenses = await FixedExpense.find({ user: req.userId });
        res.status(200).send(fixedExpenses);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateFixedExpense = async (req, res) => {
    try {
        const { expenseId, name, amount } = req.body;
        const updatedFixedExpense = await FixedExpense.findByIdAndUpdate(
            expenseId,
            { name, amount },
            { new: true }
        );
        res.status(200).send(updatedFixedExpense);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteFixedExpense = async (req, res) => {
    try {
        const { expenseId } = req.body;
        await FixedExpense.findByIdAndDelete(expenseId);
        res.status(200).send({ message: 'Fixed expense deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};