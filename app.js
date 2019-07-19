const { NODE_ENV, PORT } = process.env
const express = require('express');
const app = express();

if (NODE_ENV === "development")
{
    app.use(require('morgan')('dev'));
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

// Set up a listener to listen on the specified PORT
const listener = () => console.log('Listening on port ' + PORT);
app.listen(PORT, listener)