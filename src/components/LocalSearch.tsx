import { useGlobalContext } from "~/GlobalContext/store"

export default function LocalSearch() {
  const { setLocalSearchInput } = useGlobalContext()

  return (
    <input
      style={{ outline: "none" }}
      class="w-full"
      oninput={(e) => {
        setLocalSearchInput(e.target.value)
        // setSearch(e.target.value)
        // let foundTodoId = 0
        // todos().map((todo) => {
        //   if (todo.title.includes(e.target.value)) {
        //     foundTodoId = todo.id
        //   }
        // })
        // setFocusedTodoFromSearch(foundTodoId)
        // todos.filter(todo => todo.title.includes(search())
        // setTodos()
      }}
      autofocus
      type="text"
      placeholder="Go to..."
    />
  )
}
