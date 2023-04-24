import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { Show, batch, createEffect, createSignal, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import { findIndexOfId } from "~/lib/lib"

export default function All() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo(0)
        global.setTodoToEdit(0)
      }
    },
    { passive: true }
  )

  createShortcut(
    ["N"],
    () => {
      if (global.newTodo()) return

      batch(() => {
        global.setFocusedTodo(0)
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
    })
  })

  createShortcut(["ArrowDown"], () => {
    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    if (global.localSearch() && global.localSearchResultIds().length > 0) {
      let index = global
        .localSearchResultIds()
        .findIndex((id) => id === global.localSearchResultId())
      if (index === global.localSearchResultIds().length - 1) {
        global.setLocalSearchResultId(global.localSearchResultIds()[0])
      } else {
        global.setLocalSearchResultId(global.localSearchResultIds()[index + 1])
      }
    } else {
      if (
        findIndexOfId(global.orderedTodos(), global.focusedTodo()) ===
        global.orderedTodos().length - 1
      ) {
        global.setFocusedTodo(
          findIndexOfId(global.orderedTodos(), global.focusedTodo())
        )
      } else {
        global.setFocusedTodo(
          global.orderedTodos()[
            findIndexOfId(global.orderedTodos(), global.focusedTodo()) + 1
          ].id
        )
      }
    }
  })

  createShortcut(["ArrowUp"], () => {
    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    if (global.localSearch() && global.localSearchResultIds().length > 0) {
      let index = global
        .localSearchResultIds()
        .findIndex((id) => id === global.localSearchResultId())
      if (index === 0) {
        global.setLocalSearchResultId(
          global.localSearchResultIds()[
            global.localSearchResultIds().length - 1
          ]
        )
      } else {
        global.setLocalSearchResultId(global.localSearchResultIds()[index - 1])
      }
    } else {
      if (findIndexOfId(global.orderedTodos(), global.focusedTodo()) === 0) {
        global.setFocusedTodo(
          global.orderedTodos()[global.orderedTodos().length - 1].id
        )
      } else {
        if (global.focusedTodo() === 0) {
          global.setFocusedTodo(
            global.orderedTodos()[global.orderedTodos().length - 1].id
          )
          return
        }

        global.setFocusedTodo(
          global.orderedTodos()[
            findIndexOfId(global.orderedTodos(), global.focusedTodo()) - 1
          ].id
        )
      }
    }
  })

  createShortcut(
    ["Enter"],
    () => {
      if (
        global.focusedTodo() !== 0 &&
        !global.localSearch() &&
        !global.newTodo()
      ) {
        if (global.editingTodo()) {
          global.setEditingTodo(false)
          global.setEditNoteInTodo(false)
        } else {
          global.setEditingTodo(true)
        }
        global.setTodoToEdit(global.focusedTodo())
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["T"],
    () => {
      if (
        global.focusedTodo() !== 0 &&
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
        global.setTodoToEdit(global.focusedTodo())
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["F"],
    () => {
      if (global.editingTodo()) return

      batch(() => {
        global.setLocalSearch(true)
        global.setFocusedTodo(0)
      })
    },
    { preventDefault: false }
  )

  for (const i of [0, 1, 2, 3] as const) {
    createShortcut([`${i}`], () => {
      if (global.focusedTodo() !== 0) {
        global.setTodos((todos) =>
          todos.map((t) => {
            if (t.id === global.focusedTodo()) {
              t.priority = i
            }
            return t
          })
        )
      }
    })
  }

  createShortcut(["4"], () => {
    if (global.focusedTodo() !== 0) {
      global.setTodos(
        global.todos().map((t) => {
          if (t.id === global.focusedTodo()) {
            t.starred = !t.starred
          }
          return t
        })
      )
    }
  })

  createEffect(() => {
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
  })

  // order by priority
  onMount(() => {
    global.setCurrentlyFocusedTodo(-1)
  })

  return (
    <div class="p-16 pt-6" ref={ref}>
      <h1 class="font-bold text-3xl mb-8">All</h1>
      {global
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
        .map((todo) => {
          return <Todo todo={todo} />
        })}
      <Show when={global.newTodo() && !global.editingTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
