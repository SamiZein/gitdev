-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    github_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    access_token TEXT NOT NULL,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    github_id INT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    followers INT NOT NULL,
    following INT NOT NULL,
    bio TEXT NOT NULL,
    title VARCHAR(16) NOT NULL DEFAULT 'Fullstack',
    avatar_url TEXT NOT NULL,
    location TEXT NOT NULL
);
-- +goose Down
DROP TABLE users;