const path = require('path');
const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./db/connection');

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    console.log('welcome to the employee database')
    options();
};

function options() {
    inquirer.prompt([{
        type: 'list',
        name: 'doThis',
        message: 'what would you like to do?',
        choices: [
            {
                name: 'view all employees',
                value: 'view_employees'
            },
            {
                name: 'view all roles',
                value:'view_roles',
            },
            {
                name: 'view all departments',
                value: 'view_dep'
            },
            {
                name: 'add employee',
                value: 'add_employee'
            },
            {
                name: 'add role',
                value: 'add_role'
            },
            {
                name: 'add department',
                value: 'add_dep'
            },
            {
                name: 'update role',
                value: 'update_role'
            }

        ]
    }]).then(({doThis}) => {
        if (doThis === 'view_employees') {
            viewEmployee();
        } else if (doThis === 'view_roles') {
            viewRoles();
        } else if (doThis === 'view_dep') {
            viewDep();
        } else if (dothis === 'add_employee') {
            addEmployee();
        } else if (doThis === 'add_role') {
            addRole();
        } else if (doThis === 'add_dep') {
            addDep();
        } else if (doThis === 'update_role') {
            updateRole();
        }
    })
};

function viewEmployee() {
    console.log('selecting all employees');
    connection.query("SELECT firstName AS `First Name`, lastName AS `Last Name`, roleId AS `Role Id` FROM employees", function(err, res) {
        if (err) throw err;
        console.table(res);
        finish();
    });
};

function viewRoles() {
    console.log('selecting all roles');
    connection.query('SELECT title AS `Title`, salary AS `Salary`, depId AS `Department Id` FROM roles', function(err, res) {
        if (err) throw err;
        console.table(res);
        finish();
    });
};

