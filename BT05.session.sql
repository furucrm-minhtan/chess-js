DROP TABLE IF EXISTS Student;

CREATE TABLE Student(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    Code VARCHAR(255),
    Name VARCHAR(255),
    Email VARCHAR(50),
    Address VARCHAR(255),
    Phone VARCHAR(20),
    Subject VARCHAR(255),
    BirthDate DATE,
    Gender ENUM ('Male','Female')
);