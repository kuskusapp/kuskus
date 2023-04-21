import { Show, createSignal, onMount } from "solid-js"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  const [user, setUser] = createSignal()
  onMount(async () => {
    const user = await getUser()
    if (!user) {
      // still set it to true for local dev
      // change later
      setUser(true)
      return
    }
    setUser(user)
    // console.log(user(), "user")
    // const todos = await gql(`{
    //   todos {
    //     title
    //   }
    // }`)
    // console.log(todos)
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
