import { Show, Suspense, createResource } from "solid-js"
import { useNavigate } from "solid-start"
import { getHankoCookie } from "~/lib/auth"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export type User = {
  id: string
  username?: string
}

export default function Home() {
  const navigate = useNavigate()

  const [hankoCookie] = createResource(async () => {
    const hankoCookie = await getHankoCookie()
    // @ts-ignore
    if (!hankoCookie && window.__TAURI__) {
      navigate("/auth")
    }
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
