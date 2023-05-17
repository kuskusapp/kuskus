import { useUserDetails } from "~/GlobalContext/userDetails"
import { autofocus } from "@solid-primitives/autofocus"
import Icon from "./Icon"
import { Show, createSignal } from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  // const userDetails = useUserDetails()
  const todoList = useTodoList()
  const [showFilterSearch, setShowFilterSearch] = createSignal(false)

  return (
    <>
      <div
        class="p-3 flex justify-between bg-neutral-900 items-center"
        style={{ "border-radius": "10px" }}
      >
        <div class="flex gap-2 items-center">
          <div
            class="cursor-pointer"
            onClick={() => {
              // userDetails.setCollapsedSidebar()
            }}
          >
            <Icon name="Sidebar" />
          </div>

          <h1 class="font-bold text-lg">{props.title}</h1>
        </div>
        <Show
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
        </Show>
      </div>
    </>
  )
}
