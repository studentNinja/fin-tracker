const express = require('express');
const connectDB = require('./connections/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const fixedExpenseRoutes = require('./routes/fixedExpenseRoutes');
const goalRoutes = require('./routes/goalRoutes');
const cors = require('cors');
const helmet = require('helmet');
const swaggerSetup = require('./swagger');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet()); // Adding Helmet for security
app.use(express.json());

connectDB();

swaggerSetup(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/fixedexpenses', fixedExpenseRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
