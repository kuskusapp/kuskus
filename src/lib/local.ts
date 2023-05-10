import { useGlobal } from "~/GlobalContext/global"
import {
  SubtaskCreateDocument,
  SubtaskDeleteDocument,
  SubtaskLinkDocument,
  TodoCreateDocument,
  TodoDeleteDocument,
  TodoLinkDocument,
  TodosDocument,
} from "~/graphql/schema"

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

  // TODO: make it so creating todo and linking it to user
  // is one request!

  // create new todos
  let task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Fix all bugs",
      starred: true,
      priority: 3,
      done: false,
    },
  })
  // link it..
  await grafbase.request(TodoLinkDocument, {
    userId: global.userId,
    taskId: task.todoCreate?.todo?.id,
  })

  let subtask = await grafbase.request(SubtaskCreateDocument, {
    subtask: {
      title: "subtask 1",
    },
  })
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
  await grafbase.request(TodoLinkDocument, {
    userId: global.userId,
    taskId: task.todoCreate?.todo?.id,
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
  await grafbase.request(TodoLinkDocument, {
    userId: global.userId,
    taskId: task.todoCreate?.todo?.id,
  })
  task = await grafbase.request(TodoCreateDocument, {
    todo: {
      title: "Polish",
      starred: true,
      priority: 0,
      done: false,
    },
  })
  await grafbase.request(TodoLinkDocument, {
    userId: global.userId,
    taskId: task.todoCreate?.todo?.id,
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
