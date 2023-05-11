import { createEffect, createSignal, onCleanup } from "solid-js"
import { useTodoList } from "~/GlobalContext/todo-list"
import { createShortcut } from "@solid-primitives/keyboard"
import clsx from "clsx"
import { wrapIndex } from "~/lib/lib"
import { type SuggestedTodo } from "~/lib/suggestions"
import { Motion } from "@motionone/solid"

function SuggestedTodo(props: {
  title: string
  index: number
  note?: string
  isFocused: boolean
  onClick: () => void
}) {
  return (
    <div
      class={clsx(
        "p-2 m-2 mb-2 grid-cols-5 col-span-5",
        props.isFocused && "bg-zinc-200 dark:bg-neutral-800 rounded-lg"
      )}
      onClick={props.onClick}
    >
      <div>{props.title.split(":")[0]}</div>
      <div class="opacity-60 text-sm pl-5 text-start text-ellipsis">
        {props.title.split(":")[1]}
      </div>
    </div>
  )
}

export default function SuggestedTodos(props: {
  suggestions: SuggestedTodo[]
}) {
  const todoList = useTodoList()

  console.log("SuggestedTodos")
  onCleanup(() => {
    console.log("SuggestedTodos cleanup")
  })
  createEffect(() => {
    console.log("SuggestedTodos effect", props.suggestions)
  })

  const [focusedSuggestion, setFocusedSuggestion] = createSignal(0)

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
    setFocusedSuggestion((p) => wrapIndex(todoList.flatTasks().length, p + 1))
  })

  createShortcut(["ArrowUp"], () => {
    setFocusedSuggestion((p) => wrapIndex(todoList.flatTasks().length, p - 1))
  })

  return (
    <Motion.div
      initial={{ width: "0px", "font-size": "0px", opacity: 0 }}
      animate={{ width: "40%", "font-size": "18px", opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ width: "0px" }}
      style={{
        "border-left": "solid 1px rgba(200, 200, 200, 0.2)",
        width: "40%",
        height: "100%",
      }}
      class="dark:bg-stone-900 bg-gray-100 flex flex-col justify-between items-center overflow-scroll"
    >
      <Motion.div
        initial={{ "font-size": "0px" }}
        animate={{ "font-size": "18px" }}
        transition={{ duration: 0 }}
        // TODO: improve the animation on showing the text, text appears squished..
        exit={{ display: "none" }}
        style={{
          "border-bottom": "solid 1px rgba(200, 200, 200, 0.2)",
          color: "rgba(255, 255, 255, 0.5)",
        }}
        class="dark:bg-stone-900 bg-gray-100 w-full p-3 text-lg text-center"
      >
        {/* TODO: fix this ts-ignore as well as all others.. */}
        Suggested tasks for {/* @ts-ignore */}
        {todoList.focusedTodo()!.title}
      </Motion.div>
      <div class="grid-cols-5 col-span-5">
        {props.suggestions.map((todo, index) => (
          <SuggestedTodo
            title={todo.title}
            index={index}
            isFocused={index === focusedSuggestion()}
            onClick={() => setFocusedSuggestion(index)}
          />
        ))}
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
