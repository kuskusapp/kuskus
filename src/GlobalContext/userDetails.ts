import { createContext, createEffect, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { UserDetailsUpdateDocument } from "~/graphql/schema"
import { GrafbaseRequest } from "~/pages/App"

export type UserDetails = {
  id?: string
  freeAiTasksAvailable: number
  paidSubscriptionValidUntilDate: string | null // TODO: Date type?
  languageModelUsed: string
  collapsedSidebar: Boolean
}

export function createUserDetailsState(options: { request: GrafbaseRequest }) {
  const [userDetails, setUserDetails] = createStore<UserDetails>({
    freeAiTasksAvailable: 10,
    paidSubscriptionValidUntilDate: null,
    languageModelUsed: "gpt-3",
    collapsedSidebar: false,
  })

  // TODO: don't think we need this as its created at login/google auth
  // onMount(() => {
  //   options.request(UserDetailsDocument).then(async (res) => {
  //     // if there are no settings, create them and put id in local store
  //     if (res.userDetailsCollection?.edges?.length === 0) {
  //       const res = options.request(UserDetailsDocument, {
  //         userDetails: {},
  //       })
  //       setSettings({ ...settings, id: res.settingsCreate?.settings?.id! })
  //       return
  //     } else {
  //       setSettings({
  //         ...settings,
  //         id: res.settingsCollection?.edges![0]?.node.id,
  //       })
  //     }
  //   })
  // })

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
  const ctx = useContext(UserDetailsProvider) // TODO: fix..
  if (!ctx)
    throw new Error("useUserDetails must be used within UserDetailsProvider")
  return ctx
}
