-- name: CreateRepoLanguage :exec
INSERT INTO repos_languages (repo_id, language_id, bytes)
VALUES ($1, $2, $3);
-- name: GetUserLanguagesBytes :many
SELECT SUM(bytes) AS bytes,
    languages.name
FROM repos_languages
    JOIN repos ON repos.id = repos_languages.repo_id
    JOIN languages ON repos_languages.language_id = languages.id
    JOIN users ON repos.user_id = users.id
WHERE users.github_id = $1
GROUP BY languages.name;