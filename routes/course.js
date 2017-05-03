var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Teachers course list page')
});

router.get('/create', function(req, res, next){
  res.render('create');
})

module.exports = router;
