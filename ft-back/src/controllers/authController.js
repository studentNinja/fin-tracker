const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { username, email, password, initialCapital, savingGoal } = req.body;
        const newUser = new User({ username, email, password, initialCapital, savingGoal });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send(err);
    }
};
