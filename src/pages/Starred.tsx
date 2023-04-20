import { Show } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"

export default function Starred() {
  const { todos, setTodos, newTodo } = useGlobalContext()
  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Starred</h1>
      {todos()
        .filter((t) => {
          return t.starred && !t.done
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
