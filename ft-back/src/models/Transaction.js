const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories'); // Ensure this is an array of valid categories

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - user_id
 *         - amount
 *         - category
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *         category:
 *           type: string
 *           description: The category of the transaction
 *           enum: ["food", "transport", "fixed", "pets", "clothes", "lifestyle", "medicine", "other"]
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction
 *         description:
 *           type: string
 *           description: The description of the transaction
 *       example:
 *         user_id: "665356241716d857dd03b372"
 *         amount: 100
 *         category: "food"
 *         description: "Lunch at a restaurant"
 *         date: "2024-06-10T20:46:21.433Z"
 */

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: validCategories, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
