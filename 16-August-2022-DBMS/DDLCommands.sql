CREATE DATABASE Users;
USE Users;
CREATE TABLE user (
	id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    createdAt DATETIME DEFAULT NOW()
);

ALTER TABLE user ADD COLUMN address VARCHAR(200);

ALTER TABLE user RENAME COLUMN address TO homeAddress;

RENAME TABLE user to customer;

TRUNCATE TABLE customer;

DROP TABLE IF EXISTS customer;

-- describe user;
-- describe customer;



show tables;