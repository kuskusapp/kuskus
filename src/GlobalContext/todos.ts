import { createAction } from "@solid-primitives/flux-store"
import { keyArray } from "@solid-primitives/keyed"
import { debounce } from "@solid-primitives/scheduled"
import { SetterParam, defer } from "@solid-primitives/utils"
import {
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js"
import {
  CreateTodoDocument,
  // DeleteTodoDocument,
  Mutation,
  Query,
  TodoUpdateDocument,
  TodosDocument,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"
import { createTodosForDev } from "~/lib/local"
import { TodoType } from "./store"
import { getUser } from "~/lib/auth"

// const START_WITH_DEV_DATA = false

let lastId = 0

export function createId(): string {
  return (lastId++).toString()
}

export function createTodosState() {
  const ignoreAddedIds = new Set<string>()

  const [todos, setTodos] = createSignal<any[]>([])

  onMount(async () => {
    const res = await grafbase.request<Query>(TodosDocument)
    let newTodos = [...todos()]

    if (res.todoCollection?.edges) {
      for (const todo of res.todoCollection.edges) {
        if (!todo?.node) continue
        newTodos.push(todo.node as TodoType)
        ignoreAddedIds.add(todo.node.id)
      }
      setTodos(newTodos)
    }
  })

  // const [todos, { mutate }] = createResource<TodoType[]>(
  //   async (_, info) => {
  //     // if (START_WITH_DEV_DATA) {
  //     //   await createTodosForDev()
  //     // }

  //     // console.log(await getUser(), "get user in resource")
  //     // const res = await grafbase.request<Query>(TodosDocument)
  //     // const res = []

  //     // not sure why info.value is types as TodoType[] | undefined
  //     const newTodos = info.value ?? []

  // if (res.todoCollection?.edges) {
  //   for (const todo of res.todoCollection.edges) {
  //     if (!todo?.node) continue
  //     newTodos.push(todo.node as TodoType)
  //     ignoreAddedIds.add(todo.node.id)
  //   }
  // }

  //     return newTodos
  //   },
  //   { initialValue: [] }
  // )

  createEffect(
    debounce(
      keyArray(
        todos,
        (todo) => todo.id,
        (todo) => {
          console.log("running")
          const id = todo().id

          if (ignoreAddedIds.has(id)) {
            ignoreAddedIds.delete(id)
          } else {
            grafbase.request<Mutation>(CreateTodoDocument, {
              /* added data */
              todo: todo(),
            })
          }

          createEffect(
            defer(todo, (todo) => {
              grafbase.request<Mutation>(TodoUpdateDocument, {
                /* updated data */
                todo,
              })
            })
          )

          onCleanup(() => {
            // grafbase.request<Mutation>(DeleteTodoDocument, {
            //   /* deleted data */
            //   id,
            // })
          })
        }
      ),
      100
    )
  )

  const addTodo = createAction((todo: TodoType) => {
    setTodos((p) => [...p, todo])
  })

  const toggleTodo = createAction((id: string) => {
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  })

  const updateTodo = createAction((id: string, todo: SetterParam<TodoType>) => {
    setTodos((p) =>
      p.map((t) =>
        t.id === id ? (typeof todo === "function" ? todo(t) : todo) : t
      )
    )
  })

  const removeTodo = createAction((id: string) => {
    setTodos((p) => p.filter((t) => t.id !== id))
  })

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
  }
}
