var express = require('express');
var router = express.Router();
const checkAuth  = require('../middleware/check-auth');
// const checkAdmin  = require('../middleware/check-admin');
const bodyParser = require('body-parser');
const Dishes = require('../models/dish');
const mongoose = require('mongoose');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
// const upload = multer({dest:'uploads/'});
const upload = multer({storage:storage});
const upload2 = multer();
/* GET home page. */
router.get('/',(req, res, next)=> {
    console.log("dishes.js req = ",req);
    Dishes.find({})
    // .sort(name,1)
    .exec()
    .then((dish)=>{
        console.log("dishes = ",dish);
        res.statusCode =200;
        res.json(dish);
        // res.send(dish);
    })
    .catch(err=> {
        res.status(500).json({error : err});
    });
});
// it is used before multer
// router.post('/',(req,res,next)=>{
//     // Dishes.create(req.body)
//     const newDish = new Dishes({
//         _id : new mongoose.Types.ObjectId(),
//         name:req.body.dish.name,
//         description:req.body.dish.description,
//         price:req.body.dish.price,
//         qty:req.body.dish.qty
//     });
//     console.log("dish created at dishes.js");
//     console.log(newDish);
//     newDish.save()
//         .then(result=>{
//             console.log(result);
//             res.status(201).json({
//                 message:'Successfully added',
//                 createdDish : result
//             });
//             res.send(dish);
//         })
//         .catch(err=> {
//             console.log("Error in saving");
//             res.status(500).json({error : err});
//             });
//     // console.log("req",req);
// });
// router.post('/',upload.single('dishImage'),(req,res,next)=>{
router.post('/',upload.single('file'),(req,res,next)=>{
    // Dishes.create(req.body)
    console.log("hello in post");
    console.log(req.file);
    console.log(req.body);
    const newDish = new Dishes({
        _id : new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        // image:req.file
        image:req.file.path
    });
    console.log("dish created at dishes.js");
    console.log(newDish);
    newDish.save()
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
            res.status(500).json({error : err});
            });
    // console.log("req",req);
});
router.delete('/:id',(req,res,next)=>{
    console.log("req = ",req.params);
    console.log("res",res.data);
    console.log("body in delete = ",req.body);

    Dishes.deleteOne(
                {
                    "_id":req.params.id
                }
            )
            // Cart.remove({"dishes.qty":"0"})
            .then((ans)=>{
            console.log("success");
            res.status(201).json({
                message:'Successfully deleted',
            });
            })
            .catch((err)=>{
                console.log("error",err);
                res.status(500).json({error : err});
            });
            
});
module.exports = router;
