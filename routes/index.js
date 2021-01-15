var express = require('express');
var router = express.Router();
const checkAuth  = require('../middleware/check-auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("from index.js");
  // res.render('index', { title: 'Express' });
});

router.post('/',(req,res)=>{
  console.log("req",req);
  console.log("hello from post");
  res.send("yo");
});

module.exports = router;
