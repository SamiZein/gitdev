-- +goose Up
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    github_user_id INTEGER UNIQUE NOT NULL,
    access_token TEXT NOT NULL
);
-- +goose Down
DROP TABLE users;