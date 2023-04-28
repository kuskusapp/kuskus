import { For } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import Todo from "~/components/Todo"

export default function Today() {
  const global = useGlobalContext()

  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Today</h1>
      <For each={global.orderedTodos()}>{(todo) => <Todo todo={todo} />}</For>
    </div>
  )
}
