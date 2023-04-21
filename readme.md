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

This app uses signals to hold the state, check [src/GlobalContext/store.tsx](src/GlobalContext/store.tsx).

### Run with auth working

For auth to work, you will need to add `.env` with these variables inside `.env` at root of project. Get them from creating a new google oauth app [here](https://console.cloud.google.com/welcome).

```
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_SECRET=
```

## Run server (GraphQL)

Would love to use [Grafbase](https://grafbase.com/) but get auth issues with it, hopefully to be resolved soon.

So currently using [Neo4j GraphQL Library](https://neo4j.com/docs/graphql-manual/current/).

Need `.env` with these variables inside `graphql/.env`. Get them from creating a Neo4j project [here](https://console.neo4j.io).

```
NEO4J_URL=
NEO4J_USERNAME=
NEO4J_PASSWORD=
```

Then inside [graphql](graphql) folder, run:

```
pnpm i
ts-node index.ts
```

To debug:

```
DEBUG=* ts-node index.ts
# or can include specific package to get debug logs for it
DEBUG=@neo4j/graphql-plugin-auth ts-node index.ts
```

Open http://localhost:4000 for Apollo GraphQL playground.
