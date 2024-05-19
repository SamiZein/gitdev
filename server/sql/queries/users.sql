-- name: CreateUser :one
INSERT INTO users (
        github_created_at,
        access_token,
        name,
        username,
        github_id,
        email,
        followers,
        following,
        bio,
        avatar_url,
        location
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
    )
RETURNING github_id;
-- name: UpdateUserToken :one
UPDATE users
SET access_token = $1,
    updated_at = CURRENT_TIMESTAMP
WHERE github_id = $2
RETURNING *;
-- name: UpdateUserInfo :one
UPDATE users
SET name = $1,
    email = $2,
    bio = $3,
    title = $4,
    linkedin_url = $5,
    twitter_url = $6,
    updated_at = CURRENT_TIMESTAMP
WHERE github_id = $7
RETURNING *;
-- name: GetAllUsers :many
SELECT *
FROM users
WHERE github_id != $1
ORDER BY updated_at
LIMIT 20;
-- name: GetUserByGithubID :one
SELECT users.*,
    COUNT(repos.*) AS repos,
    COALESCE(SUM(repos.star_gazers), 0) AS stars,
    COALESCE(SUM(repos.watchers), 0) AS watchers
FROM users
    LEFT JOIN repos ON users.github_id = repos.user_github_id
WHERE github_id = $1
GROUP BY users.id;