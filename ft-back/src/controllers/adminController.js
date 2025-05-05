const User = require('../models/User');

exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password, capital, saving_goal } = req.body;
        if (!username || !email || !password || capital === undefined) {
            return res.status(400).send({ error: 'All fields are required' });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).send({ error: 'Email already in use' });
        }
        const admin = new User({
            username,
            email,
            password,
            capital,
            saving_goal,
            role: 'ADMIN'
        });
        await admin.save();
        return res.status(201).send({
            message: 'Admin user created',
            admin: { id: admin._id, email: admin.email }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        await User.findByIdAndDelete(id);
        return res.status(200).send({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
};