import { createEventListener } from "@solid-primitives/event-listener"
import { Show, batch, createEffect, onMount, untrack } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"

export default function All() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo("")
        global.setTodoToEdit("")
        global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  createEffect(() => {
    if (global.todosState.todos().length > 0) {
      untrack(() => {
        batch(() => {
          global.setOrderedTodos(
            global.todosState
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
      })
    }
  })

  // order by priority
  onMount(() => {
    global.setCurrentlyFocusedTodo(-1)
  })

  return (
    <div class="p-16 pt-6" ref={ref}>
      <h1 class="font-bold text-3xl mb-8">All</h1>
      <Show when={global.todosState.todos().length > 0}>
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
      </Show>
      <Show when={global.newTodo() && !global.editingTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
