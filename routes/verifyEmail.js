var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
// router.get('/',(req, res, next)=> {

router.post('/',(req,res,next)=>{
    // console.log(req.body);
    var minm = 10000; 
    var maxm = 99999;
    // var otp = 1; 
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    // console.log("otp = ",otp);

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yogyatest5@gmail.com',
        pass: `${process.env.EMAIL_PASSWORD}`
    }
    });

    var mailOptions = {
    from: 'yogyatest5@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: `Thanks for Registering ${req.body.name}
    Please provide below otp to continue
        otp:${otp}
        `
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.status(500).json({error : error});
    } else {
        console.log('Email sent: ' + info.response);
        res.statusCode =200;
        res.json(otp);
    }
    });
})
module.exports = router;

