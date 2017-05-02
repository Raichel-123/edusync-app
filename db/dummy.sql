#now type mysql -u edusync -p
#enter password as edusync
#Enter the following commands into the cmd and press enter
use edusync;

insert into teacher(name, password, email, phonenum, department)
	values('test','test','test@gmail.com','9876543210','CS');

insert into course(name, description, tid, type) values('test course', 'test descript', 1, 'test type');