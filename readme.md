# KusKus

Started from [Next.js + EdgeDB + EdgeDB Auth template](https://github.com/edgedb/nextjs-edgedb-auth-template).

## Setup

[Bun](https://bun.sh) is used to run/install things.

```
bun i
```

Install [EdgeDB](https://www.edgedb.com/) using:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.edgedb.com | sh
```

Create new EdgeDB instance:

```
edgedb project init
```

Name instance `kuskus`. Apply migrations with:

```
edgedb migration apply
```

Setup auth with:

```
bun auth:setup
```

Generate [EdgeDB-JS](https://github.com/edgedb/edgedb-js) types with:

```
bun generate:all
```

## Run

```
bun dev
```

Can then create account by pressing `sign up` on top corner.

More info on development can be read in [Next.js + EdgeDB + EdgeDB Auth template](https://github.com/edgedb/nextjs-edgedb-auth-template) and [EdgeDB docs](https://docs.edgedb.com/).

## Contribute

Always open to useful ideas or fixes in form of issues or PRs.
