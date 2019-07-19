const { NODE_ENV, PORT, MONGO_DB_CONNECTION } = process.env
const express = require('express');
const mongoose = require('mongoose')

const app = express();

if (NODE_ENV === "development")
{
    app.use(require('morgan')('dev'));
}

// Set up a Mong DB database connection here
if (MONGO_DB_CONNECTION)
{
    mongoose.connect(MONGO_DB_CONNECTION, {useNewUrlParser: true})
    console.log('Connected to DataBase...');
}
else
{
    console.log('Unable to connect to database');
}

// In case of error, set up the error handler to console log the message to the developer
// and send a user friendly error back as json response to the user.
app.use((err, req, res, next) =>{
    if (NODE_ENV === "development")
    {
        console.error(err);
    }
    const { message, status } = err;
    res.status(status).json({status, message})
})

// Set up the starter routes
app.use(require('body-parser').json());
app.use('/api/units', require('./api/routes/units'))

// Set up a listener to listen on the specified PORT
const listener = () => console.log('Listening on port ' + PORT);
app.listen(PORT, listener)