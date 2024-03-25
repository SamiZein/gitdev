package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/auth"
	"github.com/go-chi/chi/v5"
	"github.com/google/go-github/github"
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

		Scopes: []string{"user"},
	}

	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(context.Background(), "provider", provider))

	code := r.URL.Query().Get("code")
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

	accessToken, err := auth.MakeToken(int(user.GetID()), "gitdev-access", cfg.jwtSecret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	refreshToken, err := auth.MakeToken(int(user.GetID()), "gitdev-refresh", cfg.jwtSecret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	redirectURL := fmt.Sprintf("http://localhost:5173/callback?access_token=%s&refresh_token=%s", accessToken, refreshToken)

	http.Redirect(w, r, redirectURL, http.StatusFound)
}
