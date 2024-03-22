package main

import (
	"net/http"

	"github.com/SamiZeinsAI/gitdev/internal/database"
)

func handlerUsersCreate(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
	}
}

func handlerUsersGet(w http.ResponseWriter, r *http.Request, user database.User) {

}
