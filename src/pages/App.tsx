import { GraphQLClient } from "graphql-request"
import { Show, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
import {
  PageType,
  TodoListMode,
  TodoListProvider,
  createTodoListState,
} from "~/GlobalContext/todo-list"
import {
  UserDetailsProvider,
  createUserDetailsState,
} from "~/GlobalContext/userDetails"
import CollapsedSidebar from "~/components/CollapsedSidebar"
import Modal from "~/components/Modal"
import Settings from "~/components/Settings"
import Sidebar from "~/components/Sidebar"
import TodoList from "~/components/TodoList"
import { createShortcuts } from "~/lib/primitives"
import { logError } from "~/lib/tinybird"

export type GrafbaseRequest = GraphQLClient["request"]

export default function App(props: { hankoCookie: string }) {
  const navigate = useNavigate()

  const grafbase = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
    headers: { authorization: `Bearer ${props.hankoCookie}` },
  })

  const request: GrafbaseRequest = async (...args) => {
    try {
      return await grafbase.request(...(args as [any]))
    } catch (error) {
      // if (error.response.error.includes("Unauthorized")) {
      //   navigate("/auth")
      // }
      logError({
        error: "grafbase client error",
        metadata: `error: ${JSON.stringify(error)}`,
      })
    }
  }

  const todoList = createTodoListState({ request })
  const userDetailsState = createUserDetailsState({ request })

  createShortcuts({
    "Control+1"() {
      todoList.updateActivePage(PageType.All)
    },
    "Control+2"() {
      todoList.updateActivePage(PageType.Today)
    },
    "Control+3"() {
      todoList.updateActivePage(PageType.Starred)
    },

    "Control+4"() {
      todoList.updateActivePage(PageType.Done)
    },
  })

  return (
    <div class=" bg-white dark:bg-black">
      <UserDetailsProvider value={userDetailsState}>
        <TodoListProvider value={todoList}>
          <div class="flex flex-col h-screen">
            <div class="flex grow gap-2 p-2 h-full overflow-hidden">
              <Show
                when={userDetailsState.userDetails.collapsedSidebar}
                // when={true}
                fallback={<Sidebar />}
              >
                <CollapsedSidebar />
              </Show>
              <TodoList />
            </div>
          </div>
          <Show when={todoList.inMode(TodoListMode.Settings)}>
            <Modal
              title="Settings"
              onClose={() => todoList.setMode(TodoListMode.Default)}
              children={<Settings />}
            />
          </Show>
        </TodoListProvider>
      </UserDetailsProvider>
    </div>
  )
}
