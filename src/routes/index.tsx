import { Show, Suspense, createResource } from "solid-js"
import { getHankoCookie } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export type User = {
  id: string
  username?: string
}

export default function Home() {
  const [hankoCookie] = createResource(async () => {
    const hankoCookie = await getHankoCookie()
    return hankoCookie
  })

  return (
    <main>
      <Suspense>
        <Show when={hankoCookie()} keyed fallback={<LandingPage />}>
          {(hankoCookie) => <App hankoCookie={hankoCookie} />}
        </Show>
      </Suspense>
    </main>
  )
}
