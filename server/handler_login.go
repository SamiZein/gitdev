package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"

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

	err = cfg.DB.UpdateUserToken(r.Context(), token.AccessToken)
	if err != nil {
		err := cfg.addUserData(token.AccessToken)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Error fetching user data from github")
			return
		}
	}
	redirectURL := fmt.Sprintf("http://localhost:5173/callback?access_token=%s", token.AccessToken)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func (cfg *apiConfig) addUserData(token string) error {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)
	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		fmt.Printf("Error retrieving user information: %v\n", err)
		return err
	}
	user_id, err := cfg.DB.CreateUser(ctx, database.CreateUserParams{
		ID:          uuid.New(),
		AccessToken: token,
		Name:        user.GetName(),
		Username:    user.GetLogin(),
		GithubID:    int32(user.GetID()),
		Email:       user.GetEmail(),
		PanelBody: sql.NullString{
			String: user.GetBio(),
			Valid:  true,
		},
		AvatarUrl: user.GetAvatarURL(),
	})

	if err != nil {
		return err
	}

	repos, _, err := client.Repositories.List(ctx, user.GetLogin(), nil)
	if err != nil {
		return err
	}
	for _, repo := range repos {
		repo_id, err := cfg.DB.CreateRepo(ctx, database.CreateRepoParams{
			ID:            uuid.New(),
			Name:          repo.GetName(),
			UserID:        user_id,
			StarGazers:    int32(repo.GetStargazersCount()),
			Watchers:      int32(repo.GetWatchersCount()),
			Url:           repo.GetURL(),
			RepoCreatedAt: repo.GetCreatedAt().Time,
			RepoUpdatedAt: repo.GetUpdatedAt().Time,
		})
		if err != nil {
			return err
		}
		languages, _, err := client.Repositories.ListLanguages(ctx, repo.GetOwner().GetLogin(), repo.GetName())
		if err != nil {
			return err
		}
		for language, bytes := range languages {
			language_id, err := cfg.DB.CreateLanguage(ctx, database.CreateLanguageParams{
				ID:   uuid.New(),
				Name: language,
			})
			if err != nil {
				return err
			}
			err = cfg.DB.CreateRepoLanguage(ctx, database.CreateRepoLanguageParams{
				ID:         uuid.New(),
				RepoID:     repo_id,
				LanguageID: language_id,
				Bytes:      int32(bytes),
			})
			if err != nil {
				return err
			}
		}

	}
	return nil
}
