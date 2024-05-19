-- name: CreateCollab :one
INSERT INTO collabs (user1_github_id, user2_github_id)
VALUES ($1, $2)
RETURNING *;
-- name: RemoveCollabsPendingStatus :one
UPDATE collabs
SET pending = FALSE
WHERE (
        user1_github_id = $1
        AND user2_github_id = $2
    )
    OR (
        user1_github_id = $2
        AND user2_github_id = $1
    )
RETURNING *;
-- name: GetUsersCollabs :many
SELECT CASE
        WHEN collabs.user1_github_id = $1 THEN user2.avatar_url
        ELSE user1.avatar_url
    END AS avatar_url,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.email
        ELSE user1.email
    END AS email,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.username
        ELSE user1.username
    END AS username,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.location
        ELSE user1.location
    END AS location,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.title
        ELSE user1.title
    END AS title,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.github_url
        ELSE user1.github_url
    END AS github_url,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.linkedin_url
        ELSE user1.linkedin_url
    END AS linkedin_url,
    CASE
        WHEN collabs.user1_github_id = $1 THEN user2.twitter_url
        ELSE user1.twitter_url
    END AS twitter_url
FROM collabs
    JOIN users AS user1 ON collabs.user1_github_id = user1.github_id
    JOIN users AS user2 ON collabs.user2_github_id = user2.github_id
WHERE (
        $1 IN (collabs.user1_github_id, collabs.user2_github_id)
    )
    AND collabs.pending = FALSE;