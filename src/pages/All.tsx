import { createShortcut } from "@solid-primitives/keyboard"
import { Show, batch, createEffect, createSignal, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import { findIndexOfId } from "~/lib/lib"

export default function All() {
  const {
    todos,
    setTodos,
    newTodo,
    setNewTodo,
    setNewTodoType,
    setFocusedTodo,
    setLocalSearch,
    localSearch,
    focusedTodo,
    setTodoToEdit,
    setEditingTodo,
    editingTodo,
    setGuard,
    setLocalSearchResultId,
    localSearchResultIds,
    orderedTodos,
    setOrderedTodos,
    localSearchResultId,
    currentlyFocusedTodo,
    setCurrentlyFocusedTodo,
  } = useGlobalContext()
  // const [keys, { event }] = useKeyDownList()
  const [changeFocus, setChangeFocus] = createSignal(true)

  createShortcut(
    ["N"],
    () => {
      if (newTodo()) return

      batch(() => {
        setFocusedTodo(0)
        setNewTodoType("all")
        setNewTodo(true)
        setChangeFocus(false)
        setGuard(true)
      })
    },
    { preventDefault: false }
  )

  createShortcut(["Escape"], () => {
    if (!newTodo() && !localSearch() && !editingTodo()) return

    batch(() => {
      setNewTodo(false)
      setLocalSearch(false)
      setChangeFocus(true)
      setEditingTodo(false)
    })
  })

  createShortcut(["ArrowDown"], () => {
    if (!changeFocus() || orderedTodos().length === 0 || editingTodo()) return

    if (localSearch() && localSearchResultIds().length > 0) {
      let index = localSearchResultIds().findIndex(
        (id) => id === localSearchResultId()
      )
      if (index === localSearchResultIds().length - 1) {
        setLocalSearchResultId(localSearchResultIds()[0])
      } else {
        setLocalSearchResultId(localSearchResultIds()[index + 1])
      }
    } else {
      if (
        findIndexOfId(orderedTodos(), focusedTodo()) ===
        orderedTodos().length - 1
      ) {
        setFocusedTodo(findIndexOfId(orderedTodos(), focusedTodo()))
      } else {
        setFocusedTodo(
          orderedTodos()[findIndexOfId(orderedTodos(), focusedTodo()) + 1].id
        )
      }
    }
  })

  createShortcut(["ArrowUp"], () => {
    if (!changeFocus() || orderedTodos().length === 0 || editingTodo()) return

    if (localSearch() && localSearchResultIds().length > 0) {
      let index = localSearchResultIds().findIndex(
        (id) => id === localSearchResultId()
      )
      if (index === 0) {
        setLocalSearchResultId(
          localSearchResultIds()[localSearchResultIds().length - 1]
        )
      } else {
        setLocalSearchResultId(localSearchResultIds()[index - 1])
      }
    } else {
      if (findIndexOfId(orderedTodos(), focusedTodo()) === 0) {
        setFocusedTodo(orderedTodos()[orderedTodos().length - 1].id)
      } else {
        setFocusedTodo(
          orderedTodos()[findIndexOfId(orderedTodos(), focusedTodo()) - 1].id
        )
      }
    }
  })

  createShortcut(
    ["Enter"],
    () => {
      if (focusedTodo() !== 0 && !localSearch() && !newTodo()) {
        if (editingTodo()) {
          setEditingTodo(false)
        } else {
          setEditingTodo(true)
        }
        setTodoToEdit(focusedTodo())
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["T"],
    () => {
      console.log("run")
    },
    { preventDefault: false }
  )

  createShortcut(
    ["F"],
    () => {
      if (editingTodo()) return

      batch(() => {
        setLocalSearch(true)
        setFocusedTodo(0)
      })
    },
    { preventDefault: false }
  )

  for (const i of [0, 1, 2, 3] as const) {
    createShortcut([`${i}`], () => {
      if (focusedTodo() !== 0) {
        setTodos((todos) =>
          todos.map((t) => {
            if (t.id === focusedTodo()) {
              t.priority = i
            }
            return t
          })
        )
      }
    })
  }

  createShortcut(["4"], () => {
    if (focusedTodo() !== 0) {
      setTodos(
        todos().map((t) => {
          if (t.id === focusedTodo()) {
            t.starred = !t.starred
          }
          return t
        })
      )
    }
  })

  createEffect(() => {
    setOrderedTodos(
      todos()
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
    setCurrentlyFocusedTodo(-1)
  })

  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">All</h1>
      {todos()
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
          return (
            <Todo
              todo={todo}
              setTodos={setTodos}
              todos={todos}
              setCurrentlyFocusedTodo={setCurrentlyFocusedTodo}
              currentlyFocusedTodo={currentlyFocusedTodo()}
              orderedTodos={orderedTodos}
              setChangeFocus={setChangeFocus}
              newTodo={newTodo}
            />
          )
        })}
      <Show when={newTodo() && !editingTodo()}>
        <NewTodo
          setChangeFocus={setChangeFocus}
          orderedTodos={orderedTodos}
          setOrderedTodos={setOrderedTodos}
          setCurrentlyFocusedTodo={setCurrentlyFocusedTodo}
        />
      </Show>
    </div>
  )
}
