const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '30m' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, { expiresIn: '4d' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
