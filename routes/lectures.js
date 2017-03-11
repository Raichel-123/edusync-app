let express = require('express');
let fs = require('fs');
let path = require('path');
let router = express.Router();

const mb = 1024*500;

router.get('/', function(req, res, next) {
  let dir = path.join(__dirname,"..", "public", "video");
  fs.readdir(dir, function(err, items){
    if(err){
      res.render('lectures');
    }else{
      res.render('lectures', {video: items, defaultVideo: "lectures/"+items[0]});
    }
  });
});


router.get('/:videoId', function(req, res, next) {
  let dir = path.join(__dirname,"..", "public", "video", req.params['videoId']);
  let stat = fs.statSync(dir);
  let total = stat.size;
  if (req.headers['range']) {
    let range = req.headers.range;
    let parts = range.replace(/bytes=/, "").split("-");
    let start = parseInt(parts[0], 10);
    let end = parts[1];
    if(!end){
      end = ((start+mb)>total)? total-1: start+mb-1;
    }else{
      end = parseInt(parts[1], 10);
    }
    let chunksize = (end-start)+1;
    let file = fs.createReadStream(dir, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res); 
  }
});

module.exports = router;
