import clsx from "clsx"
import { For } from "solid-js"
import { PageType, useTodoList } from "~/GlobalContext/todo-list"
import { todayDate } from "~/lib/lib"
import Icon from "./Icon"

export default function Sidebar() {
  const todoList = useTodoList()

  return (
    <>
      <style>
        {`

          #sidebar {
            display: none
          }
          #Title {
            display: none
          }
          #TitleWrapper {
            display: flex;
            justify-content: space-between;
          }
          #Number {
            width: auto;
          }
          @media (min-width: 768px){
            #Title {
              display: inline;
            }
            #TitleWrapper {
              display: flex;
              flex-direction: row;
            }
            #Number {
              margin-left: auto;
            }
            #sidebar {
              display: inline
            }

          }
          `}
      </style>
      <div class="w-screen  text-base " style={{ width: "18%" }} id="sidebar">
        <div class="flex flex-col gap-2  h-full">
          <div
            class="flex flex-col gap-1 bg-gray-100 dark:bg-neutral-900 p-2"
            style={{ "border-radius": "10px" }}
          >
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todoList.activePage() === PageType.All &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.All)}
            >
              <Icon name="Inbox" />
              <span id="Title" class="pl-1 overflow-hidden">
                All
              </span>
              <div id="Number" class="opacity-40 text-xs">
                {todoList.todos.filter((t) => !t.done).length > 0 &&
                  todoList.todos.filter((t) => !t.done).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todoList.activePage() === PageType.Today &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Today)}
            >
              <div>
                <Icon name="Calendar" />
              </div>

              <span id="Title" class="pl-1 overflow-hidden ">
                Today
              </span>
              <div id="Number" class="opacity-40 text-xs">
                {/* TODO: fix this. should not run filter twice */}
                {/* maybe make it a runnable function inside the JSX */}
                {/* save first filter computation, then check if it's > 0 */}
                {/* have same issue for other places in this component */}
                {todoList.todosState.todos.filter(
                  (t) => !t.done && t.dueDate === todayDate()
                ).length > 0 &&
                  todoList.todosState.todos.filter(
                    (t) => !t.done && t.dueDate === todayDate()
                  ).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todoList.activePage() === PageType.Starred &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Starred)}
            >
              <div>
                <Icon name="Star" />
              </div>
              <span id="Title" class="pl-1 overflow-hidden">
                Starred
              </span>
              <div class="opacity-40 text-xs ml-auto">
                {/* TODO: not good, should not run filter twice */}
                {todoList.todos.filter((t) => {
                  if (!t.done && t.starred) {
                    return true
                  }
                }).length > 0 && todoList.todos.filter((t) => t.starred).length}
              </div>
            </div>
            <div
              id=""
              class={clsx(
                "flex px-2 cursor-pointer items-center justify-start ",
                todoList.activePage() === PageType.Done &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Done)}
            >
              <Icon name="Done" />
              <span id="Title" class="pl-1 overflow-hidden">
                Done
              </span>
            </div>
          </div>
          <div
            class="flex flex-col bg-gray-100 dark:bg-neutral-900 gap-1 p-2 grow"
            style={{ "border-radius": "10px" }}
          >
            <For
              each={Array.from(todoList.currentlyUsedTagsWithCount().keys())}
            >
              {(tag) => (
                <div
                  class={clsx(
                    "flex flex-row-reverse pl-3 text-md align-center px-2 justify-between items-center cursor-pointer",
                    todoList.activePage() === PageType.Filtered &&
                      todoList.selectedTagInSidebar() === tag &&
                      "bg-zinc-200 dark:bg-neutral-800 rounded"
                  )}
                  style={{ "padding-top": "2px", "padding-bottom": "2px" }}
                  onClick={() => {
                    todoList.updateActivePage(PageType.Filtered)
                    todoList.setSelectedTagInSidebar(tag)
                  }}
                >
                  <div class="opacity-60 text-xs">
                    {todoList.currentlyUsedTagsWithCount().get(tag)}
                  </div>
                  <div>{tag}</div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}
