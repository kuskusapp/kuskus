import { Show, Suspense, createResource } from "solid-js"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  /**
   * undefined - loading
   * null - not-logged in
   * user - user
   */
  const [user] = createResource(async () => {
    return await getUser()
  })

  return (
    <main>
      <Suspense fallback={<></>}>
        <Show when={user()} fallback={LandingPage()}>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </Show>
      </Suspense>
    </main>
  )
}
