import { createSignal, onCleanup } from "solid-js"
import { useTodoList } from "~/GlobalContext/todo-list"

export default function NewTag() {
  const todoList = useTodoList()
  const [Tag, setTag] = createSignal(
    todoList.todosState.todos.map((t) => {
      return t.tags
    })
  )
  const [newTag, setNewTag] = createSignal("")

  onCleanup(() => {})

  return (
    <div class="w-full mt-2" style={{ height: "39px" }}>
      <div class="w-full h-full bg-neutral-800 rounded-lg px-3 p-1 flex items-center">
        <input
          value={newTag()}
          oninput={(e) => {
            setNewTag(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              if (newTag() === "") {
                todoList.setNewTag(false)
              } else {
                todoList.setNewTag(false)
                setTag(...Tag(), newTag())
                console.log(Tag())
              }
            }
          }}
          type="text"
          placeholder="Tag"
          class="outline-none bg-transparent"
          style={{ width: "70%", "font-size": "14px" }}
        />
      </div>
    </div>
  )
}
function searchTags() {
  throw new Error("Function not implemented.")
}
