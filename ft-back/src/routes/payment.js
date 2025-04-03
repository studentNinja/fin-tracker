const express = require("express");
const { paymentSuccess } = require("../controllers/paymentController");

const router = express.Router();

router.post("/success", paymentSuccess);

module.exports = router; // ✅ Ensure the router is exported correctly
