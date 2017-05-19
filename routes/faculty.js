var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  console.log(req.session)
  if(req.session.type=="faculty"){
    next();
  }
  return res.redirect('/');
})

router.get('/', function(req, res, next) {
  res.render('faculty');
});

router.get('/create', function(req, res, next){
  res.render('createCourse');
})

module.exports = router;
