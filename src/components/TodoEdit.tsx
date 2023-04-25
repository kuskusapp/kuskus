import { Setter, Show, createEffect, createSignal, onMount } from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import { autofocus } from "@solid-primitives/autofocus"
import { createShortcut } from "@solid-primitives/keyboard"
import { isToday } from "~/lib/lib"

interface Props {
  todo: TodoType
}

export default function TodoEdit(props: Props) {
  const global = useGlobalContext()
  const [title, setTitle] = createSignal("")
  const [note, setNote] = createSignal(props.todo.note)

  onMount(() => {
    setTitle(props.todo.title)
    global.setClickTimeStamp(0)
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
      <div class="flex justify-between cursor-default pl-1.5 pr-1.5 dark:bg-neutral-700 bg-zinc-200 rounded py-2">
        <div class="w-full">
          <div class="flex gap-2 items-center">
            <div>
              <Icon name={"Square"} />
            </div>
            <div class="w-full ">
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
                class=" bg-inherit w-full"
              ></input>
            </div>
          </div>
          <div>
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
        <div
          style={{ "padding-right": "0.375rem" }}
          class="flex flex-col justify-between items-end"
        >
          <Show when={!props.todo.starred}>
            <div class="">
              {props.todo.priority === 3 && <Icon name={"Priority 3"} />}
              {props.todo.priority === 2 && <Icon name={"Priority 2"} />}
              {props.todo.priority === 1 && <Icon name={"Priority 1"} />}
            </div>
          </Show>
          <Show when={props.todo.starred}>
            <div>
              {props.todo.priority === 3 && <Icon name={"StarWithPriority3"} />}
              {props.todo.priority === 2 && <Icon name={"StarWithPriority2"} />}
              {props.todo.priority === 1 && <Icon name={"StarWithPriority1"} />}
              {props.todo.priority === 0 && <Icon name={"Star"} />}
            </div>
          </Show>
          <div class="opacity-60 text-sm">
            {" "}
            {props.todo?.dueDate && isToday(props.todo.dueDate) ? "Today" : ""}
          </div>
        </div>
      </div>
    </>
  )
}
