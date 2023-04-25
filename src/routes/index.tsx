import { Show, createSignal, onMount } from "solid-js"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"
import { Query, TodosDocument } from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"

export default function Home() {
  const [user, setUser] = createSignal()
  onMount(async () => {
    const user = await getUser()
    setUser(user)
    const data = await grafbase.request<Query>(TodosDocument)
    console.log(data)
  })

  return (
    <main>
      <GlobalContextProvider>
        <Show when={user()} fallback={LandingPage()}>
          <App />
        </Show>
      </GlobalContextProvider>
    </main>
  )
}
