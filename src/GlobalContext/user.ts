import { createContext, createEffect, onMount, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { UserDocument, UserUpdateDocument } from "~/graphql/schema"
import { GrafbaseRequest } from "~/pages/App"

export type User = {
  id?: string
  freeAiTasksAvailable: number
  paidSubscriptionValidUntilDate: string | null // TODO: Date type? (2023-10-03)
  languageModelUsed: string
  collapsedSidebar: boolean
}

export function createUserState(options: { request: GrafbaseRequest }) {
  const [user, setUser] = createStore<User>({
    freeAiTasksAvailable: 10,
    paidSubscriptionValidUntilDate: null,
    languageModelUsed: "gpt-3",
    collapsedSidebar: false,
  })

  onMount(() => {
    options.request(UserDocument).then((res) => {
      // @ts-ignore
      setUser(res.userCollection.edges[0].node)
    })
  })

  createEffect(() => {
    // TODO: should not run on first load of the app..
    if (user.id) {
      // if user changes, update db
      options.request(UserUpdateDocument, {
        id: user.id,
        user: {
          freeAiTasksAvailable: {
            set: user.freeAiTasksAvailable,
          },
          paidSubscriptionValidUntilDate: user.paidSubscriptionValidUntilDate,
          languageModelUsed: user.languageModelUsed,
          collapsedSidebar: user.collapsedSidebar, // TODO: wtf..
        },
      })
    }
  })

  return {
    // state
    user,
    // actions
    setCollapsedSidebar: () => {
      return setUser({ collapsedSidebar: !user.collapsedSidebar })
    },
    decrementAiTask: () => {
      return setUser({ freeAiTasksAvailable: user.freeAiTasksAvailable - 1 })
    },
  } as const
}

const UserCtx = createContext<ReturnType<typeof createUserState>>()

export const UserProvider = UserCtx.Provider

export const useUser = () => {
  const ctx = useContext(UserCtx)
  if (!ctx) throw new Error("useUser must be used within UserProvider")
  return ctx
}
