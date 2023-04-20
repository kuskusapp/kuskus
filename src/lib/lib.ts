import { TodoType } from "~/GlobalContext/store"

export function isToday(date: Date) {
  const today = new Date()
  return today.toDateString() == date.toDateString()
}

export function sortTodosByPriority(todos: TodoType[]) {
  return todos.sort((a, b) => b.priority - a.priority)
}
