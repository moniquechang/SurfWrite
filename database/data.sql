-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("name", "username", "hashedPassword", "location")
values ('example name', 'example username', 'example hashedpassword', 'example location');
