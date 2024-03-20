package main

import "net/http"

func (cfg *apiConfig) handlerReadiness(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}
