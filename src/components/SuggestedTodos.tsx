import { For } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import SuggestedTodo from "./SuggestedTodo"
import { createShortcut } from "@solid-primitives/keyboard"
import { Motion } from "@motionone/solid"

// TODO: best move this someplace else
// this is temporary
export type SuggestedTodos = {
  title: string
  note: string
}

export default function SuggestedTodos() {
  const global = useGlobalContext()

  // createShortcut(["Enter"], () => {
  //   global.todosState.updateTodo(global.focusedTodo()!, (p) => ({
  //     ...p,
  //     subtasks: p.subtasks.push({
  //       title: "testing",
  //       subutask: "subtask"
  //     })
  //   })
  // })

  createShortcut(["ArrowDown"], () => {
    global.setFocusedSuggestedTodo(
      (global.focusedSuggestedTodo()! + 1) % global.suggestedTodos().length
    )
  })

  createShortcut(["ArrowUp"], () => {
    if (global.focusedSuggestedTodo() === 0) {
      global.setFocusedSuggestedTodo(global.suggestedTodos().length)
    }
    global.setFocusedSuggestedTodo(
      (global.focusedSuggestedTodo()! - 1) % global.suggestedTodos().length
    )
  })

  return (
    <Motion.div
      initial={{ width: "0px", "font-size": "0px" }}
      animate={{ width: "40%", "font-size": "18px" }}
      transition={{ duration: 1 }}
      exit={{ width: "0px" }}
      style={{
        "border-left": "solid 1px rgba(200, 200, 200, 0.2)",
        width: "40%",
        height: "100%",
      }}
      class="dark:bg-stone-900 bg-gray-100 flex flex-col justify-between items-center overflow-scroll"
    >
      <Motion.div
        initial={{ "font-size": "0px", opacity: 0 }}
        animate={{ "font-size": "18px", opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ "font-size": "0px", opacity: 0 }}
        style={{
          "border-bottom": "solid 1px rgba(200, 200, 200, 0.2)",
          color: "rgba(255, 255, 255, 0.5)",
        }}
        class="dark:bg-stone-900 bg-gray-100 w-full p-3 text-lg text-center"
      >
        {/* TODO: fix this ts-ignore as well as all others.. */}
        Suggested tasks for {/* @ts-ignore */}
        {global.flatTasks()[global.focusedTodoIndex()].title}
      </Motion.div>
      <div class="grid-cols-5 col-span-5">
        <For each={global.suggestedTodos()}>
          {(todo, index) => (
            <SuggestedTodo title={todo.title} index={index()} />
          )}
        </For>
      </div>

      {/* <div>chat</div> */}
      {/* <div class="m-3 w-4/5">
        <input
          class="w-full rounded p-2 text-sm pl-4 dark:bg-neutral-800 bg-white"
          placeholder="Ask"
        ></input>
      </div> */}
    </Motion.div>
  )
}
