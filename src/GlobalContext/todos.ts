import { defer } from "@solid-primitives/utils"
import { createEffect, onMount } from "solid-js"
import { StoreSetter, createStore, produce } from "solid-js/store"
import {
  Query,
  SubtaskConnection,
  SubtaskCreateDocument,
  SubtaskDeleteDocument,
  SubtaskUpdateDocument,
  TodoCreateDocument,
  TodoCreateInput,
  TodoDeleteDocument,
  TodoLinkSubtaskDocument,
  TodoUpdateDocument,
  TodoUpdateInput,
  TodosDocument,
} from "~/graphql/schema"
import { createArrayDiff } from "~/lib/primitives"
import { useGlobal } from "./global"

export type Priority = 0 | 1 | 2 | 3
/**
 * local unique key for todos
 * the `key:` prefix is used to prevent collisions with database ids or other strings
 */
export type TodoKey = `key:${number}`

export type BaseTask = {
  /**
   * ID in the database, todos created client side will not have an id until they are saved to the database
   */
  id: string | null
  key: TodoKey
  title: string
  done: boolean
  starred: boolean
  priority: Priority
  note: string | null
  dueDate: string | null
  labels?: Label[]
}

export type Label = {
  id?: string | null
  name: string
}

export type ClientSubtask = BaseTask & {
  parent: ClientTodo
}

export type ClientTodo = BaseTask & {
  subtasks: ClientSubtask[]
}

export const getNewKey = (() => {
  let last = 0
  return (): TodoKey => `key:${last++}`
})()

const parseDbPriority = (int: number): Priority => {
  int = Math.floor(int)
  return Math.min(Math.max(int, 0), 3) as Priority
}

const parseDbSubtasks = (
  subtasks: SubtaskConnection | null | undefined,
  parent: ClientTodo
): ClientSubtask[] => {
  const result: ClientSubtask[] = []
  if (subtasks?.edges)
    for (const edge of subtasks.edges) {
      if (!edge || !edge.node) continue
      result.push({
        id: edge.node.id,
        key: getNewKey(),
        title: edge.node.title,
        done: edge.node.done,
        starred: edge.node.starred,
        dueDate: edge.node.dueDate ?? null,
        note: edge.node.note ?? null,
        priority: parseDbPriority(edge.node.priority),
        parent,
      })
    }
  return result
}

function getTodoCreateInput(todo: BaseTask): TodoCreateInput {
  return {
    title: todo.title,
    done: todo.done,
    starred: todo.starred,
    priority: todo.priority,
    note: todo.note,
    dueDate: todo.dueDate,
  }
}

function getTodoUpdateInput(todo: BaseTask): TodoUpdateInput {
  return {
    title: todo.title,
    done: todo.done,
    starred: todo.starred,
    priority: { set: todo.priority },
    note: todo.note,
    dueDate: todo.dueDate,
  }
}

export function createTodosState() {
  const [todos, setTodos] = createStore<ClientTodo[]>([])
  const global = useGlobal()
  const grafbase = global.grafbase()!

  onMount(() => {
    // fetch initial todos from the database
    // not using resource because we don't need to interact with Suspense
    grafbase.request<Query>(TodosDocument).then((res) => {
      setTodos(
        produce((state) => {
          if (res.todoCollection?.edges) {
            for (const todo of res.todoCollection.edges) {
              if (!todo?.node) continue
              const subtasks: ClientTodo["subtasks"] = []
              const clientTodo: ClientTodo = {
                id: todo.node.id,
                key: getNewKey(),
                done: todo.node.done,
                starred: todo.node.starred,
                title: todo.node.title,
                priority: parseDbPriority(todo.node.priority),
                note: todo.node.note ?? null,
                dueDate: todo.node.dueDate ?? null,
                subtasks,
              }
              subtasks.push.apply(
                subtasks,
                parseDbSubtasks(todo.node.subtasks, clientTodo)
              )
              state.push(clientTodo)
            }
          }
        })
      )
    })
  })

  //
  // DATABASE SYNC
  //
  createArrayDiff(
    () => todos,
    (todo, onTodoRemove) => {
      // if the todo was added, we need to create it in the database
      if (!todo.id) {
        grafbase
          .request(TodoCreateDocument, {
            todo: getTodoCreateInput(todo),
          })
          .then((res) => {
            // tasks get their id after being added to the db
            setTodos((t) => t === todo, "id", res.todoCreate?.todo?.id!)
          })
      }

      // update the todo in the database
      createEffect(
        defer(
          () => getTodoUpdateInput(todo),
          (payload) => {
            if (!todo.id) return
            grafbase.request(TodoUpdateDocument, {
              id: todo.id,
              todo: payload,
            })
          }
        )
      )

      onTodoRemove(() => {
        todo.id && grafbase.request(TodoDeleteDocument, { id: todo.id })
      })

      createArrayDiff(
        () => todo.subtasks,
        (subtask, onSubtaskRemove) => {
          // if the subtask was added, we need to create it in the database
          if (!subtask.id) {
            grafbase
              .request(SubtaskCreateDocument, {
                subtask: getTodoCreateInput(subtask),
              })
              .then((res) => {
                // tasks get their id after being added to the db
                setTodos(
                  (t) => t === todo,
                  "subtasks",
                  (s) => s.key === subtask.key,
                  "id",
                  res.subtaskCreate?.subtask?.id!
                )
                // TODO: do the subtask create and subtask link in 1 query..
                grafbase.request(TodoLinkSubtaskDocument, {
                  taskId: todo.id!,
                  subtaskId: res.subtaskCreate?.subtask?.id!,
                })
              })
          }

          // update the subtask in the database
          createEffect(
            defer(
              () => getTodoUpdateInput(subtask),
              (payload) => {
                if (!subtask.id) return
                grafbase.request(SubtaskUpdateDocument, {
                  id: subtask.id,
                  subtask: payload,
                })
              }
            )
          )

          onSubtaskRemove(() => {
            subtask.id &&
              grafbase.request(SubtaskDeleteDocument, { id: subtask.id })
          })
        }
      )
    }
  )

  return {
    // state
    todos,
    // actions
    addTodo: (fields: Omit<ClientTodo, "id" | "key">): TodoKey => {
      const key = getNewKey()
      setTodos(todos.length, { ...fields, id: null, key })
      return key
    },
    toggleTodo: (key: TodoKey) => {
      setTodos(
        (t) => t.key === key,
        "done",
        (d) => !d
      )
    },
    updateTodo: (key: TodoKey, setter: StoreSetter<ClientTodo, [number]>) => {
      setTodos((t) => t.key === key, setter)
    },
    removeTodo: (key: TodoKey) => {
      setTodos((p) => p.filter((t) => t.key !== key))
    },
    addSubtask: (
      parentKey: TodoKey,
      subtask: Omit<ClientSubtask, "id" | "key">
    ) => {
      const key = getNewKey()
      setTodos(
        (t) => t.key === parentKey,
        "subtasks",
        (prevSubtasks) => [
          ...prevSubtasks,
          {
            ...subtask,
            key,
            id: null,
          },
        ]
      )
      return key
    },
    removeSubtask(subtaskKey: TodoKey) {
      const todo = todos.find((t) =>
        t.subtasks.find((s) => s.key === subtaskKey)
      )
      setTodos(
        (t) => t.key === todo?.key,
        "subtasks",
        (prevSubtasks) => prevSubtasks.filter((s) => s.key !== subtaskKey)
      )
    },
    updateSubtask: (
      todoKey: TodoKey,
      subtaskKey: TodoKey,
      setter: StoreSetter<ClientSubtask, any[]>
    ) => {
      // not sure what is happening here
      // but somehow mutates locally at least
      setTodos(
        (t) => t.key === todoKey,
        "subtasks",
        (t) => t.key === subtaskKey,
        setter
      )
    },
    // a windcard setter if you want to share that 🤷‍♂️
    // setTodos,
  }
}

// how to edit subtasks
// - pass the whole path (todoKey: number, subtaskKey: number, subtask: ClientSubtask)
//     setTodos((t) => t.key === todoKey, "subtasks", t => t.key === subtaskKey, setter)
// - "hidden lens feature" - createStore(nested_object_ref)
// updateSubtask: (
//   subtask: ClientSubtask,
//   setter: StoreSetter<ClientSubtask, []>
// ) => {
// const [, setSubtask] = createStore(subtask)
// setSubtask(setter)

// TODO: potential undo API, once merged into solid-primitives use it
// export type HistorySource<T> = [source: Accessor<T>, setter: (value: T) => void]
// export type UndoHistoryReturn<T> = {
//   undo: VoidFunction
//   redo: VoidFunction
// }
// declare function createUndoHistory<T extends readonly HistorySource<any>[]>(
//   sources: T
// ): UndoHistoryReturn<ReturnType<T[number][0]>>
