const express = require('express');
const connectDB = require('./connections/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes')
const cors = require('cors');
const swaggerSetup = require('./swagger');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
swaggerSetup(app);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions',transactionRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
