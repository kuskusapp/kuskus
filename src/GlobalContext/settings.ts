import { createContext, createEffect, onMount, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import {
  SettingsCreateDocument,
  SettingsDocument,
  SettingsUpdateDocument,
} from "~/graphql/schema"
import { GrafbaseRequest } from "~/pages/App"

export type Settings = {
  id?: string
  collapsedSidebar: Boolean
  languageModelUsed: string // TODO: for some reason this is giving an error with grafbase..
}

// TODO: sync languageModelUsed too, gives grafbase errors..
export function createSettingsState(options: { request: GrafbaseRequest }) {
  const [settings, setSettings] = createStore<Settings>({
    collapsedSidebar: false,
    languageModelUsed: "gpt-3",
  })

  // TODO: this is really dumb, there has to be a better way to do this
  // all users have settings by default with default values
  // you shouldn't have to create them in front end code like this...
  onMount(() => {
    options.request(SettingsDocument).then(async (res) => {
      // if there are no settings, create them and put id in local store
      if (res.settingsCollection?.edges?.length === 0) {
        const res = options.request(SettingsCreateDocument, {
          settings: {}, // use default values
        })
        setSettings({ ...settings, id: res.settingsCreate?.settings?.id! })
        return
      } else {
        setSettings({
          ...settings,
          id: res.settingsCollection?.edges![0]?.node.id,
        })
      }
    })
  })

  // TODO: not sure how good this is..
  // should sync settings to grafbase when settings local store changes..
  createEffect(() => {
    // TODO: should not run on first load of the app..
    if (settings.id) {
      // if settings change, update db
      options.request(SettingsUpdateDocument, {
        id: settings.id,
        settings: {
          collapsedSidebar: settings.collapsedSidebar,
          languageModelUsed: settings.languageModelUsed,
        },
      })
    }
  })

  return {
    // state
    settings,
    // actions
    setCollapsedSidebar: () => {
      return setSettings({ collapsedSidebar: !settings.collapsedSidebar })
    },
    setlanguageModelUsed: (model: string) =>
      setSettings({ languageModelUsed: model }),
  }
}

const SettingsCtx = createContext<ReturnType<typeof createSettingsState>>()

export const SettingsProvider = SettingsCtx.Provider

export const useSettings = () => {
  const ctx = useContext(SettingsCtx)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}
