-- name: CreateCollab :one
INSERT INTO collabs (user1_id, user2_id)
VALUES (
        LEAST($1, $2),
        GREATEST($1, $2)
    )
RETURNING *;
-- name: RemoveCollabsPendingStatus :one
UPDATE collabs
SET pending = FALSE
WHERE (
        user1_github_id = LEAST($1, $2)
        AND user2_github_id = GREATEST($1, $2)
    )
RETURNING *;
-- name: GetUsersCollabs :many
SELECT *
FROM collabs
WHERE user1_github_id = $1
    OR user2_github_id = $1;