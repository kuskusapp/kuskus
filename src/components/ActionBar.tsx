import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"

export default function ActionBar() {
  const { setNewTodo, newTodo } = useGlobalContext()
  return (
    <div
      class="cursor-pointer"
      onClick={() => {
        if (!newTodo()) {
          // TODO: get context of current page, pass it as second arg
          // today, all ..
          setNewTodo(true)
        }
      }}
    >
      <Icon name="Plus" />
    </div>
  )
}
