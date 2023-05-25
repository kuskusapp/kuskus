import { useUserDetails } from "~/GlobalContext/userDetails"
import { autofocus } from "@solid-primitives/autofocus"
import Icon from "./Icon"
import { Show, createSignal } from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  const userDetails = useUserDetails()
  const todoList = useTodoList()
  const [showFilterSearch, setShowFilterSearch] = createSignal(false)

  return (
    <>
      <style>
        {`
          #TopBar {
            border-bottom: solid 3px rgb(200, 200, 200, 0.5)
          }
          @media (prefers-color-scheme: dark) {
            #TopBar {
              border-bottom: solid 3px rgb(43, 43, 43, 0.5)
            }
          }

        `}
      </style>
      <div
        class="p-5 flex justify-between bg-gray-100 dark:bg-neutral-900 items-center"
        id="TopBar"
      >
        <div class="flex gap-2 items-center">
          <div
            class="cursor-pointer"
            onClick={() => {
              userDetails.setCollapsedSidebar()
            }}
          >
            <Icon name="Sidebar" />
          </div>

          <h1 class="font-bold text-lg">{props.title}</h1>
        </div>
        {/* TODO: add in future */}
        {/* like in 2Do, allow users to filter out content in current page */}
        {/* also have a button to save the search into a smart search and put it in sidebar */}
        {/* <Show
          when={showFilterSearch()}
          fallback={
            <div
              onClick={() => {
                setShowFilterSearch(true)
                todoList.setMode(TodoListMode.Filtered)
              }}
              class="cursor-pointer"
            >
              <Icon name="Filter" />
            </div>
          }
        >
          <input
            class="bg-transparent outline-none pl-2 rounded-md"
            style={{ border: "solid 1px rgba(80,80,80,0.5)" }}
            type="text"
            onkeydown={(e) => {
              if (e.key === "Escape") {
                setShowFilterSearch(false)
                todoList.setMode(TodoListMode.Default)
              }
            }}
            autofocus
            ref={(el) => autofocus(el)}
            placeholder="Search"
          />
        </Show> */}
      </div>
    </>
  )
}
