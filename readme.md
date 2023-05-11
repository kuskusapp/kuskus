# KusKus

> Fast fully keyboard driven todo app with GitHub integration and AI features

Try the app over at [KusKus.app](https://kuskus.app).

## Features (now)

- Language model support integrated (see [AI repo](https://github.com/kuskusapp/ai))
  - Break down tasks into subtasks (pick which subtasks are good)
- Fully keyboard driven (onscreen keys ala [2Do](https://www.2doapp.com/))

### Soon

- GitHub issues integrated ala [Ship](https://www.realartists.com/blog/ship-20.html)
- Editor embedded ala [Obsidian](https://obsidian.md/)
- Clean design ala [Things](https://culturedcode.com/things/)
- Project support ala [Height](https://height.app/), [Linear](https://linear.app/)
- Public todos/projects with user profiles
- Create AI agents for tasks for aid

## File structure

Important bits defined below.

- [grafbase](grafbase) - [Grafbase](https://grafbase.com/) provides the database exposed via GraphQL
  - [schema.graphql](grafbase/schema.graphql) - GraphQL schema with models + resolvers defined
  - [resolvers](grafbase/resolvers) - Custom resolvers (functions) to run custom logic exposed via GraphQL
- [src](src) - Code for website built with [Solid](https://www.solidjs.com/) (on top of [Solid Start](https://github.com/solidjs/solid-start) starter)
  - [GlobalContext](src/GlobalContext)
    - [store.tsx](src/GlobalContext/store.tsx) - Global state. signals defined then exposed via context
    - [todos.ts](src/GlobalContext/todos.ts) - Defines `todosState` which exposes a store of todos. When first run, loads todos signal with data from grafbase, can then [modify a signal and it sends mutations to grafbase in background for persistance](https://twitter.com/nikitavoloboev/status/1651358480526106624). There are more stores, each store is synced with Grafbase where needed. The goal is to keep state management local. Polling to be added later.
  - [components](src/components) - Solid components
  - [graphql](src/graphql) - GraphQL utils
  - [lib](src/lib) - Generic utils
  - [pages](src/pages) - Components for pages inside the app
  - [routes](src/routes) - Routes defined using file system
- [src-tauri](src-tauri) - [Tauri](https://tauri.app) rust code that makes the desktop app, in future will use SQLite (or something else) to setup local caching in the app. Maybe with some CRDTs mixed in.

## Setup

Before running the app, you need to setup up some environment variables, specifcially for auth.

In future [Hanko](https://www.hanko.io/) will be used as auth provider. Currently blocked on that by Grafbase not implementing RSA encryption.

It should also allow us to avoid the tedius setup steps below. There should be just one command to setup the whole local environment (perhaps with [devenv](https://devenv.sh/)).

All help can be received on [Discord](https://discord.gg/f8YHjyrX3h). Ask away. ♥️

### Auth setup (Google)

For auth to work, first [create a new Google OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient).

Can [read this](https://developers.google.com/identity/protocols/oauth2) for how Google OAuth works.

Authorized JS origin and redirect URIs + where you can see google client id and secret are shown below.

![](https://images.nikiv.dev/kuskus-oauth-settings.png)

Add these values to `.env` file at root of the project.

```
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_SECRET=

VITE_GRAFBASE_API_URL=http://127.0.0.1:4000/graphql
```

## Run server (GraphQL/Grafbase)

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

## Run web (SolidJS)

```bash
pnpm i
pnpm dev
```

Then go to http://localhost:3000/, it renders route defined at [src/routes/index.tsx](src/routes/index.tsx).

If there is a user, it shows the app, otherwise the landing page.

Press the `Login` button in landing page and auth with Google, it should show the app if all is good.

## Discuss / help

Join [Discord](https://discord.gg/f8YHjyrX3h) for discussions.
