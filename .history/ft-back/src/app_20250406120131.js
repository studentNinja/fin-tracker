const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const goalTransactionRoutes = require('./routes/goalTransactionRoutes');
const fixedExpenseRoutes = require('./routes/fixedExpenseRoutes');
const goalRoutes = require('./routes/goalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const paymentRoutes = require("./routes/payment");
const cors = require('cors');
const helmet = require('helmet');
const swaggerSetup = require('./swagger');

require('dotenv').config();

const createServer = () => {
  const app = express();

  app.use(cors(
    {
      origin: "https://fin-tracker-21n6.onrender.com",
      credentials: true
    }
  ));
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }));
  app.use(express.json());
  swaggerSetup(app);

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/goals', goalRoutes);
  app.use('/api/goal-transactions', goalTransactionRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/fixedexpenses', fixedExpenseRoutes);
  app.use('/api/incomes', incomeRoutes);
  app.use("/api/payment", paymentRoutes);


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

module.exports = createServer;
