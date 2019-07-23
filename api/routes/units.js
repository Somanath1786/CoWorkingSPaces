const router = require('express').Router();
const { generate : generateId } = require('shortid');
const Units = require('../models/Unit')

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
 * Route 1 : GET /api/v1/units
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

Route 2 : GET /api/v1/units?kind=[kind]
e.g. GET http://localhost:5000/api/v1/units?kind=desk
Return a list of all units where the kind is equal to the provided kind. If none are found, return an empty array.

Route 3 :GET /api/v1/units?floor=[integer]
e.g. GET http://localhost:5000/api/v1/units?floor=2
Return a list of all units that are on the provided floor. If none are found, return an empty array.

Route 4 :GET /api/v1/units?occupied=[true/false]
e.g. GET http://localhost:5000/api/v1/units?occupied=true
If true, return a list of all units that have a company associated with them. If false, return a list of all units that have no company associated with them. If none are found in either case, return an empty array.
 */
router.get('/', async (req, res, next) =>{
    var status = 200;
    var response;
    const queryParams = req.query;
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
        else if (key == 'floor')
        {
          response = await Units.find({floor : value}, {__v : false});
        }
        else if (key == 'occupied')
        {
          response = await Units.find({company : {$exists : value}}, {__v : false})
        }
        else
        {
          response = "Unfortunately, this query is not yet supported. Please try filtering by kind / floor / occupied"
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


/**
 *Route 4: PATCH /api/v1/units/[id]
e.g. PATCH http://localhost:5000/api/v1/units/5
Update the unit with whatever information is specified in the request body and return the newly updated document.
If the ID provided does not match a unit, return a 404 and an appropriate message. Note: You should allow for the company to be added from this route, if provided.
 */

router.patch('/:id', async (req, res, next) => {
  var status = 200;
  var unit = await Units.findById(req.params.id) 

  if (unit == null)
  {
    status = 404;
    resonse = 'The requested unit is not found';

    res.json({status, response});
  }
  else
  {
    // Go through the body of the patch request and see which fields needs to be updated and update the corresponding fields
    if (req.body.kind)
    {
      unit.kind = req.body.kind;
    }
    if (req.body.floor)
    {
      unit.kind = req.body.floor
    }
    if (req.body.special_monthly_offer)
    {
      unit.special_monthly_offer = req.body.special_monthly_offer
    }
    if (req.body.company)
    {
      unit.company = req.body.company
    }
    unit = await unit.save();
  } 

  res.json({status, unit})
 })


/**
 * PATCH /api/v1/units/[id]/company
e.g. PATCH http://localhost:5000/api/v1/units/5/company
Update the company associated with the given unit and return the newly updated document.
This can also be used to change a unit's listing from being empty to being occupied. If the ID provided does not match a unit, return a 404 and an appropriate message.
 */

 router.patch('/:id/company', async (req, res, next) => {
   var status = 200;
   var unit = await Units.findById(req.params.id);
   
  if (unit == null)
  {
    status = 404;
    resonse = 'The requested unit is not found';

    res.json({status, response});
  }
  else
  {
    // Go through the body of the patch request and see which fields needs to be updated and update the corresponding fields
    if (req.body.name)
    {
      unit.company.name = req.body.name;
    }
    if (req.body.contact_email)
    {
      unit.company.contact_email = req.body.contact_email
    }
    if (req.body.employees)
    {
      unit.company.employees = req.body.employees;
    }

    unit = await unit.save();
  }

  res.json({status, unit})
 });
 
 /**
  * DELETE /api/v1/units/[id]/company
e.g. DELETE http://localhost:5000/api/v1/units/5/company
Remove the company from the given unit. If the ID provided does not match a unit, return a 404 and an appropriate message.
  */
router.delete('/:id/company', async(req, res, next) => {
  var status = 200;
  try {
    const response = await Units.updateOne({ _id : req.params.id}, {$unset: {company:""} }, {new : true})
    res.json({status, response});
  }
  catch(error) {
    console.error(error);
    const err = new Error(error.name + ' : ' + error.message);
    err.status = 404;
    next(err);
  }  
})

/**
 * GET /api/v1/units/[id]/company/employees
e.g. GET http://localhost:5000/api/v1/units/5/company/employees
Return all employees for the given company. If no company is listed, return a 404 and an appropriate message.
If the ID provided does not match a unit, return a 404 and a different appropriate message.
 */
router.get('/:id/company/employees', async(req, res, next) => {
  var status;
  var unit = await Units.findById(req.params.id);
  
  if (unit == null)
  {
    status = 404
    response = 'The requested unit cannot be found'    
  }
  else
  {
    if (unit.company == null)
    {
      status = 404;
      response = 'There is no company listed for this unit'      
    }
    else
    {
      status = 200
      response = unit.company.employees;      
    }
  }

  res.json({status, response});
})

/**
 * GET /api/v1/units/[id]/company/employees/[id]
e.g. GET http://localhost:5000/api/v1/units/5/company/employees/12
Return the specific employee for the given company. 
If no company is listed, return a 404 and an appropriate message.
If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
If no employee with that ID exists, return a different appropriate message.
 */
router.get('/:unitId/company/employees/:employeeId', async (req, res, next) => {
  var status;
  var unit = await Units.findById(req.params.unitId);
  
  if (unit == null)
  {
    status = 404
    response = 'The requested unit cannot be found'    
  }
  else
  {
    if (unit.company == null)
    {
      status = 404;
      response = 'There is no company listed for this unit'      
    }
    else
    {
      var employee;
      for(var i = 0; i < unit.company.employees.length; i++)
      {
        if (unit.company.employees[i]._id.toString() === req.params.employeeId)
        {
          employee = unit.company.employees[i];
          break;
        }
      }
      
      if (employee == undefined)
      {
        status = 404;
        response = 'There is no employee with the requested id'
      }
      else
      {
        status = 200;
        response = employee;
      }
    }
  }

  res.json({status, response});
})

/**
 * POST /api/v1/units/[id]/company/employees
e.g. POST http://localhost:5000/api/v1/units/5/company/employees
Create a new employee and return that employee for the given company.
If no company is listed, return a 404 and an appropriate message.
If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.
 */
router.post('/:id/company/employees', async (req, res, next) => {
  var status;
  var unit = await Units.findById(req.params.id);
  
  if (unit == null)
  {
    status = 404
    response = 'The requested unit cannot be found'    
  }
  else
  {
    if (unit.company == null)
    {
      status = 404;
      response = 'There is no company listed for this unit'      
    }
    else
    {
      var employees = unit.company.employees;
      employees.push(req.body);

      try{
        unit = await unit.save();
        status = 200;
        response = req.body;        
      }
      catch(error) {
        console.error(error);
        const err = new Error(error.name + ' : ' + error.message);
        err.status = 400;
        next(err); 
      }
    }
  }

  res.json({status, response})
})

/**
 * PATCH /api/v1/units/[id]/company/employees/[id]
e.g. PATCH http://localhost:5000/api/v1/units/5/company/employees/12
Update an employee and return that employee for the given company.
If no company is listed, return a 404 and an appropriate message.
If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.
If no employee with that ID exists, return a different appropriate message.
 */
router.patch('/:unitId/company/employees/:employeeId', async (req, res, next) => {
  var status = 200;
  var unit = await Units.findById(req.params.unitId);
  
  if (unit == null)
  {
    status = 404
    response = 'The requested unit cannot be found'    
  }
  else
  {
    if (unit.company == null)
    {
      status = 404;
      response = 'There is no company listed for this unit'      
    }
    else
    {
      var employee;
      for(var i = 0; i < unit.company.employees.length; i++)
      {
        if (unit.company.employees[i]._id.toString() === req.params.employeeId)
        {
          employee = unit.company.employees[i];
          if (req.body.first_name)
          {
            employee.first_name = req.body.first_name
          }
          if (req.body.last_name)
          {
            employee.last_name = req.body.last_name
          }
          if (req.body.preferred_name)
          {
            employee.preferred_name = req.body.preferred_name
          }
          if (req.body.position)
          {
            employee.position = req.body.position
          }
          if (req.body.birthday)
          {
            employee.birthday = req.body.birthday
          }
          if (req.body.email)
          {
            employee.email = req.body.email
          }         
          
          try{
            unit = await unit.save();
            status = 200;
            response = employee;
          }
          catch(error) {
            console.error(error);
            const err = new Error(error.name + ' : ' + error.message);
            err.status = 400;
            next(err); 
          }
        }
      }
      
      if (employee == undefined)
      {
        status = 404;
        response = 'There is no employee with the requested id'
      }     
    }
  }
  res.json({status, response})
})


/**
DELETE /api/v1/units/[id]/company/employees/[id]
e.g. DELETE http://localhost:5000/api/v1/units/5/company/employees/12
Destroy the employee document and return that employee's document for the given company.
If no company is listed, return a 404 and an appropriate message.
If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
If no employee with that ID exists, return a different appropriate message.
 */
router.delete('/:unitId/company/employees/:employeeId', async(req, res, next) => {
  var status = 200;
  var unit = await Units.findById(req.params.unitId);
  
  if (unit == null)
  {
    status = 404
    response = 'The requested unit cannot be found'    
  }
  else
  {
    if (unit.company == null)
    {
      status = 404;
      response = 'There is no company listed for this unit'      
    }
    else
    {
      var employee;
      for(var i = 0; i < unit.company.employees.length; i++)
      {
        if (unit.company.employees[i]._id.toString() === req.params.employeeId)
        {
          employee = unit.company.employees[i];          
          unit.company.employees.splice(i, 1);

          try{
            unit = await unit.save();
            status = 200;
            response = employee;
          }
          catch(error) {
            console.error(error);
            const err = new Error(error.name + ' : ' + error.message);
            err.status = 400;
            next(err); 
          }
        }
      }
      
      if (employee == undefined)
      {
        status = 404;
        response = 'There is no employee with the requested id'
      }     
    }
  }
  res.json({status, response}) 
})

module.exports = router