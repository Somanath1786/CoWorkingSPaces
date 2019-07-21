const router = require('express').Router();
const { generate : generateId } = require('shortid');
const Units = require('../models/Unit')

const filterUnits= async function(queryParams)
{
  var response;
    // At this point of time, we know that there is only one query param
    key = Object.keys(queryParams)[0];   
    value = queryParams[key];
    
    if (key === 'kind')
    {
      respone = Units.find({kind : value})
    }
    else if (key === 'floor')
    {
      respone = Units.find({floor : value})
    }
    else
    {
      respone = "yet to be implemented"
    }

    return response;
}

// This route is not mentioned as one of the routes to the API.
// However this is the api that I will be using to post the data to the database
router.post('/', async (req, res, next) => {
  const status = 201;
  try {
    const response = await Units.create({_id : generateId(), ...req.body});
    res.json({ status, response });
  }
  catch(error) {
    console.error(error);
    const err = new Error(error.name + ' : ' + error.message);
    err.status = 400;
    next(err);
  }
})

/**
 * This API provides the solution for the first four API calls
 * All of these is a version of GET.
 * The first one is the most basic version while the next three depends on returning specific values based on query params
 * Call 1 : GET /api/v1/units
e.g. GET http://localhost:5000/api/v1/units
Return a list of all of the units with all related information.

Sample return value : 
{"status":200,
"response":
[
{"_id":"mcRqe9kdi","kind":"floor","floor":5,"special_monthly_offer":10000,"company":{"_id":"5d33d1c44db5ff26b45e8134","employees":[{"_id":"5d33d1c44db5ff26b45e813e","first_name":"Bill","last_name":"Gates","preferred_name":"Bill","position":"Chairman","birthday":"11/10","email":"billg@macrosoft.com","created_at":"2019-07-21T02:45:24.408Z","updated_at":"2019-07-21T02:45:24.408Z"},{"_id":"5d33d1c44db5ff26b45e813d","first_name":"Satya","last_name":"Nadella","preferred_name":"Satya","position":"CEO","birthday":"02/17","email":"satyan@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e813c","first_name":"Rajesh","last_name":"Jha","preferred_name":"Rajesh","position":"EVP","birthday":"03/15","email":"rajeshj@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e813b","first_name":"Gaurav","last_name":"Sareen","preferred_name":"Gaurav","position":"CVP","birthday":"07/05","email":"gsareen@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e813a","first_name":"Robert","last_name":"Noveitskey","preferred_name":"Bob","position":"Director","birthday":"10/10","email":"bobn@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e8139","first_name":"Brain","last_name":"Stanhope","preferred_name":"Brian","position":"Group Engineering manager","birthday":"04/20","email":"bstan@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e8138","first_name":"Brett","last_name":"Waldbaum","preferred_name":"Brett","position":" Engineering Manager","birthday":"12/12","email":"brettwal@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e8137","first_name":"Somanath","last_name":"Krishnaswamy","preferred_name":"Soma","position":"Senior Software Engineer","birthday":"02/17","email":"skrishna@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e8136","first_name":"Mark","last_name":"Hopwood","preferred_name":"Mark","position":"Principal Software Engineer","birthday":"08/07","email":"markhop@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},{"_id":"5d33d1c44db5ff26b45e8135","first_name":"Hua","last_name":"Lin","preferred_name":"Hua","position":"Senior Software Engineer","birthday":"05/20","email":"hlin@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"}],"name":"Macrosoft","contact_email":"contact@macrosoft.com","created_at":"2019-07-21T02:45:24.409Z","updated_at":"2019-07-21T02:45:24.409Z"},"__v":0},
{"_id":"FH4jTna1l","kind":"small office","floor":1,"special_monthly_offer":0,"company":{"_id":"5d33d1d94db5ff26b45e813f","employees":[{"_id":"5d33d1d94db5ff26b45e8142","first_name":"Jeff","last_name":"Bezos","preferred_name":"Jeff","position":"CEO","birthday":"01/15","email":"jeff@amazonian.com","created_at":"2019-07-21T02:45:45.575Z","updated_at":"2019-07-21T02:45:45.575Z"},{"_id":"5d33d1d94db5ff26b45e8141","first_name":"Andrew","last_name":"Jassy","preferred_name":"Andy","position":"CEO AWS","birthday":"02/16","email":"jassy@amazonian.com","created_at":"2019-07-21T02:45:45.575Z","updated_at":"2019-07-21T02:45:45.575Z"},{"_id":"5d33d1d94db5ff26b45e8140","first_name":"Jefferey","last_name":"Wilke","preferred_name":"Jefferey","position":"CEO Consumer","birthday":"04/14","email":"wilke@amazonian.com","created_at":"2019-07-21T02:45:45.575Z","updated_at":"2019-07-21T02:45:45.575Z"}],"name":"Amazonian","contact_email":"contact@amazonian.com","created_at":"2019-07-21T02:45:45.575Z","updated_at":"2019-07-21T02:45:45.575Z"},"__v":0}
]
}

Call 2 : GET /api/v1/units?kind=[kind]
e.g. GET http://localhost:5000/api/v1/units?kind=desk
Return a list of all units where the kind is equal to the provided kind. If none are found, return an empty array.
 */
router.get('/', async (req, res, next) =>{
    var status = 200;
    var response;
    const queryParams = req.query;
    // TODO: Remove the console log
    console.log(queryParams);
    // If no query params are present then return all the documents
    // queryParams is of type Object, hence a null check wont be sufficient
    if (Object.entries(queryParams).length === 0 && queryParams.constructor === Object)
    {
      response = await Units.find({}, {__v : false});
    }
    else
    {
      // The three api's as per project requirement have only one query param, so check that there is only one
      // and depending on what the query param is issue the appropriate find request      
      if (Object.keys(queryParams).length === 1)
      {
        key = Object.keys(queryParams)[0];   
        value = queryParams[key];
        if (key == 'kind')
        {
          response = await Units.find({kind : value}, {__v : false});   
        }
        if (key == 'floor')
        {
          response = await Units.find({floor : value}, {__v : false});
        }
        if (key == 'occupied')
        {
          response = await Units.find({company : {$exists : value}}, {__v : false})
        }
      }
      else
      {
        status = 501;
        response = "Multiple query params not supported for this API"
      }
    }

    res.json({status, response});
})

module.exports = router