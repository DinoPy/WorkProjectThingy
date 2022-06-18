const path = require('path');
const express = require('express');
const { urlencoded } = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lists', require('./routes/listsRoutes'));

// function to initiate the react via express while in prod.

// error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
