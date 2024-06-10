const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories'); // Ensure this is an array of valid categories

/**
 * @swagger
 * components:
 *   schemas:
 *     FixedExpense:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         name:
 *           type: string
 *           description: The name of the fixed expense
 *         category:
 *           type: string
 *           description: The category of the fixed expense
 *           enum: ["Food", "Transport", "Utilities", "Entertainment", "Other"]
 *         amount:
 *           type: number
 *           description: The amount of the fixed expense
 *       example:
 *         userId: "665356241716d857dd03b372"
 *         name: "Internet Bill"
 *         category: "Utilities"
 *         amount: 50
 */

const fixedExpenseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, enum: validCategories, required: true },
    amount: { type: Number, required: true }
}, { timestamps: true });

const FixedExpense = mongoose.model('FixedExpense', fixedExpenseSchema);
module.exports = FixedExpense;
