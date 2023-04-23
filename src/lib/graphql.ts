import { GoogleClient } from "./auth"

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
