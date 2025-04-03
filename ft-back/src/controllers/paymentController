const User = require("../models/User");

exports.paymentSuccess = async (req, res) => {
    try {
        const { userId, paymentId } = req.body;

        if (!userId || !paymentId) {
            return res.status(400).json({ error: "Invalid payment details" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.hasPaid = true;
        await user.save();

        res.json({ success: true, message: "Payment successful, subscription activated." });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
