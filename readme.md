# [KusKus.app](https://kuskus.app)

> Fast fully keyboard driven todo app with GitHub integration and AI features

Public issue tracker is [here](https://github.com/kuskusapp/kuskus).

Existing + future features are listed on [landing page](https://kuskus.app/home).

## File structure

Important bits defined below.

- [grafbase](grafbase) - [Grafbase](https://grafbase.com/) provides the database exposed via GraphQL
  - [schema.graphql](grafbase/schema.graphql) - GraphQL schema with models + resolvers defined
  - [resolvers](grafbase/resolvers) - Custom resolvers (functions) to run custom logic exposed via GraphQL
- [src](src) - Code for website built with [Solid](https://www.solidjs.com/) (on top of [Solid Start](https://github.com/solidjs/solid-start) starter)
  - [GlobalContext](src/GlobalContext)
    - [store.tsx](src/GlobalContext/store.tsx) - Global state. signals defined then exposed via context
    - [todos.ts](src/GlobalContext/todos.ts) - Defines `todosState` which exposes a store of todos. When first run, loads todos signal with data from grafbase, can then [modify the store via exposed methods and it sends mutations to grafbase in background for persistance](https://twitter.com/nikitavoloboev/status/1651358480526106624). There are more stores, each store is synced with Grafbase where needed. The goal is to keep state management local. Polling to be added later.
  - [components](src/components) - Solid components
  - [graphql](src/graphql) - GraphQL utils
  - [lib](src/lib) - Generic utils
  - [pages](src/pages) - Components for pages inside the app
  - [routes](src/routes) - Routes defined using file system
- [src-tauri](src-tauri) - [Tauri](https://tauri.app) rust code that makes the desktop app, in future will use SQLite (or something else) to setup local caching in the app. Maybe with some CRDTs mixed in.

## Setup

Before running the app, you need to setup up some environment variables.

> TODO: Auth setup should not be this tedius. Should be just one CLI command to bootstrap any new developer. Perhaps using https://devenv.sh/

> TODO: should maybe setup https://1password.com/product/secrets/

> TODO: think of prividing common API keys for Tinybird/Upstash

### Setup env variables

Create new file `.env` at root of project with this content:

```
VITE_HANKO_API=https://e879ccc9-285e-49d3-b37e-b569f0db4035.hanko.io
VITE_GRAFBASE_API_URL=http://127.0.0.1:4000/graphql
VITE_TINYBIRD_API_KEY=
```

Above Hanko API uses KusKus's staging auth setup. You can create your own new project at [hanko.io](https://www.hanko.io) and fill it with own API value.

Create new file at `grafbase/.env` with this content:

```
GRAFBASE_API_URL=http://127.0.0.1:4000/graphql
HANKO_API_ENDPOINT=https://e879ccc9-285e-49d3-b37e-b569f0db4035.hanko.io/.well-known/jwks.json
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
OPENAI_API_KEY=
TINYBIRD_API_KEY=
```

[Upstash](https://upstash.com/) Redis URL/Token can be gotten by creating new project in [Upstash Console](https://console.upstash.com).

Can use your own OpenAI key. Get it from [here](https://openai.com/blog/openai-api).

[Tinybird](https://www.tinybird.co/) is used for analytics. Can get the key for it in dashboard.

## Run server (GraphQL/Grafbase)

```
npx grafbase@latest dev
```

Open http://localhost:4000 for GraphQL playground. Read [Grafbase getting started](https://grafbase.com/docs/quickstart/get-started) to get familiar.

## Run web (SolidJS)

```bash
pnpm i
pnpm dev
```

Then go to http://localhost:3000/, it renders route defined at [src/routes/index.tsx](src/routes/index.tsx).

If signed in (there is valid token stored in cookie), it shows the app, otherwise the landing page.

## Discuss / help

Join [Discord](https://discord.gg/f8YHjyrX3h) for discussions or help.
