const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, default: 100000 },
    savedAmount: { type: Number, default: 0 },
    achieved: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    achievedDate: { type: Date }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
