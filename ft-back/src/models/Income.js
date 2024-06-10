const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       required:
 *         - user
 *         - source
 *         - amount
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user
 *         source:
 *           type: string
 *           description: The source of the income
 *         amount:
 *           type: number
 *           description: The amount of the income
 *         date:
 *           type: string
 *           format: date
 *           description: The date the income was received
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the income record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the income record was last updated
 *       example:
 *         user: "665356241716d857dd03b372"
 *         source: "Salary"
 *         amount: 3000
 *         date: "2023-06-01T00:00:00.000Z"
 *         createdAt: "2023-06-01T00:00:00.000Z"
 *         updatedAt: "2023-06-01T00:00:00.000Z"
 */

const incomeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
