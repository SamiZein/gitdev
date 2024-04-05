-- name: CreateUser :one
INSERT INTO users (
        id,
        access_token,
        name,
        username,
        github_id,
        email,
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
        $8
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
-- name: GetUserByGitHubID :one
SELECT *
FROM users
WHERE github_id = $1;