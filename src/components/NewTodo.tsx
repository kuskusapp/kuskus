import { createShortcut } from "@solid-primitives/keyboard"
import { Accessor, Setter, createSignal } from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import { autofocus } from "@solid-primitives/autofocus"

interface Props {
  setChangeFocus: Setter<boolean>
}

export default function NewTodo(props: Props) {
  const global = useGlobalContext()
  const [input, setInput] = createSignal("")

  // TODO: don't use Math.random() for id, find better way
  // id will most likely coming from grafbase so no worries
  createShortcut(["Enter"], () => {
    if (global.editingTodo()) return
    if (input() === "") {
      global.setNewTodo(false)
      global.setEditingTodo(false)
      return
    }

    global.setTodos([
      ...global.todos(),
      {
        id: Math.floor(Math.random() * 100 + 1),
        title: input(),
        done: false,
        starred: global.newTodoType() === "starred",
        priority: 0, // TODO: have way to set priority
      },
    ])
    global.setOrderedTodos(
      global
        .todos()
        .filter((t) => !t.done)
        .sort((a, b) => b.priority - a.priority)
    )
    global.setNewTodo(false)
    global.setEditingTodo(false)
    global.setNewTodoType("")
    props.setChangeFocus(true)
    global.setFocusedTodo(
      global.orderedTodos()[global.orderedTodos().length - 1].id
    )
    global.setCurrentlyFocusedTodo(global.orderedTodos().length - 1)
  })

  return (
    <div class="flex cursor-default pl-1.5 mb-0.5 dark:bg-neutral-700 bg-zinc-200 rounded py-1">
      <div style={{ "padding-top": "0.2rem" }}>
        <Icon name={"Square"} />
      </div>
      <input
        autofocus
        ref={autofocus}
        oninput={(e) => setInput(e.target.value)}
        style={{
          outline: "none",
        }}
        class="pl-1.5 bg-inherit"
      ></input>
    </div>
  )
}
