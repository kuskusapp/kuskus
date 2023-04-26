import { useGlobalContext } from "~/GlobalContext/store"
import Todo from "~/components/Todo"

export default function Starred() {
  const global = useGlobalContext()
  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Starred</h1>
      {global.todosState
        .todos()
        .filter((t) => !t.done && t.starred)
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
    </div>
  )
}
