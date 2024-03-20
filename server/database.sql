CREATE DATABASE pernproject;

CREATE TABLE runner(
    runner_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    dateOfBirth DATE
);