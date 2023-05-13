import { createEffect, createSignal, onCleanup } from "solid-js"
import { ClientTodo, useTodoList } from "~/GlobalContext/todo-list"
import { createShortcut } from "@solid-primitives/keyboard"
import clsx from "clsx"
import { Motion } from "@motionone/solid"

type SuggestedTodo = {
  title: string
  note: string
}

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
        "p-2 m-2 mb-2 grid-cols-5 col-span-5 min-w-0 ",
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

  createShortcut(["Enter"], () => {
    const suggestion = props.suggestions[focusedSuggestion()]

    todoList.todosState.addSubtask(todoList.focusedTodoKey()!, {
      type: "subtask",
      title: suggestion.title,
      done: false,
      starred: false,
      priority: 0,
      dueDate: "",
      note: "",
      parent: todoList.focusedTodo() as ClientTodo,
    })
  })

  createShortcut(["ArrowDown"], () => {
    setFocusedSuggestion((p) => {
      const n = p + 1
      if (n > props.suggestions.length - 1) return 0
      return n
    })
  })

  createShortcut(["ArrowUp"], () => {
    setFocusedSuggestion((p) => {
      const n = p - 1
      if (n < 0) return props.suggestions.length - 1
      return n
    })
  })

  return (
    <Motion.div
      initial={{ width: "0px", "font-size": "0px", opacity: 0 }}
      animate={{ width: "40%", "font-size": "18px", opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ width: "0px" }}
      style={{
        width: "40%",
      }}
      class=" gap-2 flex flex-col items-center h-full overflow-hidden"
    >
      <Motion.div
        initial={{ "font-size": "0px" }}
        animate={{ "font-size": "18px" }}
        transition={{ duration: 0 }}
        // TODO: improve the animation on showing the text, text appears squished..
        exit={{ display: "none" }}
        style={{
          "border-radius": "10px",
          color: "rgba(255, 255, 255, 0.5)",
        }}
        class="bg-stone-800 w-full p-3 text-lg text-center"
      >
        {/* TODO: fix this ts-ignore as well as all others.. */}
        Suggested tasks for {/* @ts-ignore */}
        {todoList.focusedTodo()!.title}
      </Motion.div>
      <div
        class="h-full bg-stone-800 overflow-scroll"
        style={{ "border-radius": "10px" }}
      >
        <div
          class="flex flex-col h-full overflow-scroll"
          style={{ "border-radius": "10px" }}
        >
          {props.suggestions.map((todo, index) => (
            <SuggestedTodo
              title={todo.title}
              index={index}
              isFocused={index === focusedSuggestion()}
              onClick={() => setFocusedSuggestion(index)}
            />
          ))}
        </div>
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
