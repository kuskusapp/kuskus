import { Show } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import Modal from "~/components/Modal"
import Page from "~/components/Page"
import Sidebar from "~/components/Sidebar"

export default function App() {
  const global = useGlobalContext()

  return (
    <div class="flex h-screen">
      <Sidebar />
      <Page />
      <Show when={global.showHelpModal()}>
        <Modal />
      </Show>
    </div>
  )
}
