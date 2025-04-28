const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const Goal = require("../models/Goal");
const Income = require("../models/Income");
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');


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

    const newUser = new User({
      username,
      email,
      password,
      capital,
      saving_goal,
      hasPaid: false
    });

    let user = await newUser.save();

    const newGoal = new Goal({ userId: user._id, name: "Ціль", amount: saving_goal });
    await newGoal.save();

    const newIncome = new Income({ userId: user._id, source: "Дохід", amount: capital });
    await newIncome.save();

    user.goals.push(newGoal._id);
    user.incomes.push(newIncome._id);
    await user.save();

    res.status(200).send({
      message: 'User registered successfully but payment is required. Please log in.',
      user: newUser
    });

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
    if (!user.hasPaid) {
      // Set a cookie with the user ID before sending the 403 response
      res.cookie('pendingUserId', user._id.toString(), {
        httpOnly: false,
        secure: true,  // Required for cross-origin cookies
        sameSite: 'None',  // Allows cross-site usage
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });
      return res.status(403).send({ error: 'Payment required to access the app', userId: user._id });
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
    res.status(401).send({ error: 'Invalid or expired refresh token' });
  }
};
