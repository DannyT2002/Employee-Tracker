const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: '',
  password: '',
  host: 'localhost',
  database: 'employees_db',
  port: '5432'
});

const mainMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
      name: "action",
    },
  ]).then(({ action }) => {
    switch (action) {
      case 'View all departments':
        pool.query('SELECT * FROM department', (err, res) => {
          if (err) throw err;
          console.table(res.rows);
          mainMenu();
        });
        break;
      case 'View all roles':
        pool.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          console.table(res.rows);
          mainMenu();
        });
        break;
      case 'View all employees':
        pool.query('SELECT * FROM employee', (err, res) => {
          if (err) throw err;
          console.table(res.rows);
          mainMenu();
        });
        break;
      case 'Add a department':
        inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        }).then(({ name }) => {
          pool.query('INSERT INTO department (name) VALUES ($1)', [name], (err) => {
            if (err) throw err;
            console.log(`Added department ${name}`);
            mainMenu();
          });
        });
        break;
      case 'Add a role':
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:',
          },
          {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID the role belongs to:',
          },
        ]).then((roleDetails) => {
          pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleDetails.title, roleDetails.salary, roleDetails.department_id], (err) => {
            if (err) throw err;
            console.log(`Added role ${roleDetails.title}`);
            mainMenu();
          });
        });
        break;
      case 'Add an employee':
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID of the employee:',
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID of the employee (leave blank if none):',
            default: null,
          },
        ]).then((employeeDetails) => {
          pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId], (err) => {
            if (err) throw err;
            console.log(`Added employee ${employeeDetails.firstName} ${employeeDetails.lastName}`);
            mainMenu();
          });
        });
        break;
      case 'Update an employee role':
        inquirer.prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee to update:',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter the new role ID:',
          },
        ]).then((updateDetails) => {
          pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [updateDetails.roleId, updateDetails.employeeId], (err) => {
            if (err) throw err;
            console.log(`Updated employee ID ${updateDetails.employeeId} to role ID ${updateDetails.roleId}`);
            mainMenu();
          });
        });
        break;
      case 'Exit':
        process.exit();
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mainMenu();
});
