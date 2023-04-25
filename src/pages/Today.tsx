import { useGlobalContext } from "~/GlobalContext/store"
import Todo from "~/components/Todo"
import { todayDate } from "~/lib/lib"

export default function Today() {
  const global = useGlobalContext()

  let today = todayDate()

  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Today</h1>
      {global
        .todos()
        .filter((t) => !t.done && t.dueDate === today)
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
