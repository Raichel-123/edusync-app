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
	id int auto_increment primary key not null,
	usn char(10) unique,
	name varchar(56),
	sem int,
	year int,
	10th int,
	12th int,
	engg int,
	email char(255),
	password varchar(12)
)ENGINE=InnoDB;

create table teacher (
	id int auto_increment primary key not null,
	name varchar(35),
	password varchar(25),
	email char(250) unique,
	phonenum varchar(12),
	department varchar(10)
)ENGINE=InnoDB;

create table course (
	id int auto_increment primary key not null,
	name char(250),
	description text,
	tid int,
	type varchar(30),
	created_at datetime,
	modified_at datetime,
	foreign key (tid) references teacher(id)
	ON update cascade
)ENGINE=InnoDB;

create table lectures (
	id int auto_increment primary key not null,
	cid int,
	name varchar(35),
	notes text,
	video LONGBLOB,
	created_at datetime,
	modified_at datetime,
	seqno int,
	foreign key (cid) references course(id) ON update cascade
)ENGINE=InnoDB;

create table assignment (
	id int auto_increment primary key not null,
	lid int,
	question text,
	option1 char(255),
	option2 char(255),
	option3 char(255),
	option4 char(255),
	answer int,
	foreign key (lid)  references lectures(id) ON update cascade
)ENGINE=InnoDB;

insert into assignment(lid, question, option1, option2, option3, option4, answer) values(1, "If a process fails, most operating system write the error information to a", " log file", "another running process", "new file", "All", 1);

create table enroll (
	id int auto_increment primary key not null,
	cid int,
	uid int,
	enroll_date datetime,
	foreign key (cid) references course(id) ON update cascade,
	foreign key (uid) references student(id) ON update cascade
)ENGINE=InnoDB;

create table views (
	id int auto_increment primary key not null,
	uid int,
	lid int,
	foreign key (uid) references student(id) ON update cascade,
	foreign key (lid) references lectures(id) ON update cascade,
	watch_date datetime
)ENGINE=InnoDB;

create table attempt (
	id int auto_increment primary key not null,
	lid int,
	count int,
	pass boolean,
	percentage int,
	foreign key (lid) references lectures(id) ON update cascade,
	uid int,
	foreign key (uid) references student(id) ON update cascade
)ENGINE=InnoDB;

create table mandatory (
	id int auto_increment primary key not null,
	tid int,
	cid int,
	uid int,
	foreign key (tid) references teacher(id) ON update cascade,
	foreign key (cid) references course(id) ON update cascade,
	foreign key (uid) references student(id) ON update cascade
)ENGINE=InnoDB;
