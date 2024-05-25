const mongoose = require('mongoose');
const { Schema } = mongoose;

const fixedExpenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: true },
    amount: { type: Number, required: true }
});

const FixedExpense = mongoose.model('FixedExpense', fixedExpenseSchema);
module.exports = FixedExpense;
