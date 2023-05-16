import clsx from "clsx"
import { For, onMount } from "solid-js"
import { PageType, useTodoList } from "~/GlobalContext/todo-list"
import { todayDate } from "~/lib/lib"
import Icon from "./Icon"

export default function Sidebar() {
  const todolist = useTodoList()

  return (
    <>
      <style>
        {`

          #sidebar {
            container-type: inline-size;
            container-name: sidebar;
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
          @container sidebar (min-width: 70px){
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

          }
          `}
      </style>
      <div class="w-screen  text-base " style={{ width: "18%" }} id="sidebar">
        <div class="flex flex-col gap-2  h-full">
          <div
            class="flex flex-col gap-1 bg-neutral-900 p-2"
            style={{ "border-radius": "10px" }}
          >
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todolist.activePage() === PageType.All &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.All)}
            >
              <Icon name="Inbox" />
              <span id="Title" class="pl-1 overflow-hidden">
                All
              </span>
              <div id="Number" class="opacity-40 text-xs">
                {todolist.todos.filter((t) => !t.done).length > 0 &&
                  todolist.todos.filter((t) => !t.done).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todolist.activePage() === PageType.Today &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Today)}
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
                {todolist.todosState.todos.filter(
                  (t) => !t.done && t.dueDate === todayDate()
                ).length > 0 &&
                  todolist.todosState.todos.filter(
                    (t) => !t.done && t.dueDate === todayDate()
                  ).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                todolist.activePage() === PageType.Starred &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Starred)}
            >
              <div>
                <Icon name="Star" />
              </div>
              <span id="Title" class="pl-1 overflow-hidden">
                Starred
              </span>
              <div class="opacity-40 text-xs ml-auto">
                {/* TODO: not good, should not run filter twice */}
                {todolist.todos.filter((t) => {
                  if (!t.done && t.starred) {
                    return true
                  }
                }).length > 0 && todolist.todos.filter((t) => t.starred).length}
              </div>
            </div>
            <div
              id=""
              class={clsx(
                "flex px-2 cursor-pointer items-center justify-start ",
                todolist.activePage() === PageType.Done &&
                  "rounded dark:bg-neutral-800 bg-zinc-200"
              )}
              onClick={() => todolist.updateActivePage(PageType.Done)}
            >
              <Icon name="Done" />
              <span id="Title" class="pl-1 overflow-hidden">
                Done
              </span>
            </div>
          </div>
          <div
            class="flex flex-col bg-neutral-900 p-2 grow"
            style={{ "border-radius": "10px" }}
          >
            <For
              each={Array.from(todolist.currentlyUsedTagsWithCount().keys())}
            >
              {(tag) => (
                <div class="flex flex-row-reverse px-2 justify-between items-center cursor-pointer">
                  <div class="opacity-60 text-xs">
                    {todolist.currentlyUsedTagsWithCount().get(tag)}
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
