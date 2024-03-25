-- +goose Up
CREATE TABLE revoked_tokens (
    id UUID PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    revoked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- +goose Down
DROP TABLE revoked_tokens;