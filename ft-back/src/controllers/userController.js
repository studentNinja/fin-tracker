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


exports.deleteAccount = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(req.userId);
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
        res.status(500).send({ error: 'Server error' });
    }
};
