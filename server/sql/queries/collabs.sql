-- name: CreateCollab :one
INSERT INTO collabs (id, user1_github_id, user2_github_id)
VALUES ($1, $2, $3)
RETURNING *;
-- name: RemoveCollabsPendingStatus :one
UPDATE collabs
SET pending = FALSE
WHERE user1_github_id = $1
    AND user2_github_id = $2
RETURNING *;
-- name: GetUsersCollabs :many
SELECT user1.username AS user1_username,
    user1.email AS user1_email,
    user1.github_id AS user1_github_id,
    user2.username AS user2_username,
    user2.email AS user2_email,
    user2.github_id AS user2_github_id
FROM collabs
    JOIN users user1 ON user1.github_id = collabs.user1_github_id
    JOIN users user2 ON user2.github_id = collabs.user2_github_id
WHERE (
        collabs.user1_github_id = $1
        OR collabs.user2_github_id = $1
    )
    AND collabs.pending = FALSE;