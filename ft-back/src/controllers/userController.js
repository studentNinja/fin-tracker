const User = require('../models/User');
const Transaction = require('../models/Transaction');
const FixedExpense = require('../models/FixedExpense');
const Goal = require('../models/Goal');
const Income = require('../models/Income');

exports.getProfile = async (req, res) => {
    try {
        const targetId = req.params.id || req.user.id;
        const user = await User.findById(targetId)
            .select('-password')
            .populate('transactions')
            .populate('fixed_expenses')
            .populate('goals')
            .populate('incomes');
        if (!user) return res.status(404).send({ error: 'User not found' });
        res.send({ user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).send({ error: 'Current and new passwords are required' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(403).send({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const targetId = (req.user.role === 'ADMIN' && req.params.id)
            ? req.params.id
            : req.user.id;

        const user = await User.findById(targetId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await Transaction.deleteMany({ userId: targetId });
        await FixedExpense.deleteMany({ userId: targetId });
        await Goal.deleteMany({ userId: targetId });
        await Income.deleteMany({ userId: targetId });
        await User.findByIdAndDelete(targetId);

        return res.status(200).send({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error('Delete account error:', err);
        return res.status(500).send({ error: 'Server error' });
    }
};

exports.listUsers = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).send({ error: 'Forbidden: admins only' });
        }
        const users = await User.find().select('-password');
        return res.status(200).send({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
};

