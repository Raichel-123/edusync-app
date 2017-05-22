let db = require('./db/helper');

let x= [1,2,3,4,5];
for(let i=1; i<20; i++){
  for(let j in x){
    let val = x[j];
    let times= parseInt((Math.random()*100)%10);
    let pass = false;
    if(times%2==0)
      pass = true;
    db.query("insert into attempt(lid, uid, count, pass, percentage) values(?,?,?,?,?)", [val,i,times,pass, 80]);
}
}