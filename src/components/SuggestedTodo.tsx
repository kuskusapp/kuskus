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
        "p-2 m-2 mb-2 grid-cols-5 col-span-5",
        props.index === global.focusedSuggestedTodo() &&
          "bg-zinc-200 dark:bg-neutral-800 rounded-lg"
      )}
      onClick={() => {
        global.setFocusedSuggestedTodo(props.index)
      }}
    >
      <div>{props.title.split(":")[0]}</div>
      <div class="opacity-60 text-sm pl-5 text-start text-ellipsis">
        {props.title.split(":")[1]}
      </div>
    </div>
  )
}
