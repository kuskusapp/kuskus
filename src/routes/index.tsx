import { User as GoogleUser } from "oidc-client-ts"
import { Show, Suspense, createResource } from "solid-js"
import { GlobalProvider } from "~/GlobalContext/global"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { UserExistsDocument } from "~/graphql/schema"
import { getUser } from "~/lib/auth"
import { createGrafbaseClient } from "~/lib/grafbase"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  /**
   * undefined - loading
   * null - not-logged in
   * userId - id of user
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
        return { userId: id, googleUser: user }
      } catch (error) {
        return null
      }
    }
  })

  // TODO: fix flashing lp screen
  return (
    <main>
      <Suspense fallback={<></>}>
        <Show when={user()?.userId} fallback={<LandingPage />}>
          <GlobalProvider
            userId={user()?.userId as string}
            googleUser={user()?.googleUser as GoogleUser}
          >
            <GlobalContextProvider>
              <App />
            </GlobalContextProvider>
          </GlobalProvider>
        </Show>
      </Suspense>
    </main>
  )
}
