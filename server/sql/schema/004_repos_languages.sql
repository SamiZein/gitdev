-- +goose Up
CREATE TABLE repos_languages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    repo_id UUID NOT NULL REFERENCES repos(id),
    language_id UUID NOT NULL REFERENCES languages(id),
    UNIQUE(repo_id, language_id),
    bytes INT NOT NULL
);
-- +goose Down
DROP TABLE repos_languages;