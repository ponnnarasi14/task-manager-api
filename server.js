const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDb Connected'))
.catch(err => console.log('MongoDb Error:', err));

//use routes
app.use('/api', taskRoutes);

//start server
app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})