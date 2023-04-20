import { GoogleClient } from "./auth"

export async function gql(
  query: string,
  variables: Record<string, string> = {}
) {
  const res = await fetch("http://localhost:4000", {
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
