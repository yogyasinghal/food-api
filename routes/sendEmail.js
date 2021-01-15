var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
// router.get('/',(req, res, next)=> {

router.post('/',(req,res,next)=>{
    console.log(req.body);
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yogyatest5@gmail.com',
        pass: 'yogya1083'
    }
    });
    var data = req.body.details;
    if (data.pincode == 0 || data.pincode == 'null' || data.pincode == null){
        console.log("if");
        var mailOptions = {
        from: 'yogyatest5@gmail.com',
        to: data.email,
        subject: 'Confirmation Email For Your order',
        text: 
        `Thanks for Ordering ${data.name} \nYou can Collect Your order at Restraunt`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
        };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({error : error});
        } else {
            console.log('Email sent: if ' + info.response);
            res.status(200).json({msg:successfull});
            // res.json(otp);
        }
        });
    }
    else{
        console.log("else");
        var mailOptions = {
        from: 'yogyatest5@gmail.com',
        to: data.email,
        subject: 'Confirmation Email For You order',
        text: `Thanks for Ordering ${data.name}\nYour Delivery Address is:\n${data.address}\n${data.city} ${data.state}\n${data.pincode} ${data.country}

            `
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
        };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({error : error});
        } else {
            console.log('Email sent else: ' + info.response);
            // res.statusCode =200;
            res.status(200).json({msg:successfull});
            // res.json(otp);
        }
        });
    }
    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    //     console.log(error);
    //     res.status(500).json({error : error});
    // } else {
    //     console.log('Email sent: ' + info.response);
    //     res.statusCode =200;
    //     // res.json(otp);
    // }
    // });
})
module.exports = router;

