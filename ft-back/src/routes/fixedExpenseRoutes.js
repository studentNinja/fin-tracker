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
 *             type: object
 *             required:
 *               - expense_id
 *               - name
 *               - category
 *               - amount
 *             properties:
 *               expense_id:
 *                 type: string
 *                 description: The unique ID of the fixed expense
 *               name:
 *                 type: string
 *                 description: The name of the fixed expense
 *               category:
 *                 type: string
 *                 description: The category of the fixed expense
 *               amount:
 *                 type: number
 *                 description: The amount of the fixed expense
 *             example:
 *               expense_id: "665356241716d857dd03b374"
 *               name: "Internet Bill"
 *               category: "Utilities"
 *               amount: 50
 *     responses:
 *       201:
 *         description: Fixed expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedExpense'
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
 *             type: object
 *             required:
 *               - expenseId
 *               - name
 *               - category
 *               - amount
 *             properties:
 *               expenseId:
 *                 type: string
 *                 description: The ID of the fixed expense to update
 *               name:
 *                 type: string
 *                 description: The name of the fixed expense
 *               category:
 *                 type: string
 *                 description: The category of the fixed expense
 *               amount:
 *                 type: number
 *                 description: The amount of the fixed expense
 *             example:
 *               expenseId: "665356241716d857dd03b374"
 *               name: "Internet Bill"
 *               category: "Utilities"
 *               amount: 60
 *     responses:
 *       200:
 *         description: Fixed expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedExpense'
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
 *             required:
 *               - expense_id
 *             properties:
 *               expense_id:
 *                 type: string
 *                 description: The ID of the fixed expense to delete
 *             example:
 *               expenseId: "665356241716d857dd03b374"
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
