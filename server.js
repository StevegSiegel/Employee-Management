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

