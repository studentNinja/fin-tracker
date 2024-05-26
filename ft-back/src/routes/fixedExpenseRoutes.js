const express = require('express');
const fixedExpenseController = require('../controllers/fixedExpenseController');
const authMiddleware = require('../middleware/authMiddleware');

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
 * /api/fixedexpenses:
 *   get:
 *     summary: Get all fixed expenses
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of fixed expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedExpense'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, fixedExpenseController.getFixedExpenses);

/**
 * @swagger
 * /api/fixedexpenses:
 *   put:
 *     summary: Update a fixed expense
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
 *       200:
 *         description: Fixed expense updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/', authMiddleware, fixedExpenseController.updateFixedExpense);

/**
 * @swagger
 * /api/fixedexpenses:
 *   delete:
 *     summary: Delete a fixed expense
 *     tags: [FixedExpenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             example:
 *               id: 5f8d0d55b54764421b7156c3
 *     responses:
 *       200:
 *         description: Fixed expense deleted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', authMiddleware, fixedExpenseController.deleteFixedExpense);

module.exports = router;
