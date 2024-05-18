const express = require('express');
const { registerUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser, authMiddleware);

module.exports = router;
