var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Company = require('./Company').schema
const OFFICE_TYPES = ["seat", "desk", "small office", "large office", "floor"];

// Define the schema for Unit
var schema = new Schema({
    _id : String,
    kind : {
        type : String,
        enum : OFFICE_TYPES // Since we want the types to be one of the selected few strings using enum type
    },
    floor : {
        type : Number,
        required : true
    },
    special_monthly_offer : {
        type : Number        
    },
    company : {
        type : Company
    }
})

module.exports = mongoose.model('Unit', schema);
