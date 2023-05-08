import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { createContextProvider } from "@solid-primitives/context"
import { GraphQLClient, RequestDocument, Variables } from "graphql-request"
import {
  RequestOptions,
  VariablesAndRequestHeadersArgs,
} from "graphql-request/build/esm/types"
import { User as GoogleUser } from "oidc-client-ts"
import { createMemo } from "solid-js"
import { createStore } from "solid-js/store"
import { useNavigate } from "solid-start"

export type User = {
  id: string
  username?: string
  audienceToken?: string
}

// TODO: should use the one in lib/grafbase I think
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
      navigate("/auth")
    }
  }
  return { request }
}

export const [GlobalProvider, useGlobal] = createContextProvider(
  (props: { userId: string; googleUser: GoogleUser }) => {
    const [state, setState] = createStore<{
      user: string
      googleUser: GoogleUser | null
    }>({
      user: props.userId,
      googleUser: props.googleUser,
    })

    const grafbase = createMemo(() => {
      const token = state.googleUser?.id_token
      return token ? createGrafbaseClient(token) : undefined
    })

    return {
      state,
      setState,
      grafbase,
    }
  },
  // @ts-expect-error 🤫
  {}
)
