const express = require('express');
const connectDB = require('./connections/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
