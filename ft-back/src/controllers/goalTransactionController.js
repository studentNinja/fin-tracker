const GoalTransaction = require('../models/GoalTransaction');
const Goal = require('../models/Goal');


exports.createGoalTransaction = async (req, res) => {
    try {
        console.log(req)
        let { amount } = req.body;
        if (!amount ) {
            return res.status(400).send({ error: 'Amount is required' });
        }
        const goal = await Goal.findOne({ achieved: false, userId:req.userId });
        if (goal == null) {
            res.status(400).json({error: "No goal exists"});
            return
        }
        console.log("current goal")
        console.log(goal)


        const goalId=goal._id
        let goalTrantsactionsArray= await GoalTransaction.find({ goalId  });
        let savedAmount=goalTrantsactionsArray
            .reduce((res, curr) => res + curr.amount, 0)

        if((savedAmount+amount)>=goal.amount) {
            const updatedGoal = await Goal.findByIdAndUpdate(goalId,
            {
                achieved:true
            }
            );
            amount=goal.amount-savedAmount
        }
        if((savedAmount+amount)<0) {
            res.status(400).json({ error: "Not enough funds to complete operation" });
            return
        }


        const newGoalTransaction = new GoalTransaction(
            {
            userId: req.userId,
            goalId,
            amount
        });

        await newGoalTransaction.save();
        await Goal.findByIdAndUpdate(goalId, { $push: { goalTransactions: newGoalTransaction._id } });


        res.status(201).json(newGoalTransaction);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }



};


exports.getAllGoalTransactions = async (req, res) => {
    try {
        const goalTransactions = await GoalTransaction.find({ userId: req.userId });
        res.status(200).json(goalTransactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getCurrentGoalTransactions = async (req, res) => {
    try {
        const goal = await Goal.findOne({ achieved: false });
        if (goal == null) {
            res.status(400).json({error: "No goal exists"});
            return
        }
        const goalId=goal._id

        const goalTransactions = await GoalTransaction.find({ userId: req.userId, goalId  });
        res.status(200).json(goalTransactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};





