const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await Transaction.deleteMany({ user_id: req.userId });
        await FixedExpense.deleteMany({ user_id: req.userId });
        await Goal.deleteMany({ user: req.userId });

        await User.findByIdAndDelete(req.userId);
        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};
