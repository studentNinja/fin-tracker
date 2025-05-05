const express = require('express');
const fixedExpenseController = require('../controllers/fixedExpenseController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FixedExpenses
 *   description: API for managing fixed expenses
 */

/**
 * @swagger
 * /api/fixedexpenses:
 *   get:
 *     summary: Get all fixed expenses for the authenticated user
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fixed expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedExpense'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, fixedExpenseController.getFixedExpenses);

/**
 * @swagger
 * /api/fixedexpenses:
 *   post:
 *     summary: Create a new fixed expense
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FixedExpense'
 *     responses:
 *       201:
 *         description: Fixed expense created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, fixedExpenseController.createFixedExpense);

/**
 * @swagger
 * /api/fixedexpenses/{fixedExpenseId}:
 *   get:
 *     summary: Get fixed expense by ID
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fixedExpenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the fixed expense
 *     responses:
 *       200:
 *         description: Fixed expense retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedExpense'
 *       404:
 *         description: Fixed expense not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:fixedExpenseId', authMiddleware, fixedExpenseController.getFixedExpenseById);

/**
 * @swagger
 * /api/fixedexpenses/{fixedExpenseId}:
 *   put:
 *     summary: Update a fixed expense
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fixedExpenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the fixed expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FixedExpense'
 *     responses:
 *       200:
 *         description: Fixed expense updated successfully
 *       404:
 *         description: Fixed expense not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:fixedExpenseId', authMiddleware, fixedExpenseController.updateFixedExpense);

/**
 * @swagger
 * /api/fixedexpenses/{fixedExpenseId}:
 *   delete:
 *     summary: Delete a fixed expense
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fixedExpenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the fixed expense
 *     responses:
 *       200:
 *         description: Fixed expense deleted successfully
 *       404:
 *         description: Fixed expense not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:fixedExpenseId', authMiddleware, fixedExpenseController.deleteFixedExpense);

module.exports = router;
