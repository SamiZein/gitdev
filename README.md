# Gitdev

Gitdev is a developer collaboration website. It takes a developer-first approach for times when githubs' project-first approach may not be suitable. By requiring a github sign-in, Gitdev is able to display a users' github information in a way that is unique to the site, allowing for better assessment of potential collaborators. Try it out yourself and see you own user language breakdown!

##Why

- Why is a project-first approach the only popular option for developer collaboration
- Why don't developer collaboration apps integrate github user info and build better visual representations of a developers proficiencies
- Why do developers that want to team up in game jams and coding competitions not have a reasonable option

## Features

- Sign in with GitHub
- Automatic profile population based on GitHub data
- Developers page shows new potential collaborators in a job board format
  - GitHub linguistics bar at the account level instead of at the repositiory level
  - Shows other relevant stats from github
- Collabs page shows the user all their collabs
- Profile page shows the user their own info and allows them to update it

## Technologies Used

- React
- Tailwind CSS
- Go
  - sqlc
  - goose
- PostgreSQL

## Getting Started

### Prerequisites

- Go
- PostgreSQL

### Contributing

1. Clone the repository

```bash
git clone https://github.com/SamiZein/gitdev
cd gitdev
```

2. Install dependendencies

```bash
cd react && npm install && npm run dev && cd ..
```

3. Build go server

```bash
cd server && go build -o out && ./out && cd ..
```

4. Submit a pull request
