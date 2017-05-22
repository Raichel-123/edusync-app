var express = require('express');
let db = require('../db/helper');
let moment = require('moment');
let fs = require('fs');
let path = require('path')
var router = express.Router();

router.use(function(req, res, next){
  if(req.session.type=="faculty"){
    return next();
  }
  return res.redirect('/');
})

router.get('/', function(req, res, next) {
  let loggedIn = (req.session.userId)? true: false;
  let query = "select c.id, c.name, c.type, e.count as enrollCnt, m.count as mandatoryCnt from course c left join (select count(*) as count, cid from enroll group by cid ) as e on e.cid=c.id left join (select count(*) as count, cid from mandatory group by cid) m on m.cid=c.id where tid=?";
  db.query(query, [req.session.userId, req.session.userId, req.session.userId])
    .then(result=>{
      console.log(result);
      return res.render('faculty', {courses: result, loggedIn: loggedIn});
    })
    .catch(err=>{
      console.log(err);
      res.status(404);
    });
});

router.get('/create', function(req, res, next){
  res.render('createCourse', {loggedIn: true});
})

router.post('/create', function(req, res, next){
  let loggedIn = (req.session.userId)? true: false;
  let data = req.body;
  console.log(data);
  let query = "insert into course(tid, name, description, type, created_at, modified_at) values(?,?,?,?,?,?)"
  db.query(query, [req.session.userId, data.title, data.description, data.type, moment().format("YYYY-MM-DD HH:mm:ss"), moment().format("YYYY-MM-DD HH:mm:ss")])
    .then(result=>{
      res.redirect('/faculty');
    })
    .catch(err=>{
      res.redirect('/faculty');
    })
})

router.get('/course/:id', function(req, res, next){
  let loggedIn = (req.session.userId)? true: false;
  let query = "select * from lectures where cid=?";
  db.query(query,[req.params.id])
    .then(result=>{
      res.render('facultyLectures', {lectures: result, loggedIn: loggedIn});
    })
    .catch(err=>{
      res.redirect('/');
    });
})

router.post('/course/:id', function(req, res, next){
  let data = req.body;
  let query1 = "insert into lectures(cid, name, notes, video, created_at, modified_at) values(?,?,?,?,?,?)";
  let query2 = "insert into assignment(lid, question, option1, option2, option3, option4, answer) VALUES ?";
  db.query(query1, [req.params.id, data.title, data.notes, new Buffer(data.data, 'binary'),moment().format("YYYY-MM-DD HH:mm:ss"), moment().format("YYYY-MM-DD HH:mm:ss") ])
    .then((result)=>{
        let assignments = req.body.assignments.map((assign)=>{assign.unshift(result.insertId + ''); return assign;});
        return db.query(query2, [assignments]);
    })
    .then(result=>{
      res.sendStatus(200)
    })
    .catch(err=>{
      console.log(err);
      res.sendStatus(404);
    })
})

module.exports = router;
