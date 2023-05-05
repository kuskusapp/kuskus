import { createEventListener } from "@solid-primitives/event-listener"
import clsx from "clsx"
import { onMount } from "solid-js"
import Split from "split.js"
import { PageType, useGlobalContext } from "~/GlobalContext/store"
import { todayDate } from "~/lib/lib"
import Icon from "./Icon"

export default function Sidebar() {
  const global = useGlobalContext()

  onMount(() => {
    Split(["#sidebar", "#page"], {
      gutterSize: 4,
      sizes: [10, 90],
      snapOffset: 0,
      minSize: 80,
    })
  })

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodoKey(null)
        // global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  return (
    <>
      <style>
        {`
        .split {
          display: flex;
          flex-direction: row;
          }
          .gutter {
            background-color: ##1c1917;
            background-repeat: no-repeat;
            background-position: 100%;

            }
          .gutter.gutter-horizontal {
            cursor: col-resize;

          }
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
      <div
        class="w-screen dark:bg-stone-900 bg-gray-100 pt-4 p-3 text-xs pl-4"
        id="sidebar"
      >
        <div class="flex flex-col gap-1 justify-between h-full" ref={ref}>
          <div class="flex flex-col gap-1">
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.All) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.All)}
            >
              <Icon name="Inbox" />
              <span id="Title" class="pl-1 overflow-hidden">
                All
              </span>
              <div id="Number" class="opacity-40 text-xs">
                {global.todos.filter((t) => !t.done).length > 0 &&
                  global.todos.filter((t) => !t.done).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.Today) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Today)}
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
                {global.todosState.todos.filter(
                  (t) => !t.done && t.dueDate === todayDate()
                ).length > 0 &&
                  global.todosState.todos.filter(
                    (t) => !t.done && t.dueDate === todayDate()
                  ).length}
              </div>
            </div>
            <div
              id="TitleWrapper"
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.Starred) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Starred)}
            >
              <div>
                <Icon name="Star" />
              </div>
              <span id="Title" class="pl-1 overflow-hidden">
                Starred
              </span>
              <div class="opacity-40 text-xs ml-auto">
                {/* TODO: not good, should not run filter twice */}
                {global.todos.filter((t) => {
                  if (!t.done && t.starred) {
                    return true
                  }
                }).length > 0 && global.todos.filter((t) => t.starred).length}
              </div>
            </div>
            <div
              id=""
              class={clsx(
                "flex px-2 cursor-pointer items-center justify-start ",
                global.isPageActive(PageType.Done) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Done)}
            >
              <Icon name="Done" />
              <span id="Title" class="pl-1 overflow-hidden">
                Done
              </span>
            </div>
          </div>
          {/* TODO: move this to settings */}
          {/* <div class="flex justify-between justify-self-end">
            <div
              class="has-tooltip cursor-pointer"
              onClick={() => {
                GoogleClient.signoutRedirect({
                  post_logout_redirect_uri: "http://localhost:3000",
                })
              }}
            >
              <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8 dark:text-black">
                Sign Out
              </span>
              <Icon name="SignOut" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
