var express = require('express');
let db = require('../db/helper');
var router = express.Router();
const usnRegex = /^1cr\d{2}\w{2}\d{3}$/i;
const passwordRegex = /^.{6,}$/i;
const nameRegex = /^[a-z ,.'-]+$/i;
const numReg = /^\d{1,2}(.\d{1,2})?$/;
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


router.get('/login', function(req, res, next) {
  let loggedIn = (req.session.userId)? true: false;
  if(loggedIn)
    res.redirect('/');
  res.render('login');
});

router.post('/login', function(req, res, next) {
  let data = req.body;
  if(validateStudentLogin(data)){
    let query = "select * from student where usn=? and password=?";
    db.query(query, [data.usn, data.password])
      .then(result=>{
        if(result.length > 0){
          req.session.type = "student";
          req.session.userId = result[0].id;
          req.session.usn = data.usn;
          res.redirect('/');
        }
        else
          res.render('login', {error: true, message: "Invalid username or password"})
      })
      .catch(err=>{
        res.render('login', {error: true, message: "Invalid username or password"});
      });
  }else if(validateFacultyLogin(data)){
    let query = "select * from teacher where email=? and password=?";
    db.query(query, [data.usn, data.password])
      .then(result=>{
        if(result.length > 0){
          req.session.type = "faculty";
          req.session.email = result[0].email;
          req.session.userId = result[0].id;
          res.redirect('/');
        }
        else
          res.render('login', {error: true, message: "Invalid username or password"})
      })
      .catch(err=>{
        res.render('login', {error: true, message: "Invalid username or password"});
      });
  }else{
    res.render('login', {error: true, message: "Invalid username or password"});
  }
});

router.post('/register', function(req, res, next) {
  let data = req.body;
  if(validateRegister(data)){
    let query = "insert into student(usn, name, 10th, 12th, engg, email, password) values(?,?,?,?,?,?,?)";
    db.query(query, [data.usn, data.name, parseInt(data.marks10), parseInt(data.marks12), parseInt(data.engg), data.email, data.password])
      .then((result)=>{
        req.session.type = "student";
        req.session.email = data.email;
        req.session.userId = result.insertId;
        return res.redirect('/');
      })
      .catch((err)=>{
        return res.render('login', {error: true, message: "User already exists"});
      })
  }else{
    res.render('login', {error: true, message: "Invalid username or password"});
  }
});

router.get('/logout', function(req, res, next){
  req.session = null;
  res.redirect('/');
});

validateStudentLogin = data => {
  let usn = data.usn;
  let password = data.password;
  if (usnRegex.test(usn) && passwordRegex.test(password))
    return true;
  else
    return false;
}

validateFacultyLogin = data => {
  let usn = data.usn;
  let password = data.password;
  if (emailReg.test(usn) && passwordRegex.test(password))
    return true;
  else
    return false;
}

validateRegister = data => {
  let usn = data.usn;
  let password = data.password;
  let email = data.email;
  let name = data.name;
  let marks10 = data.marks10;
  let marks12 = data.marks12;
  let engg = data.engg;
  if (usnRegex.test(usn) && passwordRegex.test(password) &&
      nameRegex.test(name) && numReg.test(marks10) && numReg.test(marks12) &&
      numReg.test(engg) && emailReg.test(email))
    return true;
  else
    return false;
}

module.exports = router;
