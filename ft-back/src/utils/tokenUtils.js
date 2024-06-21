const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '30s' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, { expiresIn: '30s' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
