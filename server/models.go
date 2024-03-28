package main

import (
	"time"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/google/uuid"
)

type User struct {
	Id             uuid.UUID
	CreatedAt      time.Time
	UpdatedAt      time.Time
	GithubUsername string
	AccessToken    string
}

func databaseUserToUser(user database.User) User {
	return User{
		Id:             user.ID,
		CreatedAt:      user.CreatedAt,
		UpdatedAt:      user.UpdatedAt,
		GithubUsername: user.GithubUsername,
		AccessToken:    user.AccessToken,
	}
}
