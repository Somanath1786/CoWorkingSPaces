const router = require('express').Router();
const Units = require('../models/Unit')
/**
 * GET /api/v1/employees?name=[partial-query]
e.g. GET http://localhost:5000/api/v1/employees?name=ada
Return all employees based off of the partial search string. The search should be for their full name. For example, the above search would return the following employees:

Adaline Smith
Surya Adana
Augusta "Ada" King-Noel
Do not return any unit or company information. If no employees are found, return an empty array.
 */

/**
 * GET /api/v1/employees?birthday=[date]
e.g. GET http://localhost:5000/api/v1/employees?birthday=[date]
Return all employees who have a birthday on the given date. Do not return any unit or company information. If no employees are found, return an empty array.
 */

router.get('/', async (req, res, next) => {
    var status = 200;
    const queryParams = req.query;
    // If no query params are present then return all the documents
    // queryParams is of type Object, hence a null check wont be sufficient
    if (Object.entries(queryParams).length === 0 && queryParams.constructor === Object)
    {
        response = await Units.find({}, {"company.employees" : 1, _id : 0})        
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
            var matched_employees = []
            results = await Units.find({}, {"company.employees" : 1, _id : 0})

            for(var i = 0; i < results.length; i++)
            {
                employees = results[i].company.employees;                
                for (var j = 0; j < employees.length; j++)
                {
                    employee_firstName = JSON.stringify(employees[j].first_name).toLowerCase();
                    employee_lastName = JSON.stringify(employees[j].last_name).toLowerCase();
                    console.log(employee_firstName, employee_lastName);
                    if (employee_firstName.includes(value.toLowerCase()) || employee_lastName.includes(value.toLowerCase()))
                    {
                        matched_employees.push(employees[j]);
                    }
                }
            }

            status = 200;
            response = matched_employees;
        }
        if (key == 'birthday')
        {
            var matched_employees = []
            results = await Units.find({}, {"company.employees" : 1, _id : 0})

            for(var i = 0; i < results.length; i++)
            {
                employees = results[i].company.employees;                
                for (var j = 0; j < employees.length; j++)
                {
                   employee_birthday = JSON.stringify(employees[j].birthday)
                   employee_birthday = employee_birthday.replace(/"/g,"");
                   console.log(employee_birthday, value);
                   if (employee_birthday == value)
                   {
                        matched_employees.push(employees[j]);
                   }
                }
            }

            status = 200;
            response = matched_employees;
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