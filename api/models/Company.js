var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Employee = require('./Employee').schema

// Validator to check if the email is in the right format
function isEmailValid(email)
{
    return /\S+@\S+\.\S+/.test(email)
}

var emailValidator = [isEmailValid, 'Please pass in a valid email']

// Define the schema for a Company
var schema = new Schema({
    name: {
        type : String,
        required : true
    },
    contact_email: {
        type : String,
        validate : emailValidator
    },
    employees : [{
        type : Employee
    }]
},
{
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

module.exports = mongoose.model('Company', schema);