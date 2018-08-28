DROP TABLE IF EXISTS users; 

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastName TEXT,
    likes TEXT,
    birthdate DATE,
    flag Boolean
);

INSERT INTO users (firstname, lastName, birthdate)
VALUES ('Fred', 'Flintstone', '1/1/1960');

INSERT INTO users (firstname, lastName, flag)
VALUES ('Wilma', 'Flintstone', false);

INSERT INTO users (firstname, lastName)
VALUES 
('Pebbles', 'Flintstone'),
('Barney', 'Rubble'),
('Betty', 'Rubble'),
('Bamm-Bamm', 'Rubble');