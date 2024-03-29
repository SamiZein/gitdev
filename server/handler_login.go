package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/google/go-github/github"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
)

func (cfg *apiConfig) handlerGitHubCallback(w http.ResponseWriter, r *http.Request) {
	githubOauthConfig := &oauth2.Config{
		ClientID:     cfg.clientID,
		ClientSecret: cfg.clientSecret,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://github.com/login/oauth/authorize",
			TokenURL: "https://github.com/login/oauth/access_token",
		},

		Scopes: []string{"read:user"},
	}

	code := r.URL.Query().Get("code")
	token, err := githubOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error exhanging auth code for token")
		return
	}
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token.AccessToken})
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		fmt.Printf("Error retrieving user information: %v\n", err)
		return
	}
	repos, _, err := client.Repositories.List(ctx, user.GetLogin(), nil)
	if err != nil {
		fmt.Printf("Error retrieving repositories: %v\n", err)
		return
	}

	dbUser, err := cfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		ID:          uuid.New(),
		AccessToken: token.AccessToken,
		Name:        user.GetName(),
		Username:    user.GetLogin(),
		GithubID:    int32(user.GetID()),
		Repos:       int32(len(repos)),
		Email:       user.GetEmail(),
		Bio:         user.GetBio(),
		AvatarUrl:   user.GetAvatarURL(),
		UpdatedAt:   time.Now(),
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error inserting user into database")
		return
	}
	fmt.Println(dbUser)
	redirectURL := fmt.Sprintf("http://localhost:5173/callback?access_token=%s", token.AccessToken)

	http.Redirect(w, r, redirectURL, http.StatusFound)
}
