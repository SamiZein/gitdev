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
	Name        string
	Username    string
	GithubID    int32
	Email       string
	Followers   int32
	Following   int32
	PanelBody   string
	Title       string
	AvatarUrl   string
	Repos       []Repo
}

func databaseUserToUser(user database.User) User {
	panelBody := ""
	if user.PanelBody.Valid {
		panelBody = user.PanelBody.String
	}
	return User{
		Id:          user.ID,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
		AccessToken: user.AccessToken,
		Name:        user.Name,
		Username:    user.Username,
		GithubID:    user.GithubID,
		Email:       user.Email,
		Followers:   user.Followers,
		Following:   user.Following,
		PanelBody:   panelBody,
		Title:       user.Title,
		AvatarUrl:   user.AvatarUrl,
	}
}

type Repo struct {
	ID            uuid.UUID
	Name          string
	UserGithubID  int32
	StarGazers    int32
	Watchers      int32
	Url           string
	RepoCreatedAt time.Time
	RepoUpdatedAt time.Time
	Languages     []string
}

func databaseRepoToRepo(repo *database.Repo) Repo {
	return Repo{
		ID:            repo.ID,
		Name:          repo.Name,
		UserGithubID:  repo.UserGithubID,
		StarGazers:    repo.StarGazers,
		Watchers:      repo.Watchers,
		Url:           repo.Url,
		RepoCreatedAt: repo.RepoCreatedAt,
		RepoUpdatedAt: repo.RepoUpdatedAt,
	}
}
