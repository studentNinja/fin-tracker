const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


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
 *         - initialCapital
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
 *         initialCapital:
 *           type: number
 *           description: The initial capital of the user
 *         savingGoal:
 *           type: number
 *           description: The saving goal of the user
 *         registrationDate:
 *           type: string
 *           format: date-time
 *           description: The registration date of the user
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *         fixedExpenses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FixedExpense'
 *         achievedGoals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Goal'
 */

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    initial_capital: { type: Number, required: true },
    saving_goal: { type: Number, default: 100000 },
    registration_date: { type: Date, default: Date.now },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    fixed_expenses: [{ type: Schema.Types.ObjectId, ref: 'FixedExpense' }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }]
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
