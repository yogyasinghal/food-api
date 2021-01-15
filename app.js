// var createError = require('http-errors');
var express = require('express');
var path = require('path');

const mongoose = require('mongoose');

// var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var testApiRouter = require('./routes/testApi')
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var dishRouter = require('./routes/dishes');
var cartRouter = require('./routes/cart');
var verifyEmail = require('./routes/verifyEmail');
var payment = require('./routes/payment');
var success = require('./routes/success');
var sendEmail = require('./routes/sendEmail');
var newApp = express();

// view engine setup
newApp.set('views', path.join(__dirname, 'views'));
// newApp.set('view engine', 'jade');

// comment out after commit - final before first deploy
// comment for mongo atlas
// mongoose.connect('mongodb://localhost:27017/api',
//                 { useNewUrlParser: true },
//                 function(err,db){
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("connected to db");
//     }
// });
// var dotenv = require('dotenv');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://yogya:yogya1083@cluster0.hkbcf.mongodb.net/api?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("in atlas");
//   client.close();
// });
mongoose.connect(`mongodb+srv://yogya:${process.env.DB_PASS}@cluster0.hkbcf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
{ useUnifiedTopology: true },
{ useNewUrlParser: true },
function(err,db){
    if (err){
        console.log(err);
    }
    else{
        console.log("connected to db");
    }
});



// newApp.use(morgan('dev'));
// newApp.use(express.json());
///extra
newApp.use(cors());
//
newApp.use(bodyParser.urlencoded({ extended: false }));
newApp.use(bodyParser.json());
newApp.use('/uploads',express.static('uploads'))
// newApp.use(cookieParser());
newApp.use(express.static(path.join(__dirname, 'public')));

newApp.use('/', indexRouter);
newApp.use('/users', usersRouter);
newApp.use('/testApi',testApiRouter);
newApp.use('/signup',signupRouter);
newApp.use('/login',loginRouter);
newApp.use('/dishes',dishRouter);
newApp.use('/cart',cartRouter);
newApp.use('/verifyEmail',verifyEmail);
newApp.use('/payment',payment);
newApp.use('/success',success);
newApp.use('/sendEmail',sendEmail);
// catch 404 and forward to error handler
// newApp.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// newApp.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.newApp.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = newApp;
