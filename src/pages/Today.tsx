import { useKeyDownList } from "@solid-primitives/keyboard"
import { Show, createEffect, untrack } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import { isToday } from "~/lib/lib"

export default function Today() {
  const { todos, setTodos, newTodo, setNewTodo, setNewTodoType } =
    useGlobalContext()

  const [keys, { event }] = useKeyDownList()

  createEffect(() => {
    if (!newTodo() && event()?.key === "n") {
      untrack(() => {
        setNewTodoType("today")
        setNewTodo(true)
      })
    }
  })

  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Today</h1>
      {todos()
        .filter((t) => {
          if (!t.done && t.dueDate) {
            return isToday(t.dueDate)
          }
        })
        .map((todo) => (
          <Todo todo={todo} setTodos={setTodos} todos={todos} />
        ))}
      <Show when={newTodo()}>
        <NewTodo />
      </Show>
    </div>
  )
}
