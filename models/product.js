const mongoose = require('mongoose');

const Product = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
//plural form of Product is the name of collection 
module.exports = mongoose.model('Product',Product);