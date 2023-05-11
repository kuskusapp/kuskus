import { autofocus } from "@solid-primitives/autofocus"
import { createShortcut } from "@solid-primitives/keyboard"
import {
  Show,
  batch,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js"
import { todayDate } from "~/lib/lib"
import {
  ClientSubtask,
  ClientTodo,
  TodoListMode,
  useTodoList,
} from "../GlobalContext/todo-list"
import Icon from "./Icon"
import { Motion } from "@motionone/solid"
import { createEventListener } from "@solid-primitives/event-listener"

export default function TodoEdit(props: {
  todo: ClientTodo | ClientSubtask
  initialEditNote?: true
}) {
  const todoList = useTodoList()
  const [title, setTitle] = createSignal(props.todo.title)
  const [note, setNote] = createSignal(props.todo.note)
  const [dueDate, setDueDate] = createSignal(props.todo.dueDate)
  const [showCalendar, setShowCalendar] = createSignal(false)
  const [showSelectPriority, setShowSelectPriority] = createSignal(false)
  const [priority, setPriority] = createSignal(props.todo.priority)
  const [starred, setStarred] = createSignal(props.todo.starred)

  onMount(() => {
    todoList.setClickTimeStamp(0)
  })

  onCleanup(() => {
    // REMOVE
    if (title() === "") {
      todoList.todosState.removeTodo(props.todo.key)
      return
    }

    if ("subtasks" in todoList.flatTasks()[todoList.focusedTodoIndex()]) {
      // UPDATE TASK
      batch(() => {
        todoList.todosState.updateTodo(props.todo.key, (p) => ({
          ...p,
          title: title(),
          note: note(),
          priority: priority(),
          starred: starred(),
          dueDate: showCalendar() && !dueDate() ? todayDate() : dueDate(),
        }))
        todoList.setMode(TodoListMode.Default)
      })
      return
    }

    // UPDATE SUBTASK
    batch(() => {
      todoList.todosState.updateSubtask(
        // TODO: not sure how to avoid ts-ignore..
        // @ts-ignore
        todoList.flatTasks()[todoList.focusedTodoIndex()].parent.key,
        props.todo.key,
        // somehow id, key and parent need to be on the type
        // but they have to be derived, don't know how..
        (p) => ({
          ...p,
          title: title(),
          note: note(),
          priority: priority(),
          starred: starred(),
          dueDate: showCalendar() && !dueDate() ? todayDate() : dueDate(),
          done: false,
        })
      )
      todoList.setMode(TodoListMode.Default)
    })
  })

  createEventListener(window, "keydown", (e) => {
    if (e.code === "Enter") {
      batch(() => {
        if (title() === "") {
          todoList.removeTodo(props.todo.key)
        } else {
          todoList.updateTodo(props.todo.key, {
            title: title(),
            note: note(),
            starred: starred(),
            priority: priority(),
            dueDate: dueDate(),
          })
        }

        todoList.setMode(TodoListMode.Default)
      })
    }
  })

  let titleRef!: HTMLInputElement,
    noteRef!: HTMLInputElement,
    datePickerRef!: HTMLInputElement

  const [editNoteInTodo, setEditNoteInTodo] = createSignal(
    !!props.initialEditNote
  )

  createEffect(() => {
    if (editNoteInTodo()) {
      autofocus(noteRef)
      createShortcut(["ArrowUp"], () => setEditNoteInTodo(false))
    } else {
      autofocus(titleRef)
      createShortcut(["ArrowDown"], () => setEditNoteInTodo(true))
    }
  })

  return (
    <Motion.div class="flex justify-between cursor-default pl-1.5 pr-1.5 dark:bg-neutral-700 bg-zinc-200 py-2 transition-all ">
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
        <div class="pl-7">
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
        {/* TODO: don't duplicate like below.. */}
        <Show when={showSelectPriority()}>
          <div class="cursor-pointer flex">
            <div
              onClick={() => {
                setPriority(1)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 1"} />
            </div>
            <div
              onClick={() => {
                setPriority(2)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 2"} />
            </div>
            <div
              onClick={() => {
                setPriority(3)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 3"} />
            </div>
            <div
              onClick={() => {
                setStarred(!starred())
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Star"} />
            </div>
          </div>
        </Show>
        <Show when={!starred() && !showSelectPriority()}>
          <div
            class="cursor-pointer"
            onClick={() => {
              setShowSelectPriority(true)
            }}
          >
            {priority() === 3 && <Icon name={"Priority 3"} />}
            {priority() === 2 && <Icon name={"Priority 2"} />}
            {priority() === 1 && <Icon name={"Priority 1"} />}
          </div>
        </Show>
        <Show when={starred() && !showSelectPriority()}>
          <div
            class="cursor-pointer"
            onClick={() => {
              setShowSelectPriority(true)
            }}
          >
            {priority() === 3 && <Icon name={"StarWithPriority3"} />}
            {priority() === 2 && <Icon name={"StarWithPriority2"} />}
            {priority() === 1 && <Icon name={"StarWithPriority1"} />}
            {priority() === 0 && <Icon name={"Star"} />}
          </div>
        </Show>
        <div class="opacity-60 text-sm">
          <Show
            when={props.todo.dueDate || showCalendar()}
            fallback={
              <div
                class="cursor-pointer"
                onClick={() => {
                  setShowCalendar(true)
                  datePickerRef.focus()
                }}
              >
                <Icon name="Calendar"></Icon>
              </div>
            }
          >
            <input
              autofocus
              ref={datePickerRef}
              style={{ width: "6.5rem" }}
              class="bg-transparent text-sm opacity-70 outline-none"
              type="date"
              id="start"
              onchange={(e) => {
                setDueDate(e.target.value)
              }}
              value={props.todo.dueDate ? props.todo.dueDate : todayDate()}
              min={props.todo.dueDate ? props.todo.dueDate : todayDate()}
            ></input>
          </Show>
        </div>
      </div>
    </Motion.div>
  )
}
