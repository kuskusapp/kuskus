import { Presence } from "@motionone/solid"
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
    <div ref={ref}>
      <div class="overflow-scroll" style={{ height: "100%" }}>
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
        <Presence exitBeforeEnter>
          <Show when={global.newTodo() && !global.editingTodo()}>
            <NewTodo />
          </Show>
        </Presence>
      </div>
    </div>
  )
}
