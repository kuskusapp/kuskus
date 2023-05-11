import { useGlobal } from "~/GlobalContext/global"
import {
  SubtaskCreateDocument,
  SubtaskDeleteDocument,
  SubtaskLinkDocument,
  TodoCreateDocument,
  TodoDeleteDocument,
  TodosDocument,
} from "~/graphql/schema"

// function to seed the database with todos/subtasks
// used for development only
// TODO: there is weird issue sometimes grafbase does not add all the todos/subtasks but only some of them
// not sure why..
export async function createTodosForDev() {
  const global = useGlobal()
  const grafbase = global.grafbase()!

  // delete all todos and subtasks in db
  const existingTodos = await grafbase.request(TodosDocument)
  let todoIdsToDelete = <string[]>[]
  let subtaskIdsToDelete = <string[]>[]
  existingTodos.todoCollection?.edges?.map((todo: any) => {
    todoIdsToDelete.push(todo?.node.id!)
    todo?.node.subtasks?.edges?.map((subtask: any) => {
      subtaskIdsToDelete.push(subtask?.node.id!)
    })
  })

  todoIdsToDelete.map((id) => {
    grafbase.request(TodoDeleteDocument, { id: id })
  })
  subtaskIdsToDelete.map((id) => {
    grafbase.request(SubtaskDeleteDocument, { id: id })
  })

  // create new todos
  let task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Fix all bugs",
      starred: true,
      priority: 3,
      done: false,
    },
  })

  let subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 1",
    },
  })
  // TODO: hope this manual linking goes away..
  await grafbase.request(SubtaskLinkDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })
  subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 2",
    },
  })
  await grafbase.request(SubtaskLinkDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })
  subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 3",
    },
  })
  await grafbase.request(SubtaskLinkDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })

  task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Make Kuskus",
      starred: true,
      priority: 2,
      done: false,
      note: "cover all important use cases",
    },
  })

  subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "subtask",
    },
  })
  await grafbase.request(SubtaskLinkDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })
  task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Release KusKus",
      starred: true,
      priority: 1,
      done: false,
    },
  })
  task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Polish",
      starred: true,
      priority: 0,
      done: false,
    },
  })

  subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "do it well",
    },
  })
  await grafbase.request(SubtaskLinkDocument, {
    taskId: task.todoCreate?.todo?.id,
    subtaskId: subtask.subtaskCreate?.subtask?.id,
  })
}
