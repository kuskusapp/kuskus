import { Show, Suspense, createResource } from "solid-js"
import { GlobalProvider, createGrafbaseClient } from "~/GlobalContext/global"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { UserExistsDocument } from "~/graphql/schema"
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
    const user = await getUser()
    const token = user?.id_token

    if (!token) {
      return null
    }
    const grafbaseClient = createGrafbaseClient(token)

    if (grafbaseClient) {
      try {
        // check if user already exists in db with this audienceToken
        const foundUser = await grafbaseClient.request(UserExistsDocument, {
          audienceToken: user?.profile.aud as string,
        })
        const id = foundUser?.user?.id
        // TODO: save to local storage or pass it in to <App />
        return id
      } catch (error) {
        return null
      }
    }
    return await getUser()
  })

  // TODO: fix flashing lp screen
  return (
    <main>
      <Suspense fallback={<></>}>
        <Show when={user} fallback={<LandingPage />}>
          <GlobalProvider user={user}>
            <GlobalContextProvider>
              <App />
            </GlobalContextProvider>
          </GlobalProvider>
        </Show>
      </Suspense>
    </main>
  )
}
