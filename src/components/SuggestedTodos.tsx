import { createEffect, createMemo, createSignal, onMount } from "solid-js"
import {
  ClientTodo,
  TodoListMode,
  useTodoList,
} from "~/GlobalContext/todo-list"
import { createShortcut } from "@solid-primitives/keyboard"
import clsx from "clsx"
import { Motion } from "@motionone/solid"

type SuggestedTodo = {
  task: string
  note: string
}

function SuggestedTodo(props: {
  task: string
  note?: string
  isFocused: boolean
  onClick: () => void
  accepted: boolean
}) {
  return (
    <div
      class={clsx(
        "p-2 m-2 mb-2 grid-cols-5 col-span-5 min-w-0",
        props.isFocused && "bg-zinc-200 dark:bg-neutral-700 rounded-lg",
        props.accepted && "opacity-50"
      )}
      onClick={props.onClick}
    >
      <div>{props.task.split(":")[0]}</div>
      <div class="opacity-60 text-sm pl-5 text-start text-ellipsis">
        {props.task.split(":")[1]}
      </div>
    </div>
  )
}

export default function SuggestedTodos(props: {
  suggestions: SuggestedTodo[]
}) {
  const todoList = useTodoList()

  const [focusedSuggestion, setFocusedSuggestion] = createSignal(0)
  const [filteredSuggestions, setFilteredSuggestions] = createSignal(
    props.suggestions.map((s) => {
      return { ...s, accepted: false }
    })
  )

  createShortcut(["Enter"], () => {
    const suggestion = props.suggestions[focusedSuggestion()]

    let newFilteredSuggestions = filteredSuggestions()
    newFilteredSuggestions[focusedSuggestion()].accepted = true
    setFilteredSuggestions(newFilteredSuggestions)

    setFocusedSuggestion((p) => {
      let n = p + 1
      let counter = 0 // Counter to track number of iterations
      if (n >= filteredSuggestions().length) {
        n = 0 // Reset to start if we're at the end of the array
      }
      while (
        filteredSuggestions()[n]?.accepted === true &&
        counter < filteredSuggestions().length
      ) {
        n++
        counter++
        if (n >= filteredSuggestions().length) {
          n = 0 // Reset to start of array if we reach the end
        }
      }
      return n
    })

    // TODO: fix..
    todoList.todosState.addSubtask(todoList.focusedTodoKey()!, {
      type: "subtask",
      title: suggestion.task,
      done: false,
      starred: false,
      priority: 0,
      dueDate: "",
      note: "",
      parent: todoList.focusedTodo() as ClientTodo,
    })
    if (filteredSuggestions().every((s) => s.accepted === true)) {
      todoList.setMode(TodoListMode.Default)
    }
  })

  createShortcut(["ArrowDown"], () => {
    setFocusedSuggestion((p) => {
      let n = p + 1
      let loopedOnce = false

      while (
        n < filteredSuggestions().length &&
        filteredSuggestions()[n].accepted === true
      ) {
        n++
        if (n >= filteredSuggestions().length) {
          if (loopedOnce) break // If we have looped once and all are accepted, break the loop.
          n = 0
          loopedOnce = true
        }
      }

      if (n >= filteredSuggestions().length) {
        n = filteredSuggestions().length - 1 // If we have exceeded the array length, set n to the last index.
      }

      return n
    })
  })

  createShortcut(["ArrowUp"], () => {
    setFocusedSuggestion((p) => {
      let n = p - 1
      if (n < 0) {
        n = filteredSuggestions().length - 1
      }
      const originalN = n // Remember the starting point
      while (filteredSuggestions()[n].accepted === true) {
        n--
        if (n < 0) {
          n = filteredSuggestions().length - 1
        }
        if (n === originalN) {
          // We've gone full circle, every suggestion is accepted
          break
        }
      }
      return n
    })
  })

  return (
    <Motion.div
      initial={{ transform: "translateX(20px)", opacity: 0 }}
      animate={{ transform: "translateX(0px)", opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ width: "0px" }}
      style={{
        width: "40%",
      }}
      class="gap-2 flex flex-col items-center h-full overflow-hidden"
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
        class="bg-gray-100 dark:bg-neutral-900 w-full p-3 text-lg text-center"
      >
        {/* TODO: fix this ts-ignore as well as all others.. */}
        Suggested tasks for {/* @ts-ignore */}
        {todoList.focusedTodo()!.title}
      </Motion.div>
      <div
        class="h-full bg-gray-100 dark:bg-neutral-900 overflow-scroll w-full"
        style={{ "border-radius": "10px" }}
      >
        <div
          class="flex flex-col h-full overflow-scroll"
          style={{ "border-radius": "10px" }}
        >
          {filteredSuggestions().map((todo, index) => (
            <SuggestedTodo
              task={todo.task}
              isFocused={index === focusedSuggestion()}
              onClick={() => setFocusedSuggestion(index)}
              accepted={filteredSuggestions()[index].accepted}
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
