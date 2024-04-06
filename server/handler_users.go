package main

import (
	"context"
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/auth"
	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerUsersGetAll(w http.ResponseWriter, r *http.Request) {
	users, err := cfg.DB.GetAllUsers(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error retrieving users from database")
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}
func (cfg *apiConfig) handlerUsersGetSelf(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetBearerToken(r.Header)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting bearer token from auth header in request")
		return
	}
	dbUser, err := cfg.DB.GetUserByToken(r.Context(), token)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting user from database")
		return
	}
	respondWithJSON(w, http.StatusOK, dbUser)
}
func (cfg *apiConfig) handlerUsersGet(w http.ResponseWriter, r *http.Request) {
	type returnVals struct {
		UserInfo database.User
		Repos    []Repo
	}

	user_id, err := uuid.FromBytes([]byte(chi.URLParam(r, "id")))

	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error converting id string to uuid")
		return
	}

	dbUser, err := cfg.DB.GetUserByID(r.Context(), user_id)
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
		UserInfo: dbUser,
		Repos:    repos,
	}
	respondWithJSON(w, http.StatusOK, resp)
}
