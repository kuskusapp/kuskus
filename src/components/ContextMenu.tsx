import { batch } from "solid-js"
import { useTodoList, TodoListMode } from "~/GlobalContext/todo-list"

export default function ContextMenu(props: { top: number; left: number }) {
  const todoList = useTodoList()
  return (
    <div
      class="flex flex-col gap-2 items-center absolute bg-neutral-900 p-2 rounded-lg"
      style={{
        top: `${props.top}px`,
        left: `calc(${props.left}px`,
        border: "solid 2px rgba(43, 43, 43, 0.5)",
      }}
    >
      <div
        onClick={() => {
          todoList.setMode(TodoListMode.Edit, {})
        }}
      >
        edit
      </div>
      <div>new Subtask</div>
      <div
        onClick={() => {
          const focused = todoList.focusedTodo(),
            index = todoList.focusedTodoIndex()
          if (!focused) return

          batch(() => {
            if (focused.type === "subtask") {
              todoList.todosState.removeSubtask(focused.parent.key, focused.key)
            } else {
              todoList.todosState.removeTodo(focused.key)
            }
            // keep focus on the same index
            todoList.setFocusedTodoIndex(
              Math.min(todoList.flatTasks().length - 1, index)
            )
          })
        }}
      >
        delete
      </div>
    </div>
  )
}
