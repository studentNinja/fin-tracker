const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);
router.delete('/delete', authMiddleware, userController.deleteAccount);

module.exports = router;
