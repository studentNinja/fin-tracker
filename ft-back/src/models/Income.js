const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       required:
 *         - userId
 *         - source
 *         - amount
 *         - category
 *       properties:
 *         userId:
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
 *         category:
 *           type: string
 *           description: The category of the income
 *           enum:
 *             - income
 *       example:
 *         userId: "665356241716d857dd03b372"
 *         source: "Salary"
 *         amount: 3000
 *         date: "2023-06-01T00:00:00.000Z"
 *         category: "income"
 */

const incomeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, enum: ['income'], default: 'income', required: true }
}, { timestamps: true });

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
