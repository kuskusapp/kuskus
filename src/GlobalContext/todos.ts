import { createAction } from "@solid-primitives/flux-store"
import { keyArray } from "@solid-primitives/keyed"
import { debounce } from "@solid-primitives/scheduled"
import { SetterParam, defer } from "@solid-primitives/utils"
import { createEffect, createResource, onCleanup } from "solid-js"
import {
  CreateTodoDocument,
  DeleteTodoDocument,
  Mutation,
  Query,
  TodoUpdateDocument,
  TodosDocument,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"
import { createTodosForDev } from "~/lib/local"
import { TodoType } from "./store"

const START_WITH_DEV_DATA = false

let lastId = 0

export function createId(): string {
  return (lastId++).toString()
}

export function createTodosState() {
  const ignoreAddedIds = new Set<string>()

  const [todos, { mutate }] = createResource<TodoType[]>(
    async (_, info) => {
      if (START_WITH_DEV_DATA) {
        await createTodosForDev()
      }

      const res = await grafbase.request<Query>(TodosDocument)

      // not sure why info.value is types as TodoType[] | undefined
      const newTodos = info.value ?? []

      if (res.todoCollection?.edges) {
        for (const todo of res.todoCollection.edges) {
          if (!todo?.node) continue
          newTodos.push(todo.node as TodoType)
          ignoreAddedIds.add(todo.node.id)
        }
      }

      return newTodos
    },
    { initialValue: [] }
  )

  createEffect(
    debounce(
      keyArray(
        todos,
        (todo) => todo.id,
        (todo) => {
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
            grafbase.request<Mutation>(DeleteTodoDocument, {
              /* deleted data */
              id,
            })
          })
        }
      ),
      100
    )
  )

  const addTodo = createAction((todo: TodoType) => {
    mutate((p) => [...p, todo])
  })

  const toggleTodo = createAction((id: string) => {
    mutate((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  })

  const updateTodo = createAction((id: string, todo: SetterParam<TodoType>) => {
    mutate((p) =>
      p.map((t) =>
        t.id === id ? (typeof todo === "function" ? todo(t) : todo) : t
      )
    )
  })

  const removeTodo = createAction((id: string) => {
    mutate((p) => p.filter((t) => t.id !== id))
  })

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
  }
}
