let time = 60*15;

function timer(){
  if(time==0)
    alert('time up prick');
  time = time - 1;
  let min = parseInt(time/60);
  let sec = time%60;
  $('#timer h3').text(`Time Remaining: ${min}:${sec}`);
}

setInterval(timer, 1000)