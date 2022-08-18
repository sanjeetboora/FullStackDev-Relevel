

/* SELECT */
/* SELECT * FROM table_name */
SELECT * FROM user; /* view all records from user table */
SELECT name, email FROM user; /* view name and email columns of all records from user table */
SELECT * FROM user WHERE id > 3; /* view all the records where id is greater than 3 */
SELECT name FROM user WHERE id >= 3; /* view all the names where id is greater than or equals to 3 */
SELECT * FROM user ORDER BY id ASC; /* view all the records from user table in ascending order by id*/
SELECT * FROM user ORDER BY name DESC; /* view all the records from user table in descending order by name*/
SELECT * FROM user LIMIT 3; /* view top 3 records */
SELECT * FROM user ORDER BY name DESC LIMIT 3; /* view top 3 records from user table in descending order by name*/
SELECT * FROM user WHERE id > 2 AND id < 5; /* view all the records where id is greater than 2 and id is smaller than 5 */
SELECT * FROM user WHERE id <= 2 OR id >= 5; /* view all the records where id is smaller than equals to 2 or id is greater than equals to 5 */
SELECT * FROM user WHERE id <= 2 AND id >= 5; /* view all the records where id is smaller than equals to 2 and id is greater than equals to 5 */
SELECT * FROM user WHERE id BETWEEN 2 AND 5; /* view all the records where id is between 2 and 5*/
SELECT * FROM user WHERE id NOT BETWEEN 2 AND 4; /* view all the records where id is not between 2 and 4 */
SELECT * FROM user WHERE name IN ('Lorem','Bhawesh', 'Xyz','Daniel'); /* view all the records who's name is in ['Lorem','Bhawesh', 'Xyz','Daniel'] */
SELECT * FROM user WHERE name NOT IN ('Lorem','Bhawesh', 'Xyz','Daniel'); /* view all the records who's name is not in ['Lorem','Bhawesh', 'Xyz','Daniel'] */
SELECT * FROM user WHERE name LIKE 'S%'; /* view all the records who's name's first letter is S */
SELECT * FROM user WHERE name LIKE '%a'; /* view all the records who's name's last letter is A */
SELECT * FROM user WHERE name LIKE '_A%'; /* view all the records who's name's second letter is A */
SELECT * FROM user WHERE name LIKE '%H%'; /* view all the records who's name's has letter H */
SELECT * FROM user WHERE name LIKE '%A_'; /* view all the records who's name's last second letter is A */
SELECT * FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%';/* view all the records who's name's second letter is A or last second letter is A */
SELECT * FROM user WHERE createdAt BETWEEN '2022-08-17 22:02:49' AND '2022-08-17 22:03:49'; /* view all the records where createdAt is between '2022-08-17 22:02:49' AND '2022-08-17 22:03:49' */
/* aggregrator functions */
SELECT AVG(id) FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%'; /* view average of ids of all the records who's name's second letter is A or last second letter is A */
SELECT COUNT(id) FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%';/* view count of ids of all the records who's name's second letter is A or last second letter is A */
SELECT SUM(id) FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%';/* view sum of ids of all the records who's name's second letter is A or last second letter is A */
SELECT MIN(id) FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%';/* view min of ids of all the records who's name's second letter is A or last second letter is A */
SELECT MAX(id) FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%';/* view max of ids of all the records who's name's second letter is A or last second letter is A */
SELECT * FROM user WHERE name LIKE '%A_' OR  name LIKE '_A%' ORDER BY id DESC LIMIT 2;

