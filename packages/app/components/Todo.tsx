import { Motion } from "@motionone/solid"
import clsx from "clsx"
import { For, Show, createSignal } from "solid-js"
import { isToday } from "~/lib/lib"
import {
  ClientSubtask,
  ClientTodo,
  TodoListMode,
  useTodoList,
} from "../GlobalContext/todo-list"
import Icon from "./Icon"
import Loader from "./Loader"

export default function Todo(props: {
  todo: ClientTodo | ClientSubtask
  subtask: boolean
  loadingSuggestions: boolean
}) {
  const todoList = useTodoList()
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
      <Motion.div>
        <div
          class={clsx(
            "flex cursor-default pl-1.5 justify-between p-2 dark:border-neutral-700 mb-1 rounded-lg",
            props.todo.note && "min-h-min",
            props.subtask && "ml-4",
            todoList.isTodoFocused(props.todo.key) &&
              "dark:bg-neutral-800 bg-zinc-200",
            todoList.localSearchData()?.isResult(props.todo.key) &&
              "border rounded border-blue-500",
            todoList.localSearchData()?.isSelected(props.todo.key) &&
              "bg-blue-300 dark:bg-blue-500"
          )}
          style={{
            "-webkit-user-select": "none",
            "user-select": "none",
          }}
          onClick={(e) => {
            if (todoList.isTodoFocused(props.todo.key)) {
              todoList.setMode(TodoListMode.Edit, {})
            } else {
              todoList.setFocusedTodoKey(props.todo.key)
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
                    todoList.todosState.toggleTodo(props.todo.key)
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
            class="flex gap-3 items-center overflow-auto rounded-lg"
          >
            {props.loadingSuggestions && <Loader />}
            <div class="opacity-50 " style={{ "font-size": "14.8px" }}>
              {props.todo?.dueDate && isToday(props.todo.dueDate)
                ? "Today"
                : props.todo.dueDate}
            </div>
            <div class="w-fit">
              <div class="flex w-fit items-center gap-2 justify-center overflow-auto">
                <For each={props.todo.tags}>
                  {(tag) => (
                    <div class="bg-zinc-300 opacity-80 min-w-fit dark:bg-neutral-700 flex justify-start px-3 rounded-2xl overflow-hidden">
                      <div class="whitespace-nowrap w-full">{tag}</div>
                    </div>
                  )}
                </For>
                {/* {props.todo.tags && props.todo.tags.map()} */}
              </div>
            </div>
            <Show when={!props.todo.starred}>
              <div>
                {props.todo.priority !== 0 && (
                  <Icon name={`Priority ${props.todo.priority}`} />
                )}
              </div>
            </Show>
            <Show when={props.todo.starred}>
              <div>
                <Icon
                  name={
                    props.todo.priority
                      ? `StarWithPriority${props.todo.priority}`
                      : `Star`
                  }
                />
              </div>
            </Show>
          </div>
        </div>
      </Motion.div>
    </>
  )
}
