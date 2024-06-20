const createServer = require('./app');
const {connectDB} = require('./connections/db');

const app = createServer();

const port = process.env.PORT || 8080;
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((e) => {
    console.log(e);
});


