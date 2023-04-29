import {
  CreateTodoDocument,
  Mutation,
  Query,
  SubtaskCreateDocument,
  SubtaskDeleteDocument,
  TodoDeleteDocument,
  TodoLinkSubtaskDocument,
  TodosDocument,
} from "~/graphql/schema"
import { grafbase } from "./graphql"

export async function createTodosForDev() {
  // delete all todos and subtasks in db
  const existingTodos = await grafbase.request<Query>(TodosDocument)
  let todoIdsToDelete = <string[]>[]
  let subtaskIdsToDelete = <string[]>[]
  existingTodos.todoCollection?.edges?.map((todo) => {
    todoIdsToDelete.push(todo?.node.id!)
    todo?.node.subtasks?.edges?.map((subtask) => {
      subtaskIdsToDelete.push(subtask?.node.id!)
    })
  })
  todoIdsToDelete.map((id) => {
    grafbase.request<Mutation>(TodoDeleteDocument, { id: id })
  })
  subtaskIdsToDelete.map((id) => {
    grafbase.request<Mutation>(SubtaskDeleteDocument, { id: id })
  })

  // create new todos and subtasks
  let task = await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Fix all bugs",
      starred: true,
      priority: 3,
      done: false,
    },
  })

  let subtask = await grafbase.request<Mutation>(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 1",
    },
  })
  await grafbase.request<Mutation>(TodoLinkSubtaskDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })

  subtask = await grafbase.request<Mutation>(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 2",
    },
  })
  await grafbase.request<Mutation>(TodoLinkSubtaskDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })

  task = await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Make Kuskus",
      starred: true,
      priority: 2,
      done: false,
      note: "cover all important use cases",
    },
  })
  subtask = await grafbase.request<Mutation>(SubtaskCreateDocument, {
    subtask: {
      title: "subtask",
    },
  })
  await grafbase.request<Mutation>(TodoLinkSubtaskDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })

  task = await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Release KusKus",
      starred: true,
      priority: 1,
      done: false,
    },
  })
  task = await grafbase.request<Mutation>(CreateTodoDocument, {
    todo: {
      title: "Polish",
      starred: true,
      priority: 0,
      done: false,
    },
  })
  subtask = await grafbase.request<Mutation>(SubtaskCreateDocument, {
    subtask: {
      title: "do it well",
    },
  })
  await grafbase.request<Mutation>(TodoLinkSubtaskDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })
}
