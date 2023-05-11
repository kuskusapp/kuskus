import { Presence } from "@motionone/solid"
import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { Match, Show, Switch, batch, createEffect } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import { createTodosForDev } from "~/lib/local"
import All from "~/pages/All"
import Done from "~/pages/Done"
import Starred from "~/pages/Starred"
import Today from "~/pages/Today"
import ActionBar from "./ActionBar"
import LocalSearch from "./LocalSearch"
import SuggestedTodos from "./SuggestedTodos"
import { useGlobal } from "~/GlobalContext/global"
import { SuggestedTasksDocument } from "~/graphql/schema"
import TopBar from "./TopBar"

export default function Page() {
  // TODO: grafbase cannot be undefined here, I think..
  const global = useGlobalContext()
  // TODO: doing it in this stupid way
  // because when I tried to do it like this:
  // const { grafbase } = useGlobal()
  // destructuring did not work, I was getting back a signal, grafbase request did not complete..
  const global2 = useGlobal()
  const grafbase = global2.grafbase()!

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodoKey(null)
        // global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  createShortcut(
    ["Backspace"],
    () => {
      if (
        global.newTodo() ||
        global.editingTodo() ||
        global.localSearch() ||
        global.focusedTodoKey() === null
      )
        return

      let todoIdToFocus =
        global
          .flatTasks()
          .findIndex((todo) => todo.key === global.focusedTodoKey()) - 1

      // TODO: improve this code..
      if (global.isSubtask(global.focusedTodo()!)) {
        global.todosState.removeSubtask(
          global.flatTasks()[global.focusedTodoIndex()].key
        )
        if (global.orderedTodos().length === 0) {
          global.setFocusedTodoKey(null)
        } else {
          global.setFocusedTodoKey(global.flatTasks()[todoIdToFocus].key)
        }
        return
      }

      if (!global.localSearch() && !global.editingTodo()) {
        global.todosState.removeTodo(global.focusedTodoKey()!)
      }
      if (global.orderedTodos().length === 0) {
        global.setFocusedTodoKey(null)
      } else {
        global.setFocusedTodoKey(global.flatTasks()[todoIdToFocus].key)
      }
    },
    { preventDefault: false }
  )

  createShortcut(
    ["N"],
    () => {
      if (global.newTodo() || global.editingTodo()) return

      batch(() => {
        global.setFocusedTodoKey(null)
        // TODO: change depending of where you create todo
        global.setNewTodoType("all")
        global.setNewTodo(true)
        global.setChangeFocus(false)
        global.setGuard(true)
      })
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

        // TODO: not good, fix this..
        // it thinks its undefined, in theory, it cannot be..
        // @ts-ignore
        const res = await grafbase.request(SuggestedTasksDocument, {
          // TODO: fix this, it thinks it can be NewSubtask
          // but at this point it cannot be, it should always have a title..
          task: global.flatTasks()[global.focusedTodoIndex()].title,
        })

        const suggestions = res.suggestions.suggestedTasks
        global.setLoadingSuggestedTodos(false)
        if (suggestions.length > 0) {
          // global.setSuggestedTodos(suggestedTodos)
          global.setShowSuggestedTasksModal(true)
        }
      }
    },
    { preventDefault: false }
  )

  createShortcut(["ArrowUp"], () => {
    if (global.showSuggestedTasksModal()) {
      return
    }
    if (global.localSearch()) {
      if (global.localSearchResultIndex() === 0) {
        global.setLocalSearchResultIndex(
          global.localSearchResultIds().length - 1
        )
        global.setLocalSearchResultId(
          global.localSearchResultIds()[global.localSearchResultIndex()!]
        )
        return
      }
      global.setLocalSearchResultId(
        global.localSearchResultIds()[
          global.setLocalSearchResultIndex((e) => e! - 1)
        ]
      )
      return
    }
    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    const currentIndex = global.focusedTodoIndex()
    if (currentIndex === 0) {
      global.setFocusedTodoKey(
        global.flatTasks()[global.flatTasks().length - 1].key
      )
      return
    }

    global.setFocusedTodoKey(
      global.flatTasks()[
        Math.max(
          0,
          Math.min(
            currentIndex ? currentIndex - 1 : 0,
            global.flatTasks().length - 1
          )
        )
      ].key
    )
  })

  createShortcut(["ArrowDown"], () => {
    if (global.showSuggestedTasksModal()) {
      return
    }

    if (global.localSearch()) {
      if (
        global.localSearchResultIds().length - 1 ===
        global.localSearchResultIndex()
      ) {
        global.setLocalSearchResultIndex(0)
        global.setLocalSearchResultId(
          global.localSearchResultIds()[global.localSearchResultIndex()!]
        )
        return
      }
      global.setLocalSearchResultId(
        global.localSearchResultIds()[
          global.setLocalSearchResultIndex((e) => e! + 1)
        ]
      )
      return
    }

    if (
      !global.changeFocus() ||
      global.orderedTodos().length === 0 ||
      global.editingTodo()
    )
      return

    const currentIndex = global.focusedTodoIndex()
    if (currentIndex === global.flatTasks().length - 1) {
      global.setFocusedTodoKey(global.flatTasks()[0].key)
      return
    }

    global.setFocusedTodoKey(
      global.flatTasks()[
        Math.max(
          0,
          Math.min(
            currentIndex !== null ? currentIndex + 1 : 0,
            global.flatTasks().length - 1
          )
        )
      ].key
    )
  })

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

  createShortcut(
    ["L"],
    () => {
      const focused = global.focusedTodo()

      if (
        !focused ||
        global.isNewSubtask(focused) ||
        global.editingTodo() ||
        global.newTodo() ||
        global.newSubtask()
      )
        return

      global.addNewSubtask(
        global.isSubtask(focused) ? focused.parent.key : focused.key
      )
    },
    { preventDefault: false }
  )

  // local search
  createShortcut(
    ["F"],
    () => {
      if (global.editingTodo() || global.newTodo()) return

      batch(() => {
        global.setLocalSearch(true)
        global.setFocusedTodoKey(null)
      })
    },
    { preventDefault: false }
  )

  createShortcut(
    ["Control", "I"],
    async () => {
      // seed the database with todos/subtasks
      // only works in dev mode
      if (!import.meta.env.PROD) {
        createTodosForDev()
      }
    },
    { preventDefault: false }
  )

  createEffect(() => {
    if (!global.editingTodo()) {
      for (const i of [0, 1, 2, 3] as const) {
        createShortcut(
          [`${i}`],
          () => {
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
          },
          { preventDefault: false }
        )
      }

      createShortcut(
        ["4"],
        () => {
          if (global.focusedTodoIndex() !== 0) {
            global.todosState.updateTodo(global.focusedTodoKey()!, (todo) => ({
              ...todo,
              starred: !todo.starred,
            }))
          }
        },
        { preventDefault: false }
      )
    }
  })

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
        class="flex flex-col justify-between rounded overflow-auto relative w-full drop h-screen"
        ref={ref}
      >
        <TopBar title={global.activePage()} />
        <div class="grow flex justify-between overflow-scroll">
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

          <Presence exitBeforeEnter>
            <Show when={global.showSuggestedTasksModal()}>
              <SuggestedTodos />
            </Show>
          </Presence>
        </div>

        <div
          style={{
            "border-top": "solid 1px rgba(200,200,200,0.2)",
          }}
          class="flex p-2 dark:bg-stone-900  bg-gray-100"
        >
          <Show when={global.localSearch()} fallback={<ActionBar />}>
            <LocalSearch />
          </Show>
        </div>
      </div>
    </div>
  )
}
