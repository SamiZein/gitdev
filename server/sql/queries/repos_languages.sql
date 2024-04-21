-- name: CreateRepoLanguage :exec
INSERT INTO repos_languages (repo_id, language_id, bytes)
VALUES ($1, $2, $3);
-- name: GetUserLanguagesBytes :many
SELECT SUM(bytes) AS bytes,
    languages.name,
    languages.color
FROM repos_languages
    JOIN repos ON repos.id = repos_languages.repo_id
    JOIN languages ON repos_languages.language_id = languages.id
    JOIN users ON repos.user_github_id = users.github_id
WHERE users.github_id = $1
GROUP BY languages.name,
    languages.color
ORDER BY bytes DESC;