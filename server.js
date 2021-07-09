const path = require('path');
const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./db/connection');


connection.connect(function (err) {
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
                value: 'view_roles',
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
    }]).then(({ doThis }) => {
        if (doThis === 'view_employees') {
            viewEmployee();
        } else if (doThis === 'view_roles') {
            viewRoles();
        } else if (doThis === 'view_dep') {
            viewDep();
        } else if (doThis === 'add_employee') {
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
    connection.query("SELECT firstName AS `First Name`, lastName AS `Last Name`, roleId AS `Role Id` FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        finish();
    });
};


function viewRoles() {
    console.log('selecting all roles');
    connection.query('SELECT title AS `Title`, salary AS `Salary`, depId AS `Department Id` FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        finish();
    });
};


function viewDep() {
    console.log('selecting all departments');
    connection.query('SELECT id as `ID`, department AS `Department` FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        finish();
    });
};



function addEmployee() {
    connection.query('SELECT id, title FROM roles', function (err, res) {
        if (err) throw err;
        const roles = res.map(element => element.title)
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "what is the new employee's first name",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "what is the new employee's last name"
            },
            {
                type: 'list',
                name: 'roles',
                message: 'what is their role',
                choices: roles
            }
        ]).then(answers => {
            const role = res.find(element => {
                return element.title === answers.roles
            });
            console.log(role.id);
            const newEmployee = {
                firstName: answers.firstName,
                lastName: answers.lastName,
                roleId: role.id
            };
            connection.query('INSERT INTO employees SET ?', newEmployee, (err, success) => {
                if (err) throw err;
                console.log(`${newEmployee.firstName} was added successfully`);
                finish();
            });
        });
    });
};


function addRole() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        const departments = res.map(element => {
            return element.id
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'what is their title'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'what is their salary'
            },
            {
                type: 'list',
                name: 'depId',
                message: 'what department are they in',
                choices: departments
            }
        ]).then(function (answer) {
            connection.query('INSERT INTO roles SET ?', answer, function (err) {
                if (err) throw err;
                console.log(`${answer.title} was added`);
                finish();
            });
        });
    });
};


function addDep() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        const departments = res.map(element => {
            return element.id
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'what department are they in'
            }
        ]).then(function (answer) {
            connection.query('INSERT INTO departments SET ?', answer, function (err) {
                if (err) throw err;
                console.log(`${answer.department} was added`);
                finish();
            });
        });
    });
};



function updateRole() {
    connection.query("Select * from employees", function (err, res) {
      if (err) throw err;
      //new list of first and last names
      const names = res.map(element => {
        return `${element.id}: ${element.firstName} ${element.lastName}`
      })
      connection.query("SELECT title, id from roles", function(err, success) {
        if (err) throw err;
        const roles = success.map(element => element.title);  
        inquirer.prompt([
          {
            name: "who",
            type: "list",
            choices: names,
            message: "Whom would you like to update?"
          }, {
            name: "roles",
            type: "list",
            message: "What is the title of their new role?",
            choices: roles
          }
        ]).then(answers => {
          console.log(answers);
          const empIdToUpdate = answers.who.split(":")[0];
          console.log(empIdToUpdate)
          const chosenRole = success.find(element => {
            return element.title === answers.roles
          });
          console.log(chosenRole.id);
          connection.query("UPDATE employees SET roleId=? where id=?", [chosenRole.id, empIdToUpdate], function(err, yay) {
            if (err) throw err;
            console.log(`role successfully changed`)
            finish();
          })
          
        })
      })
    })
  
  }

function finish() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'finish',
                message: 'would you like to continue working',
                choices: [
                    {
                        name: 'yes',
                        value: true
                    },
                    {
                        name: 'no',
                        value: false
                    }
                ]
            }
        ]).then(function (answers) {
            if (answers.finish) {
                options()
            } else {
                console.log('goodbye');
                process.exit();
            }
        })
    };