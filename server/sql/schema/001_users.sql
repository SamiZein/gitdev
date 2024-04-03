-- +goose Up
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    access_token TEXT NOT NULL,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    github_id INT UNIQUE NOT NULL,
    repos INT NOT NULL,
    following INT NOT NULL,
    followers INT NOT NULL,
    email TEXT NOT NULL,
    panel_body TEXT,
    role TEXT,
    avatar_url TEXT NOT NULL
);
-- +goose Down
DROP TABLE users;