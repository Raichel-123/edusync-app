var video = videojs('my-video').ready(function(){
  player = this;

  var duration_time =  Math.floor(this.duration());

  this.on('timeupdate', function() {
    duration_time = Math.floor(this.duration());
    var current_time =  Math.floor(this.currentTime());
    if ( current_time > 0 && ( current_time == duration_time ) ){
      window.location = "/assignment"+location.pathname.slice(location.pathname.lastIndexOf("e")+1)
    }
  });

  let clicked = false;

  this.one('click', function(e){
    if(!clicked){
      clicked = true;
      $.ajax({
        type: 'POST',
        url: "",
      });
    }
  })
});