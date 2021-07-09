USE employee_db;

INSERT INTO departments (id, department)
    VALUES 
        (1, 'management'),
        (2, 'legal'),
        (3, 'developer');

INSERT INTO roles (id, title, salary, depId)
    VALUES
        (1, 'mangaer', 80000.00, 1),
        (2, 'lawyer', 90000.00, 2),
        (3, 'developer', 70000.00, 3);

INSERT INTO employees (id, firstName, lastName, roleId, managerId)
    VALUES
        (1, 'Billy', 'Bob', 1, NULL),
        (2, 'Jeff', 'Jefferson', 2, 1),
        (3, 'Steve', 'Steverson', 3, 1);