var express = require('express');
let db = require('../db/helper');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.userId)
  let loggedIn = (req.session.userId)? true: false;
  let query = "select * from course";
  db.query(query)
    .then((result)=>{
      return res.render('index', {courses: result, loggedIn: loggedIn});
    })
    .catch((err)=>{
      res.status(500);
      return res.end();
    })
});

module.exports = router;
