var express = require('express');
let db = require('../db/helper');
let moment = require('moment');
var router = express.Router();

router.use(function(req, res, next){
  if(req.session.type){
    return next();
  }
  return res.redirect('/login');
});

router.get('/enroll/:id', function(req, res, next){
  let id= req.params.id;
  let userid =  req.session.userId;
  let query = "insert into enroll(uid, cid, enroll_date) values (?,?,?)";
  db.query(query, [userid, id, moment().format("YYYY-MM-DD HH:mm:ss")])
    .then(result=>{
      res.redirect('/course/'+id+'/1');
    })
    .catch(err=>{
      console.log(err);
      res.end();
    })
});

router.get('/:cid/:lid', function(req, res, next) {
  let cid = req.params.cid;
  let lnum = req.params.lid;
  let loggedIn = (req.session.userId)? true: false;
  let query = "select l.name, l.id, l.notes, x.passed from lectures l left join (select a.pass as passed, a.lid as lid from attempt a where a.uid=?) x on x.lid=l.id where l.cid=? order by l.id";
  db.query(query,[req.session.userId, cid])
    .then(result=>{
      if (result.length == 0)
        res.redirect('/')
      else if(result.length < lnum)
        res.redirect('/course/'+cid+'/1')
      else{
        console.log(result)
        let lecture = result[lnum-1];
        let names = result.map((item, i)=>{return {name: item.name, passed: item.passed, num: i};});
        let data = {loggedIn: loggedIn, notes: lecture.notes, lectures: names, courseId: cid, id: lecture.id, curr: lnum-1 };
        res.render('lecture', data);
      }
    })
    .catch(err=>{
      console.log(err);
    })
});

router.post('/:cid/:lid', function(req, res, next){
  let lid = req.params.lid;
  let uid = req.session.userId;
  let query = "insert into views(uid, lid, watch_date) values (?,?,?)";
  db.query(query, [uid, lid, moment().format("YYYY-MM-DD HH:mm:ss")])
    .then(result=>{
      res.status(200);
    })
    .catch(err=>{
      console.log(err);
    })
});

module.exports = router;
