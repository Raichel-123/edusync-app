
$('ul.nav li').click(function(e){
  console.log(e);
  $('ul.nav li').removeClass('active');
  $(this).addClass('active');
});
