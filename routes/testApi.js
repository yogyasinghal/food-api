var express = require('express');
var router = express.Router();
const checkAuth  = require('../middleware/check-auth');
router.post('/',checkAuth,(req,res)=>{
    // console.log(req);
    // console.log(req.body.user);
    res.send('Api is working bro.');
});
module.exports = router;