import { createEffect, createMemo, mapArray, onCleanup } from "solid-js"
import { StoreSetter, createStore, produce, unwrap } from "solid-js/store"
import {
  CreateTodoDocument,
  Query,
  SubtaskConnection,
  TodoDeleteDocument,
  TodoUpdateDocument,
  TodoUpdateInput,
  TodosDocument,
} from "~/graphql/schema"
import { grafbase } from "~/lib/graphql"

export type Priority = 0 | 1 | 2 | 3

export type BaseTodo = {
  title: string
  done: boolean
  starred: boolean
  priority: Priority
  note: string | null
  dueDate: string | null
}

export type ClientSubtask = BaseTodo & { id: string }

export type ClientTodo = BaseTodo & {
  /**
   * ID in the database, todos created client side will not have an id until they are saved to the database
   */
  id: string | null
  subtasks: ClientSubtask[]
}

const parseDbPriority = (int: number): Priority => {
  int = Math.floor(int)
  return Math.min(Math.max(int, 0), 3) as Priority
}

const parseDbSubtasks = (
  subtasks: SubtaskConnection | null | undefined
): ClientSubtask[] => {
  const result: ClientSubtask[] = []
  if (subtasks?.edges)
    for (const edge of subtasks.edges) {
      if (!edge || !edge.node) continue
      result.push({
        id: edge.node.id,
        title: edge.node.title,
        done: edge.node.done,
        starred: edge.node.starred,
        dueDate: edge.node.dueDate ?? null,
        note: edge.node.note ?? null,
        priority: parseDbPriority(edge.node.priority),
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
            const clientTodo: ClientTodo = {
              id: todo.node.id,
              done: todo.node.done,
              starred: todo.node.starred,
              title: todo.node.title,
              priority: parseDbPriority(todo.node.priority),
              note: todo.node.note ?? null,
              dueDate: todo.node.dueDate ?? null,
              subtasks: parseDbSubtasks(todo.node.subtasks),
            }
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
        // ignore todos that came from the database
        // unwrapping because todo is a proxy
        let added = !ignoreAdded.has(unwrap(todo))

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
    addTodo: (fields: Omit<ClientTodo, "id">): ClientTodo => {
      const todo: ClientTodo = { ...fields, id: null }
      setTodos(todos.length, todo)
      return todo
    },
    toggleTodo: (id: string) => {
      setTodos(
        (t) => t.id === id,
        "done",
        (d) => !d
      )
    },
    updateTodo: (id: string, setter: StoreSetter<ClientTodo, [number]>) => {
      setTodos((t) => t.id === id, setter)
    },
    removeTodo: (id: string) => {
      setTodos((p) => p.filter((t) => t.id !== id))
    },
    // a windcard setter if you want to share that 🤷‍♂️
    // setTodos,
  }
}
