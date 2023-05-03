import { useGlobalContext } from "~/GlobalContext/store"
import { ClientTodo, TodoKey } from "~/GlobalContext/todos"

export function isToday(date: string) {
  const today = todayDate()
  if (date === today) {
    return true
  }
}

export function todayDate() {
  let date = new Date()
  let day = ("0" + date.getDate()).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let today = date.getFullYear() + "-" + month + "-" + day
  return today
}

// there is https://primitives.solidjs.community/package/marker#createMarker
// use it instead of this
export function turnHighlightsIntoSpans(str: string, match: string) {
  const regex = new RegExp(`\\b(${match})\\b`, "g")
  const parts = str.split(regex)
  const result = parts.map((part) => {
    if (part.toLowerCase() === match.toLowerCase()) {
      return <span class="bg-red-200">{part}</span>
    } else {
      return part
    }
  })
  return <div>{result}</div>
}

export function parentOfFocusedTodo() {
  const global = useGlobalContext()
  if ("parent" in global.flatTasks()[global.focusedTodoIndex()]) {
    // @ts-ignore
    return global.flatTasks()[global.focusedTodoIndex()].parent
  }
}

export function isSubtask(key: TodoKey) {
  const global = useGlobalContext()
  if ("subtasks" in global.flatTasks()[global.focusedTodoIndex()]) {
    return false
  }
  return true
}
