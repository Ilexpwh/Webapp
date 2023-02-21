/*CREATE DATABASE default;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE orderlist(
    todo_id SERIAL PRIMARY KEY,
    sonumber varchar(10),
    awh varchar(20),
    qty numeric(5,0),
    weight numeric(10,2),
    date date not null default current_date,
    length numeric(5,0),
    width numeric(5,0),
    height numeric(5,0),
    companyname varchar(100)
);

CREATE TABLE test(
    todo_id SERIAL PRIMARY KEY,
    sonumber varchar(10),
    awh varchar(20),
    qty numeric(5,0),
    weight numeric(10,2),
    pdate date not null default current_date,
    length numeric(5,0),
    width numeric(5,0),
    height numeric(5,0),
    companyname varchar(100)
);

create table client(
    username varchar(20) PRIMARY KEY,
    password varchar(100)
);

create table staff(
    username varchar(20) PRIMARY KEY,
    password varchar(100)
);