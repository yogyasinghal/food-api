var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var data = require('./payment');
// router.get('/',(req, res, next)=> {
// console.log("data from payment = ",data);

router.post('/',(req,res,next)=>{
    // console.log(".///////////////////");
    // console.log(req.body);
    var data = req.body;
    // console.log("data from success = ",data.details);
    // respcode == 01 for success and other for failure
    console.log("/////////////// in success api");
    if (req.body.RESPCODE != '01'){
        // success
        // reversing the condition for cheking 
        //    it should be equal to 01
        res.redirect('http://localhost:3000/success');
        // res.redirect('http://localhost:3000/login');
    }
    else{
        res.redirect('http://localhost:3000/error')
        // fail
    }

    
    // res.send("in success");
})
module.exports = router;

