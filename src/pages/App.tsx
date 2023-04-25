import { createShortcut, useKeyDownList } from "@solid-primitives/keyboard"
import { Show, batch, createEffect } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
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
        global.setActivePage("All")
        global.setOrderedTodos(
          global
            .todos()
            .filter((t) => !t.done)
            .sort((a, b) => {
              if (b.starred && !a.starred) {
                return 1
              } else if (a.starred && !b.starred) {
                return -1
              }
              return b.priority - a.priority
            })
        )
        global.setFocusedTodo(global.orderedTodos()[0].id)
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "2"],
    () => {
      batch(() => {
        global.setActivePage("Today")
        global.setOrderedTodos(
          global
            .todos()
            .filter((t) => !t.done && t.dueDate === todayDate())
            .sort((a, b) => {
              if (b.starred && !a.starred) {
                return 1
              } else if (a.starred && !b.starred) {
                return -1
              }
              return b.priority - a.priority
            })
        )
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodo(global.orderedTodos()[0].id)
        }
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "3"],
    () => {
      batch(() => {
        global.setActivePage("Starred")
        global.setOrderedTodos(
          global
            .todos()
            .filter((t) => !t.done && t.starred)
            .sort((a, b) => {
              if (b.starred && !a.starred) {
                return 1
              } else if (a.starred && !b.starred) {
                return -1
              }
              return b.priority - a.priority
            })
        )
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodo(global.orderedTodos()[0].id)
        }
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "4"],
    () => {
      batch(() => {
        global.setActivePage("Done")
        global.setOrderedTodos(
          global
            .todos()
            .filter((t) => t.done)
            // TODO: filter by recently added to done
            .sort((a, b) => {
              if (b.starred && !a.starred) {
                return 1
              } else if (a.starred && !b.starred) {
                return -1
              }
              return b.priority - a.priority
            })
        )
        if (global.orderedTodos().length > 0) {
          global.setFocusedTodo(global.orderedTodos()[0].id)
        }
      })
    },
    { preventDefault: false }
  )

  return (
    <div class="flex h-screen">
      <Sidebar />
      <TodoList />
      <Show when={global.showHelpModal()}>
        <Modal />
      </Show>
    </div>
  )
}
