import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { Match, Show, Switch, batch, createEffect, on } from "solid-js"
import { TodoListMode, useGlobalContext } from "~/GlobalContext/store"
import { GoogleClient } from "~/lib/auth"
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

  createEffect(
    on(global.todoListMode, (mode) => {
      switch (mode) {
        case TodoListMode.Edit: {
          break
        }

        case TodoListMode.NewTodo: {
          break
        }

        case TodoListMode.NewSubtask: {
          break
        }

        case TodoListMode.Search: {
          break
        }

        case TodoListMode.Suggested: {
          break
        }

        default: {
          function moveFocusedIndex(move: -1 | 1) {
            global.setFocusedTodoIndex(
              (global.flatTasks().length - 1) %
                (global.focusedTodoIndex() + move)
            )
          }

          function setPrority(i: Priority) {
            const focusedTodoValue = global.focusedTodoKey()
            if (focusedTodoValue !== null) {
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
          }

          createShortcuts({
            // Edit focused todo
            Enter() {
              if (global.focusedTodo()) {
                global.setTodoListMode({ type: TodoListMode.Edit })
              }
            },
            // Focus todo up
            ArrowUp() {
              moveFocusedIndex(-1)
            },
            // Focus todo down
            ArrowDown() {
              moveFocusedIndex(1)
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
                global.setTodoListMode({ type: TodoListMode.Search })
                global.setFocusedTodo(null)
              })
            },
          })

          break
        }
      }
    })
  )

  createShortcut(
    ["Backspace"],
    () => {
      if (global.newTodo() || global.editingTodo() || global.localSearch())
        return

      if (global.isSubtask(global.focusedTodo()!)) {
        global.todosState.removeSubtask(
          global.flatTasks()[global.focusedTodoIndex()].key
        )
        return
      }

      if (!global.localSearch() && !global.editingTodo()) {
        global.todosState.removeTodo(global.focusedTodoKey()!)

        let todoIdToFocus =
          global
            .orderedTodos()
            .findIndex((todo) => todo.key === global.focusedTodoKey()) + 1

        if (global.orderedTodos().length === 0) {
          global.setFocusedTodoKey(null)
        } else {
          global.setFocusedTodoKey(global.orderedTodos()[todoIdToFocus].key)
        }
      }
    },
    { preventDefault: false }
  )

  createShortcut(["Escape"], () => {
    if (global.showSuggestedTasksModal()) {
      global.setShowSuggestedTasksModal(false)
      global.setFocusedSuggestedTodo(0)
      return
    }
    if (!global.newTodo() && !global.localSearch() && !global.editingTodo())
      return

    batch(() => {
      global.setNewTodo(false)
      global.setNewSubtask(null)
      global.setLocalSearch(false)
      global.setChangeFocus(true)
      global.setEditingTodo(false)
      global.setLocalSearchResultId(null)
      global.setLocalSearchResultIds([])
    })
  })

  // TODO: improve this code..
  createShortcut(
    ["A"],
    async () => {
      if (
        global.newTodo() ||
        global.editingTodo() ||
        global.loadingSuggestedTodos()
      )
        return

      const focused = global.focusedTodo()

      if (
        focused &&
        !global.isNewSubtask(focused) &&
        !global.isSubtask(focused)
      ) {
        global.setLoadingSuggestedTodos(true)
        // TODO: use https://github.com/solidjs-community/solid-primitives/tree/main/packages/fetch#readme
        // maybe do it in `createRequest`?
        // type the response, we know the structure
        // type the response well!

        const urlEncodedTask = focused.title

        const googleToken = (await GoogleClient.getUser())?.id_token

        const res = await fetch(
          `http://127.0.0.1:3001/subtasks?request=${urlEncodedTask}`,
          {
            headers: {
              Authorization: "Bearer " + googleToken,
            },
          }
        )
        const resJson = await res.json()
        // not sure why I can't do .Success right after `res.json()`, whole thing is a hack to get it working for now
        const suggestedTodos = resJson.Success.subtasks

        // TODO: requires more thought on error handling, things can go wrong..
        global.setLoadingSuggestedTodos(false)
        if (suggestedTodos.length > 0) {
          global.setSuggestedTodos(suggestedTodos)
          global.setShowSuggestedTasksModal(true)
        }
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Enter"],
    () => {
      if (
        global.showSuggestedTasksModal() ||
        global.newTodo() ||
        global.isAddingANewSubtask()
      ) {
        return
      }
      if (!global.localSearch()) {
        global.setEditingTodo((p) => !p)
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["T"],
    () => {
      if (global.isAddingANewSubtask()) {
        return
      }
      if (
        global.focusedTodo() !== null &&
        !global.localSearch() &&
        !global.newTodo() &&
        !global.editingTodo()
      ) {
        if (global.editingTodo()) {
          global.setEditingTodo(false)
        } else {
          global.setEditingTodo(true)
          global.setEditNoteInTodo(true)
        }
      }
    },
    { preventDefault: false }
  )

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
