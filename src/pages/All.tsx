import { createEventListener } from "@solid-primitives/event-listener"
import { Show, onMount } from "solid-js"
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
        global.setFocusedTodo(0)
        global.setTodoToEdit(0)
      }
    },
    { passive: true }
  )

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
