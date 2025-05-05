const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get your own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Your profile returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get(
    '/profile',
    authMiddleware,
    authorize('USER', 'ADMIN'),
    userController.getProfile
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get any user’s profile (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.get(
    '/:id',
    authMiddleware,
    authorize('ADMIN'),
    userController.getProfile
);

/**
 * @swagger
 * /api/users/update-password:
 *   put:
 *     summary: Update your password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword,newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       403:
 *         description: Forbidden
 */
router.put(
    '/update-password',
    authMiddleware,
    authorize('USER', 'ADMIN'),
    userController.updatePassword
);

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete account (self or admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: User ID (admin only)
 *     responses:
 *       200:
 *         description: Account deleted
 *       403:
 *         description: Forbidden
 */
router.delete(
    '/delete',
    authMiddleware,
    authorize('USER', 'ADMIN'),
    userController.deleteAccount
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.get(
    '/',
    authMiddleware,
    authorize('ADMIN'),
    userController.listUsers
);

module.exports = router;
