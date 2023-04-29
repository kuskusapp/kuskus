import { useGlobalContext } from "~/GlobalContext/store"
import { Match, Show, Switch, batch, createEffect, onMount } from "solid-js"
import Today from "~/pages/Today"
import Done from "~/pages/Done"
import All from "~/pages/All"
import Starred from "~/pages/Starred"
import ActionBar from "./ActionBar"
import LocalSearch from "./LocalSearch"
import { findIndexOfId } from "~/lib/lib"
import { createShortcut } from "@solid-primitives/keyboard"
import { createEventListener } from "@solid-primitives/event-listener"
import { createTodosForDev } from "~/lib/local"

export default function Page() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo(null)
        // global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  createShortcut(
    ["Backspace"],
    () => {
      if (!global.localSearch() && !global.editingTodo()) {
        global.todosState.removeTodo(global.focusedTodo()!)

        let todoIdToFocus =
          global
            .orderedTodos()
            .findIndex((todo) => todo.key === global.focusedTodo()) + 1

        if (global.orderedTodos().length === 0) {
          global.setFocusedTodo(null)
        } else {
          global.setFocusedTodo(global.orderedTodos()[todoIdToFocus].key)
        }
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["N"],
    () => {
      if (global.newTodo() || global.editingTodo()) return

      batch(() => {
        global.setFocusedTodo(null)
        // TODO: change depending of where you create todo
        global.setNewTodoType("all")
        global.setNewTodo(true)
        global.setChangeFocus(false)
        global.setGuard(true)
      })
    },
    { preventDefault: false }
  )

  createShortcut(["Escape"], () => {
    if (!global.newTodo() && !global.localSearch() && !global.editingTodo())
      return

    batch(() => {
      global.setNewTodo(false)
      global.setLocalSearch(false)
      global.setChangeFocus(true)
      global.setEditingTodo(false)
      global.setLocalSearchResultId(null)
      global.setLocalSearchResultIds([])
    })
  })

  createShortcut(["ArrowUp"], () => {
    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    const currentIndex = global.focusedTodoIndex()
    if (currentIndex === 0) {
      global.setFocusedTodo(
        global.flatTasks()[global.flatTasks().length - 1].key
      )
      return
    }

    global.setFocusedTodo(
      global.flatTasks()[
        Math.max(
          0,
          Math.min(
            currentIndex ? currentIndex - 1 : 0,
            global.flatTasks().length - 1
          )
        )
      ].key
    )
  })

  createShortcut(["ArrowDown"], () => {
    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    const currentIndex = global.focusedTodoIndex()

    if (currentIndex === global.flatTasks().length - 1) {
      global.setFocusedTodo(0)
      return
    }

    global.setFocusedTodo(
      global.flatTasks()[
        Math.max(
          0,
          Math.min(
            currentIndex !== null ? currentIndex + 1 : 0,
            global.flatTasks().length - 1
          )
        )
      ].key
    )
  })

  createShortcut(
    ["Enter"],
    () => {
      if (!global.localSearch()) {
        console.log(global.editingTodo())
        global.setEditingTodo((p) => !p)
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["O"],
    () => {
      if (global.newSubtask()) return

      batch(() => {
        global.setNewSubtask(true)
        // global.setFocusedTodo(0)
        // global.setNewTodoType("all")
        // global.setNewTodo(true)
        // global.setChangeFocus(false)
        // global.setGuard(true)
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["T"],
    () => {
      if (
        global.focusedTodo() !== null &&
        !global.localSearch() &&
        !global.newTodo() &&
        !global.editingTodo()
      ) {
        if (global.editingTodo()) {
          global.setEditingTodo(false)
        } else {
          global.setEditingTodo(true)
          global.setEditNoteInTodo(true)
        }
        // global.setTodoToEdit(null)
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["F"],
    () => {
      if (global.editingTodo() || global.newTodo()) return

      batch(() => {
        global.setLocalSearch(true)
        global.setFocusedTodo(null)
      })
    },
    { preventDefault: false }
  )

  // TODO: don't use in production, only for development
  createShortcut(
    ["Control", "I"],
    async () => {
      createTodosForDev()
    },
    { preventDefault: false }
  )

  createEffect(() => {
    if (!global.editingTodo()) {
      for (const i of [0, 1, 2, 3] as const) {
        createShortcut(
          [`${i}`],
          () => {
            const focusedTodoValue = global.focusedTodo()
            if (focusedTodoValue) {
              // update subtask
              if ("parent" in global.flatTasks()[global.focusedTodo()!]) {
                global.todosState.updateSubtask(
                  focusedTodoValue,
                  (subtask) => ({
                    ...subtask,
                    priority: i,
                  })
                )
              } else {
                // update task
                global.todosState.updateTodo(focusedTodoValue, (todo) => ({
                  ...todo,
                  priority: i,
                }))
              }
            }
          },
          { preventDefault: false }
        )
      }

      createShortcut(
        ["4"],
        () => {
          if (global.focusedTodo() !== 0) {
            global.todosState.updateTodo(global.focusedTodo()!, (todo) => ({
              ...todo,
              starred: !todo.starred,
            }))
          }
        },
        { preventDefault: false }
      )
    }
  })

  return (
    <div
      id="page"
      style={{
        "border-radius": "20px",
        height: "96vh",
      }}
      class="flex m-3 w-full rounded bg-white dark:bg-neutral-800 grow overflow-auto justify-between relative "
    >
      <style>
        {`

        ::-webkit-scrollbar {
          display: none
        }`}
      </style>
      <div
        class="flex flex-col m-3 mb-1 justify-between rounded overflow-auto relative w-full mt-6 drop"
        ref={ref}
      >
        <Switch>
          <Match when={global.activePage() === "All"}>
            <All />
          </Match>
          <Match when={global.activePage() === "Today"}>
            <Today />
          </Match>
          <Match when={global.activePage() === "Starred"}>
            <Starred />
          </Match>
          <Match when={global.activePage() === "Done"}>
            <Done />
          </Match>
        </Switch>
        <div
          style={{
            "border-radius": "20px",
          }}
          class="flex sticky bottom-2 right-0 p-1 dark:bg-stone-900 ml-3 mr-3 bg-gray-100"
        >
          <Show when={global.localSearch()} fallback={<ActionBar />}>
            <LocalSearch />
          </Show>
        </div>
      </div>
    </div>
  )
}
