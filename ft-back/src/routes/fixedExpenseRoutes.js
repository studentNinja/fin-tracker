const express = require('express');
const fixedExpenseController = require('../controllers/fixedExpenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, fixedExpenseController.createFixedExpense);
router.get('/', authMiddleware, fixedExpenseController.getFixedExpenses);
router.put('/', authMiddleware, fixedExpenseController.updateFixedExpense);
router.delete('/', authMiddleware, fixedExpenseController.deleteFixedExpense);

module.exports = router;