import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { batch } from "solid-js"

export default function ActionBar() {
  const global = useGlobalContext()
  return (
    <div
      class="cursor-pointer"
      onClick={() => {
        if (!global.newTodo()) {
          // TODO: get context of current page, pass it as second arg
          // today, all ..

          batch(() => {
            global.setFocusedTodo("")
            global.setNewTodoType("all")
            global.setNewTodo(true)
            global.setGuard(true)
          })
        }
      }}
    >
      <Icon name="Plus" />
    </div>
  )
}
