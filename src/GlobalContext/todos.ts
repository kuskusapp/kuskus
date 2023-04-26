import { createAction } from "@solid-primitives/flux-store"
import { keyArray } from "@solid-primitives/keyed"
import { SetterParam, defer } from "@solid-primitives/utils"
import { createEffect, createResource, onCleanup } from "solid-js"
import {
  CreateTodoDocument,
  // DeleteTodoDocument,
  Mutation,
  Query,
  TodoUpdateDocument,
  TodosDocument,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"
import { TodoType } from "./store"

let lastId = 0

export function createId(): string {
  return (lastId++).toString()
}

export function createTodosState() {
  const ignoreAddedIds = new Set<string>()

  const [todos, { mutate }] = createResource<TodoType[]>(
    async (_, info) => {
      const res = await grafbase.request<Query>(TodosDocument)

      // not sure why info.value is types as TodoType[] | undefined
      const newTodos = [...(info.value ?? [])]
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
    keyArray(
      todos,
      (todo) => todo.id,
      (todo) => {
        const id = todo().id
        console.log("added", id)

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
            console.log("updated", id)
            console.log(todo, "todo")
            grafbase.request<Mutation>(TodoUpdateDocument, {
              id: todo.id,
              todo: {
                title: todo.title,
                done: todo.done,
                starred: todo.starred,
                priority: { set: todo.priority },
                note: todo.note,
                dueDate: todo.dueDate,
              },
            })
          })
        )

        onCleanup(() => {
          console.log("removed", id)
          // grafbase.request<Mutation>(DeleteTodoDocument, {
          //   /* deleted data */
          //   id,
          // })
        })
      }
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
