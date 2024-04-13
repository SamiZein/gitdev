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
SELECT *
FROM collabs
WHERE (
        user1_github_id = $1
        OR user2_github_id = $1
    )
    AND pending = FALSE;