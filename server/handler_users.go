package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
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

func (cfg *apiConfig) handlerUsersLanguageBytesGet(w http.ResponseWriter, r *http.Request) {
	githubID, err := strconv.Atoi(chi.URLParam(r, "github_id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Error converting id string from request parameter to int")
		return
	}
	languageBytes, err := cfg.DB.GetUserLanguagesBytes(r.Context(), int32(githubID))
	fmt.Println(err)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting user language bytes from database")
		return
	}
	respondWithJSON(w, http.StatusOK, languageBytes)
}

func (cfg *apiConfig) handlerUsersGet(w http.ResponseWriter, r *http.Request) {
	githubID, err := strconv.Atoi(chi.URLParam(r, "github_id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Error converting id string from request parameter to int")
		return
	}

	user, err := cfg.DB.GetUserByGithubID(r.Context(), int32(githubID))
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error getting user from database")
		return
	}

	respondWithJSON(w, http.StatusOK, user)
}

func (cfg *apiConfig) handlerUsersUpdate(w http.ResponseWriter, r *http.Request, user *database.User) {
	type parameters struct {
		Name      string `json:"name"`
		UserName  string `json:"username"`
		Email     string `json:"email"`
		PanelBody string `json:"panel_body"`
	}
	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error decoding json body from request")
		return
	}
	panelBodyValid := true
	if params.PanelBody == "" {
		panelBodyValid = false
	}
	err = cfg.DB.UpdateUserInfo(r.Context(), database.UpdateUserInfoParams{
		Name:     params.Name,
		Username: params.UserName,
		Email:    params.Email,
		PanelBody: sql.NullString{
			String: params.PanelBody,
			Valid:  panelBodyValid,
		},
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error updating user info in database")
		return
	}
	w.WriteHeader(http.StatusOK)
}
