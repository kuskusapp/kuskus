import { createStore } from "solid-js/store"
import { Settings } from "./settings"
import { ClientTodo } from "./todos"

export type User = {
  id?: string
  todos?: ClientTodo[]
  settings?: Settings
  username?: string
}

export function createUserState() {
  const [user, setUser] = createStore<User>({})

  return {
    // state
    user,
    // actions
  }
}
