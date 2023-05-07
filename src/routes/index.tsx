import { Show } from "solid-js"
import { useGlobal } from "~/GlobalContext/global"
import { GlobalContextProvider } from "~/GlobalContext/store"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  const global = useGlobal()

  // TODO: fix flashing lp screen
  return (
    <main>
      <Show when={global.state.user} fallback={<LandingPage />}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </Show>
    </main>
  )
}
