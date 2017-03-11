var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {sidebars: ["Machine Learning","Operating Systems","Database"]});
});

module.exports = router;
