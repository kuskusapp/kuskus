import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import { For, Match, Show, Switch, batch, createEffect } from "solid-js"
import { PageType, TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { createTodosForDev } from "~/lib/local"
import ActionBar from "./ActionBar"
import LocalSearch from "./LocalSearch"
import SuggestedTodos from "./SuggestedTodos"
import { createShortcuts } from "~/lib/primitives"
import { Priority } from "~/GlobalContext/todos"
import { wrapIndex } from "~/lib/lib"
import NewSubtask from "~/components/NewSubtask"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import TodoEdit from "~/components/TodoEdit"
import TopBar from "~/components/TopBar"

export default function TodoList() {
  const todoList = useTodoList()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        todoList.setFocusedTodo(null)
        // global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  function setPrority(i: Priority) {
    const focusedTodoValue = todoList.focusedTodoKey()
    if (!focusedTodoValue) return

    // update subtask
    // TODO: does not work
    if ("parent" in todoList.flatTasks()[todoList.focusedTodoIndex()!]) {
      // global.todosState.updateSubtask(
      //   focusedTodoValue,
      //   (s: ClientSubtask) => ({
      //     ...s,
      //     priority: i,
      //   })
      // )
    } else {
      // update task
      todoList.todosState.updateTodo(focusedTodoValue, (todo) => ({
        ...todo,
        priority: i,
      }))
    }
  }

  createEffect(() => {
    createShortcuts(
      todoList.inMode(TodoListMode.Default)
        ? {
            // Edit focused todo
            Enter() {
              if (todoList.focusedTodo()) {
                todoList.setMode(TodoListMode.Edit, {})
              }
            },
            // Edit focused todo note
            T() {
              if (todoList.focusedTodo()) {
                todoList.setMode(TodoListMode.Edit, {
                  initEditingNote: true,
                })
              }
            },
            // Focus todo up
            ArrowUp() {
              todoList.setFocusedTodoIndex((p) =>
                wrapIndex(todoList.flatTasks().length, p - 1)
              )
            },
            // Focus todo down
            ArrowDown() {
              todoList.setFocusedTodoIndex((p) =>
                wrapIndex(todoList.flatTasks().length, p + 1)
              )
            },
            // Remove focused todo
            Backspace() {
              const focused = todoList.focusedTodo(),
                index = todoList.focusedTodoIndex()
              if (!focused) return

              batch(() => {
                if (focused.type === "subtask") {
                  todoList.todosState.removeSubtask(
                    focused.parent.key,
                    focused.key
                  )
                } else {
                  todoList.todosState.removeTodo(focused.key)
                }
                // keep focus on the same index
                todoList.setFocusedTodoIndex(index)
              })
            },
            0() {
              setPrority(0)
            },
            1() {
              setPrority(1)
            },
            2() {
              setPrority(2)
            },
            3() {
              setPrority(3)
            },
            4() {
              const focused = todoList.focusedTodoKey()
              if (focused) {
                todoList.todosState.updateTodo(focused, (todo) => ({
                  starred: !todo.starred,
                }))
              }
            },
            // Add a new todo
            N() {
              todoList.addNewTask()
            },
            // Create new subtask
            L() {
              todoList.addNewSubtask()
            },
            // local search
            F() {
              batch(() => {
                todoList.setMode(TodoListMode.Search)
                todoList.setFocusedTodo(null)
              })
            },
            // Suggestions
            A() {
              const focused = todoList.focusedTodo()

              if (focused && focused.type === "todo") {
                todoList.setMode(TodoListMode.Suggest)
              }
            },
          }
        : {
            Escape() {
              todoList.setMode(TodoListMode.Default)
            },
          }
    )
  })

  // TODO: don't use in production, only for development
  createShortcut(
    ["Control", "I"],
    async () => {
      createTodosForDev()
    },
    { preventDefault: false }
  )

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
        class="flex flex-col justify-between rounded overflow-auto relative w-full drop"
        ref={ref}
      >
        <div
          class="grow flex justify-between"
          style={{ "margin-bottom": "21.5px" }}
        >
          <div class="grow">
            <div
              ref={(el) => {
                createEventListener(
                  el,
                  "click",
                  (e) => {
                    if (e.target === el) todoList.setFocusedTodo(null)
                  },
                  { passive: true }
                )
              }}
            >
              <TopBar title={PageType[todoList.activePage()]} />
              <For each={todoList.flatTasks()}>
                {(todo) => {
                  if (todo.type === "new-subtask") {
                    return <NewSubtask subtask={todo} />
                  }
                  return (
                    <Switch>
                      <Match
                        when={
                          todoList.inMode(TodoListMode.Edit) &&
                          todoList.isTodoFocused(todo.key)
                        }
                      >
                        <TodoEdit
                          todo={todo}
                          initialEditNote={
                            todoList.getModeData(TodoListMode.Edit)!
                              .initEditingNote
                          }
                        />
                      </Match>
                      <Match when={true}>
                        <Todo todo={todo} subtask={todo.type === "subtask"} />
                      </Match>
                    </Switch>
                  )
                }}
              </For>
              <Show when={todoList.inMode(TodoListMode.NewTodo)}>
                <NewTodo />
              </Show>
            </div>
          </div>
          <Show when={todoList.inMode(TodoListMode.Suggest)}>
            <SuggestedTodos />
          </Show>
        </div>

        <div
          style={{
            "border-top": "solid 1px rgba(200,200,200,0.2)",
          }}
          class="flex sticky bottom-0 right-0 p-2 dark:bg-stone-900  bg-gray-100"
        >
          <Show
            when={todoList.inMode(TodoListMode.Search)}
            fallback={<ActionBar />}
          >
            <LocalSearch />
          </Show>
        </div>
      </div>
    </div>
  )
}
