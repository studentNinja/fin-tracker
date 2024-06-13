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
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         amount:
 *           type: number
 *           description: The amount of the transaction, if negative then the funds are withdrawn
 *        date:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction
 *       example:
 *         userId: "665356241716d857dd03b372"
 *         amount: 1000
 *         date: "2024-06-10T20:46:21.433Z"
 */

const goalTransactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const GoalTransaction = mongoose.model('GoalTransaction', goalTransactionSchema);
module.exports = GoalTransaction;
