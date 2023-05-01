import clsx from "clsx"
import { useGlobalContext } from "~/GlobalContext/store"

interface Props {
  title: string
  index: number
  note?: string
}

export default function SuggestedTodo(props: Props) {
  const global = useGlobalContext()

  return (
    <div
      class={clsx(
        "flex flex-col p-2 m-2 flex-auto",
        props.index === global.focusedSuggestedTodo() &&
          "bg-zinc-200 rounded-lg"
      )}
    >
      <div>{props.title.split(":")[0]}</div>
      <div class=" opacity-60 text-sm pl-5 text-start text-ellipsis">
        {props.title.split(":")[1]}
      </div>
    </div>
  )
}
