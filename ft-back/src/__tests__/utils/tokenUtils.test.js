const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenUtils');

describe('Token Generation', () => {
    const mockUserId = '12345';

    test('generateAccessToken should generate a valid access token', () => {

        const token = generateAccessToken(mockUserId);
        const decoded = jwt.verify(token, config.JWT_SECRET);
        expect(mockUserId).toBe(decoded.userId);
    });

    test('generateRefreshToken should generate a valid refresh token', () => {
        const token = generateRefreshToken(mockUserId);
        const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
        expect(mockUserId).toBe(decoded.userId);
    });
});