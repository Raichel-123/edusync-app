var player;

videojs("my-video").ready(function(){
      myPlayer = this;
      console.log(this);
});

$('#lecturelist li').click(function(e){
  console.log(e);
  $('#lecturelist li').removeClass('active');
  $(this).addClass('active');
  myPlayer.src({"type":"video/mp4", "src": "lectures/"+e.target.text });
});
