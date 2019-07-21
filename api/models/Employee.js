var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Validator to check if the email is in the right format
function isEmailValid(email)
{
    return /\S+@\S+\.\S+/.test(email)
}

var emailValidator = [isEmailValid, 'Please pass in a valid email']

// Define the Schema for an Employee
var schema =new Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String        
    },
    preferred_name : {
        type : String        
    },
    position : {
        type : String        
    },
    birthday : {
        type : String        
    },
    email : {
        type : String,
        validate : emailValidator        
    }
},
{
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

module.exports = mongoose.model('Employee', schema);