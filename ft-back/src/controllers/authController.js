const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { username, email, password, initial_capital, saving_goal } = req.body;

       
        if (!username || !email || !password || initial_capital === undefined) {
            return res.status(400).send({ error: 'Username, email, password, and initial capital are required' });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already in use' });
        }

        const newUser = new User({ username, email, password, initial_capital, saving_goal });
        await newUser.save();

        res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};
