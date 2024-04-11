package main

import (
	"context"
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/auth"
	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type authedHandler func(http.ResponseWriter, *http.Request, *database.User)

func (cfg *apiConfig) middlewareAuth(handler authedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		accessToken, err := auth.GetBearerToken(r.Header)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Error getting bearer token")
			return
		}
		token := &oauth2.Token{
			AccessToken: accessToken,
		}
		oauthClient := oauth2.NewClient(context.Background(), oauth2.StaticTokenSource(token))
		client := github.NewClient(oauthClient)
		githubUser, _, err := client.Users.Get(context.Background(), "")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		user, err := cfg.DB.UpdateUserByGithubID(r.Context(), database.UpdateUserByGithubIDParams{
			AccessToken: token.AccessToken,
			GithubID:    int32(githubUser.GetID()),
		})
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Error updating user access token")
			return
		}
		handler(w, r, &user)
	}
}
