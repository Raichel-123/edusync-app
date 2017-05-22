var express = require('express');
var router = express.Router();
let db = require('../db/helper');

router.get('/:cid/:lid', function(req, res, next) {
  let cid = req.params.cid;
  let lnum = req.params.lid;
  let uid = req.session.userId;
  let query = 'select id from lectures where cid=? order by id';
  db.query(query, [cid])
    .then(result=>{
      if(result.length < lnum)
        return res.status(404);
      let lid = result[lnum-1].id;
      query = 'select * from attempt where lid=? and uid=?'
      db.query(query, [lid, uid])
        .then(result=>{
          if(result.length > 0 && result[0].pass)
            return res.redirect('/course/'+cid+'/'+(lnum))
          let query2 = 'select * from assignment where lid=? order by id';
          db.query(query2, [lid])
            .then(result=>{
              res.render('assignment',{items: result, lid: lid});
            })
        })
    })
    .catch(err=>{
      res.status(404).send('not found');
    })
});

router.post('/:cid/:lid', function(req, res, next) {
  let data = req.body;
  let cid = req.params.cid;
  let lnum = req.params.lid;
  let query = 'select * from assignment where lid=?';
  db.query(query, [lnum])
    .then(result=>{
      let count = 0, pass=false;
      let ans = result.map((item, i)=>{
        if(data[i]==item.answer)
          count++;
        return {question: item.question, pass: (data[i]==item.answer)}
      });
      if(count >= Math.ceil((result.length*80)/100))
        pass = true;
      res.render('assignmentSubmit', {items: ans, pass: pass, count: count});
      storeAssignment(lnum, req.session.userId, count, result.length);
    })
    .catch(err=>{
      res.status(404).send('not found');
    })
});

storeAssignment = (lid, uid, count, len)=>{
  let query = 'select * from attempt where lid=? and uid=?';
  let percentage = parseInt((count*100)/len);
  let pass = false;
  if(percentage >= 80)
    pass = true;
  db.query(query, [lid, uid])
    .then(result=>{
      if(result.length > 0){
        db.query('update attempt set percentage=?, count=?, pass=? where lid=? and uid=?',[percentage, result[0].count+1, pass, lid, uid]);
      }else
        db.query('insert into attempt(lid, uid, count, pass, percentage) values(?,?,?,?,?)', [lid, uid, 1, pass, percentage]);
    })
    .catch(console.log)
};

module.exports = router;
