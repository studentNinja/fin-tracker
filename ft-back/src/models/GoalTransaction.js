const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     GoalTransaction:
 *       type: object
 *       required:
 *         - userId
 *         - goalId
 *         - amount
 *         - category
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         goalId:
 *           type: string
 *           description: the Id of the goal
 *         amount:
 *           type: number
 *           description: The amount of the transaction, if negative then the funds are withdrawn
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction
 *         category:
 *           type: string
 *           description: The category of the transaction
 *           enum:
 *             - goal
 *       example:
 *         userId: "665356241716d857dd03b372"
 *         goalId: "778696241758g457dd03c957"
 *         amount: 1000
 *         date: "2024-06-10T20:46:21.433Z"
 *         category: "goal"
 */

const goalTransactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, enum: ['goal'], default: 'goal', required: true }
}, { timestamps: true });

const GoalTransaction = mongoose.model('GoalTransaction', goalTransactionSchema);
module.exports = GoalTransaction;
