# Oblyk App | Climbing Community App

Oblyk is an open-source community website dedicated to climbing. It aims to build a large open-data database of cliffs, routes and climbing gyms in France and around the world that can be freely consulted via an API. Climbers can also use this tool to rate their crosses or find climbing partners.

This repository is the App part of Oblyk project.  
For front api, go here : [oblyk-app](https://github.com/oblyk/oblyk-api)

## Dependencies

### With Docker

- Docker Compose
- Make

### Without Docker

- Node 18
- npm >= 7.11

## Installation

Copy the example environment file:

```shell
cp .env.example .env
```

Set `VUE_APP_OBLYK_API_ACCESS_TOKEN` params in `.env.local` with your Api token (see: [oblyk-api organization token part](https://github.com/oblyk/oblyk-api))

### With Docker

Run the installation command:

```shell
make install
```

Set VUE_APP_OBLYK_APP_HOST in the .env file:

```shell
echo "VUE_APP_OBLYK_APP_HOST=0.0.0.0" >> .env
```

Start the development server

```shell
make dev
```

### Without Docker

Install npm dependencies:

```shell
    npm install
```

Start the development server

```shell
npm run dev
```

Open your browser and go to [localhost:4500](http://localhost:4500/)  
Enjoy !
