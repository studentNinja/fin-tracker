const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { username, email, password, capital, saving_goal } = req.body;
        if (!username || !email || !password || capital === undefined) {
            return res.status(400).send({ error: 'Username, email, password, and capital are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already in use' });
        }

        const newUser = new User({ username, email, password, capital, saving_goal });
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

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(200).send({ message: 'Login successful', accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).send({ error: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken(user._id);

        res.status(200).send({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(401).send({ error: 'Invalid or expired refresh token' });
    }
};
