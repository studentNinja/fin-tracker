const express = require('express');
const transactionController = require('../controllers/goalTransactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: GoalTransactions
 *   description: API for managing goal transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new goal transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoalTransaction'
 *     responses:
 *       201:
 *         description: GoalTransaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoalTransaction'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, transactionController.createGoalTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all goal transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goal Transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', authMiddleware, transactionController.getAllGoalTransactions);




router.get('/goal', authMiddleware, transactionController.getCurrentGoalTransactions);

module.exports = router;