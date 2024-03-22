package main

import "net/http"

func (cfg *apiConfig) handlerReadiness(w http.ResponseWriter, r *http.Request) {
	type returnVals struct {
		Status string `json:"status"`
	}
	respBody := returnVals{
		Status: "ok",
	}
	respondWithJSON(w, 200, respBody)
}

func (cfg *apiConfig) handlerErr(w http.ResponseWriter, r *http.Request) {
	respondWithError(w, 500, "Internal Server Error")
}
