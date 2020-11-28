-- CREATE TYPE SEX AS ENUM ('Male', 'Female');

-- CREATE TABLE public."Students"(
--     Id SERIAL PRIMARY KEY,
--     Name  VARCHAR(255),
--     Email VARCHAR(50),
--     Phone VARCHAR(20),
--     Sex SEX,
--     BirthDate DATE
-- );

SELECT Name FROM public."Students" WHERE Email = 'zemmezywuwy-2482@yopmail.com'

-- DELETE FROM public."Students"

-- ALTER TABLE public."Students" ADD CONSTRAINT UNIQUE_CODE UNIQUE(Code)