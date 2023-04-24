import { Setter, createEffect, createSignal, onMount } from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import { autofocus } from "@solid-primitives/autofocus"
import { createShortcut } from "@solid-primitives/keyboard"

interface Props {
  todo: TodoType
  setChangeFocus: Setter<boolean>
  currentlyFocusedTodo: number
}

export default function TodoEdit(props: Props) {
  const global = useGlobalContext()
  const [title, setTitle] = createSignal("")
  const [note, setNote] = createSignal(props.todo.note)

  onMount(() => {
    setTitle(props.todo.title)
  })

  createEffect(() => {
    if (!global.editingTodo()) {
      if (title() === "") {
        global.setTodos(
          global.todos().filter((todo) => todo.id !== props.todo.id)
        )
        return
      }
      let indexOfTodoToEdit = global
        .todos()
        .findIndex((todo) => todo.id === props.todo.id)
      let newTodos = global.todos()
      newTodos[indexOfTodoToEdit].title = title()
      newTodos[indexOfTodoToEdit].note = note()
      global.setTodos(newTodos)
      global.setTodoToEdit(0)
    }
  })

  let titleRef!: HTMLInputElement, noteRef!: HTMLInputElement

  createEffect(() => {
    if (global.editNoteInTodo()) {
      autofocus(noteRef)

      createShortcut(["ArrowUp"], () => {
        global.setEditNoteInTodo(false)
      })
    } else {
      autofocus(titleRef)

      createShortcut(["ArrowDown"], () => {
        global.setEditNoteInTodo(true)
      })
    }
  })

  return (
    <>
      <div class="flex cursor-default pl-1.5 mb-0.5 dark:bg-neutral-700 bg-zinc-200 rounded py-2">
        <div style={{ "padding-top": "0.2rem" }}>
          <Icon name={"Square"} />
        </div>
        <div class="w-full">
          <input
            value={title()}
            autofocus
            ref={titleRef}
            oninput={(e) => {
              setTitle(e.target.value)
            }}
            style={{
              outline: "none",
            }}
            class="pl-1.5 bg-inherit w-full"
          ></input>
          <div class="pl-1.5">
            <input
              autofocus
              ref={noteRef}
              class="bg-transparent text-sm opacity-70 w-full outline-none"
              type="text"
              oninput={(e) => {
                setNote(e.target.value)
              }}
              placeholder="Notes"
              value={props.todo.note ? props.todo.note : ""}
            />
          </div>
        </div>
      </div>
    </>
  )
}
