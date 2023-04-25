import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://127.0.0.1:4000/graphql",
  documents: "./src/graphql/document.graphql",
  generates: {
    "./src/graphql/schema.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
}
export default config
