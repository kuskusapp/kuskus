# KusKus

> Fast todo app

## Features

- Fully keyboard driven (onscreen keys ala [2Do](https://www.2doapp.com/))
- GitHub issues integrated ala [Ship](https://www.realartists.com/blog/ship-20.html)
- Language model support integrated
  - break down tasks into subtasks (pick which subtasks are good)
  - create AI agents for tasks for aid
- Editor embedded ala [Obsidian](https://obsidian.md/)
- Clean design ala [Things](https://culturedcode.com/things/)
- Project support ala [Height](https://height.app/), [Linear](https://linear.app/)
- Public todos/projects with user profiles

## Run web (SolidJS)

```bash
pnpm i
pnpm dev
```

Then go to http://localhost:3000/ and it will go straight to the app.

For now this app uses signals to hold the state, check [src/GlobalContext/store.tsx](src/GlobalContext/store.tsx).

## Setup Auth (Google)

For auth to work, first [create a new Google OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient).

Can [read this](https://developers.google.com/identity/protocols/oauth2) for how Google OAuth works.

Authorized JS origin and redirect URIs + where you can see google client id and secret are shown below.

![](https://images.nikiv.dev/kuskus-oauth-settings.png)

Add these values to `.env` file.

```
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_SECRET=

VITE_GRAFBASE_API_URL=http://127.0.0.1:4000/graphql
```

## Run server (GraphQL/Grafbase)

Using [Grafbase](https://grafbase.com/).

Create new file at `grafbase/.env` with this content:

```
GOOGLE_CLIENT_ID=
```

Google Client ID is same as in above case.

Then run:

```
npx grafbase@latest dev
```

Open http://localhost:4000 for GraphQL playground.

## Deploy

TODO: see how Tauri apps get built.

TODO: deploy website + assets on cloud provider

## Discuss / help

Join [Discord](https://discord.gg/f8YHjyrX3h) for discussions.
