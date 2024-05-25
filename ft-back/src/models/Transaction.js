// models/Transaction.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = require('../config/expenseCategories');

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: validCategories, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
