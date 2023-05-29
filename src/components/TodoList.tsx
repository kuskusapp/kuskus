import { Presence } from "@motionone/solid"
import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import {
  For,
  Match,
  Show,
  Suspense,
  Switch,
  batch,
  createEffect,
  createMemo,
  createResource,
  untrack,
} from "solid-js"
import { isDev } from "solid-js/web"
import { PageType, TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { Priority } from "~/GlobalContext/todos"
import NewSubtask from "~/components/NewSubtask"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import TodoEdit from "~/components/TodoEdit"
import TopBar from "~/components/TopBar"
import { ExplainTaskDocument, SuggestedTasksDocument } from "~/graphql/schema"
import { wrapIndex } from "~/lib/lib"
import { createTodosForDev } from "~/lib/local"
import { createShortcuts } from "~/lib/primitives"
import ActionBar from "./ActionBar"
import SuggestedTodos from "./SuggestedTodos"
import { useUser } from "~/GlobalContext/user"
import ExplainedTodo from "./ExplainedTodo"

export default function TodoList() {
  const todoList = useTodoList()
  const user = useUser()

  function setPrority(i: Priority) {
    const focusedTodoKey = todoList.focusedTodoKey()
    if (!focusedTodoKey) return

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
      todoList.todosState.updateTodo(focusedTodoKey, (todo) => ({
        title: todo.title,
        priority: i,
      }))
    }
  }

  createEffect(() => {
    createShortcuts(
      todoList.inMode(TodoListMode.Default) ||
        suggestions.state === "refreshing" ||
        explanation.state === "refreshing"
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
            // Activate filter search
            // TODO:
            // ["Meta"]() {
            //   console.log("trigger")
            // },
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
              console.log("hi")
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
              // console.log(userDetails.userDetails, "user details")
              // if (
              //   new Date(
              //     userDetails.userDetails.paidSubscriptionValidUntilDate
              //   ) < new Date()
              // ) {
              //   if (todoList.todos.length > 10) {
              //     todoList.setMode(TodoListMode.Settings, {
              //       settingsState: "Account",
              //     })
              //     return
              //   }
              // }
              todoList.addNewTask()
            },
            // Create new subtask
            L() {
              todoList.addNewSubtask()
            },
            // local search
            F() {
              todoList.startLocalSearch()
            },
            R() {
              // console.log("run")
              // todoList.aiLoadingForTodo() === todo.key
              // console.log(todoList.focusedTodo())
              // console.log("runs..")
              console.log(suggestions())
              // todoList.aiLoadingForTodo() ===
              //   todo?.parent.key)
            },
            // Suggestions
            A() {
              if (todoList.aiLoadingForTodo()) {
                return
              }
              todoList.setAiLoadingForTodo(todoList.focusedTodoKey())
            },
            // Explain task
            E() {
              // const focused = todoList.focusedTodo()
              // if (focused && focused.type === "todo") {
              //   todoList.setMode(TodoListMode.Explain)
              // }
            },
          }
        : {
            Escape() {
              todoList.setMode(TodoListMode.Default)
            },
          }
    )
  })

  if (isDev) {
    createShortcut(
      ["Control", "I"],
      () => {
        // seed the database with todos/subtasks
        // only works in dev mode
        createTodosForDev(todoList.request)
      },
      { preventDefault: false }
    )
  }

  createEffect(() => {
    console.log(suggestions(), "suggestions ...")
  })

  const delay = (ms: any) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const [suggestions] = createResource(
    () => {
      let todo
      // if (todoList.inMode(TodoListMode.ShowSuggestions)) return suggestions()
      if (!todoList.aiLoadingForTodo()) return
      untrack(() => {
        const focused = todoList.focusedTodo()
        todo = focused && focused.type === "todo" && focused
      })
      return todo
    },
    async (todo) => {
      // console.log(todo, "todo")
      // console.log(todoList.flatTasks())
      // await delay(2000)
      const res = await todoList.request(SuggestedTasksDocument, {
        task: todo.title,
        userId: user.user.id!,
      })
      // console.log(res, "res")
      // if (res.user?.suggestions.needPayment) {
      //   todoList.setMode(TodoListMode.Settings, { settingsState: "Upgrade" })
      //   return
      // }
      // // TODO: decrement gpt-4 use
      // if (res.user?.suggestions.freeAiTaskUsed) {
      //   user.decrementAiTask()
      // }
      // @ts-ignore
      const suggestions = res.user.suggestions.suggestedTasks.tasks
      // console.log(suggestions, "suggestions")
      console.log(suggestions && suggestions.length ? suggestions : undefined)

      // todoList.setMode(TodoListMode.ShowSuggestions)
      todoList.setAiLoadingForTodo(null)
      return suggestions && suggestions.length ? suggestions : undefined
    }
  )

  const [explanation] = createResource(
    () => {
      if (!todoList.inMode(TodoListMode.Explain)) return
      const focused = todoList.focusedTodo()
      return focused && focused.type === "todo" && focused
    },
    async (todo) => {
      const res = await todoList.request(ExplainTaskDocument, {
        task: todo.title,
        userId: user.user.id!,
      })
      console.log(res, "res")
      // if (res.user?.suggestions.needPayment) {
      //   todoList.setMode(TodoListMode.Settings, { settingsState: "Upgrade" })
      //   return
      // }
      // if (res.user?.suggestions.freeAiTaskUsed) {
      //   user.decrementAiTask()
      // }
      // @ts-ignore
      const explanation = res.user.explain.rawResponse
      return explanation
    }
  )

  return (
    <>
      <style>
        {`
        #TagsBar {
          display: none
        }
        @media (min-width: 1200px){
          #TagsBar {
            display: inline
          }

        }
      `}
      </style>
      <div
        id="page"
        class="flex w-full h-full grow overflow-auto justify-between"
      >
        <div
          class="flex flex-col justify-between w-full  drop"
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

          <div class="grow flex  w-full overflow-hidden">
            {/* <TagSidebar /> */}
            <div class="flex flex-col  w-full">
              <div class="grow bg-gray-100 dark:bg-neutral-900 overflow-scroll">
                <div
                  class="p-2 overflow-scroll"
                  style={{ "padding-bottom": "200px" }}
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
                      // console.log("why no run...")
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
                              aiLoading={
                                todoList.aiLoadingForTodo() === todo.key
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
              <ActionBar />
            </div>
            <Presence>
              <Suspense>
                <Show
                  when={
                    todoList.inMode(TodoListMode.ShowSuggestions) &&
                    todoList.aiLoadingForTodo() === null &&
                    suggestions()
                  }
                >
                  {(suggestions) => (
                    <SuggestedTodos suggestions={suggestions()} />
                  )}
                </Show>
                <Show
                  when={
                    todoList.inMode(TodoListMode.ShowExplanation) &&
                    explanation()
                  }
                >
                  <ExplainedTodo explanation={explanation()} />
                </Show>
              </Suspense>
            </Presence>
          </div>
        </div>
      </div>
    </>
  )
}
