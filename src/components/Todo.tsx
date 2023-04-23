import clsx from "clsx"
import { Accessor, Setter, Show, createSignal, onMount } from "solid-js"
import { TodoType, useGlobalContext } from "../GlobalContext/store"
import Icon from "./Icon"
import TodoEdit from "./TodoEdit"

interface Props {
  todo: TodoType
  todos: Accessor<TodoType[]>
  setTodos: Setter<TodoType[]>
  currentlyFocusedTodo: number
  setCurrentlyFocusedTodo: Setter<number>
  orderedTodos: Accessor<TodoType[]>
  setChangeFocus: Setter<boolean>
  newTodo: Accessor<boolean>
}

export default function Todo(props: Props) {
  const {
    focusedTodo,
    setFocusedTodo,
    todoToEdit,
    setEditingTodo,
    localSearchResultIds,
    localSearchResultId,
  } = useGlobalContext()
  const [triggerAnimation, setTriggerAnimation] = createSignal(false)

  return (
    <>
      <style>
        {`
        .animated {
          animation: pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}
      </style>
      <Show
        when={todoToEdit() !== props.todo.id}
        fallback={
          <TodoEdit
            todo={props.todo}
            setChangeFocus={props.setChangeFocus}
            currentlyFocusedTodo={props.currentlyFocusedTodo}
          />
        }
      >
        <div
          class={clsx(
            "flex cursor-default pl-1.5 justify-between p-1",
            props.todo.note && "min-h-min",
            props.todo.id === focusedTodo() &&
              "dark:bg-neutral-700 bg-zinc-200 rounded",
            localSearchResultIds().includes(props.todo.id) &&
              "border rounded border-blue-500",
            localSearchResultId() === props.todo.id && "bg-red-200"
          )}
          style={{ "border-bottom-width": "1px" }}
          onClick={() => {
            if (props.todo.id !== focusedTodo()) {
              let array = props.orderedTodos()
              setEditingTodo(false)
              setFocusedTodo(props.todo.id)

              props.setCurrentlyFocusedTodo(
                array.findIndex((i) => i.id === props.todo.id)
              )
            }
          }}
        >
          <div
            style={{ display: "flex" }}
            class={triggerAnimation() ? "animated" : ""}
          >
            <div
              onClick={() => {
                setTriggerAnimation(true)
                setTimeout(() => {
                  props.setTodos(
                    props.todos().map((t) => {
                      if (t.title === props.todo.title) {
                        return { ...t, done: !t.done }
                      }
                      return t
                    })
                  )
                  setTriggerAnimation(false)
                }, 300)
              }}
              style={{ "padding-top": "0.25rem" }}
            >
              <Icon name={props.todo.done ? "SquareCheck" : "Square"} />
            </div>
            <div>
              <div class="pl-1.5">{props.todo.title}</div>
              <div class="opacity-60 text-sm pl-1.5">{props.todo.note}</div>
            </div>
          </div>
          <div
            style={{ "padding-top": "0.25rem", "padding-right": "0.375rem" }}
            class="flex"
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
                {props.todo.priority === 3 && (
                  <Icon name={"StarWithPriority3"} />
                )}
                {props.todo.priority === 2 && (
                  <Icon name={"StarWithPriority2"} />
                )}
                {props.todo.priority === 1 && (
                  <Icon name={"StarWithPriority1"} />
                )}
                {props.todo.priority === 0 && <Icon name={"Star"} />}
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  )
}
