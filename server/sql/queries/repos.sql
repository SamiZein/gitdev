-- name: CreateRepo :one
INSERT INTO repos (
        name,
        user_github_id,
        star_gazers,
        watchers,
        url,
        repo_created_at,
        repo_updated_at
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
    )
RETURNING id;
-- name: GetUsersRepos :many
SELECT *
FROM repos
WHERE user_github_id = $1;