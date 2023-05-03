import clsx from "clsx"
import { batch, createEffect, createSignal, onMount } from "solid-js"
import Split from "split.js"
import { PageType, useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { todayDate } from "~/lib/lib"
import { GoogleClient } from "~/lib/auth"
import { createEventListener } from "@solid-primitives/event-listener"

export default function Sidebar() {
  const global = useGlobalContext()

  onMount(() => {
    Split(["#sidebar", "#page"], {
      gutterSize: 6,
      sizes: [15, 85],
      snapOffset: 15,
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
            background-position: 50%;
            }
          .gutter.gutter-horizontal {
            cursor: col-resize;
            margin-right: -12px;
          }
          `}
      </style>
      <div
        class="w-screen dark:bg-stone-900 bg-gray-100 mt-3 p-2 text-xs"
        id="sidebar"
      >
        <div class="flex flex-col gap-1 justify-between h-full" ref={ref}>
          <div class="flex flex-col gap-1">
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.All) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.All)}
            >
              <Icon name="Inbox" />
              <span class="pl-1 overflow-hidden">All</span>
              <div class="opacity-40 text-xs ml-auto">
                {global.todos.filter((t) => !t.done).length > 0 &&
                  global.todos.filter((t) => !t.done).length}
              </div>
            </div>
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.Today) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Today)}
            >
              <Icon name="Calendar" />
              <span class="pl-1 overflow-hidden">Today</span>
              <div class="opacity-40 text-xs ml-auto">
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
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.Starred) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Starred)}
            >
              <Icon name="Star" />
              <span class="pl-1 overflow-hidden">Starred</span>
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
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.isPageActive(PageType.Done) &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => global.setActivePage(PageType.Done)}
            >
              <Icon name="Done" />
              <span class="pl-1 overflow-hidden">Done</span>
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
