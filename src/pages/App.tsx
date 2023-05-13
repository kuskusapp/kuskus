import { Show, createSignal } from "solid-js"
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

export default function App() {
  const settingsState = createSettingsState()
  const todoList = createTodoListState()

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
      <TodoListProvider {...todoList}>
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
