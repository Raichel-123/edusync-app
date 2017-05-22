var express = require('express');
var router = express.Router();
let db = require('../db/helper');
const kmeans = require('node-kmeans');

router.get('/:id', function(req, res, next) {
  let cid = req.params.id;
  let query = "select s.usn, x.count as views, y.count as success, y.count1 as failure  from student s join (select count(*) as count, v.uid as id from views v join lectures l on l.id=v.lid where l.cid=? group by v.uid) as x on x.id=s.id join (select sum(case a.pass when true then 1 else 0 end) as count, sum(case a.pass when false then 1 else 0 end) as count1, a.uid as id from attempt a join lectures l on l.id=a.lid where l.cid=? group by a.uid) as y on y.id=s.id";
  db.query(query,[cid,cid])
    .then(result=>{
      console.log(result)
        res.render('analytics', {data: result});
    })
    .catch(console.log)
});

router.post('/view/:id', function(req, res, next){
  let cid = req.params.id;
  let query = "select l.name, count(*) as count from lectures l join views v on v.lid=l.id where l.cid=? group by l.id";
  db.query(query, [cid])
    .then(result=>{
      res.json(result);
    })
    .catch(console.log)
});

router.post('/pie/:id', function(req, res, next){
  let cid = req.params.id;
  let query = "select sum(case a.pass when true then 1 else 0 end) as success, sum(case a.pass when false then 1 else 0 end) as failure from attempt a join lectures l on l.id=a.lid join course c on c.id=l.cid where c.id=?";
  db.query(query, [cid])
    .then(result=>{
      res.json(result);
    })
    .catch(console.log)
});


router.post('/average/:id', function(req, res, next){
  let cid = req.params.id;
  let query = "select avg(a.count) as count, l.name from attempt a join lectures l on l.id=a.lid join course c on c.id=l.cid where c.id=? group by l.id";
  db.query(query, [cid])
    .then(result=>{
      res.json(result);
    })
    .catch(console.log)
});

router.post('/stack/:id', function(req, res, next){
  let cid = req.params.id;
  let query = "select sum(case a.pass when true then 1 else 0 end) as success, sum(case a.pass when false then 1 else 0 end) as failure, l.name from attempt a join lectures l on l.id=a.lid join course c on c.id=l.cid where c.id=? group by l.id;"
  db.query(query, [cid])
    .then(result=>{
      res.json(result);
    })
    .catch(console.log)
});

router.get('/segmentation/:id', function(req, res, next){
  let cid = req.params.id;
  let query = "select s.usn, s.10th, s.12th, s.engg, y.attempts from student s join (select a.uid as id from attempt a join lectures l on a.lid=l.id where l.cid=? and a.pass=true group by a.uid having count(*) = (select count(*) from lectures where cid=?)) as x on s.id=x.id join (select group_concat(count) as attempts, a.uid as id from attempt a join lectures l on l.id=a.lid where l.cid=? group by a.uid) as y on y.id=s.id";
  db.query(query, [cid, cid, cid])
    .then(result=>{
      let dataset = result.map((item)=>{return [item["10th"], item["12th"], item["engg"], ...item.attempts.split(',').map((item)=>{return parseInt(item)})]})
      kmeans.clusterize(dataset, {k: 3}, (err,resp) => {
        if (err) console.error(err);
        let data = resp.map((item)=>{
          return item.clusterInd.map((item1)=>{
            return result[item1];
          })
        });
        console.log(data)
        res.render('segmentation', {items: data});
      });
    })
    .catch(console.log)
});




module.exports = router;
