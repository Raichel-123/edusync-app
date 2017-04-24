function validate(){
var username = document.getElementById("user").value;
var password = document.getElementById("pass").value;
if(username == ""){
    alert("Please enter a User Name")
    formLogin.username.focus()
    return false
}
if(password == ""){
    alert("Please enter a Password")
    formLogin.password.focus()
    return false
}
if( username == "test" && password == "test"){
    alert("Login successfully");

    return false;
}
else{
 alert("Login failed - Please enter correct Username and Password")
}
}

function userid_validation(uid,mx,my)
{
var uid_len = uid.value.length;
if (uid_len == 0 || uid_len >= my || uid_len < mx)
{
alert("User Id should not be empty / length be between "+mx+" to "+my);
uid.focus();
return false;
}
return true;
}
function passid_validation(passid,mx,my)
{
var passid_len = passid.length;
if (passid_len == 0 ||passid_len >= my || passid_len < mx)
{
alert("Password should not be empty / length be between "+mx+" to "+my);
passid.focus();
return false;
}
return true;
}
function ValidateEmail(uemail)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.match(mailformat))
{
  alert("mai doobara sahi hoon")
return true;
}
else
{
alert("You have entered an invalid email address!");
uemail.focus();
return false;
}
}
function checkpass(confirmPassword,passid){
if (passid != confirmPassword) {
               alert("Passwords do not match.");
               return false;
           }
           
           return true;
}
function allLetter(uname)
{
var letters = /^[A-Za-z]+$/;
if(uname.value.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
uname.focus();
return false;
}
}


function check(){
  var uid = document.getElementById("user1");
  var passid = document.getElementById("pass1").value;
  var confirmPassword = document.getElementById("pass2").value;
  var uemail=document.getElementById("email").value;
  var uname = document.getElementById("name");





  if(userid_validation(uid,5,12))  {
    if(passid_validation(passid,7,12))
{
  if(checkpass(confirmPassword,passid))
{
  if(ValidateEmail(uemail))
{
  if(allLetter(uname))
{
}

}
  }
}
}
  return false;
}
