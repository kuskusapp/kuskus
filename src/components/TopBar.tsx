import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  return (
    <>
      <div
        class="p-5 flex justify-between"
        style={{ "border-bottom": "solid 1px rgba(200,200,200,0.25)" }}
      >
        <h1 class="font-bold text-xl">{props.title}</h1>
      </div>
    </>
  )
}
