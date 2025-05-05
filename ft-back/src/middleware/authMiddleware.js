const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Authorization header missing or malformed' });
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const { userId, role } = jwt.verify(token, config.JWT_SECRET);
        req.user = { id: userId, role };
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid or expired token' });
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'Not authenticated' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Forbidden: insufficient rights' });
        }
        next();
    };
}

module.exports = { authMiddleware, authorize };
