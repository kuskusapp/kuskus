import { GraphQLClient } from "graphql-request"
import { Show, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
import { createSettingsState } from "~/GlobalContext/settings"
import {
  PageType,
  TodoListMode,
  TodoListProvider,
  createTodoListState,
} from "~/GlobalContext/todo-list"
import ActionBar from "~/components/ActionBar"
import Help from "~/components/Help"
import LocalSearch from "~/components/LocalSearch"
import Modal from "~/components/Modal"
import Settings from "~/components/Settings"
import Sidebar from "~/components/Sidebar"
import TodoList from "~/components/TodoList"
import { createShortcuts } from "~/lib/primitives"

export type GrafbaseRequest = GraphQLClient["request"]

export default function App(props: { initialToken: string }) {
  const navigate = useNavigate()

  const grafbase = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
    headers: { authorization: `Bearer ${props.initialToken}` },
  })

  const request: GrafbaseRequest = async (...args) => {
    try {
      return await grafbase.request(...(args as [any]))
    } catch (error) {
      // TODO: there are different kinds of errors that can happen here
      console.log(error, "error")
      // in case of invalid token, it should go back to /auth page
      // and say nicely in pop up, please log in again
      // ideally once we integrate with auth provider
      // the user session should at least be one month
      // so token invalidation should not happen often
      navigate("/auth")
    }
  }

  const settingsState = createSettingsState({ request })
  const todoList = createTodoListState({ request })

  const [showHelp, setShowHelp] = createSignal(false)

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
    <div class="h-screen bg-white dark:bg-black">
      <TodoListProvider value={todoList}>
        <div class="flex flex-col h-screen">
          <div class="flex grow gap-2 p-2 h-full overflow-hidden">
            <Sidebar />
            <TodoList />
          </div>
          <Show
            when={todoList.inMode(TodoListMode.Search)}
            fallback={<ActionBar />}
          >
            <LocalSearch />
          </Show>
        </div>
        <Show when={showHelp()}>
          <Modal
            title="Help"
            onClose={() => setShowHelp(false)}
            children={<Help />}
          />
        </Show>
        <Show when={todoList.inMode(TodoListMode.Settings)}>
          <Modal
            title="Settings"
            onClose={() => todoList.setMode(TodoListMode.Default)}
            children={<Settings />}
          />
        </Show>
      </TodoListProvider>
    </div>
  )
}
