const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dish = new Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        name:{
            type:String,
            sparse:true,
            index:true
            // required:true,
            // unique:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        // qty:{
        //     type:Number,
        //     required:true,
        //     min:0,
        //     max:10
        // },
        image:{
            type:String
        }

    }
);

var Dishes = mongoose.model('Dish',Dish);
module.exports = Dishes;

