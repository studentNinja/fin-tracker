const express = require('express');
const adminController = require('../controllers/adminController');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware, authorize('ADMIN'));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations
 */

// Create admin user
/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Create a new admin user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username,email,password,capital]
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               capital: { type: number }
 *               saving_goal: { type: number }
 *     responses:
 *       201:
 *         description: Admin created
 */
router.post('/register', adminController.createAdmin);

// Delete user by ID
/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;