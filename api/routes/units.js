const router = require('express').Router();
const { generate : generateId } = require('shortid');
const Units = require('../models/Unit')

router.get('/', async (req, res, next) =>{
    const status = 200;
    const response = await Units.find();

    res.json({status, response});
})

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

module.exports = router