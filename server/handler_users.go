package main

import (
	"net/http"
)

func (cfg *apiConfig) handlerUsersGetAll(w http.ResponseWriter, r *http.Request) {
	users, err := cfg.DB.GetAllUsers(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error retrieving users from database")
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}
