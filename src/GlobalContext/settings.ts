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
  languageModelUsed: string
}

export function createSettingsState() {
  const [settings, setSettings] = createStore<Settings>({
    hideActionBar: false,
    iconOnlySidebar: false,
    languageModelUsed: "gpt-3",
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
    grafbase.request<Mutation>(SettingsUpdateDocument, {
      id: settings.id,
      settings: {
        hideActionBar: settings.hideActionBar,
        iconOnlySidebar: settings.iconOnlySidebar,
        languageModelUsed: settings.languageModelUsed,
      },
    })
  })

  return {
    // state
    settings,
    // actions
    toggleHideActionBar: () =>
      setSettings({ hideActionBar: !settings.hideActionBar }),
    toggleIconOnlySidebar: () =>
      setSettings({ iconOnlySidebar: !settings.iconOnlySidebar }),
    setlanguageModelUsed: (model: string) =>
      setSettings({ languageModelUsed: model }),
  }
}
