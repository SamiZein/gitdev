-- name: CreateRepo :one
INSERT INTO repos (
        id,
        name,
        user_id,
        star_gazers,
        watchers,
        url,
        repo_created_at,
        repo_updated_at
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
    )
RETURNING id;