var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var upload = require('./routes/upload');
var lectures = require('./routes/lectures');
var  login =require('./routes/login');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.of('/upload').on('connection', function(user){
  let filename, size, rawData;

  user.on('start', function(data){
    filename = data.name;
    size = data.size;
    rawData = '';
    user.emit('ack');
  })

  user.on('data', function(data){
    rawData+=data;
    user.emit('ack');
  });

  user.on('done', function(data){
    let dir = path.join(__dirname, "public", "video")
    if(!fs.existsSync(dir))
      fs.mkdirSync(dir);
    fs.writeFile(path.join(dir,filename), rawData, "binary", function(err){
      if(err){
        console.log(err);
      }
    })
  });
});

app.use('/', index);
app.use('/upload', upload);
app.use('/lectures', lectures);
app.use('/login',login);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app, server};
