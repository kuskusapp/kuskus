import { createEventListener } from "@solid-primitives/event-listener"
import { For, Show, batch, createEffect, onMount, untrack } from "solid-js"
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
        global.setFocusedTodo(null)
        global.setTodoToEdit("")
        global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  return (
    <div class="p-16 pt-6" ref={ref}>
      <h1 class="font-bold text-3xl mb-8">All</h1>
      <For each={global.orderedTodos()}>{(todo) => <Todo todo={todo} />}</For>
      <Show when={global.newTodo() && !global.editingTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
