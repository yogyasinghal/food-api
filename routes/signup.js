var express = require('express');
var router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.post('/',(req,res,next)=>{
    User.find({email:req.body.user.email})
        .exec()
        .then(user=>{
            if (user.length>=1){
                console.log("existssssssssssssssssss");
                return res.status(409).json({message:'Email Exists'});
                res.send("Email Exists");
            }
            else{
                bcrypt.hash(req.body.user.password,10,(err,hash)=>{
                    if (err){
                        return res.status(500).json({error:err});
                        // res.send("Error");
                    }
                    else{
                        const product = new User({
                        _id : new mongoose.Types.ObjectId(),
                        name:req.body.user.name,
                        email:req.body.user.email,
                        password:hash
                        });
                        // console.log("user = ",product);
                        product.save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message:'Handling Post req to /products',
                                    createdProducts : result
                                });
                                // res.send("Login Successfull");
                            })
                            .catch(err=> {
                                console.log("..........................................");
                                console.log(err);
                                // res.send("l");
                                res.status(500).json({error : err});
                                // res.send("Please Enter Correct Email Address");
                                });
                        // next();
                        // res.send('api is working bro ');
                    }

                // }
                })
            }
})

});
module.exports = router;