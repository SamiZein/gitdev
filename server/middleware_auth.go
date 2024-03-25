package main

import (
	"net/http"
	"strconv"

	"github.com/SamiZeinsAI/gitdev/internal/auth"
	"github.com/SamiZeinsAI/gitdev/internal/database"
)

type authedHandler func(http.ResponseWriter, http.Request, database.User)

func (cfg *apiConfig) middlewareAuth(handler authedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		type returnVals struct {
			Token string `json:"token"`
		}
		tokenString, err := auth.GetBearerToken(r.Header)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Error getting bearer token")
			return
		}

		token, err := auth.ParseToken(tokenString, cfg.jwtSecret)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Error parsing token")
			return
		}
		issuer, err := token.Claims.GetIssuer()
		if err != nil || issuer != "gitdev-refresh" {
			respondWithError(w, http.StatusBadRequest, "Issuer not refresh token shape")
			return
		}
		id, err := token.Claims.GetSubject()
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Error getting subject header")
			return
		}
		idInt, err := strconv.Atoi(id)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Id not valid integer in subject header")
			return
		}
		accessToken, err := auth.MakeToken(idInt, "gitdev-access", cfg.jwtSecret)
		if err != nil {
			respondWithError(w, 500, "Error making access token")
			return
		}

		respBody := returnVals{
			Token: accessToken,
		}
		respondWithJSON(w, http.StatusOK, respBody)

	}
}
