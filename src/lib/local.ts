import {
  CreateTodoDocument,
  Mutation,
  SubtaskCreateDocument,
} from "~/graphql/schema"
import { grafbase } from "./graphql"

export async function createTodosForDev() {
  await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Fix all bugs",
      starred: true,
      priority: 3,
      done: false,
    },
  })
  await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Make Kuskus",
      starred: true,
      priority: 2,
      done: false,
      note: "cover all important use cases",
    },
  })
  await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Release KusKus",
      starred: true,
      priority: 1,
      done: false,
    },
  })
  await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Polish",
      starred: true,
      priority: 0,
      done: false,
    },
  })

  await grafbase.request<Mutation>(SubtaskCreateDocument, {
    subtask: {
      title: "check all TODO: in code",
    },
  })
}
