import { batch } from "solid-js"
import { useTodoList, TodoListMode } from "~/GlobalContext/todo-list"

interface Props {
  top: number
  left: number
}

export default function ContextMenu(props: Props) {
  const todoList = useTodoList()
  return (
    <div
      class="flex flex-col gap-2 items-center absolute bg-gray-100 dark:bg-neutral-900 p-2 rounded-lg"
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
        class="hover:bg-gray-200 dark:hover:bg-neutral-800 w-full rounded-lg flex items-center p-1 px-2 justify-center cursor-pointer"
      >
        Edit
      </div>
      <div
        class="hover:bg-gray-200 dark:hover:bg-neutral-800 w-full rounded-lg flex items-center p-1 px-2 justify-center cursor-pointer"
        onClick={() => {
          todoList.addNewSubtask()
        }}
      >
        New subtask
      </div>
      <div
        class="hover:bg-gray-200 dark:hover:bg-neutral-800 w-full rounded-lg flex items-center p-1 px-2 justify-center cursor-pointer"
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
        Delete
      </div>
    </div>
  )
}
