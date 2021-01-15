// on 22 nov before async
var express = require('express');
var router = express.Router();
const checkAuth  = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const Cart = require('../models/cart');
const Dish = require('../models/dish');
// const CartDish = require('../models/cart');
const mongoose = require('mongoose');


/* GET home page. */
router.get('/',(req, res, next)=> {
    // var result = db.customer.findOne
    // ({"name":"Gokulnath Kumar"},{"address_ids":1})
    // var addresses = db.address.find
    // ({"_id":{"$in":result["address_ids"]}})
    
    // var x = Cart.find({"userId":})
    // console.log("cart req = ",req);
    Cart.find({})
    .exec()
    .then((d)=>{
        res.statusCode =200;
        // var x = Cart.find({"userId":dish.userId})
        
        console.log("dish = ",d);
        var x = d[0].dishes;
        console.log("x = ",x);
        const n = x.length;
        console.log(n);
        var arr = [];
        var qa = [];
        for(var i = 0;i<n;i++){
            var index = d[0].dishes[i].dish;
            var q = d[0].dishes[i].qty;
            console.log("qty = ",q);
            qa.push(q);
            var count = 0;
            Dish.findById(index)
            .exec()
            .then((ans)=>{
                // console.log("i = ",index);
                // console.log("q = ",q,qa[count]);
                var temp = {...ans._doc,qty:qa[count]};
                arr.push(temp);
                if(count==n-1){
                    res.json(arr);
                }
                count = count + 1;
            })
            .catch((err)=>{
                console.log("err= ",err);
            });
            // if(i==n-1){
            //     console.log("hello world");
            //     res.json(arr);
            // }
        }
        
        // for(var i = 0;i<n;i++){
        //     console.log("arr = ",arr[i]);
        // }
        // res.json(d);
    })
    .catch(err=> {
        res.status(500).json({error : err});
    });
});
router.put('/',(req,res,next)=>{
    console.log("req",req.body);
    // console.log(req.body.userId);
    Cart.find({userId:req.body.userId})
    .then((d)=>{
        dish = d[0];
        console.log("in then",d);
        if (dish!=null){
        // if (1==2) {
            console.log("in if");
            console.log(req.body.dishes._id);
            // dish.dishes.findById(req.body.dishes.dishid)
            // Cart.findById(req.body.dishes.dishid)
            // Cart.find({"userId":req.body.userId ,"dishes": {dish:req.body.dishes._id} })
            Cart.updateOne(
                {
                    userId : req.body.userId,
                    "dishes.dish" : req.body.dishes._id
                },
                {
                    $set:{
                        "dishes.$.qty": req.body.dishes.qty
                    }
                }
                )
            .then((ans)=>{
                console.log("ans = ",ans.n);
                if(ans.n==0){
                    const newCart = {
                        _id : new mongoose.Types.ObjectId(),
                        dish:req.body.dishes._id,
                        // name:req.body.dishes.name,
                        // price:req.body.dishes.price,
                        qty:req.body.dishes.qty
                    }
                    dish.dishes.push(newCart);
                    console.log("...................");
                    // console.log("dish.dishes",dish.dishes);
                    // console.log("newCart",newCart);
                    dish.save()
                    .then((dish)=>{
                        console.log("in save then");
                        res.status(200).json({message:"added Successfully"});
                    })
                    .catch((err)=>{
                        console.log("error in catch of then");
                        console.log(err);
                    })
                }
            })
            .catch((err)=>{
                console.log("err = ",err);
            });
        }
        else{
            console.log("in else");
            console.log("user id = ",req.body.userId);
            const newCart = new Cart({
            _id : new mongoose.Types.ObjectId(),
            userId:req.body.userId,
            dishes:{
                
                _id : new mongoose.Types.ObjectId(),
                dish:req.body.dishes._id,
                // name:req.body.dishes.name,
                // description:req.body.description,
                // price:req.body.dishes.price,
                qty:req.body.dishes.qty
            }
            // image:req.file.path
            });
            console.log("new cart",newCart);
            newCart.save()
                .then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message:'Successfully added',
                        // createdDish : result
                    });
                    // res.send(dish);
                })
                .catch(err=> {
                    console.log("Error in saving");
                    console.log(err);
                    // res.status(500).json({error : err});
                    });
            }
    })
    .catch((req)=>{
        console.log("in last catch",req);
        const newCart = new Cart({
            _id : new mongoose.Types.ObjectId(),
            // userId:req.body.userId,
            dishes:{
                dish:req.body.dishes._id,
                // name:req.body.dishes.name,
                // description:req.body.description,
                // price:req.body.dishes.price,
                qty:req.body.dishes.qty
            }
            // image:req.file.path
            });
            newCart.save()
                .then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message:'Successfully added',
                        createdDish : result
                    });
                    // res.send(dish);
                })
                .catch(err=> {
                    console.log("Error in saving");
                    console.log(err);
                    res.status(500).json({error : err});
                    });
            
        res.status(500).json({error:err});
    })



});
// router.put('/',(req,res,next)=>{
//     // Cart.create(req.body)
//     console.log("req body",req.body);
//     // console.log(req.body.name);
//     Cart.findOne({name:req.body.dishes.name})
//     .exec()
//     .then((cart)=>{
//         console.log(cart);
//         console.log(req.body.dishes.qty);
//         Cart.updateOne({qty:cart.qty},{$set:{qty:req.body.dishes.qty}}, 
//         function(err, res) {
//             if (err){
//                 console.log("error is here");
//             }
//             else{
//                 console.log("1 document updated",res);
//             }
//         });
//         console.log("cart created at cart.js",cart);
//         })
//     .catch(err=> {
//         console.log("catch body",req.body);
//         const newCart = new Cart({
//             _id : new mongoose.Types.ObjectId(),
//             userId:req.body.userId,
//             dishes:{
//                 name:req.body.dishes.name,
//                 // description:req.body.description,
//                 price:req.body.dishes.price,
//                 qty:req.body.dishes.qty
//             }
            
//             // image:req.file.path
//         });
//         console.log("cart created at cart.js");
//         console.log(newCart);
//         newCart.save()
//             .then(result=>{
//                 console.log(result);
//                 res.status(201).json({
//                     message:'Successfully added',
//                     createdDish : result
//                 });
//                 // res.send(dish);
//             })
//             .catch(err=> {
//                 console.log("Error in saving");
//                 console.log(err);
//                 res.status(500).json({error : err});
//                 });
//             console.log("cart empty");
//     });
    
// });
module.exports = router;
