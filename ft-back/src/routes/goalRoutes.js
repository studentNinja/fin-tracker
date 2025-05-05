const express = require('express');
const goalController = require('../controllers/goalController');
const { authMiddleware } = require('../middleware/authMiddleware');

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
 *   get:
 *     summary: Get all goals for the authenticated user
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, goalController.getGoals);

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
 * /api/goals/{goalId}:
 *   get:
 *     summary: Get goal by ID
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the goal
 *     responses:
 *       200:
 *         description: Goal retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:goalId', authMiddleware, goalController.getGoalById);

/**
 * @swagger
 * /api/goals/{goalId}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:goalId', authMiddleware, goalController.updateGoal);

/**
 * @swagger
 * /api/goals/{goalId}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the goal
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:goalId', authMiddleware, goalController.deleteGoal);

module.exports = router;
