-- name: CreateLanguage :one
INSERT INTO languages (id, name)
VALUES ($1, $2) ON CONFLICT (name) DO
UPDATE
SET name = EXCLUDED.name
RETURNING id;