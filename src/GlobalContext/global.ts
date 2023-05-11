import { createContextProvider } from "@solid-primitives/context"
import { GraphQLClient } from "graphql-request"
import { createMemo } from "solid-js"
import { createStore } from "solid-js/store"
import { useNavigate } from "solid-start"

export type User = {
  id: string
  username?: string
  audienceToken?: string
}

// TODO: probably needs changes
// don't fully understand how it works well
// have feeling it runs too many times but need to check
export function createGrafbaseClient(idToken: string) {
  const navigate = useNavigate()

  const client = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  })

  async function request(...args: any[]): Promise<any> {
    try {
      return await client.request(...(args as [any]))
    } catch (error) {
      // TODO: there are different kinds of errors that can happen here
      console.log(error, "error")
      // in case of invalid token, it should go back to /auth page
      // and say nicely in pop up, please log in again
      // ideally once we integrate with auth provider
      // the user session should at least be one month
      // so token invalidation should not happen often
      navigate("/auth")
    }
  }
  return { request }
}

// we use owner based auth
// there is no User model
// but there is UserDetails model
// this context provides us with a grafbase client
// that on error, displays it to user
// on token being invalid, goes to /auth page
export const [GlobalProvider, useGlobal] = createContextProvider(
  (props: { userIdToken: string }) => {
    // TODO: setState not used? is it needed?
    const [state, setState] = createStore<{
      userIdToken: string
    }>({
      userIdToken: props.userIdToken,
    })

    const grafbase = createMemo(() => {
      const token = state.userIdToken
      return token ? createGrafbaseClient(token) : undefined
    })

    return {
      userIdToken: state.userIdToken,
      grafbase,
    }
  },
  // @ts-expect-error 🤫
  {}
)
