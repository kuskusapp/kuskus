import { createSignal, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"

export default function AiChat() {
  const global = useGlobalContext()

  return (
    <div
      style={{ "border-radius": "25px", width: "45%", opacity: "0.6" }}
      class="bg-stone-900 rounded mr-2 flex flex-col justify-between items-center h-full "
    >
      <div
        style={{ "border-radius": "25px 25px 0 0" }}
        class="text-xs bg-stone-900 drop-shadow-lg w-full p-1 text-center"
      >
        Fix all bugs
      </div>
      <div>chat</div>
      <div class="m-3 w-4/5">
        <input
          class="w-full rounded p-2 text-sm pl-4 bg-neutral-800"
          placeholder="Ask"
        ></input>
      </div>
    </div>
  )
}
