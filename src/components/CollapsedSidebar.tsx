import clsx from "clsx"
import { For, onMount } from "solid-js"
import { PageType, useTodoList } from "~/GlobalContext/todo-list"
import { todayDate } from "~/lib/lib"
import Icon from "./Icon"

export default function CollapsedSidebar() {
  const todoList = useTodoList()

  return (
    <>
      <style>
        {`

          #sidebar {
            container-type: inline-size;
            container-name: sidebar;
          }
          #tags {
            display: inline
          }
          @media (min-width: 1200px){
            #tags {
              width: 0%;
              display: none
              
            }
          }

          `}
      </style>
      <div class="  text-base " style={{ width: "70px" }} id="sidebar">
        <div
          class="flex flex-col gap-2  h-full bg-neutral-900"
          style={{ "border-right": "solid 3px rgb(43, 43, 43, 0.5)" }}
        >
          <div class="flex flex-col gap-2 bg-gray-100 dark:bg-neutral-900 py-4 p-2">
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todoList.activePage() === PageType.All &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.All)}
            >
              <div class="relative">
                <Icon name="Inbox" />

                <div
                  id="Number"
                  class={clsx(
                    "bg-gray-100 dark:bg-neutral-900 absolute bottom-0 right-0 text-xs",
                    todoList.activePage() === PageType.All && "bg-neutral-800"
                  )}
                  style={{
                    "margin-top": "1px",
                    "padding-left": "2px",
                    "padding-right": "1.5px",
                    "border-radius": "10px",
                  }}
                >
                  {todoList.todos.filter((t) => !t.done).length > 0 &&
                    todoList.todos.filter((t) => !t.done).length}
                </div>
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todoList.activePage() === PageType.Today &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Today)}
            >
              <div class="relative">
                <div>
                  <Icon name="Calendar" />
                </div>
                <div
                  id="Number"
                  class={clsx(
                    "absolute bg-gray-100 dark:bg-neutral-900 bottom-0 right-0 text-xs",
                    todoList.activePage() === PageType.Today && "bg-neutral-800"
                  )}
                  style={{
                    "margin-top": "1px",
                    "padding-left": "2px",
                    "padding-right": "1.5px",
                    "border-radius": "10px",
                  }}
                >
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
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todoList.activePage() === PageType.Starred &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Starred)}
            >
              <div class="relative">
                <Icon name="Star" width={"26px"} height={"26px"} />

                <div
                  class={clsx(
                    "absolute bg-gray-100 dark:bg-neutral-900 bottom-0 right-0 text-xs",
                    todoList.activePage() === PageType.Starred &&
                      "bg-neutral-800"
                  )}
                  style={{
                    "margin-top": "1px",
                    "padding-left": "2px",
                    "padding-right": "1.5px",
                    "border-radius": "10px",
                  }}
                >
                  {/* TODO: not good, should not run filter twice */}
                  {todoList.todos.filter((t) => {
                    if (!t.done && t.starred) {
                      return true
                    }
                  }).length > 0 &&
                    todoList.todos.filter((t) => t.starred).length}
                </div>
              </div>
            </div>
            <div
              id=""
              class={clsx(
                "flex cursor-pointer items-center justify-center ",
                todoList.activePage() === PageType.Done &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todoList.updateActivePage(PageType.Done)}
            >
              <Icon name="Done" />
            </div>
          </div>
          <div
            class="flex flex-col bg-gray-100 dark:bg-neutral-900 p-2 gap-2 py-4 grow"
            id="tags"
          >
            <For
              each={Array.from(todoList.currentlyUsedTagsWithCount().keys())}
            >
              {(tag) => (
                <div class="flex flex-row-reverse px-2 items-center justify-center cursor-pointer">
                  <div class="text-xs">{tag}</div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}
