/* INSERT INTO table_name (col1, col2, col3) VALUES (val1, val2. val3) */

INSERT INTO user (id, name, email) VALUES (5, 'Daniel', 'Daniel@gmail.com');
INSERT INTO user (id, name, email) VALUES (1, 'Bhawesh', 'bhawesh@gmail.com');
INSERT INTO user (id, name, email) VALUES (3, 'Akash', 'Akash@gmail.com');
INSERT INTO user (id, name, email) VALUES (4, 'Sashmita', 'Sashmita@gmail.com');
INSERT INTO user (id, name, email) VALUES (2, 'Shivam', 'Shivam@gmail.com');

INSERT INTO user (id, name) VALUES (2, 'Akash');
-- INSERT INTO user (id, email) VALUES (3, 'Sashmita'); 
/*ERROR : 
20:58:44	INSERT INTO user (id, email) VALUES (3, 'Sashmita')	Error Code: 1364. Field 'name' doesn't have a default value	0.015 sec
*/

INSERT INTO user VALUES (4, 'Daniel', 'Daniel@gmail.com', NOW());/* mandatory to provide values for all the columns*/


/* UPDATE */

-- UPDATE table_name SET column_name = value_we_want_to_set provide_condition;
UPDATE user SET email = 'akash@gmail.com' WHERE id = 2;
UPDATE user SET email = NULL WHERE id = 1;

/* DELETE */
-- DELETE FROM table_name provide_condition; /* to delete a record based upon the provided condition*/
DELETE FROM user WHERE id = 1;
 
 -- DELETE FROM table_name; /* to delete all the records of the table*/
 DELETE FROM user;




DESC user; /* describe the structure of table user*/
SELECT * from user; /* shows all the data of table user*/

