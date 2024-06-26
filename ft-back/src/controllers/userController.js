
const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const FixedExpense = require('../models/FixedExpense');
const Goal = require('../models/Goal');
const Income = require('../models/Income');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select('-password')
            .populate('transactions')
            .populate('fixed_expenses')
            .populate('goals')
            .populate('incomes'); 
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({
            userId: user._id,
            ...user.toObject()
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(200).send({ error: 'Current and new passwords are required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(200).send({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(200).send({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await Transaction.deleteMany({ userId: req.userId });
        await FixedExpense.deleteMany({ userId: req.userId });
        await Goal.deleteMany({ userId: req.userId });
        await Income.deleteMany({ userId: req.userId });

        await User.findByIdAndDelete(req.userId);

        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error("Delete account error:", err);
        res.status(500).send({ error: 'Server error' });
    }
};

