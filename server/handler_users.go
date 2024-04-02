package main

import (
	"net/http"

	"github.com/google/go-github/github"
)

func (cfg *apiConfig) handlerUsersGetAll(w http.ResponseWriter, r *http.Request) {
	users, err := cfg.DB.GetAllUsers(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error retrieving users from database")
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}
func (cfg *apiConfig) handlerUsersGet(w http.ResponseWriter, r *http.Request, user *github.User) {
	dbUser, err := cfg.DB.GetUserByGitHubID(r.Context(), int32(user.GetID()))
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error gettign user from database")
	}
	respondWithJSON(w, http.StatusOK, dbUser)
}
