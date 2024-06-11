const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
            ...user.toObject(),
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteAccount = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(req.userId).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({ error: 'User not found' });
        }

        await Transaction.deleteMany({ userId: req.userId }).session(session);
        await FixedExpense.deleteMany({ userId: req.userId }).session(session);
        await Goal.deleteMany({ userId: req.userId }).session(session);
        await Income.deleteMany({ userId: req.userId }).session(session);

        await User.findByIdAndDelete(req.userId).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
