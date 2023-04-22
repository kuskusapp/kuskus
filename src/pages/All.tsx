import { useKeyDownList } from "@solid-primitives/keyboard"
import { Show, createEffect, createSignal, onMount, untrack } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"

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
  const [keys, { event }] = useKeyDownList()
  const [changeFocus, setChangeFocus] = createSignal(true)

  createEffect(() => {
    if (!newTodo() && event()?.key === "n") {
      untrack(() => {
        setFocusedTodo(0)
        setNewTodoType("all")
        setNewTodo(true)
        setChangeFocus(false)
        setGuard(true)
      })
    }
    if (
      (newTodo() || localSearch() || editingTodo()) &&
      event()?.key === "Escape"
    ) {
      untrack(() => {
        setNewTodo(false)
        setLocalSearch(false)
        setChangeFocus(true)
        setEditingTodo(false)
      })
    }
    if (changeFocus() && orderedTodos().length > 0) {
      if (!editingTodo() && event()?.key === "ArrowDown") {
        untrack(() => {
          if (localSearch() && localSearchResultIds().length > 0) {
            let index = localSearchResultIds().findIndex(
              (id) => id === localSearchResultId()
            )
            if (index === localSearchResultIds().length - 1) {
              index = -1
            }
            setLocalSearchResultId(localSearchResultIds()[index + 1])
            return
          }
          if (orderedTodos().length - 1 === currentlyFocusedTodo()) {
            setCurrentlyFocusedTodo(-1)
          }
          setFocusedTodo(orderedTodos()[currentlyFocusedTodo() + 1].id)
          setCurrentlyFocusedTodo(currentlyFocusedTodo() + 1)
        })
      }
      if (!editingTodo() && event()?.key === "ArrowUp") {
        untrack(() => {
          if (localSearch() && localSearchResultIds().length > 0) {
            let index = localSearchResultIds().findIndex(
              (id) => id === localSearchResultId()
            )
            if (index === 0) {
              index = localSearchResultIds().length
            }
            setLocalSearchResultId(localSearchResultIds()[index - 1])
            return
          }
          if (0 === currentlyFocusedTodo() || -1 === currentlyFocusedTodo()) {
            setCurrentlyFocusedTodo(orderedTodos().length)
          }
          setFocusedTodo(orderedTodos()[currentlyFocusedTodo() - 1].id)
          setCurrentlyFocusedTodo(currentlyFocusedTodo() - 1)
        })
      }
    }
    if (event()?.key === "f") {
      untrack(() => {
        if (!editingTodo()) {
          setLocalSearch(true)
          setFocusedTodo(0)
        }
      })
    }
  })

  createEffect(() => {
    if (event()?.key === "0") {
      untrack(() => {
        if (focusedTodo() !== 0) {
          setTodos(
            todos().map((t) => {
              if (t.id === focusedTodo()) {
                t.priority = 0
              }
              return t
            })
          )
        }
      })
    }
    if (event()?.key === "1") {
      untrack(() => {
        if (focusedTodo() !== 0) {
          setTodos(
            todos().map((t) => {
              if (t.id === focusedTodo()) {
                t.priority = 1
              }
              return t
            })
          )
        }
      })
    }
    if (event()?.key === "2") {
      untrack(() => {
        if (focusedTodo() !== 0) {
          setTodos(
            todos().map((t) => {
              if (t.id === focusedTodo()) {
                t.priority = 2
              }
              return t
            })
          )
        }
      })
    }
    if (event()?.key === "3") {
      untrack(() => {
        if (focusedTodo() !== 0) {
          setTodos(
            todos().map((t) => {
              if (t.id === focusedTodo()) {
                t.priority = 3
              }
              return t
            })
          )
        }
      })
    }
    if (event()?.key === "4") {
      untrack(() => {
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
    }
  })

  createEffect(() => {
    if (event()?.key === "Enter") {
      untrack(() => {
        if (focusedTodo() !== 0 && !localSearch()) {
          untrack(() => {
            if (editingTodo()) {
              setEditingTodo(false)
            } else {
              setEditingTodo(true)
            }
            setTodoToEdit(focusedTodo())
          })
        }
      })
    }
  })

  createEffect(() => {
    setOrderedTodos(
      todos()
        .filter((t) => !t.done)
        .sort((a, b) => b.priority - a.priority)
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
        .sort((a, b) => b.priority - a.priority)
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
