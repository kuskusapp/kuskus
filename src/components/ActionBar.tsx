import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { batch } from "solid-js"

export default function ActionBar() {
  const ctx = useGlobalContext()
  return (
    <div
      class="cursor-pointer"
      onClick={() => {
        if (!ctx.newTodo()) {
          // TODO: get context of current page, pass it as second arg
          // today, all ..

          batch(() => {
            ctx.setFocusedTodo(0)
            ctx.setNewTodoType("all")
            ctx.setNewTodo(true)
            ctx.setGuard(true)
          })
        }
      }}
    >
      <Icon name="Plus" />
    </div>
  )
}
