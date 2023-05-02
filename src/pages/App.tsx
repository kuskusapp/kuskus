import { createShortcut } from "@solid-primitives/keyboard"
import { Show, batch } from "solid-js"
import { PageType, useGlobalContext } from "~/GlobalContext/store"
import Modal from "~/components/Modal"
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
          global.setFocusedTodo(global.orderedTodos()[0].key)
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
          global.setFocusedTodo(global.orderedTodos()[0].key)
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
          global.setFocusedTodo(global.orderedTodos()[0].key)
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
          global.setFocusedTodo(global.orderedTodos()[0].key)
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
        <Modal children={<div>show settings</div>} />
      </Show>
      <Show when={global.showSettings()}>
        <Modal children={<div>show help</div>} />
      </Show>
    </div>
  )
}
