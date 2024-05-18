const express = require('express');
const connectDB = require('./connections/db');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());


app.use(express.json());


app.use('/api/users', require('./routes/userRoutes'));

const startServer = async () => {
    try {

        await connectDB();
        console.log('MongoDB connected');

        const port = process.env.PORT || 8080;

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

startServer()
    .then(() => {
        console.log('Server started successfully');
    })
    .catch((err) => {
        console.error('Error starting server', err);
    });