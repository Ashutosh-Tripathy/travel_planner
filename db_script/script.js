CREATE TABLE IF NOT EXISTS `trips` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `destination` VARCHAR(255), `startdate` DATETIME, `enddate` DATETIME, `created_at` DATETIME NOT NULL, `updated_at` DATETIME, `deleted_at` DATETIME, `user_id` INTEGER REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255), `role` TEXT DEFAULT 'user', `created_at` DATETIME NOT NULL, `updated_at` DATETIME, `deleted_at` DATETIME);



INSERT INTO `users` (`id`,`name`,`role`,`created_at`,`updated_at`) VALUES (NULL,'Ashutosh','user','2017-12-15 08:07:00.654 +00:00','2017-12-15 08:07:00.654 +00:00');
INSERT INTO `trips` (`id`,`destination`,`startdate`,`enddate`,`created_at`,`updated_at`,`user_id`) VALUES (NULL,'Goa','2017-12-15 08:07:00.654 +00:00','2017-12-15 08:07:00.654 +00:00','2017-12-15 08:15:48.994 +00:00','2017-12-15 08:15:48.994 +00:00',1);



curl -X POST -H "Content-Type: application/json" -d '{"name":"Ashutosh", "role":"user"}' "http://52.230.121.175/user"
curl -X POST -H "Content-Type: application/json" -d '{"destination":"Goa", "startdate": "2017-12-15 08:07:00.654 +00:00", "enddate": "2017-12-15 08:07:00.654 +00:00", "user_id": 1}' "http://52.230.121.175/trip"

