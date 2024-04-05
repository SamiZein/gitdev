-- name: CreateRepoLanguage :exec
INSERT INTO repos_languages (
        id,
        repo_id,
        language_id,
        bytes
    )
VALUES (
        $1,
        $2,
        $3,
        $4
    );