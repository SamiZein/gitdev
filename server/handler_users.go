package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/SamiZeinsAI/gitdev/internal/database"
	"github.com/go-chi/chi/v5"
)

func (cfg *apiConfig) handlerUsersGetAll(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	githubID := 0
	githubID, _ = strconv.Atoi(authHeader)
	users, err := cfg.DB.GetAllUsers(r.Context(), int32(githubID))
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
		fmt.Println(err)
		respondWithError(w, http.StatusInternalServerError, "Error getting user from database")
		return
	}

	respondWithJSON(w, http.StatusOK, user)
}

func (cfg *apiConfig) handlerUsersUpdate(w http.ResponseWriter, r *http.Request, user *database.User) {
	type parameters struct {
		Name        string `json:"name"`
		Email       string `json:"email"`
		Bio         string `json:"bio"`
		Title       string `json:"title"`
		LinkedInUrl string `json:"linkedin"`
		TwiiterUrl  string `json:"twitter"`
	}
	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error decoding json body from request")
		return
	}
	dbUser, err := cfg.DB.UpdateUserInfo(r.Context(), database.UpdateUserInfoParams{
		Name:        params.Name,
		Email:       params.Email,
		Bio:         params.Bio,
		Title:       params.Title,
		LinkedinUrl: params.LinkedInUrl,
		TwitterUrl:  params.TwiiterUrl,
		GithubID:    user.GithubID,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error updating user info in database")
		return
	}
	respondWithJSON(w, http.StatusOK, dbUser)
}
