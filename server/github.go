package main

import (
	"context"

	"github.com/google/go-github/github"
)

func getGithubUser(token string, client *github.Client) (*github.User, error) {
	ctx := context.Background()
	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		return nil, err
	}
	return user, nil
}
func getGithubUserRepos(user *github.User, client *github.Client) ([]*github.Repository, error) {
	ctx := context.Background()
	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		return nil, err
	}
	repos, _, err := client.Repositories.List(ctx, user.GetLogin(), nil)
	if err != nil {
		return nil, err
	}
	return repos, nil
}
