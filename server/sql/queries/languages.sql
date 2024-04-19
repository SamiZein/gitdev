-- name: CreateLanguage :one
INSERT INTO languages (name, color)
VALUES ($1, $2)
RETURNING id;
-- name: GetReposLanguages :many
SELECT languages.name
FROM languages
    JOIN repos_languages ON languages.id = repos_languages.language_id
    JOIN repos ON repos_languages.repo_id = repos.id
WHERE repos_languages.repo_id = $1;