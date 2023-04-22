import { TodoType } from "~/GlobalContext/store"

export function isToday(date: Date) {
  const today = new Date()
  return today.toDateString() == date.toDateString()
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

export function findIndexOfId(todos: TodoType[], todoId: number) {
  return todos.findIndex((t) => t.id === todoId)
}
