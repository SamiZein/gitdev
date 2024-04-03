-- name: CreateUser :one
INSERT INTO users (
        id,
        access_token,
        name,
        username,
        github_id,
        repos,
        following,
        followers,
        email,
        role,
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
        $10,
        $11,
        $12
    ) ON CONFLICT (github_id) DO
UPDATE
SET access_token = $2,
    updated_at = CURRENT_TIMESTAMP
RETURNING *;
-- name: GetAllUsers :many
SELECT *
FROM users
LIMIT 20;
-- name: GetUserByGitHubID :one
SELECT *
FROM users
WHERE github_id = $1;