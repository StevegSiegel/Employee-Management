DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
    id INT AUTO_INCREMENT NOT NULL,
    department VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL(7,2) NOT NULL,
    depId INT(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    roleId INT(10) NOT NULL,
    managerId INT(10),
    PRIMARY KEY (id)
);