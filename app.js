var createError = require('http-errors');
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
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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



app.use(morgan('dev'));
// app.use(express.json());
///extra
app.use(cors());
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testApi',testApiRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/dishes',dishRouter);
app.use('/cart',cartRouter);
app.use('/verifyEmail',verifyEmail);
app.use('/payment',payment.router);
app.use('/success',success);
app.use('/sendEmail',sendEmail);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
