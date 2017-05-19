#open cmd and type mysql -u root -p
#Enter the password which you added in during setup
#Then copy the following commands till exit into the terminal and press enter
CREATE USER 'edusync'@'localhost' IDENTIFIED BY 'edusync';
GRANT ALL PRIVILEGES ON * . * TO 'edusync'@'localhost';
exit

#now type mysql -u edusync -p
#enter password as edusync
#Enter the following commands into the cmd and press enter
create database edusync;
use edusync;
create table student (
	id int auto_increment primary key,
	usn char(10) unique,
	name varchar(56),
	sem int,
	year int,
	10th int,
	12th int,
	engg int,
	email char(255),
	password varchar(12)
);

create table teacher (
	id int auto_increment primary key,
	name varchar(35),
	password varchar(25),
	email char(250) unique,
	phonenum varchar(12),
	department varchar(10)
);

create table course (
	id int auto_increment primary key,
	name char(250),
	description text,
	tid int references teacher(id),
	type varchar(30),
	created_at datetime,
	modified_at datetime
);

create table lectures (
	id int auto_increment primary key,
	cid int references course(id),
	name varchar(35),
	created_at datetime,
	modified_at datetime,
	seqno int
);

create table videolectures (
	id int auto_increment primary key,
	lid int references lectures(id),
	raw blob
);


create table assignment (
	id int auto_increment primary key,
	lid int references lectures(id),
	question text,
	option1 char(255),
	option2 char(255),
	option3 char(255),
	option4 char(255),
	answer int
);

create table enroll (
	id int auto_increment primary key,
	cid int references course(id),
	uid varchar(9)references student(id),
	enroll_date datetime
);

create table views (
	id int auto_increment primary key,
	uid varchar(9) references student(id),
	lid int references lecture(id),
	watch_date datetime
);

create table attempt (
	id int auto_increment primary key,
	lid int references lectures(id),
	count int,
	pass boolean,
	percentage int,
	uid int references user(id)
);

create table mandatory (
	id int auto_increment primary key,
	tid int references teacher(id),
	cid int references course(id),
	uid int references student(id)
);
