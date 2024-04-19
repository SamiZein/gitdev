-- +goose Up
CREATE TABLE repos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    user_github_id INT NOT NULL REFERENCES users(github_id) ON DELETE CASCADE,
    star_gazers INT NOT NULL,
    watchers INT NOT NULL,
    url TEXT NOT NULL,
    repo_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    repo_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose Down
DROP TABLE repos;