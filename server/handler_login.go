package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(token)

	accessToken := token.AccessToken
	expiresAt := time.Now().Add(8 * time.Hour)
	fmt.Println(expiresAt)
	redirectURL := fmt.Sprintf("http://localhost:5173/callback?access_token=%s&expires_at=%s", accessToken, expiresAt)

	http.Redirect(w, r, redirectURL, http.StatusFound)
}
