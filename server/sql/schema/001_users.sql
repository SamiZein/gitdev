-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    github_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    access_token VARCHAR(255) NOT NULL,
    name VARCHAR(64) NOT NULL,
    username VARCHAR(39) UNIQUE NOT NULL,
    github_id INT UNIQUE NOT NULL,
    email VARCHAR(320) NOT NULL,
    followers INT NOT NULL,
    following INT NOT NULL,
    bio TEXT NOT NULL,
    title VARCHAR(64) NOT NULL DEFAULT 'Fullstack',
    description VARCHAR(255) NOT NULL DEFAULT '',
    avatar_url VARCHAR(2048) NOT NULL,
    location VARCHAR(255) NOT NULL
);
-- +goose Down
DROP TABLE users;