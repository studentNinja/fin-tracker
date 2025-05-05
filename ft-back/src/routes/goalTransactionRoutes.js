const express = require('express');
const goalTransactionController = require('../controllers/goalTransactionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GoalTransactions
 *   description: API for managing goal transactions
 */

/**
 * @swagger
 * /api/goal-transactions:
 *   post:
 *     summary: Create a new goal transaction
 *     tags: [GoalTransactions]
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
 *         description: Goal transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoalTransaction'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', authMiddleware, goalTransactionController.createGoalTransaction);

/**
 * @swagger
 * /api/goal-transactions:
 *   get:
 *     summary: Get all goal transactions for the authenticated user
 *     tags: [GoalTransactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goal transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoalTransaction'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/', authMiddleware, goalTransactionController.getAllGoalTransactions);

/**
 * @swagger
 * /api/goal-transactions/goal:
 *   get:
 *     summary: Get all transactions for a specific goal
 *     tags: [GoalTransactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: goalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the goal
 *     responses:
 *       200:
 *         description: List of transactions for the specified goal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoalTransaction'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/goal', authMiddleware, goalTransactionController.getCurrentGoalTransactions);

module.exports = router;
