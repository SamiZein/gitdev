-- +goose Up
CREATE TABLE collabs(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user1_github_id INT NOT NULL REFERENCES users(github_id) ON DELETE CASCADE,
    user2_github_id INT NOT NULL REFERENCES users(github_id) ON DELETE CASCADE,
    UNIQUE(user1_github_id, user2_github_id),
    message VARCHAR(255),
    pending BOOLEAN NOT NULL DEFAULT TRUE
);
-- +goose Down
DROP TABLE collabs;