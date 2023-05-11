import { Show, Suspense, createResource } from "solid-js"
import { GlobalProvider } from "~/GlobalContext/global"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  /**
   * undefined - loading
   * null - user not logged in
   * userIdToken - id token of user that is logged in
   */
  const [userIdToken] = createResource(async () => {
    const user = await getUser()
    const token = user?.id_token

    // no token means there is no signed in user
    if (!token) {
      return null
    }
    return user.id_token
  })

  return (
    <main>
      <Suspense fallback={<></>}>
        <Show when={userIdToken()} fallback={<LandingPage />}>
          <GlobalProvider userIdToken={userIdToken() as string}>
            <App />
          </GlobalProvider>
        </Show>
      </Suspense>
    </main>
  )
}
