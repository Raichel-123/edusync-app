var player;

videojs("my-video").ready(function(){
      myPlayer = this;
      console.log(this);
});

$('ul.nav li').click(function(e){
  $('ul.nav li').removeClass('active');
  $(this).addClass('active');
  myPlayer.src({"type":"video/mp4", "src": "lectures/"+e.target.text });
});
