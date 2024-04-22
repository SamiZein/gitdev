-- name: CreateUser :one
INSERT INTO users (
        github_created_at,
        access_token,
        name,
        username,
        github_id,
        email,
        followers,
        following,
        bio,
        avatar_url,
        location
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
    )
RETURNING github_id;
-- name: UpdateUserInfo :exec
UPDATE users
SET name = $1,
    username = $2,
    email = $3,
    bio = $4,
    updated_at = CURRENT_TIMESTAMP;
-- name: UpdateUserToken :exec
UPDATE users
SET access_token = $1,
    updated_at = CURRENT_TIMESTAMP;
-- name: GetAllUsers :many
SELECT *
FROM users
LIMIT 20;
-- name: UpdateUserByGithubID :one
UPDATE users
SET access_token = $1
WHERE github_id = $2
RETURNING *;
-- name: GetUserByGithubID :one
SELECT users.*,
    COUNT(repos.*) AS num_repos
FROM users
    LEFT JOIN repos ON users.github_id = repos.user_github_id
WHERE github_id = $1
GROUP BY users.id;