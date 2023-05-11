import { Suspense, createResource, createSignal, untrack } from "solid-js"
import { useTodoList } from "~/GlobalContext/todo-list"
import { createShortcut } from "@solid-primitives/keyboard"
import clsx from "clsx"
import { GoogleClient } from "~/lib/auth"
import { wrapIndex } from "~/lib/lib"
import {
  SuggestedTodosResponse,
  fetchSubtaskSuggestions,
} from "~/lib/suggestions"

function SuggestedTodo(props: {
  title: string
  index: number
  note?: string
  isFocused: boolean
  onClick: () => void
}) {
  return (
    <div
      class={clsx(
        "p-2 m-2 mb-2 grid-cols-5 col-span-5",
        props.isFocused && "bg-zinc-200 dark:bg-neutral-800 rounded-lg"
      )}
      onClick={props.onClick}
    >
      <div>{props.title.split(":")[0]}</div>
      <div class="opacity-60 text-sm pl-5 text-start text-ellipsis">
        {props.title.split(":")[1]}
      </div>
    </div>
  )
}

export default function SuggestedTodos() {
  const todoList = useTodoList()

  // TODO: use https://github.com/solidjs-community/solid-primitives/tree/main/packages/fetch#readme
  // maybe do it in `createRequest`?
  // type the response, we know the structure
  // type the response well!
  const [suggestions] = createResource<SuggestedTodosResponse[] | undefined>(
    async () => {
      const focused = todoList.focusedTodo()

      if (!focused || focused.type !== "todo") return

      const urlEncodedTask = focused.title

      const googleToken = (await GoogleClient.getUser())?.id_token

      return googleToken
        ? fetchSubtaskSuggestions(urlEncodedTask, googleToken)
        : undefined
    }
  )

  return (
    <Suspense>
      {untrack(() => {
        const [focusedSuggestion, setFocusedSuggestion] = createSignal(0)

        // createShortcut(["Enter"], () => {
        //   global.todosState.updateTodo(global.focusedTodo()!, (p) => ({
        //     ...p,
        //     subtasks: p.subtasks.push({
        //       title: "testing",
        //       subutask: "subtask"
        //     })
        //   })
        // })

        createShortcut(["ArrowDown"], () => {
          setFocusedSuggestion((p) =>
            wrapIndex(todoList.flatTasks().length, p + 1)
          )
        })

        createShortcut(["ArrowUp"], () => {
          setFocusedSuggestion((p) =>
            wrapIndex(todoList.flatTasks().length, p - 1)
          )
        })

        return (
          <div
            style={{ "border-radius": "25px", width: "45%", height: "84.6vh" }}
            class="dark:bg-stone-900 bg-gray-100 rounded mr-2 flex flex-col justify-between items-center overflow-scroll"
          >
            <div
              style={{ "border-radius": "25px 25px 0 0" }}
              class="text-xs dark:bg-stone-900 bg-gray-100 drop-shadow-lg w-full p-1 text-center"
            >
              {/* TODO: fix this ts-ignore as well as all others.. */}
              Suggested tasks for {/* @ts-ignore */}
              {todoList.flatTasks()[todoList.focusedTodoIndex()].title}
            </div>
            <div class="grid-cols-5 col-span-5">
              {suggestions()?.map((todo, index) => (
                <SuggestedTodo
                  title={todo.title}
                  index={index}
                  isFocused={index === focusedSuggestion()}
                  onClick={() => setFocusedSuggestion(index)}
                />
              ))}
            </div>

            {/* <div>chat</div> */}
            {/* <div class="m-3 w-4/5">
        <input
          class="w-full rounded p-2 text-sm pl-4 dark:bg-neutral-800 bg-white"
          placeholder="Ask"
        ></input>
      </div> */}
          </div>
        )
      })}
    </Suspense>
  )
}
