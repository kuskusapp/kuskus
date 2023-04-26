import { TodoType } from "~/GlobalContext/store"

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

export function sortTodosByPriority(todos: TodoType[]) {
  return todos.sort((a, b) => b.priority - a.priority)
}

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

export function findIndexOfId(todos: TodoType[], todoId: string) {
  return todos.findIndex((t) => t.id === todoId)
}
