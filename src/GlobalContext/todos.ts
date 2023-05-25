import { defer } from "@solid-primitives/utils"
import { createEffect } from "solid-js"
import { StoreSetter, createStore, produce } from "solid-js/store"
import {
  SubtaskConnection,
  SubtaskCreateDocument,
  SubtaskDeleteDocument,
  SubtaskLinkDocument,
  SubtaskUpdateDocument,
  TodoCreateDocument,
  TodoCreateInput,
  TodoDeleteDocument,
  TodoUpdateDocument,
  TodoUpdateInput,
  TodosDocument,
} from "~/graphql/schema"
import { createArrayDiff } from "~/lib/primitives"
import { GrafbaseRequest } from "~/pages/App"

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
  tags: string[] | null
  dueDate: string | null
}

export type ClientTodo = BaseTask & {
  type: "todo"
  subtasks: ClientSubtask[]
}

export type ClientSubtask = BaseTask & {
  type: "subtask"
  parent: ClientTodo
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
        type: "subtask",
        id: edge.node.id,
        key: getNewKey(),
        title: edge.node.title,
        done: edge.node.done,
        starred: edge.node.starred,
        dueDate: edge.node.dueDate ?? null,
        note: edge.node.note ?? null,
        priority: parseDbPriority(edge.node.priority),
        // TODO: why is it Maybe<string>..
        tags: edge.node.tags ?? null,
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
    tags: todo.tags,
  }
}

export function createTodosState({ request }: { request: GrafbaseRequest }) {
  const [todos, setTodos] = createStore<ClientTodo[]>([])

  // fetch initial todos from the database
  // not using resource because we don't need to interact with Suspense
  request(TodosDocument).then((res) => {
    setTodos(
      produce((state) => {
        if (res.todoCollection?.edges) {
          for (const todo of res.todoCollection.edges) {
            if (!todo?.node) continue
            const subtasks: ClientTodo["subtasks"] = []
            const clientTodo: ClientTodo = {
              type: "todo",
              id: todo.node.id,
              key: getNewKey(),
              done: todo.node.done,
              starred: todo.node.starred,
              title: todo.node.title,
              priority: parseDbPriority(todo.node.priority),
              note: todo.node.note ?? null,
              dueDate: todo.node.dueDate ?? null,
              // TODO: test
              tags: todo.node.tags ?? null,
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

  //
  // DATABASE SYNC
  //
  createArrayDiff(
    () => todos,
    (todo, onTodoRemove) => {
      // if the todo was added, we need to create it in the database
      if (!todo.id) {
        request(TodoCreateDocument, {
          todo: getTodoCreateInput(todo),
        }).then((res) => {
          // tasks get their id after being added to the db
          const id = res.todoCreate?.todo?.id!
          setTodos((t) => t.key === todo.key, "id", id)
        })
      }

      // update the todo in the database
      createEffect(
        defer(
          () => getTodoUpdateInput(todo),
          (payload) => {
            if (!todo.id) return
            request(TodoUpdateDocument, {
              id: todo.id,
              todo: payload,
            })
          }
        )
      )

      onTodoRemove(() => {
        todo.id && request(TodoDeleteDocument, { id: todo.id })
      })

      createArrayDiff(
        () => todo.subtasks,
        (subtask, onSubtaskRemove) => {
          // if the subtask was added, we need to create it in the database
          if (!subtask.id) {
            request(SubtaskCreateDocument, {
              subtask: getTodoCreateInput(subtask),
            }).then((res) => {
              // tasks get their id after being added to the db
              setTodos(
                (t) => t === todo,
                "subtasks",
                (s) => s.key === subtask.key,
                "id",
                res.subtaskCreate?.subtask?.id!
              )

              // TODO: do the subtask create and subtask link in 1 query..
              request(SubtaskLinkDocument, {
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
                request(SubtaskUpdateDocument, {
                  id: subtask.id,
                  subtask: payload,
                })
              }
            )
          )

          onSubtaskRemove(() => {
            subtask.id && request(SubtaskDeleteDocument, { id: subtask.id })
          })
        }
      )
    }
  )

  return {
    // state
    todos,
    // actions
    addTodo: (fields: Omit<ClientTodo, "id" | "key" | "type">): TodoKey => {
      const key = getNewKey()
      setTodos((p) => [...p, { ...fields, id: null, key, type: "todo" }])
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
    // TODO: allow only passing of required values
    // the rest is filled by default values exactly like in schema
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
    removeSubtask(parentKey: TodoKey, subtaskKey: TodoKey) {
      setTodos(
        (t) => t.key === parentKey,
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
