const express = require('express');
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: API for managing goals
 */

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, goalController.createGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, goalController.getGoals);

/**
 * @swagger
 * /api/goals:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/', authMiddleware, goalController.updateGoal);

/**
 * @swagger
 * /api/goals:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
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
 *         description: Goal deleted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', authMiddleware, goalController.deleteGoal);

module.exports = router;
