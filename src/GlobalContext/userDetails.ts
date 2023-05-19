import {
  batch,
  createContext,
  createEffect,
  onMount,
  useContext,
} from "solid-js"
import { createStore } from "solid-js/store"
import CollapsedSidebar from "~/components/CollapsedSidebar"
import {
  UserDetailsDocument,
  UserDetailsUpdateDocument,
} from "~/graphql/schema"
import { GrafbaseRequest } from "~/pages/App"

export type UserDetails = {
  id?: string
  freeAiTasksAvailable: number
  paidSubscriptionValidUntilDate: string | null // TODO: Date type? (2023-10-03)
  languageModelUsed: string
  collapsedSidebar: boolean
}

export function createUserDetailsState(options: { request: GrafbaseRequest }) {
  const [userDetails, setUserDetails] = createStore<UserDetails>({
    freeAiTasksAvailable: 10,
    paidSubscriptionValidUntilDate: null,
    languageModelUsed: "gpt-3",
    collapsedSidebar: false,
  })

  onMount(() => {
    options.request(UserDetailsDocument).then((res) => {
      // @ts-ignore
      setUserDetails(res.userDetailsCollection.edges[0].node)
    })
    console.log(userDetails, "user details")
  })

  createEffect(() => {
    // TODO: should not run on first load of the app..
    if (userDetails.id) {
      // if userDetails change, update db
      options.request(UserDetailsUpdateDocument, {
        id: userDetails.id,
        userDetails: {
          freeAiTasksAvailable: {
            set: userDetails.freeAiTasksAvailable,
          },
          paidSubscriptionValidUntilDate:
            userDetails.paidSubscriptionValidUntilDate,
          languageModelUsed: userDetails.languageModelUsed,
          collapsedSidebar: userDetails.collapsedSidebar, // TODO: wtf..
        },
      })
    }
  })

  return {
    // state
    userDetails,
    // actions
    setCollapsedSidebar: () => {
      return setUserDetails({ collapsedSidebar: !userDetails.collapsedSidebar })
    },
  } as const
}

const UserDetailsCtx =
  createContext<ReturnType<typeof createUserDetailsState>>()

export const UserDetailsProvider = UserDetailsCtx.Provider

export const useUserDetails = () => {
  const ctx = useContext(UserDetailsCtx)
  if (!ctx)
    throw new Error("useUserDetails must be used within UserDetailsProvider")
  return ctx
}
