package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/database"
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
		Scopes: []string{"read:user"},
	}
	code := r.URL.Query().Get("code")
	token, err := githubOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error exhanging auth code for token")
		return
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token.AccessToken})
	tc := oauth2.NewClient(context.Background(), ts)
	client := github.NewClient(tc)

	user, err := getGithubUser(client)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting user info from github")
		return
	}

	_, err = cfg.DB.UpdateUserToken(r.Context(), database.UpdateUserTokenParams{
		AccessToken: token.AccessToken,
		GithubID:    int32(user.GetID()),
	})
	if err != nil {
		if err == sql.ErrNoRows {
			err = cfg.addUserData(token.AccessToken, user, client)
			if err != nil {
				respondWithError(w, http.StatusInternalServerError, "Error adding user data to database")
				return
			}
		} else {
			respondWithError(w, http.StatusInternalServerError, "Error updating user data in database")
			return
		}
	}
	redirectURL := fmt.Sprintf("http://localhost:5173/callback?access_token=%s&github_id=%d", token.AccessToken, user.GetID())
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func (cfg *apiConfig) addUserData(token string, user *github.User, client *github.Client) error {
	ctx := context.Background()
	userGithubID, err := cfg.DB.CreateUser(ctx, database.CreateUserParams{
		GithubCreatedAt: user.CreatedAt.Time,
		AccessToken:     token,
		Name:            user.GetName(),
		Username:        user.GetLogin(),
		GithubID:        int32(user.GetID()),
		Email:           user.GetEmail(),
		Followers:       int32(user.GetFollowers()),
		Following:       int32(user.GetFollowing()),
		Bio:             user.GetBio(),
		AvatarUrl:       user.GetAvatarURL(),
		Location:        user.GetLocation(),
	})
	if err != nil {
		return err
	}
	repos, err := getGithubUserRepos(user, client)
	if err != nil {
		return err
	}
	for _, repo := range repos {
		repo_id, err := cfg.DB.CreateRepo(ctx, database.CreateRepoParams{
			Name:          repo.GetName(),
			UserGithubID:  int32(userGithubID),
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
				Name:  language,
				Color: randomColorHex(),
			})
			if err != nil {
				return err
			}
			err = cfg.DB.CreateRepoLanguage(ctx, database.CreateRepoLanguageParams{
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
