const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    initialCapital: { type: Number, required: true },
    savingGoal: { type: Number, default: 100000 },
    registrationDate: { type: Date, default: Date.now },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    fixedExpenses: [{ type: Schema.Types.ObjectId, ref: 'FixedExpense' }],
    achievedGoals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }]
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
