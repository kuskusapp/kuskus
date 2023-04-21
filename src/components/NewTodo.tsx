import { useKeyDownList } from "@solid-primitives/keyboard"
import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  onMount,
  untrack,
} from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import { autofocus, createAutofocus } from "@solid-primitives/autofocus"

interface Props {
  setChangeFocus: Setter<boolean>
  orderedTodos: Accessor<TodoType[]>
  setOrderedTodos: Setter<TodoType[]>
  setCurrentlyFocusedTodo: Setter<number>
}

export default function NewTodo(props: Props) {
  const {
    todos,
    setTodos,
    setGuard,
    setNewTodo,
    newTodoType,
    setNewTodoType,
    setFocusedTodo,
    editingTodo,
    setEditingTodo,
  } = useGlobalContext()
  const [input, setInput] = createSignal("")
  const [keys, { event }] = useKeyDownList()
  const [ref, setRef] = createSignal<HTMLInputElement>()
  createAutofocus(ref)

  // TODO: don't use Math.random() for id, find better way
  // id will most likely coming from grafbase so no worries
  createEffect(() => {
    if (!editingTodo() && event()?.key === "Enter") {
      setTodos([
        ...todos(),
        {
          id: Math.floor(Math.random() * 100 + 1),
          title: input(),
          done: false,
          starred: newTodoType() === "starred",
          priority: 0, // TODO: have way to set priority
        },
      ])
      props.setOrderedTodos(
        todos()
          .filter((t) => !t.done)
          .sort((a, b) => b.priority - a.priority)
      )
      setNewTodo(false)
      setEditingTodo(false)
      setNewTodoType("")
      props.setChangeFocus(true)
      setFocusedTodo(props.orderedTodos()[props.orderedTodos().length - 1].id)
      props.setCurrentlyFocusedTodo(props.orderedTodos().length - 1)
    }
  })

  return (
    <>
      <div class="flex cursor-default pl-1.5 mb-0.5 dark:bg-neutral-700 bg-zinc-200 rounded py-1">
        <div style={{ "padding-top": "0.2rem" }}>
          <Icon name={"Square"} />
        </div>
        <input
          autofocus
          ref={autofocus}
          oninput={(e) => {
            setInput(e.target.value)
          }}
          style={{
            outline: "none",
          }}
          class="pl-1.5 bg-inherit"
        ></input>
      </div>
    </>
  )
}
