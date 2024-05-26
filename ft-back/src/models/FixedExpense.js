const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories');

/**
 * @swagger
 * components:
 *   schemas:
 *     FixedExpense:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user
 *         name:
 *           type: string
 *           description: The name of the fixed expense
 *         amount:
 *           type: number
 *           description: The amount of the fixed expense
 */

const fixedExpenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: true },
    category:{ type: String, enum: validCategories, required: true },
    amount: { type: Number, required: true }
});

const FixedExpense = mongoose.model('FixedExpense', fixedExpenseSchema);
module.exports = FixedExpense;
