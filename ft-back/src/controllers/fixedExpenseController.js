const FixedExpense = require('../models/FixedExpense');
const validCategories = require('../config/expenseCategories'); // Ensure this is correctly imported

exports.createFixedExpense = async (req, res) => {
    try {
        const { name, category, amount } = req.body;

        if (!name || !category || !amount) {
            return res.status(400).send({ error: 'Name, category, and amount are required' });
        }

        if (!validCategories.includes(category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        const newFixedExpense = new FixedExpense({ user: req.userId, name, category, amount });
        await newFixedExpense.save();
        res.status(201).send(newFixedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        const fixedExpenses = await FixedExpense.find({ user: req.userId });
        res.status(200).send(fixedExpenses);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updateFixedExpense = async (req, res) => {
    try {
        const { _id, name, category, amount } = req.body;

        if (!_id) {
            return res.status(400).send({ error: 'Expense ID is required' });
        }

        if (category && !validCategories.includes(category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        const updatedFixedExpense = await FixedExpense.findByIdAndUpdate(
            _id,
            { name, category, amount },
            { new: true }
        );

        if (!updatedFixedExpense) {
            return res.status(404).send({ error: 'Fixed expense not found' });
        }

        res.status(200).send(updatedFixedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteFixedExpense = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send({ error: 'Expense ID is required' });
        }

        const deletedFixedExpense = await FixedExpense.findByIdAndDelete(_id);

        if (!deletedFixedExpense) {
            return res.status(404).send({ error: 'Fixed expense not found' });
        }

        res.status(200).send({ message: 'Fixed expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};
