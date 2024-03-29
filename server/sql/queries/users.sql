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
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;
-- name: GetAllUsers :many
SELECT *
FROM users
LIMIT 20;