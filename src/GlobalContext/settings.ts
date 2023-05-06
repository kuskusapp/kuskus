import { createEffect } from "solid-js"
import { createStore, produce } from "solid-js/store"
import {
  Mutation,
  Query,
  SettingsCreateDocument,
  SettingsDocument,
  SettingsUpdateDocument,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"
import { createArrayDiff } from "~/lib/primitives"

export type Settings = {
  hideActionBar: Boolean
  iconOnlySidebar: Boolean
  openAiGptModel: string
}

export function createSettingsState() {
  const [settings, setSettings] = createStore<Settings>({
    hideActionBar: false,
    iconOnlySidebar: false,
    openAiGptModel: "gpt-3",
  })

  // grafbase.request<Query>(SettingsDocument).then((res) => {
  //   setSettings(
  //     produce((state) => {
  //       if (res.settings) {
  //         state.hideActionBar = res.settings.hideActionBar
  //         state.iconOnlySidebar = res.settings.iconOnlySidebar
  //         state.openAiGptModel = res.settings.openAiGptModel
  //       }
  //     })
  //   )
  // })

  // createEffect(() => {
  //   if (settings) {
  //     console.log(settings)
  //   }
  // })

  // // db sync
  // const dbSyncSettings = () => {
  //   grafbase.request<Mutation>(SettingsUpdateDocument, {}).then((res) => {
  //     console.log(res)
  //   })
  // }

  // let updating = false
  // createEffect(() => {
  //   updating = true
  //   dbSyncSettings()
  //   updating = false
  // })

  return {
    // state
    settings,
    // actions
    toggleHideActionBar: () =>
      setSettings({ hideActionBar: !settings.hideActionBar }),
    toggleIconOnlySidebar: () =>
      setSettings({ iconOnlySidebar: !settings.iconOnlySidebar }),
    setOpenAiGptModel: (model: string) =>
      setSettings({ openAiGptModel: model }),
    checkSettings: () => {
      grafbase.request<Query>(SettingsDocument).then(async (res) => {
        console.log(res.settingsCollection?.edges)
        // if we don't have settings for user, create them
        if (res.settingsCollection?.edges?.length === 0) {
          const id = await grafbase.request(SettingsCreateDocument)
          console.log(id, "id of setting")
        }
        return settings
      })
      return false
    },
  }
}
