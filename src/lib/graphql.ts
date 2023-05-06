import { GraphQLClient } from "graphql-request"
import { useNavigate } from "solid-start"
import { GoogleClient } from "./auth"

const endpoint = import.meta.env.VITE_GRAFBASE_API_URL
const apiKey = import.meta.env.VITE_GRAFBASE_API_KEY

// client graphql calls
export const grafbase = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${(await GoogleClient.getUser())?.id_token}`,
    // authorization: `Bearer 1201212`, // done for testing, uncomment to force auth error
  },
})

export async function createGrafbaseClient() {
  const navigate = useNavigate()
  try {
    return new GraphQLClient(endpoint, {
      headers: {
        // authorization: `Bearer ${(await GoogleClient.getUser())?.id_token}`,
        authorization: `Bearer 1201212`,
      },
    })
  } catch (error: any) {
    if (error.response?.errors?.[0]?.extensions?.code === "UNAUTHENTICATED")
      navigate("/auth")
  }
}

// server graphql calls
export const grafbaseServer = new GraphQLClient(endpoint, {
  headers: { "x-api-key": apiKey },
})
