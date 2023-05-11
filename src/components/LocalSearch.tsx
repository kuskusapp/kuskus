import { autofocus } from "@solid-primitives/autofocus"
import Fuse from "fuse.js"
import { batch, createEffect, createSignal, onMount } from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { createShortcuts } from "~/lib/primitives"

export default function LocalSearch() {
  const todoList = useTodoList()
  const [index, setIndex] = createSignal<any>()

  // TODO: probably not the best place for this
  onMount(() => {
    setIndex(
      new Fuse(todoList.orderedTodos(), {
        keys: ["title"],
        shouldSort: false,
      })
    )
  })

  createEffect(() => {
    createShortcuts({
      // Focus on todo up from search results
      ArrowUp() {
        todoList.setFocusedTodoFromSearch((p) => {
          const n = p - 1
          if (n < 0) return todoList.flatTasks().length - 1
          return n
          // TODO: for some reason wrapIndex no work
          // wrapIndex(todoList.flatTasks().length, p - 1)
        })
      },
      // Focus on todo down from search results
      ArrowDown() {
        todoList.setFocusedTodoFromSearch((p) => {
          const n = p + 1
          if (n > todoList.flatTasks().length - 1) return 0
          return n
          // wrapIndex(todoList.flatTasks().length, p + 1)
        })
      },
    })
  })

  return (
    <input
      style={{ outline: "none", "border-radius": "10px", margin: "-4px" }}
      class="w-full p-2 px-4 grow dark:bg-stone-900 bg-gray-100"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          if (todoList.localSearchResultIds().length > 0) {
            batch(() => {
              todoList.setFocusedTodoKey(todoList.localSearchResultId())
              todoList.setMode(TodoListMode.Default)
              todoList.setLocalSearchResultIds([])
              todoList.setLocalSearchResultId(null)
            })
          }
        }
      }}
      // TODO: for highliting matches,
      // use includeMatches: true
      oninput={(e) => {
        const matches = index().search(e.target.value)
        if (matches.length === 0) {
          todoList.setLocalSearchResultIds([])
        }
        if (matches.length > 0) {
          todoList.setLocalSearchResultIds(matches.map((m: any) => m.item.key))
          todoList.setLocalSearchResultId(matches[0].item.key)
        }
      }}
      autofocus
      ref={(el) => autofocus(el)}
      type="text"
      placeholder="Go to..."
    />
  )
}
