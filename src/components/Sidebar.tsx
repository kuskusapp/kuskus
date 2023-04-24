import clsx from "clsx"
import { onMount } from "solid-js"
import Split from "split.js"
import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { isToday } from "~/lib/lib"
import { GoogleClient } from "~/lib/auth"
import { createEventListener } from "@solid-primitives/event-listener"

export default function Sidebar() {
  const global = useGlobalContext()

  onMount(() => {
    Split(["#sidebar", "#page"], {
      gutterSize: 3,
      sizes: [15, 85],
    })
  })

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setFocusedTodo(0)
        global.setTodoToEdit(0)
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
          }
          `}
      </style>
      <div
        class="sticky top-0 left-0 dark:bg-stone-900 bg-gray-50 p-2 text-xs"
        id="sidebar"
      >
        <div class="flex flex-col gap-1 justify-between h-full" ref={ref}>
          <div class="flex flex-col gap-1">
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.activePage() === "All" &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => {
                global.setActivePage("All")
                global.setFocusedTodo(0)
              }}
            >
              <Icon name="Inbox" />
              <span class="pl-1 overflow-hidden">All</span>
              <div class="opacity-40 text-xs ml-auto">
                {global.todos().filter((t) => !t.done).length > 0 &&
                  global.todos().filter((t) => !t.done).length}
              </div>
            </div>
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.activePage() === "Today" &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => {
                global.setActivePage("Today")
                global.setFocusedTodo(0)
              }}
            >
              <Icon name="Today" />
              <span class="pl-1 overflow-hidden">Today</span>
              <div class="opacity-40 text-xs ml-auto">
                {global.todos().filter((t) => {
                  if (!t.done && t.dueDate) {
                    return isToday(t.dueDate)
                  }
                }).length > 0 &&
                  global.todos().filter((t) => {
                    if (!t.done && t.dueDate) {
                      return isToday(t.dueDate)
                    }
                  }).length}
              </div>
            </div>
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.activePage() === "Starred" &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => {
                global.setActivePage("Starred")
                global.setFocusedTodo(0)
              }}
            >
              <Icon name="Star" />
              <span class="pl-1 overflow-hidden">Starred</span>
              <div class="opacity-40 text-xs ml-auto">
                {/* TODO: not good, should not run filter twice */}
                {global.todos().filter((t) => {
                  if (!t.done && t.starred) {
                    return true
                  }
                }).length > 0 && global.todos().filter((t) => t.starred).length}
              </div>
            </div>
            <div
              class={clsx(
                "flex px-2 cursor-pointer items-center",
                global.activePage() === "Done" &&
                  "rounded dark:bg-neutral-700 bg-zinc-200"
              )}
              onClick={() => {
                global.setActivePage("Done")
                global.setFocusedTodo(0)
              }}
            >
              <Icon name="Done" />
              <span class="pl-1 overflow-hidden">Done</span>
            </div>
          </div>
          <div class="flex justify-between justify-self-end">
            <div
              class="has-tooltip cursor-pointer"
              onClick={() => {
                global.setShowHelpModal(true)
              }}
            >
              <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8">
                Learn KusKus
              </span>
              <Icon name="Question" />
            </div>
            <div
              class="has-tooltip cursor-pointer"
              onClick={() => {
                // TODO: show settings
              }}
            >
              <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8">
                Settings
              </span>
              <Icon name="Settings" />
            </div>
            <div
              class="has-tooltip cursor-pointer"
              onClick={() => {
                GoogleClient.signoutRedirect({
                  post_logout_redirect_uri: "http://localhost:3000",
                })
              }}
            >
              <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8">
                Sign Out
              </span>
              <Icon name="SignOut" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
