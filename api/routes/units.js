const router = require('express').Router();

router.get('/', (req, res, next) =>{
    res.json({message : 'Test Successful'})
})

module.exports = router