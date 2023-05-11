import { useTodoList } from "~/GlobalContext/todo-list"
import Icon from "./Icon"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  return (
    <>
      <div
        class="p-3 flex justify-between"
        style={{ "border-bottom": "solid 1px rgba(200,200,200,0.2)" }}
      >
        <h1 class="font-bold text-lg">{props.title}</h1>
      </div>
    </>
  )
}
