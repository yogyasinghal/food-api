const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dishSchema = new Schema ({

    
    dish :{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Dish'
    },
    _id : mongoose.Schema.Types.ObjectId,
    // name:{
    //     type:String,
    //     // unique:true
    // },
    // price:{
    //     type:Number
    // },
    qty:{
        type:Number,
        default:1
    }
});
const Cart = new Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'User'
            // type:String
        },
        // userId :{
        //     type:String
        // },
        dishes:[dishSchema]
        // dish_id :{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref : 'Dish'
        // }

    }
);

var Carts = mongoose.model('Cart',Cart);
// var CartDish = mongoose.model('CartDish',dishSchema);
module.exports = Carts;
// module.exports = CartDish;

