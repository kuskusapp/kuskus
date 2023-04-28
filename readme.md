# KusKus

> Fast fully keyboard driven todo app with GitHub integration and AI features

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

## File structure

Important bits defined below.

- [grafbase](grafbase) - [grafbase](https://grafbase.com/) provides the database exposed via GraphQL
  - [schema.graphql](grafbase/schema.graphql) - GraphQL schema with models
- [src](src) - code for website built with [Solid](https://www.solidjs.com/) (on top of [Solid Start](https://github.com/solidjs/solid-start) starter)
  - [GlobalContext](src/GlobalContext)
    - [store.tsx](src/GlobalContext/store.tsx) - global state. signals defined then exposed via context
    - [todos.ts](src/GlobalContext/todos.ts) - defines `todosState` which exposes a signal with todos. when first run, loads todos signal with data from grafbase, can then [modify a signal and it sends mutations to grafbase in background for persistance](https://twitter.com/nikitavoloboev/status/1651358480526106624)
  - [components](src/components) - solid components
  - [graphql](src/graphql) - graphql utils
  - [lib](src/lib) - generic utils
  - [pages](src/pages) - components for pages inside the app
  - [routes](src/routes) - routes defined using file system
- [src-tauri](src-tauri) - [Tauri](https://tauri.app) rust code that makes the desktop app, in future will call interface with LLMs and use [llm-chain](https://github.com/sobelio/llm-chain)

## Setup

Before running the app, you need to setup up some environment variables, specifcially for auth.

### Auth setup (Google)

> It would be great if this could be avoided for just running the app in development. Don't know how to do it yet though. For now do below.

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

## Run web (SolidJS)

```bash
pnpm i
pnpm dev
```

Then go to http://localhost:3000/, it renders route defined at [src/routes/index.tsx](src/routes/index.tsx).

If there is a user, it shows the app, otherwise the landing page.

Press the `Login` button in landing page and auth with Google, it should show the app if all is good.

If not, ask questions and get help on [Discord](https://discord.gg/f8YHjyrX3h).

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

<!-- ## Deploy

TODO: see how Tauri apps get built

TODO: deploy website + assets on cloud provider -->

## Discuss / help

Join [Discord](https://discord.gg/f8YHjyrX3h) for discussions.
