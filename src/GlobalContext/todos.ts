import { createEffect, mapArray, onCleanup } from "solid-js"
import { StoreSetter, createStore, produce, unwrap } from "solid-js/store"
import { SubtaskCreateDocument, SubtaskUpdateDocument } from "~/graphql/schema"
import { SubtaskDeleteDocument } from "~/graphql/schema"
import {
  CreateTodoDocument,
  Query,
  SubtaskConnection,
  TodoDeleteDocument,
  TodoUpdateDocument,
  TodoUpdateInput,
  TodosDocument,
  SubtaskUpdateInput,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"

export type Priority = 0 | 1 | 2 | 3
export type TodoKey = number

export type BaseTask = {
  title: string
  done: boolean
  starred: boolean
  priority: Priority
  note: string | null
  dueDate: string | null
}

export type ClientSubtask = BaseTask & {
  id: string
  key: TodoKey
  parent: ClientTodo
}

export type ClientTodo = BaseTask & {
  /**
   * ID in the database, todos created client side will not have an id until they are saved to the database
   */
  id: string | null
  /**
   * Local unique key
   */
  key: TodoKey
  subtasks: ClientSubtask[]
}

const { getNewKey, getSubtaskKey } = (() => {
  let last = 0
  return {
    getNewKey: () => last++,
    getSubtaskKey: () => last++,
  }
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
        key: getSubtaskKey(),
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

export function createTodosState() {
  const [todos, setTodos] = createStore<ClientTodo[]>([])

  // fetch initial todos from the database
  // not using resource because we don't need to interact with Suspense
  const ignoreAdded = new WeakSet<ClientTodo>()
  ;(async () => {
    const res = await grafbase.request<Query>(TodosDocument)

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
            ignoreAdded.add(clientTodo)
          }
        }
      })
    )
  })()

  //
  // DATABASE SYNC
  //
  {
    const syncDatabase = mapArray(
      () => todos,
      (todo) => {
        console.log(todo, "todo")
        // ignore todos that came from the database
        // unwrapping because todo is a proxy
        let added = !ignoreAdded.has(unwrap(todo))

        let subtasksUpdated = false
        createEffect(() => {
          subtasksUpdated = true
          syncSubtasks()
          subtasksUpdated = false
        })

        const syncSubtasks = mapArray(
          () => todo.subtasks,
          async (subtask) => {
            // track changes to subtasks
            const updatePayload: SubtaskUpdateInput = {
              title: subtask.title,
              done: subtask.done,
              starred: subtask.starred,
              priority: { set: subtask.priority },
              note: subtask.note,
              dueDate: subtask.dueDate,
            }

            // if subtask was added, we need to create it in the database
            // TODO: not sure what this `added` should be for subtask, something new?
            if (added) {
              added = false
              const res = await grafbase.request(SubtaskCreateDocument, {
                subtask: {
                  title: todo.title,
                  done: todo.done,
                  starred: todo.starred,
                  priority: todo.priority,
                  note: todo.note,
                  dueDate: todo.dueDate,
                },
              })

              const newId = res.subtaskCreate?.subtask?.id
              newId &&
                setTodos(
                  (t) => t === todo,
                  "subtasks",
                  (s) => s.key === subtask.key,
                  "id",
                  newId
                )
            }
            // update the todo in the database
            // wait until it has the id set
            else if (todo.id) {
              grafbase.request(TodoUpdateDocument, {
                id: todo.id,
                todo: updatePayload,
              })
            }

            onCleanup(() => {
              // only update the db if subtasks changed
              // disposing of the store shouldn't trigger a db update
              if (subtasksUpdated && subtask.id)
                grafbase.request(SubtaskDeleteDocument, { id: subtask.id })
            })
          }
        )

        createEffect(async () => {
          // track changes to the todo
          const updatePayload: TodoUpdateInput = {
            title: todo.title,
            done: todo.done,
            starred: todo.starred,
            priority: { set: todo.priority },
            note: todo.note,
            dueDate: todo.dueDate,
          }

          // if the todo was added, we need to create it in the database
          if (added) {
            added = false
            const res = await grafbase.request(CreateTodoDocument, {
              todo: {
                title: todo.title,
                done: todo.done,
                starred: todo.starred,
                priority: todo.priority,
                note: todo.note,
                dueDate: todo.dueDate,
              },
            })
            const newId = res.todoCreate?.todo?.id
            newId && setTodos((t) => t === todo, "id", newId)
          }
          // update the todo in the database
          // wait until it has the id set
          else if (todo.id) {
            grafbase.request(TodoUpdateDocument, {
              id: todo.id,
              todo: updatePayload,
            })
          }
        })

        onCleanup(() => {
          // only update the db if the todos changed
          // disposing of the store shouldn't trigger a db update
          if (todosUpdated && todo.id)
            grafbase.request(TodoDeleteDocument, { id: todo.id })
        })
      }
    )

    let todosUpdated = false
    createEffect(() => {
      todosUpdated = true
      syncDatabase()
      todosUpdated = false
    })
  }

  return {
    // state
    todos,
    // actions
    addTodo: (fields: Omit<ClientTodo, "id" | "key">): number => {
      const key = getNewKey()
      setTodos(todos.length, { ...fields, id: null, key })
      return key
    },
    toggleTodo: (key: number) => {
      setTodos(
        (t) => t.key === key,
        "done",
        (d) => !d
      )
    },
    updateTodo: (key: number, setter: StoreSetter<ClientTodo, [number]>) => {
      setTodos((t) => t.key === key, setter)
    },
    removeTodo: (key: number) => {
      setTodos((p) => p.filter((t) => t.key !== key))
    },
    removeSubtask(todoKey: number, subtaskKey: number) {
      setTodos(
        (t) => t.key === todoKey,
        "subtasks",
        (prevSubtask) => prevSubtask.filter((s) => s.key !== subtaskKey)
      )
    },
    updateSubtask: (
      todoKey: number,
      subtaskKey: number,
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
