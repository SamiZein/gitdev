package main

import (
	"context"
	"net/http"
	"strconv"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/go-chi/chi/v5"
)

func (cfg *apiConfig) handlerUsersGetAll(w http.ResponseWriter, r *http.Request) {
	users, err := cfg.DB.GetAllUsers(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error retrieving users from database")
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}

func (cfg *apiConfig) handlerUsersGet(w http.ResponseWriter, r *http.Request) {
	type returnVals struct {
		Profile database.User
		Repos   []Repo
	}

	githubID, err := strconv.Atoi(chi.URLParam(r, "github_id"))

	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error converting github id string to int")
		return
	}

	dbUser, err := cfg.DB.GetUserByGithubID(r.Context(), int32(githubID))
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting user from database")
		return
	}
	dbRepos, err := cfg.DB.GetUsersRepos(r.Context(), dbUser.ID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting users repos from database")
		return
	}
	repos := []Repo{}
	for i := range dbRepos {
		repo := cfg.databaseRepoToRepo(&dbRepos[i])
		languages, err := cfg.DB.GetReposLanguages(context.Background(), repo.ID)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Error getting repos languages from database")
			return
		}
		repo.Languages = languages
		repos = append(repos, repo)
	}
	resp := returnVals{
		Profile: dbUser,
		Repos:   repos,
	}
	respondWithJSON(w, http.StatusOK, resp)
}
