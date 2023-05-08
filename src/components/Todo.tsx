import clsx from "clsx"
import { Show, createSignal } from "solid-js"
import { isToday } from "~/lib/lib"
import {
  ClientSubtask,
  ClientTodo,
  useGlobalContext,
} from "../GlobalContext/store"
import Icon from "./Icon"
import Loader from "./Loader"

interface Props {
  todo: ClientTodo | ClientSubtask
  subtask: boolean
}

export default function Todo(props: Props) {
  const global = useGlobalContext()
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
            transform: translateY(10px);
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
      `}
      </style>
      <div>
        <div
          class={clsx(
            "flex cursor-default pl-1.5 justify-between p-2 dark:border-neutral-700 mb-1 transition-all",
            props.todo.note && "min-h-min",
            props.subtask && "ml-4",
            global.isTodoFocused(props.todo.key) &&
              "dark:bg-neutral-700 bg-zinc-200",
            global.localSearchResultIds().includes(props.todo.key) &&
              "border rounded border-blue-500",
            global.localSearchResultId() === props.todo.key &&
              "bg-blue-300 dark:bg-blue-500"
          )}
          style={{
            "-webkit-user-select": "none",
            "user-select": "none",
          }}
          onClick={(e) => {
            global.setNewTodo(false)
            if (global.isTodoFocused(props.todo.key)) {
              global.setEditingTodo(true)
            } else {
              global.setFocusedTodoKey(props.todo.key)
            }
          }}
        >
          <div
            style={{ display: "flex" }}
            class={
              triggerAnimation()
                ? "animated flex-col justify-center"
                : "flex-col justify-center"
            }
          >
            <div class="flex items-center gap-1">
              <div
                onClick={() => {
                  setTriggerAnimation(true)
                  setTimeout(() => {
                    global.todosState.toggleTodo(props.todo.key)
                    setTriggerAnimation(false)
                  }, 500)
                }}
              >
                <Icon name={props.todo.done ? "SquareCheck" : "Square"} />
              </div>
              <div>{props.todo.title}</div>
            </div>
            <div class="opacity-60 text-sm pl-5">{props.todo.note}</div>
          </div>
          <div
            style={{ "padding-right": "0.375rem" }}
            class="flex gap-3 items-center"
          >
            <Show
              when={
                global.loadingSuggestedTodos() &&
                global.isTodoFocused(props.todo.key)
              }
            >
              <Loader />
            </Show>
            <div class="opacity-50 " style={{ "font-size": "14.8px" }}>
              {props.todo?.dueDate && isToday(props.todo.dueDate)
                ? "Today"
                : props.todo.dueDate}
            </div>
            <Show when={!props.todo.starred}>
              <div>
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
      </div>
    </>
  )
}
