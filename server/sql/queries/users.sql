-- name: CreateUser :one
INSERT INTO users (
        id,
        access_token,
        name,
        username,
        github_id,
        repos,
        email,
        bio,
        avatar_url
    )
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (github_id) DO
UPDATE
SET access_token = $2,
    updated_at = $10
RETURNING *;
-- name: GetAllUsers :many
SELECT *
FROM users
LIMIT 20;
-- name: GetUserByToken :one
SELECT *
FROM users
WHERE github_id = $1;