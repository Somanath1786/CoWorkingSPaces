const router = require('express').Router();
const Units = require('../models/Unit')

/**
 GET /api/v1/companies
e.g. GET http://localhost:5000/api/v1/companies
Return all companies with all their employees information. Do not return an unit information.
 */

/**
 * GET /api/v1/companies?name=[partial-query]
e.g. GET http://localhost:5000/api/v1/companies?name=oog
Return all companies with all their employees information based off of the partial search string.
For example, the above search would return companies with the name of "Google" and "Ooga".
Do not return any unit information. If no companies are found, return an empty array.
 */

/**
GET /api/v1/companies?employees_lte=[integer]
e.g. GET http://localhost:5000/api/v1/companies?employees_lte=50
Return all companies with all their employees where the number of employees is less than or equal to the given integer.
Do not return any unit information. If no companies are found, return an empty array.
 */

/**
GET /api/v1/companies?employees_gte=[integer]
e.g. GET http://localhost:5000/api/v1/companies?employees_gte=100
Return all companies with all their employees where the number of employees is greater than or equal to the given integer.
Do not return any unit information. If no companies are found, return an empty array.
 */

router.get('/', async (req, res, next) =>{
    var status = 200;
    var response;
    const queryParams = req.query;
    // If no query params are present then return all the documents
    // queryParams is of type Object, hence a null check wont be sufficient
    if (Object.entries(queryParams).length === 0 && queryParams.constructor === Object)
    {
        response = await Units.find({}, {company : 1, _id : 0});
    }
    else
    {
         // The three api's as per project requirement have only one query param, so check that there is only one
      // and depending on what the query param is issue the appropriate find request      
      if (Object.keys(queryParams).length === 1)
      {
        key = Object.keys(queryParams)[0];   
        value = queryParams[key];
        
        if (key == 'name')
        {
            var matched_companies =[];
            companies = await Units.find({}, {company : 1, _id : 0})

            for (var i = 0; i < companies.length; i++)
            {
                company_name = JSON.stringify(companies[i].company.name).toLowerCase(); 
                if (company_name.includes(value.toLowerCase()))
                {
                    matched_companies.push(companies[i].company);
                }
            }
            status = 200;
            response = matched_companies
        }

        if (key == 'employees_gte')
        {
            var matched_companies =[];
            companies = await Units.find({}, {company : 1, _id : 0})

            for (var i = 0; i < companies.length; i++)
            {
                if(companies[i].company.employees.length >= value)
                {
                    matched_companies.push(companies[i].company);
                }
            }
            status = 200;
            response = matched_companies
        }

        if (key == 'employees_lte')
        {
            var matched_companies =[];
            companies = await Units.find({}, {company : 1, _id : 0})

            for (var i = 0; i < companies.length; i++)
            {
                if(companies[i].company.employees.length <= value)
                {
                    matched_companies.push(companies[i].company);
                }
            }
            status = 200;
            response = matched_companies
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



module.exports = router;