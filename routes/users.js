var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('From Users.js respond with a resource ');
});

module.exports = router;
