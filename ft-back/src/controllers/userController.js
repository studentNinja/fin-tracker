const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select('-password')
            .populate('transactions')
            .populate('fixed_expenses')
            .populate('goals')
            .populate('incomes')
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
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

        await Transaction.deleteMany({ user_id: req.userId }).session(session);
        await FixedExpense.deleteMany({ user_id: req.userId }).session(session);
        await Goal.deleteMany({ user_id: req.userId }).session(session);
        await Income.deleteMany({user_id: req.userId }).session(session);

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
