import { Show } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import Modal from "~/components/Modal"
import Sidebar from "~/components/Sidebar"
import TodoList from "~/components/TodoList"

export default function App() {
  const global = useGlobalContext()

  return (
    <div class="flex h-screen">
      <Sidebar />
      <TodoList />
      <Show when={global.showHelpModal()}>
        <Modal />
      </Show>
    </div>
  )
}
