const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - initial_capital
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         initial_capital:
 *           type: number
 *           description: The initial capital of the user
 *         saving_goal:
 *           type: number
 *           description: The saving goal of the user
 *           default: 100000
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: The registration date of the user
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *         fixed_expenses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FixedExpense'
 *         goals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Goal'
 *         incomes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Income'
 */

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    capital: { type: Number, required: true },
    saving_goal: { type: Number, default: 100000 },
    registration_date: { type: Date, default: Date.now },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    fixed_expenses: [{ type: Schema.Types.ObjectId, ref: 'FixedExpense' }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    incomes: [{ type: Schema.Types.ObjectId, ref: 'Income' }]
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
