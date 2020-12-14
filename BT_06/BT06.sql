
CREATE TABLE Students(
    Id SERIAL PRIMARY KEY,
    Name  VARCHAR(255),
    Email VARCHAR(50),
    Phone VARCHAR(20),
    Sex ENUM ('Male', 'Female'),
    BirthDate DATE,
    Subject VARCHAR(255)
);

