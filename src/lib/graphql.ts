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

// TODO: need to fix 200 error token bad response
// if you get error it should redirect to auth page
export async function grafbase2() {
  try {
    return new GraphQLClient(endpoint, {
      headers: {
        // authorization: `Bearer ${(await GoogleClient.getUser())?.id_token}`,
        authorization: `Bearer 1201212`,
      },
    })
  } catch (error) {
    // can't use navigate here..
    // is there way to catch error and redirect to auth page in some place else?
    // navigate("/auth")
  }
}

// server graphql calls
export const grafbaseServer = new GraphQLClient(endpoint, {
  headers: { "x-api-key": apiKey },
})
