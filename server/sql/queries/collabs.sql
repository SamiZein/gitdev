-- name: CreateCollab :one
INSERT INTO collabs (user1_github_id, user2_github_id)
VALUES ($1, $2)
RETURNING *;
-- name: RemoveCollabsPendingStatus :one
UPDATE collabs
SET pending = FALSE
WHERE user1_github_id = $1
    AND user2_github_id = $2
RETURNING *;
-- name: GetUsersCollabs :many
SELECT *
FROM users
    JOIN collabs ON users.github_id = collabs.user2_github_id
WHERE collabs.user1_github_id = $1
    AND collabs.pending = FALSE;
SELECT *
FROM users
    JOIN collabs ON users.github_id = collabs.user1_github_id
WHERE collabs.user2_github_id = $1
    AND collabs.pending = FALSE;