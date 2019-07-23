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

app.use(require('body-parser').json());
// In case of error, set up the error handler to console log the message to the developer
// and send a user friendly error back as json response to the user.

// TODO: Why is the error being returned as an HTML instead of JSON ? How do we fix it. Ask in the discussion forum.
app.use((err, req, res, next) =>{
    if (NODE_ENV === "development")
    {
        console.error(err);
    }
    const { message, status } = err;
    response = JSON.stringify(message)
    res.status(status).json({status, response})
})

// Set up the starter routes

app.use('/api/v1/units', require('./api/routes/units'))
app.use('/api/v1/companies', require('./api/routes/companies'))

// Set up a listener to listen on the specified PORT
const listener = () => console.log('Listening on port ' + PORT);
app.listen(PORT, listener)

