import { Motion } from "@motionone/solid"
import { autofocus } from "@solid-primitives/autofocus"
import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { Show, batch, createEffect, createSignal } from "solid-js"
import { todayDate } from "~/lib/lib"
import { TodoListMode, useTodoList } from "../GlobalContext/todo-list"
import Icon from "./Icon"

export default function NewTodo() {
  const todoList = useTodoList()
  const [title, setTitle] = createSignal("")
  const [note, setNote] = createSignal("")
  const [dueDate, setDueDate] = createSignal("")
  const [showCalendar, setShowCalendar] = createSignal(false)
  const [showSelectPriority, setShowSelectPriority] = createSignal(true)
  const [priority, setPriority] = createSignal<0 | 1 | 2 | 3>(0)
  const [starred, setStarred] = createSignal(false)

  createEventListener(window, "keydown", (e) => {
    if (e.code === "Enter") {
      batch(() => {
        if (title() !== "") {
          switch (todoList.activePage()) {
            case "All":
              todoList.todosState.addTodo({
                title: title(),
                note: note(),
                done: false,
                starred: starred(),
                priority: priority(),
                dueDate: dueDate(),
                subtasks: [],
              })
              break
            case "Today":
              todoList.todosState.addTodo({
                title: title(),
                note: note(),
                done: false,
                starred: starred(),
                priority: priority(),
                dueDate: todayDate(),
                subtasks: [],
              })
              break
            case "Starred":
              todoList.todosState.addTodo({
                title: title(),
                note: note(),
                done: false,
                starred: true,
                priority: priority(),
                dueDate: dueDate(),
                subtasks: [],
              })
              break
            case "Done":
              todoList.todosState.addTodo({
                title: title(),
                note: note(),
                done: true,
                starred: starred(),
                priority: priority(),
                dueDate: dueDate(),
                subtasks: [],
              })
              break
          }
          // todoList.setFocusedTodoKey(newTodoKey)
        }

        todoList.setMode(TodoListMode.Default)
      })
    }
  })

  let titleRef!: HTMLInputElement,
    noteRef!: HTMLInputElement,
    datePickerRef!: HTMLInputElement

  const [editNoteInTodo, setEditNoteInTodo] = createSignal(false)

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
    <Motion.div
      initial={{ transform: "translateY(15px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ duration: 0.3 }}
      class="flex justify-between cursor-default pl-1.5 pr-1.5 dark:bg-neutral-700 bg-zinc-200 py-2 rounded-lg"
    >
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
            when={dueDate() || showCalendar()}
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
              value={dueDate()}
              min={todayDate()}
            ></input>
          </Show>
        </div>
      </div>
    </Motion.div>
  )
}
