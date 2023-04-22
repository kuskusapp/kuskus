import { Show, createSignal, onMount } from "solid-js"
import { GlobalContextProvider } from "~/GlobalContext/store"
import { getUser } from "~/lib/auth"
import { gql } from "~/lib/graphql"
import App from "~/pages/App"
import LandingPage from "~/pages/LandingPage"

export default function Home() {
  const [user, setUser] = createSignal()
  onMount(async () => {
    const user = await getUser()
    // TODO: doing this briefly so other users can easily test app, will remove
    if (!user) {
      setUser(true)
      return
    }
    setUser(user)
    const createTodo = await gql(`
    mutation {
      todoCreate(
        input: {
          title: "Make KusKus"
          done: false
          starred: true
          priority: 3
        }
      ) {
        todo {
          id
        }
      }
    }
    `)
    console.log(createTodo)
    const todos = await gql(`
    {
      todoCollection(first: 5) {
        edges {
          node {
            title
          }
        }
      }
    }
  `)
    console.log(todos)
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
