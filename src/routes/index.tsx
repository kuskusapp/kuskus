import { Show, createSignal, onMount } from "solid-js"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  const [user, setUser] = createSignal()

  onMount(async () => {
    const user = await getUser()
    setUser(user)
  })

  return (
    <main>
      <GlobalContextProvider>
        {/* TODO: refresh page will show landing page briefly, fix */}
        <Show when={user()} fallback={LandingPage()}>
          <App />
        </Show>
      </GlobalContextProvider>
    </main>
  )
}
