import { createEffect, onMount } from "solid-js"
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
  id?: string
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

  onMount(() => {
    grafbase.request<Query>(SettingsDocument).then(async (res) => {
      // if we don't have settings for user, create them
      if (!settings.id) {
        if (res.settingsCollection?.edges?.length! < 1) {
          const res = await grafbase.request(SettingsCreateDocument, {
            settings: {}, // use default values
          })
          setSettings({ ...settings, id: res.settingsCreate?.settings?.id! })
        }
      }
    })
    return settings
  })

  createEffect(() => {
    // if settings change, update db
    if (settings) {
      grafbase.request<Mutation>(SettingsUpdateDocument, {
        id: settings.id,
        settings: {
          hideActionBar: settings.hideActionBar,
          iconOnlySidebar: settings.iconOnlySidebar,
          openAiGptModel: settings.openAiGptModel,
        },
      })
    }
  })

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
  }
}
