import { autofocus } from "@solid-primitives/autofocus"
import Fuse from "fuse.js"
import {
  batch,
  createMemo,
  createSelector,
  createSignal,
  untrack,
} from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { TodoKey } from "~/GlobalContext/todos"
import { wrapIndex } from "~/lib/lib"
import { createShortcuts } from "~/lib/primitives"

export default function LocalSearch() {
  const todoList = useTodoList()

  const fuse = createMemo(
    () =>
      new Fuse(todoList.orderedTodos(), {
        keys: ["title"],
        shouldSort: false,
      })
  )
  const [query, setQuery] = createSignal("")

  const results = createMemo(() => {
    const results = fuse()
      .search(query())
      .map((r) => r.item.key)

    const [selected, setSelected] = createSignal<TodoKey | undefined>(
      results[0]
    )

    return {
      results,
      selected,
      setSelected,
    }
  })

  todoList.getModeData(TodoListMode.Search)![1]({
    isSelected: createSelector<TodoKey | undefined, TodoKey>(() =>
      results().selected()
    ),
    isResult: createSelector(results, (key: TodoKey, { results }) =>
      results.includes(key)
    ),
  })

  function selectNext(n: -1 | 1) {
    untrack(() => {
      const list = results().results
      const selected = results().selected()
      if (selected) {
        results().setSelected(
          list[wrapIndex(list.indexOf(selected) + n, list.length)]
        )
      }
    })
  }

  createShortcuts({
    // Focus on todo up from search results
    ArrowUp() {
      selectNext(-1)
    },
    // Focus on todo down from search results
    ArrowDown() {
      selectNext(1)
    },
  })

  return (
    <input
      style={{ outline: "none", margin: "-4px" }}
      class="w-full bg-transparent pl-2"
      onKeyPress={(e) => {
        const selected = results().selected()
        if (e.key === "Enter" && selected) {
          batch(() => {
            todoList.setFocusedTodoKey(selected)
            todoList.setMode(TodoListMode.Default)
          })
        }
      }}
      oninput={(e) => setQuery(e.target.value)}
      autofocus
      ref={(el) => autofocus(el)}
      type="text"
      placeholder="Go to..."
    />
  )
}
