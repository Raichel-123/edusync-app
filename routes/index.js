var express = require('express');
let moment = require('moment');
let db = require('../db/helper');
var router = express.Router();

router.get('/', function(req, res, next) {
  let loggedIn = (req.session.userId)? true: false;
  let query = "select c.id, c.name, c.description, c.type, count(*) as l_cnt, t.name as tname, c.created_at, x.id as enrolled from course c left join lectures l on l.cid=c.id join teacher t on t.id=c.tid left join (select s.id as id, e.cid as cid from student s join enroll e on e.uid=s.id where s.id=?) as x on x.cid=c.id group by c.id";
  db.query(query,[req.session.userId])
    .then((result)=>{
      return res.render('index', {courses: result, loggedIn: loggedIn, moment: moment});
    })
    .catch((err)=>{
      console.log(err);
      res.status(500);
      return res.end();
    })
});

module.exports = router;
