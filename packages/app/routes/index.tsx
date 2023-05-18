import { Show, Suspense, createResource } from "solid-js"
import { getUser } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export type User = {
  id: string
  username?: string
}

export default function Home() {
  const [token] = createResource(async () => {
    const user = await getUser()
    return user?.id_token
  })

  return (
    <main>
      <Suspense>
        <Show when={token()} keyed fallback={<LandingPage />}>
          {(token) => <App initialToken={token} />}
        </Show>
      </Suspense>
    </main>
  )
}
