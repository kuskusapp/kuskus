import { Show } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"

export default function Done() {
  const global = useGlobalContext()
  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Done</h1>
    </div>
  )
}
