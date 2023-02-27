CREATE TABLE orderlist(
    order_id SERIAL PRIMARY KEY,
    sonumber varchar(10),
    awb varchar(20),
    qty numeric(5,0),
    weight numeric(10,2),
    length numeric(5,0),
    width numeric(5,0),
    height numeric(5,0),
    date date not null default current_date,
    companyname varchar(100)
);

//separate login
create table client(
    username varchar(20) PRIMARY KEY,
    password varchar(100)
);

create table staff(
    username varchar(20) PRIMARY KEY,
    password varchar(100)
);

//combined login with admin
create table login(
    username varchar(20),
    password varchar(20),
    admin boolean
)