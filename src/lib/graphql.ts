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
