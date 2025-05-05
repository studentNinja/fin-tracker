const express = require('express');
const incomeController = require('../controllers/incomeController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Incomes
 *   description: API for managing incomes
 */

/**
 * @swagger
 * /api/incomes:
 *   get:
 *     summary: Get all incomes for the authenticated user
 *     tags: [Incomes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Incomes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, incomeController.getIncomes);

/**
 * @swagger
 * /api/incomes:
 *   post:
 *     summary: Create a new income
 *     tags: [Incomes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Income'
 *     responses:
 *       201:
 *         description: Income created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, incomeController.createIncome);

/**
 * @swagger
 * /api/incomes/{incomeId}:
 *   get:
 *     summary: Get income by ID
 *     tags: [Incomes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the income
 *     responses:
 *       200:
 *         description: Income retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:incomeId', authMiddleware, incomeController.getIncomeById);

/**
 * @swagger
 * /api/incomes/{incomeId}:
 *   put:
 *     summary: Update an income
 *     tags: [Incomes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the income
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Income'
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:incomeId', authMiddleware, incomeController.updateIncome);

/**
 * @swagger
 * /api/incomes/{incomeId}:
 *   delete:
 *     summary: Delete an income
 *     tags: [Incomes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the income
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:incomeId', authMiddleware, incomeController.deleteIncome);

module.exports = router;
