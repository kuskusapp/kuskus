import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { Match, Show, Switch, batch, createEffect, on } from "solid-js"
import { TodoListMode, useGlobalContext } from "~/GlobalContext/store"
import { createTodosForDev } from "~/lib/local"
import All from "~/pages/All"
import Done from "~/pages/Done"
import Starred from "~/pages/Starred"
import Today from "~/pages/Today"
import ActionBar from "./ActionBar"
import LocalSearch from "./LocalSearch"
import SuggestedTodos from "./SuggestedTodos"
import { createShortcuts } from "~/lib/primitives"
import { Priority } from "~/GlobalContext/todos"
import { wrapIndex } from "~/lib/lib"

export default function Page() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo(null)
        // global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  function setPrority(i: Priority) {
    const focusedTodoValue = global.focusedTodoKey()
    if (!focusedTodoValue) return

    // update subtask
    // TODO: does not work
    if ("parent" in global.flatTasks()[global.focusedTodoIndex()!]) {
      // global.todosState.updateSubtask(
      //   focusedTodoValue,
      //   (s: ClientSubtask) => ({
      //     ...s,
      //     priority: i,
      //   })
      // )
    } else {
      // update task
      global.todosState.updateTodo(focusedTodoValue, (todo) => ({
        ...todo,
        priority: i,
      }))
    }
  }

  createEffect(() => {
    createShortcuts(
      global.isTodoListMode(TodoListMode.Default)
        ? {
            // Edit focused todo
            Enter() {
              if (global.focusedTodo()) {
                global.setTodoListMode(TodoListMode.Edit, {
                  initEditingNote: false,
                })
              }
            },
            // Edit focused todo note
            T() {
              if (global.focusedTodo()) {
                global.setTodoListMode(TodoListMode.Edit, {
                  initEditingNote: true,
                })
              }
            },
            // Focus todo up
            ArrowUp() {
              global.setFocusedTodoIndex((p) =>
                wrapIndex(global.flatTasks().length, p - 1)
              )
            },
            // Focus todo down
            ArrowDown() {
              global.setFocusedTodoIndex((p) =>
                wrapIndex(global.flatTasks().length, p + 1)
              )
            },
            // Remove focused todo
            Backspace() {
              const focused = global.focusedTodo(),
                index = global.focusedTodoIndex()
              if (!focused) return

              batch(() => {
                if (global.isSubtask(focused)) {
                  global.todosState.removeSubtask(
                    focused.parent.key,
                    focused.key
                  )
                } else {
                  global.todosState.removeTodo(focused.key)
                }
                // keep focus on the same index
                global.setFocusedTodoIndex(index)
              })
            },
            0() {
              setPrority(0)
            },
            1() {
              setPrority(1)
            },
            2() {
              setPrority(2)
            },
            3() {
              setPrority(3)
            },
            4() {
              const focused = global.focusedTodoKey()
              if (focused) {
                global.todosState.updateTodo(focused, (todo) => ({
                  starred: !todo.starred,
                }))
              }
            },
            // Add a new todo
            N() {
              global.addNewTask()
            },
            // Create new subtask
            L() {
              const focused = global.focusedTodo()

              if (!focused || global.isNewSubtask(focused)) return

              global.addNewSubtask(
                global.isSubtask(focused) ? focused.parent.key : focused.key
              )
            },
            // local search
            F() {
              batch(() => {
                global.setTodoListMode(TodoListMode.Search)
                global.setFocusedTodo(null)
              })
            },
            // Suggestions
            A() {
              const focused = global.focusedTodo()

              if (
                focused &&
                !global.isNewSubtask(focused) &&
                !global.isSubtask(focused)
              ) {
                global.setTodoListMode(TodoListMode.Suggest)
              }
            },
          }
        : {
            Escape() {
              global.setTodoListMode(TodoListMode.Default)
            },
          }
    )
  })

  // TODO: don't use in production, only for development
  createShortcut(
    ["Control", "I"],
    async () => {
      createTodosForDev()
    },
    { preventDefault: false }
  )

  return (
    <div
      id="page"
      class="flex w-full  bg-white dark:bg-stone-900 grow overflow-auto justify-between relative "
      style={{ "border-left": "solid 1px rgba(200, 200, 200, 0.2)" }}
    >
      <style>
        {`

        ::-webkit-scrollbar {
          display: none
        }`}
      </style>
      <div
        class="flex flex-col justify-between rounded overflow-auto relative w-full drop"
        ref={ref}
      >
        <div
          class="grow flex justify-between"
          style={{ "margin-bottom": "21.5px" }}
        >
          <div class="grow">
            <Switch>
              <Match when={global.activePage() === "All"}>
                <All />
              </Match>
              <Match when={global.activePage() === "Today"}>
                <Today />
              </Match>
              <Match when={global.activePage() === "Starred"}>
                <Starred />
              </Match>
              <Match when={global.activePage() === "Done"}>
                <Done />
              </Match>
            </Switch>
          </div>
          <Show when={global.showSuggestedTasksModal()}>
            <SuggestedTodos />
          </Show>
        </div>

        <div
          style={{
            "border-top": "solid 1px rgba(200,200,200,0.2)",
          }}
          class="flex sticky bottom-0 right-0 p-2 dark:bg-stone-900  bg-gray-100"
        >
          <Show when={global.localSearch()} fallback={<ActionBar />}>
            <LocalSearch />
          </Show>
        </div>
      </div>
    </div>
  )
}
