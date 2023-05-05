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
        global.setFocusedTodoKey(null)
        global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  return (
    <div class="" ref={ref}>
      <div
        class="p-5 flex justify-between"
        style={{ "border-bottom": "solid 1px rgba(200,200,200,0.5)" }}
      >
        <h1 class="font-bold text-xl">All</h1>
        <div class="flex gap-3">
          <div>icon</div>
          <div>search</div>
          <div>settings</div>
        </div>
      </div>
      <For each={global.flatTasks()}>
        {(todo) => {
          if (global.isNewSubtask(todo)) {
            return <NewSubtask />
          }

          return (
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
          )
        }}
      </For>
      <Show when={global.newTodo() && !global.editingTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
