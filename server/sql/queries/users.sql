-- name: CreateUser :one
INSERT INTO users (
        id,
        access_token,
        name,
        username,
        github_id,
        email,
        followers,
        following,
        panel_body,
        avatar_url
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
        $10
    )
RETURNING id;
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
SELECT *
FROM users
WHERE github_id = $1;