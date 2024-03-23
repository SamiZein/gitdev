package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/google/go-github/github"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

func (cfg *apiConfig) handlerGitHubCallback(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	githubOauthConfig := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://github.com/login/oauth/authorize",
			TokenURL: "https://github.com/login/oauth/access_token",
		},

		Scopes: []string{"user"},
	}

	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(context.Background(), "provider", provider))

	code := r.URL.Query().Get("code")
	fmt.Println(code)
	fmt.Println(githubOauthConfig.ClientID)
	token, err := githubOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	oauthClient := oauth2.NewClient(context.Background(), oauth2.StaticTokenSource(token))
	client := github.NewClient(oauthClient)

	user, _, err := client.Users.Get(context.Background(), "")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(user)

	// Store the access token securely (e.g., in a session or database)
	// You can associate it with the user's session or identifier

	// Return the user information to the frontend
	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
}
