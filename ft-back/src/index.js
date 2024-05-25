const express = require('express');
const connectDB = require('./connections/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
