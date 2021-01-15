var express = require('express');
var router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/',(req,res,next)=>{
    // we can use find one
    console.log("hellllllllllloooooooooooo");
    console.log(req.body);
    User.find({email:req.body.user.email})
    .exec()
    .then(user=>{
        console.log("user",user);
        if(user.length<1){
            //got no user
            console.log("first if");
            return res.status(401).json({message:'Auth failed'});
        }
        bcrypt.compare(req.body.user.password,user[0].password,(err,result)=>{
            
            if (err){
            console.log("password failed");
            return res.status(401).json({message:'Auth Failed'});
            }
            if (result){
                const token = jwt.sign(
                {
                    email:user[0].email,
                    userId:user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:'2h'
                    // expiresIn:'5s'
                }
            );
                console.log("success");
                return res.status(200).json({
                    message:"Auth Successfull",
                    token:token,
                    userId:user[0]._id,
                    admin:user[0].admin,
                    name:user[0].name,
                    });
            }
            console.log("finalll");
            return res.status(401).json({message:'Auth Failed'});
        });
        
    })
    .catch(err=> {
        res.status(500).json({error : err});
        });
});
module.exports = router;