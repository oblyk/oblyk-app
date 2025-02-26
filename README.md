# Oblyk App | Climbing Community App

Oblyk is an open-source community website dedicated to climbing. It aims to build a large open-data database of cliffs, routes and climbing gyms in France and around the world that can be freely consulted via an API. Climbers can also use this tool to rate their crosses or find climbing partners.

This repository is the App part of Oblyk project.  
For front api, go here : [oblyk-app](https://github.com/oblyk/oblyk-api)

## Dependencies
- docker compose
- make

## Installation
```shell
make install
cp .env.example .env
```
Set `VUE_APP_OBLYK_API_ACCESS_TOKEN` params in `.env.local` with your Api token (see: [oblyk-api organization token part](https://github.com/oblyk/oblyk-api))

## Launch vue
```shell
make dev
```
go to [localhost:4500](http://localhost:4500/)  
enjoy !
