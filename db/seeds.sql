-- Insert sample departments
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('HR');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 55000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 60000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Johnson', 3, NULL);
