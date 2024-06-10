const Income = require('../models/Income');

exports.createIncome = async (req, res) => {
    try {
        const { source, amount } = req.body;
        const newIncome = new Income({ user: req.userId, source, amount });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.userId });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { source, amount } = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(id, { source, amount }, { new: true });
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
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
