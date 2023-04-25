import { GoogleClient } from "./auth"
import { GraphQLClient } from "graphql-request"

const endpoint = import.meta.env.VITE_GRAFBASE_API_URL
const apiKey = import.meta.env.VITE_GRAFBASE_API_KEY

// for server calls I think
export const grafbaseServer = new GraphQLClient(endpoint, {
  headers: { "x-api-key": apiKey },
})

// for client calls I think
export const grafbase = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${(await GoogleClient.getUser())?.id_token}`,
  },
})

export async function gql(
  query: string,
  variables: Record<string, string> = {}
) {
  const res = await fetch("http://127.0.0.1:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await GoogleClient.getUser())?.id_token}`,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
  return res.json()
}

export async function getTodos() {
  const res = await gql(`
    {
      todoCollection(first: 20) {
        edges {
          node {
            id
            title
            done
            dueDate
            starred
            priority
          }
        }
      }
    }
  `)
  return res
}

export async function createTodo() {
  const res = await gql(`
      mutation {
      todoCreate(
        input: {
          title: "Make KusKus"
          done: false
          starred: true
          priority: 3
        }
      ) {
        todo {
          id
        }
      }
    }
  `)
  console.log(res)
}
