const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       required:
 *         - user
 *         - amount
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user
 *         amount:
 *           type: number
 *           description: The goal amount to be saved
 *         savedAmount:
 *           type: number
 *           description: The amount saved so far
 *         achieved:
 *           type: boolean
 *           description: Whether the goal has been achieved
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the goal
 *         achievedDate:
 *           type: string
 *           format: date-time
 *           description: The date when the goal was achieved
 */

const goalSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, default: 100000 },
    savedAmount: { type: Number, default: 0 },
    achieved: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    achievedDate: { type: Date }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
