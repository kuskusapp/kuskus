import { createShortcut } from "@solid-primitives/keyboard"
import { Show, batch } from "solid-js"
import { PageType, useGlobalContext } from "~/GlobalContext/store"
import Help from "~/components/Help"
import Modal from "~/components/Modal"
import Settings from "~/components/Settings"
import Sidebar from "~/components/Sidebar"
import TodoList from "~/components/TodoList"
import { todayDate } from "~/lib/lib"

export default function App() {
  const global = useGlobalContext()

  createShortcut(
    ["Control", "1"],
    () => {
      batch(() => {
        global.setActivePage(PageType.All)
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodoKey(global.orderedTodos()[0].key)
        }
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "2"],
    () => {
      batch(() => {
        global.setActivePage(PageType.Today)
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodoKey(global.orderedTodos()[0].key)
        }
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "3"],
    () => {
      batch(() => {
        global.setActivePage(PageType.Starred)
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodoKey(global.orderedTodos()[0].key)
        }
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "4"],
    () => {
      batch(() => {
        global.setActivePage(PageType.Done)
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodoKey(global.orderedTodos()[0].key)
        }
      })
    },
    { preventDefault: false }
  )

  return (
    <div class="flex min-h-screen  bg-gray-100 dark:bg-stone-900">
      <Sidebar />
      <TodoList />
      <Show when={global.showHelp()}>
        <Modal
          title="Help"
          onClose={() => global.setShowHelp(false)}
          children={<Help />}
        />
      </Show>
      <Show when={global.showSettings()}>
        <Modal
          title="Settings"
          onClose={() => global.setShowSettings(false)}
          children={<Settings />}
        />
      </Show>
    </div>
  )
}
