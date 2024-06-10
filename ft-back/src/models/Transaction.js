const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories'); // Make sure this is an array of valid categories

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - user
 *         - amount
 *         - category
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *         category:
 *           type: string
 *           description: The category of the transaction
 *           enum: ["Food", "Transport", "Utilities", "Entertainment", "Other"]
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction
 *         description:
 *           type: string
 *           description: The description of the transaction
 *       example:
 *         user: "665356241716d857dd03b372"
 *         amount: 100
 *         category: "Food"
 *         date: "2024-05-26T15:32:52.735Z"
 *         description: "Lunch at a restaurant"
 */

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: validCategories, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
