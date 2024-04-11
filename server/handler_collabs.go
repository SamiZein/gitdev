package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/go-chi/chi/v5"
)

func (cfg *apiConfig) HandlerCollabsCreate(w http.ResponseWriter, r *http.Request, user *database.User) {
	githubID, err := strconv.Atoi(chi.URLParam(r, "github_id"))
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error converting github id string to int")
		return
	}
	collab, err := cfg.DB.RemoveCollabsPendingStatus(r.Context(), database.RemoveCollabsPendingStatusParams{
		User1GithubID:   user.GithubID,
		User1GithubID_2: int32(githubID),
	})
	if err != nil {
		if err == sql.ErrNoRows {
			collab, err = cfg.DB.CreateCollab(r.Context(), database.CreateCollabParams{
				Column1: user.GithubID,
				Column2: githubID,
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
