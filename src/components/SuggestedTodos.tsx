import { createEffect, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"

// TODO: best move this someplace else
// this is temporary
export type SuggestedTodos = {
  title: string
  note: string
}

export default function SuggestedTodos() {
  const global = useGlobalContext()

  return (
    <div
      style={{ "border-radius": "25px", width: "45%", opacity: "0.6" }}
      class="dark:bg-stone-900 bg-gray-100 rounded mr-2 flex flex-col justify-between items-center h-full "
    >
      <div
        style={{ "border-radius": "25px 25px 0 0" }}
        class="text-xs dark:bg-stone-900 bg-gray-100 drop-shadow-lg w-full p-1 text-center"
      >
        Suggested tasks for {global.todos[global.focusedTodo()!].title}
      </div>

      {/* <div>chat</div> */}
      {/* <div class="m-3 w-4/5">
        <input
          class="w-full rounded p-2 text-sm pl-4 dark:bg-neutral-800 bg-white"
          placeholder="Ask"
        ></input>
      </div> */}
    </div>
  )
}
