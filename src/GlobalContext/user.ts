import { createStore } from "solid-js/store"
import { Settings } from "./settings"
import { ClientTodo } from "./todos"
import { onMount } from "solid-js"

export type User = {
  id?: string
  todos?: ClientTodo[]
  settings?: Settings
  username?: string
}

export function createUserState() {
  const [user, setUser] = createStore<User>({})

  onMount(() => {
    console.log("runs on mount")
  })

  return {
    // state
    user,
    // actions
    checkUser: (audienceToken: string) => {},
  }
}
