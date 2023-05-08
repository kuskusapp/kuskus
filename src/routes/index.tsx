import { Show, Suspense, createResource } from "solid-js"
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
        {/* <Show when={user()} fallback={LandingPage()}> */}
        <App />
        {/* </Show> */}
      </Suspense>
    </main>
  )
}
