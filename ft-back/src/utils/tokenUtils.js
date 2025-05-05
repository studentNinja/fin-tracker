const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateAccessToken(userId, role) {
    return jwt.sign(
        { userId, role },
        config.JWT_SECRET,
        { expiresIn: '15m' }
    );
}

function generateRefreshToken(userId, role) {
    return jwt.sign(
        { userId, role },
        config.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}

module.exports = { generateAccessToken, generateRefreshToken };
