import { useTodoList } from "~/GlobalContext/todo-list"
import Icon from "./Icon"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  return (
    <>
      <div class="p-3 flex bg-stone-800" style={{ "border-radius": "10px" }}>
        <h1 class="font-bold text-lg">{props.title}</h1>
      </div>
    </>
  )
}
