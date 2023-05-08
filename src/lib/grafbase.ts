import { GraphQLClient } from "graphql-request"

export function createGrafbaseClient(idToken: string) {
  return new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  })
}
