var express = require('express');
var router = express.Router();
usersRoute = require("./users/index");

router.get('/', (req, res, nex)=>{
    res.status(200).json({msg:"Password Recovery"})
})

router.use('/users',usersRoute);


module.exports = router; 