import { createContextProvider } from "@solid-primitives/context"
import { GraphQLClient, RequestDocument, Variables } from "graphql-request"
import { createStore } from "solid-js/store"
import { useNavigate } from "solid-start"
import { User as GoogleUser } from "oidc-client-ts"
import { createMemo, createResource, onMount } from "solid-js"
import { getUser } from "~/lib/auth"
import { UserExistsDocument } from "~/graphql/schema"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import {
  RequestOptions,
  VariablesAndRequestHeadersArgs,
} from "graphql-request/build/esm/types"

export type User = {
  id: string
  username?: string
  audienceToken?: string
}

const endpoint = import.meta.env.VITE_GRAFBASE_API_URL

export function createGrafbaseClient(idToken: string) {
  const navigate = useNavigate()

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  })

  async function request<T, V extends Variables = Variables>(
    document: RequestDocument | TypedDocumentNode<T, V>,
    ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
  ): Promise<T | undefined>
  async function request<T, V extends Variables = Variables>(
    options: RequestOptions<V, T>
  ): Promise<T | undefined>
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
  () => {
    const [state, setState] = createStore<{
      user: User | null
      googleUser: GoogleUser | null
    }>({
      user: null,
      googleUser: null,
    })

    const grafbase = createMemo(() => {
      const token = state.googleUser?.id_token
      return token ? createGrafbaseClient(token) : undefined
    })

    onMount(async () => {
      const user = await getUser()

      setState("googleUser", user)

      const grafbaseClient = grafbase()

      if (grafbaseClient) {
        try {
          // check does the user already exist given the audience token
          const foundUser = await grafbaseClient.request(UserExistsDocument, {
            audienceToken: user?.profile.aud as string,
          })

          const id = foundUser?.user?.id

          if (id) setState("user", { id })
        } catch (error) {
          console.log("error", error)
        }
      }
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
