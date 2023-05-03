import { createEventListener } from "@solid-primitives/event-listener"
import { For, Match, Show, Switch } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewSubtask from "~/components/NewSubtask"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import TodoEdit from "~/components/TodoEdit"

export default function All() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo(null)
        global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  return (
    <div class="p-16 pt-6" ref={ref}>
      <h1 class="font-bold text-3xl mb-8">All</h1>
      <For each={global.flatTasks()}>
        {(todo) => (
          <Switch>
            <Match
              when={global.isTodoFocused(todo.key) && global.editingTodo()}
            >
              <TodoEdit todo={todo} />
            </Match>
            <Match when={true}>
              <Todo todo={todo} subtask={"parent" in todo} />
            </Match>
          </Switch>
        )}
      </For>
      <Show when={global.newTodo() && !global.editingTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
