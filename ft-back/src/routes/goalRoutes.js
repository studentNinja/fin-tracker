const express = require('express');
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, goalController.createGoal);
router.get('/', authMiddleware, goalController.getGoals);
router.put('/', authMiddleware, goalController.updateGoal);
router.delete('/', authMiddleware, goalController.deleteGoal);

module.exports = router;