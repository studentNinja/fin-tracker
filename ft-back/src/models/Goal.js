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
 *         - name
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         name:
 *           type: string
 *           description: The name of the goal
 *         amount:
 *           type: number
 *           description: The goal amount to be saved
 *           default: 100000
 *         achieved:
 *           type: boolean
 *           description: Whether the goal has been achieved
 *           default: false
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the goal
 *         achievedDate:
 *           type: string
 *           format: date-time
 *           description: The date when the goal was achieved
 *       example:
 *         userId: "665356241716d857dd03b372"
 *         name: "Buy a house"
 *         amount: 200000
 *         achieved: false
 *         startDate: "2024-05-26T15:32:52.735Z"
 *         achievedDate: null
 */

const goalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 100000 },
    achieved: { type: Boolean, default: false },
    goalTransactions:{type:Schema.Types.ObjectId, ref: 'GoalTransaction' },
    startDate: { type: Date, default: Date.now },
    achievedDate: { type: Date}
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
