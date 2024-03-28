-- name: CreateUser :one
INSERT INTO users (id, github_username, access_token)
VALUES ($1, $2, $3)
RETURNING *;
-- name: GetUsers :many
SELECT *
FROM users
LIMIT 20;