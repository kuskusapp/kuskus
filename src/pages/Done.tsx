import { useGlobalContext } from "~/GlobalContext/store"
import Todo from "~/components/Todo"

export default function Done() {
  const global = useGlobalContext()
  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Done</h1>
      {global.todosState
        .todos()
        .filter((t) => t.done)
        // TODO: sort by time done, most recent on top
        .map((todo) => {
          return <Todo todo={todo} />
        })}
    </div>
  )
}
