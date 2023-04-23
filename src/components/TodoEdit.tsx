import { useKeyDownList } from "@solid-primitives/keyboard"
import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  on,
  onMount,
  untrack,
} from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import { autofocus } from "@solid-primitives/autofocus"

interface Props {
  todo: TodoType
  setChangeFocus: Setter<boolean>
  currentlyFocusedTodo: number
  // orderedTodos: Accessor<TodoType[]>
  // setOrderedTodos: Setter<TodoType[]>
  // setCurrentlyFocusedTodo: Setter<number>
}

export default function TodoEdit(props: Props) {
  const { todos, setTodos, editingTodo, setTodoToEdit } = useGlobalContext()
  const [input, setInput] = createSignal("")

  onMount(() => {
    setInput(props.todo.title)
  })

  createEffect(() => {
    if (!editingTodo()) {
      if (input() === "") {
        setTodos(todos().filter((todo) => todo.id !== props.todo.id))
        return
      }
      let indexOfTodoToEdit = todos().findIndex(
        (todo) => todo.id === props.todo.id
      )
      let newTodos = todos()
      newTodos[indexOfTodoToEdit].title = input()
      setTodos(newTodos)
      setTodoToEdit(0)
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
          value={input()}
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
