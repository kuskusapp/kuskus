import clsx from "clsx"
import { For, onMount } from "solid-js"
import { PageType, useTodoList } from "~/GlobalContext/todo-list"
import { todayDate } from "~/lib/lib"
import Icon from "./Icon"

export default function CollapsedSidebar() {
  const todolist = useTodoList()

  return (
    <>
      <style>
        {`

          #sidebar {
            container-type: inline-size;
            container-name: sidebar;
          }


          `}
      </style>
      <div class="  text-base " style={{ width: "70px" }} id="sidebar">
        <div class="flex flex-col gap-2  h-full">
          <div
            class="flex flex-col gap-2 bg-neutral-900 py-4 p-2"
            style={{ "border-radius": "10px" }}
          >
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todolist.activePage() === PageType.All &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.All)}
            >
              <div class="relative">
                <Icon name="Inbox" />

                <div
                  id="Number"
                  class={clsx(
                    "bg-neutral-900 absolute bottom-0 right-0 text-xs",
                    todolist.activePage() === PageType.All && "bg-neutral-800"
                  )}
                  style={{
                    "margin-top": "1px",
                    "padding-left": "2px",
                    "padding-right": "1.5px",
                    "border-radius": "10px",
                  }}
                >
                  {todolist.todos.filter((t) => !t.done).length > 0 &&
                    todolist.todos.filter((t) => !t.done).length}
                </div>
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todolist.activePage() === PageType.Today &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Today)}
            >
              <div class="relative">
                <div>
                  <Icon name="Calendar" />
                </div>
                <div
                  id="Number"
                  class={clsx(
                    "absolute bg-neutral-900 bottom-0 right-0 text-xs",
                    todolist.activePage() === PageType.Today && "bg-neutral-800"
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
                  {todolist.todosState.todos.filter(
                    (t) => !t.done && t.dueDate === todayDate()
                  ).length > 0 &&
                    todolist.todosState.todos.filter(
                      (t) => !t.done && t.dueDate === todayDate()
                    ).length}
                </div>
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex justify-center cursor-pointer items-center",
                todolist.activePage() === PageType.Starred &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Starred)}
            >
              <div class="relative">
                <Icon name="Star" />

                <div
                  class={clsx(
                    "absolute bg-neutral-900 bottom-0 right-0 text-xs",
                    todolist.activePage() === PageType.Starred &&
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
                  {todolist.todos.filter((t) => {
                    if (!t.done && t.starred) {
                      return true
                    }
                  }).length > 0 &&
                    todolist.todos.filter((t) => t.starred).length}
                </div>
              </div>
            </div>
            <div
              id=""
              class={clsx(
                "flex cursor-pointer items-center justify-center ",
                todolist.activePage() === PageType.Done &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Done)}
            >
              <Icon name="Done" />
            </div>
          </div>
          <div
            class="flex flex-col bg-neutral-900 p-2 gap-2 py-4 grow"
            style={{ "border-radius": "10px" }}
          >
            <For
              each={Array.from(todolist.currentlyUsedTagsWithCount().keys())}
            >
              {(tagKey) => (
                <div class="flex flex-row-reverse px-2 items-center justify-center">
                  <div class="font-bold">
                    {tagKey.slice(0, 2).toUpperCase()}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}
