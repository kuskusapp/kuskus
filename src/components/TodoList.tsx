import { Presence } from "@motionone/solid"
import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut, useKeyDownList } from "@solid-primitives/keyboard"
import {
  For,
  Match,
  Show,
  Suspense,
  Switch,
  batch,
  createEffect,
  createResource,
} from "solid-js"
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
import { isDev } from "solid-js/web"
import { useGlobal } from "~/GlobalContext/global"
import { SuggestedTasksDocument } from "~/graphql/schema"

export default function TodoList() {
  const todoList = useTodoList()

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
              todoList.setFocusedTodoIndex((p) => {
                return wrapIndex(p - 1, todoList.flatTasks().length)
              })
            },
            // Focus todo up
            K() {
              todoList.setFocusedTodoIndex((p) => {
                return wrapIndex(p - 1, todoList.flatTasks().length)
              })
            },
            // Focus todo down
            ArrowDown() {
              todoList.setFocusedTodoIndex((p) => {
                return wrapIndex(p + 1, todoList.flatTasks().length)
              })
            },
            // Focus todo down
            J() {
              todoList.setFocusedTodoIndex((p) => {
                return wrapIndex(p + 1, todoList.flatTasks().length)
              })
            },
            // Complete task
            [" "]() {
              const focused = todoList.focusedTodo()
              if (!focused) return
              if (focused.type === "subtask") {
                // TODO: complete
                // todoList.todosState.updateSubtask(focused.key, (todo) => ({
                //   done: !todo.done,
                // }))
                return
              }
              todoList.todosState.updateTodo(focused.key, (todo) => ({
                done: !todo.done,
              }))
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
                todoList.setFocusedTodoIndex(
                  Math.min(todoList.flatTasks().length - 1, index)
                )
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
                todoList.setFocusedTodoKey(null)
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
      // seed the database with todos/subtasks
      // only works in dev mode
      if (!import.meta.env.PROD) {
        createTodosForDev()
      }
    },
    { preventDefault: false }
  )

  const global = useGlobal()
  const grafbase = global.grafbase()!

  const [suggestions] = createResource(
    () => {
      if (!todoList.inMode(TodoListMode.Suggest)) return
      const focused = todoList.focusedTodo()
      return focused && focused.type === "todo" && focused
    },
    async (todo) => {
      const res = await grafbase.request(SuggestedTasksDocument, {
        task: todo.title,
      })

      const suggestions = res.suggestions.suggestedTasks
      return suggestions && suggestions.length ? suggestions : undefined
    }
  )

  return (
    <div
      id="page"
      class="flex w-full h-full grow overflow-auto justify-between relative"
    >
      <div
        class="flex flex-col justify-between rounded relative w-full  drop gap-2"
        ref={(el) => {
          createEventListener(
            el,
            "click",
            (e) => {
              if (e.target === el) {
                todoList.setFocusedTodoKey(null)
              }
            },
            { passive: true }
          )
        }}
      >
        <TopBar
          title={
            isDev
              ? `${PageType[todoList.activePage()]} mode:${
                  TodoListMode[todoList.mode()]
                } (dev)`
              : PageType[todoList.activePage()]
          }
        />
        <div class="grow flex gap-2 w-full overflow-hidden">
          <div class="flex flex-col gap-2 w-full">
            <div
              class="grow bg-stone-800 overflow-scroll"
              style={{ "border-radius": "10px" }}
            >
              <div
                class="p-2 overflow-scroll"
                ref={(el) => {
                  createEventListener(
                    el,
                    "click",
                    (e) => {
                      if (e.target === el) todoList.setFocusedTodoKey(null)
                    },
                    { passive: true }
                  )
                }}
              >
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
                          <Todo
                            todo={todo}
                            subtask={todo.type === "subtask"}
                            loadingSuggestions={
                              suggestions.loading &&
                              todoList.isTodoFocused(todo.key)
                            }
                          />
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
            <Show
              when={todoList.inMode(TodoListMode.Search)}
              fallback={<ActionBar />}
            >
              <LocalSearch />
            </Show>
          </div>
          <Presence>
            <Suspense>
              <Show
                when={todoList.inMode(TodoListMode.Suggest) && suggestions()}
              >
                {(list) => <SuggestedTodos suggestions={list()} />}
              </Show>
            </Suspense>
          </Presence>
        </div>
      </div>
    </div>
  )
}
