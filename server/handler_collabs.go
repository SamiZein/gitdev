package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/google/uuid"
)

func (cfg *apiConfig) HandlerCollabsCreate(w http.ResponseWriter, r *http.Request, user *database.User) {
	type parameter struct {
		GithubID int `json:"github_id"`
	}
	params := parameter{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error decoding json body")
		return
	}
	collab, err := cfg.DB.RemoveCollabsPendingStatus(r.Context(), database.RemoveCollabsPendingStatusParams{
		User1GithubID: int32(params.GithubID),
		User2GithubID: user.GithubID,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			collab, err = cfg.DB.CreateCollab(r.Context(), database.CreateCollabParams{
				ID:            uuid.New(),
				User1GithubID: user.GithubID,
				User2GithubID: int32(params.GithubID),
			})
			if err != nil {
				respondWithError(w, http.StatusInternalServerError, "Error creating collab")
				return
			}
		} else {
			respondWithError(w, http.StatusInternalServerError, "Error updating user data in database")
			return
		}
	}
	respondWithJSON(w, http.StatusOK, collab)
}

func (cfg *apiConfig) HandlerCollabsUserGet(w http.ResponseWriter, r *http.Request, user *database.User) {
	collabs, err := cfg.DB.GetUsersCollabs(r.Context(), user.GithubID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting collabs from database")
	}
	respondWithJSON(w, http.StatusOK, collabs)
}
