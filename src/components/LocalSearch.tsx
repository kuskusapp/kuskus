import { autofocus } from "@solid-primitives/autofocus"
import Fuse from "fuse.js"
import { batch, createEffect, createSignal, onMount } from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { wrapIndex } from "~/lib/lib"
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
          return wrapIndex(p - 1, todoList.flatTasks().length)
        })
      },
      // Focus on todo down from search results
      ArrowDown() {
        todoList.setFocusedTodoFromSearch((p) => {
          return wrapIndex(p + 1, todoList.flatTasks().length)
        })
      },
    })
  })

  return (
    <input
      style={{ outline: "none", "border-radius": "10px", margin: "-4px" }}
      class="w-full grow bg-black pl-5 pr-5 pb-6 p-4"
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
