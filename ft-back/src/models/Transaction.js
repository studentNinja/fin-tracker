// models/Transaction.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories');

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
 */

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: validCategories, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
