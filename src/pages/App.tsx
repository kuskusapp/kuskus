import { Show, Signal, createContext, createSignal, useContext } from "solid-js"
import { createSettingsState } from "~/GlobalContext/settings"
import Help from "~/components/Help"
import Modal from "~/components/Modal"
import Settings from "~/components/Settings"
import Sidebar from "~/components/Sidebar"
import TodoList from "~/components/TodoList"
import { createShortcuts } from "~/lib/primitives"

export enum PageType {
  All = "All",
  Today = "Today",
  Done = "Done",
  Starred = "Starred",
}

const ActivePageContext = createContext<Signal<PageType>>()
export const useActivePage = () => useContext(ActivePageContext)!

export default function App() {
  const settingsState = createSettingsState()

  const [showHelp, setShowHelp] = createSignal(false)
  const [showSettings, setShowSettings] = createSignal(false)
  const [activePage, setActivePage] = createSignal(PageType.All)

  createShortcuts({
    "Control+1"() {
      setActivePage(PageType.All)
    },
    "Control+2"() {
      setActivePage(PageType.Today)
    },
    "Control+3"() {
      setActivePage(PageType.Starred)
    },
    "Control+4"() {
      setActivePage(PageType.Done)
    },
  })

  return (
    <div class="flex min-h-screen  bg-gray-100 dark:bg-stone-900">
      <ActivePageContext.Provider value={[activePage, setActivePage]}>
        <Sidebar />
        <TodoList />
        <Show when={showHelp()}>
          <Modal
            title="Help"
            onClose={() => setShowHelp(false)}
            children={<Help />}
          />
        </Show>
        <Show when={showSettings()}>
          <Modal
            title="Settings"
            onClose={() => setShowSettings(false)}
            children={<Settings />}
          />
        </Show>
      </ActivePageContext.Provider>
    </div>
  )
}
