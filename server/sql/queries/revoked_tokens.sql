-- name: CreateRevokedToken :one
INSERT INTO revoked_tokens (token)
VALUES ($1)
RETURNING *;
-- name: CountRevokedToken :one
SELECT COUNT(*)
FROM revoked_tokens
WHERE token = $1;