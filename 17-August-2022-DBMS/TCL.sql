
select * from user;
UPDATE user SET email = 'guptaa@gmail.com' WHERE id = 2;
INSERT INTO user (id, name, email) VALUES (6, 'XYZ', 'XYZ@gmail.com');
ROLLBACK;


select * from user;
INSERT INTO user (id, name, email) VALUES (6, 'XYZ', 'XYZ@gmail.com');
COMMIT;
ROLLBACK;