const FixedExpense = require('../models/FixedExpense');

exports.createFixedExpense = async (req, res) => {
    try {
        const { expense_id, name, category, amount } = req.body;
        const newFixedExpense = new FixedExpense({ user: req.user_id, expense_id, name, category, amount });
        await newFixedExpense.save();
        res.status(201).send(newFixedExpense);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        const fixedExpenses = await FixedExpense.find({ user: req.user_id });
        res.status(200).send(fixedExpenses);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateFixedExpense = async (req, res) => {
    try {
        const { expense_id, name, category, amount } = req.body;
        const updatedFixedExpense = await FixedExpense.findByIdAndUpdate(
            expense_id,
            { name, category, amount },
            { new: true }
        );
        res.status(200).send(updatedFixedExpense);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteFixedExpense = async (req, res) => {
    try {
        const { expense_id } = req.body;
        await FixedExpense.findByIdAndDelete(expense_id);
        res.status(200).send({ message: 'Fixed expense deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};
