import { createSignal } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"

export default function LocalSearch() {
  const { todos, setTodos, setFocusedTodoFromSearch } = useGlobalContext()
  const [search, setSearch] = createSignal("")

  return (
    <input
      style={{ outline: "none" }}
      class="w-full"
      // value={search()}
      oninput={(e) => {
        // setSearch(e.target.value)
        let foundTodoId = 0
        todos().map((todo) => {
          if (todo.title.includes(e.target.value)) {
            foundTodoId = todo.id
          }
        })
        setFocusedTodoFromSearch(foundTodoId)
        // todos.filter(todo => todo.title.includes(search())
        // setTodos()
      }}
      autofocus
      type="text"
      placeholder="Go to..."
    />
  )
}
