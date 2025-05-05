const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const crypto = require('crypto');
const User = require('../models/User');
const Goal = require("../models/Goal");
const Income = require("../models/Income");
const transporter = require('../utils/emails');

exports.register = async (req, res) => {
  try {
    const { username, email, password, capital, saving_goal } = req.body;
    if (!username || !email || !password || capital === undefined) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    if (await User.exists({ username })) {
      return res.status(400).send({ error: 'Username already in use' });
    }
    if (await User.exists({ email })) {
      return res.status(400).send({ error: 'Email already in use' });
    }

    const newUser = new User({ username, email, password, capital, saving_goal, role: 'USER' });
    newUser.emailVerificationToken = crypto.randomBytes(32).toString('hex');
    newUser.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    const verifyUrl = `${process.env.APP_BASE_URL}/api/auth/confirm-email?token=${newUser.emailVerificationToken}`;
    console.log('⏳ Verification link:', verifyUrl);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: newUser.email,
      subject: 'Please verify your email',
      html: `<p>Welcome aboard! Click <a href="${verifyUrl}">here</a> to verify your address.</p>`
    });

    await newUser.save();

    const goal = await new Goal({ userId: newUser._id, name: "Ціль", amount: saving_goal }).save();
    const income = await new Income({ userId: newUser._id, source: "Дохід", amount: capital }).save();

    newUser.goals.push(goal._id);
    newUser.incomes.push(income._id);
    await newUser.save();

    return res.status(201).send({ message: 'Registration successful! Check your email to verify.' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).send({ error: 'Server error or failed to send verification email' });
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
    if (!user.emailVerified) {
      return res.status(401).send({ error: 'Please verify your email first' });
    }
    // if (!user.hasPaid) {
    //   res.cookie('pendingUserId', user._id.toString(), {
    //     httpOnly: false,
    //     secure: true,
    //     sameSite: 'None',
    //     maxAge: 24 * 60 * 60 * 1000,
    //     path: '/'
    //   });
    //   return res.status(403).send({ error: 'Payment required', userId: user._id });
    // }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    return res.status(200).send({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error' });
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

    const accessToken = generateAccessToken(user._id, user.role);
    return res.status(200).send({ accessToken });
  } catch (err) {
    return res.status(401).send({ error: 'Invalid or expired refresh token' });
  }
};

exports.confirmEmail = async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });
  if (!user) {
    return res.status(400).send({ error: 'Invalid or expired token' });
  }
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();
  return res.send({ message: 'Email verified. You can now log in.' });
};