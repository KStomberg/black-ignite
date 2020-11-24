
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(1000) NOT NULL,
    "password" VARCHAR(1000) NOT NULL,
    "authLevel" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN DEFAULT false,
    "likes" INT DEFAULT 30
);
--create database called "Black_Ignite"
--should be noted that some of rows such as 
--"image_url and video_url may change depending on AWS S3 requirements
-- in that event tables will have to be deleted in the following order 

--DROP TABLE "like";
--DROP TABLE "submission";
--DROP TABLE "category";
--DROP TABLE "user";



CREATE TABLE "category" (
"id" SERIAL PRIMARY KEY,
"title" VARCHAR(1000) NOT NULL,
"description_url" VARCHAR(50000) NOT NULL,
"image_url" VARCHAR(50000) NOT NULL,
"is_deleted" BOOLEAN DEFAULT FALSE
);
CREATE TABLE "submission" (
"id" SERIAL PRIMARY KEY,
"category_id" INT NOT NULL REFERENCES "category",
"full_name" VARCHAR(10000) NOT NULL,
"email" VARCHAR(10000) NOT NULL,
"instagram" VARCHAR(5000),
"linkedin" VARCHAR(5000), 
"twitter" VARCHAR(5000),
"comments" VARCHAR(50000),
"time_stamp" VARCHAR(50000),
"video_url" VARCHAR(50000) NOT NULL,
"form_status" BOOLEAN DEFAULT FALSE,
"likes" INT DEFAULT 0
);

CREATE TABLE "like"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user",
    "submission_id" INT NOT NULL REFERENCES "submission"
);
