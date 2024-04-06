package main

import (
	"time"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/google/uuid"
)

type User struct {
	Id          uuid.UUID
	CreatedAt   time.Time
	UpdatedAt   time.Time
	AccessToken string
}

func databaseUserToUser(user database.User) User {
	return User{
		Id:          user.ID,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
		AccessToken: user.AccessToken,
	}
}

type Repo struct {
	ID            uuid.UUID
	Name          string
	UserID        uuid.UUID
	StarGazers    int32
	Watchers      int32
	Url           string
	RepoCreatedAt time.Time
	RepoUpdatedAt time.Time
	Languages     []string
}

func (cfg *apiConfig) databaseRepoToRepo(repo *database.Repo) Repo {
	return Repo{
		ID:            repo.ID,
		Name:          repo.Name,
		UserID:        repo.UserID,
		StarGazers:    repo.StarGazers,
		Watchers:      repo.Watchers,
		Url:           repo.Url,
		RepoCreatedAt: repo.RepoCreatedAt,
		RepoUpdatedAt: repo.RepoUpdatedAt,
	}
}
