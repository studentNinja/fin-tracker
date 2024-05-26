const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user_id).select('-password');
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
        const user = await User.findById(req.user_id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await Transaction.deleteMany({ user_id: req.user_id });
        await FixedExpense.deleteMany({ user_id: req.user_id });
        await Goal.deleteMany({ user_id: req.user_id });

        await User.findByIdAndDelete(req.user_id);
        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};
