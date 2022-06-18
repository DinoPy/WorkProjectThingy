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
// we verify the status of the project so if it is in production the express app will use files from a build production location
if (process.env.NODE_ENV === 'production') {
    // if in production we give the express a static folder location which starts with the __dirname which is the location of the server files from where we navigate
    // path.join(will merge the path to the server js with the 2nd parameter.)
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    // APP.GET( ) allows us to define a ROUTE HANDLER for GET requests to a given URL.
    // in this case we handle ANY (*) get requests with a call back as this is a middleware
    // and to send the required files from their location
    // this allows us to only start the backend server and retieve the frontend from the frontend file.
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    // if we try to access the frontend using the backend link using the backend URL while we are not in production we are reminded to set to production
    app.get('/', (req, res) => res.send('Please set to production'));
}
// error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
