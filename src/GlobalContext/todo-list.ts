import {
  batch,
  createContext,
  useContext,
  createMemo,
  createSelector,
  createSignal,
  untrack,
  Signal,
} from "solid-js"
import {
  ClientSubtask,
  ClientTodo,
  TodoKey,
  createTodosState,
  getNewKey,
} from "./todos"
import { todayDate } from "~/lib/lib"
import { SetterParam } from "@solid-primitives/utils"

export type { ClientSubtask, ClientTodo } from "./todos"

export type NewSubtask = {
  type: "new-subtask"
  parent: TodoKey
  key: TodoKey
}

export enum PageType {
  All = "All",
  Today = "Today",
  Done = "Done",
  Starred = "Starred",
}

export enum TodoListMode {
  Default,
  Edit,
  NewTodo,
  NewSubtask,
  Search,
  Suggest,
  Settings,
}

type TodoListModeDataMap = {
  [TodoListMode.Settings]: { settingsState?: string }
  [TodoListMode.NewSubtask]: NewSubtask
  [TodoListMode.Edit]: { initEditingNote?: true }
  [TodoListMode.Search]: Signal<
    | {
        isResult(key: TodoKey): boolean
        isSelected(key: TodoKey): boolean
      }
    | undefined
  >
}

export type TodoListModeData<T extends TodoListMode> =
  T extends keyof TodoListModeDataMap ? TodoListModeDataMap[T] : void

type TodoListModeState = {
  [K in TodoListMode]: { type: K } & (K extends keyof TodoListModeDataMap
    ? { data: TodoListModeDataMap[K] }
    : { data?: undefined })
}[TodoListMode]

export function createTodoListState(
  options: Parameters<typeof createTodosState>[0]
) {
  const todosState = createTodosState(options)

  const [activePage, setActivePage] = createSignal(PageType.All)

  const [focusedTodoKey, setFocusedTodoKey] = createSignal<TodoKey | null>(null)
  const isTodoFocused = createSelector<TodoKey | null, TodoKey>(focusedTodoKey)

  const [modeState, _setMode] = createSignal<TodoListModeState>(
    { type: TodoListMode.Default },
    { equals: (a, b) => a.type === b.type && a.data === b.data }
  )
  const setMode = <T extends TodoListMode>(
    ..._: T extends keyof TodoListModeDataMap
      ? [mode: T, data: TodoListModeDataMap[T]]
      : [mode: T]
  ) => _setMode({ type: _[0], data: _[1] } as any)

  const mode = createMemo(() => modeState().type)
  const inMode = createSelector<TodoListMode, TodoListMode>(
    () => modeState().type
  )
  const getModeData = <T extends TodoListMode>(mode: T) =>
    inMode(mode) ? (modeState().data as TodoListModeData<T>) : undefined

  function addNewTask() {
    batch(() => {
      setMode(TodoListMode.NewTodo)
      setFocusedTodoKey(null)
    })
  }

  function addNewSubtask(): void {
    const key = getNewKey()
    const focused = focusedTodo()
    if (!focused) return
    batch(() => {
      setMode(TodoListMode.NewSubtask, {
        parent: focused.type === "subtask" ? focused.parent.key : focused.key,
        key,
        type: "new-subtask",
      })
      setFocusedTodoKey(key)
    })
  }

  const compareTodos = (a: ClientTodo, b: ClientTodo): number => {
    if (b.starred && !a.starred) {
      return 1
    } else if (a.starred && !b.starred) {
      return -1
    }
    return b.priority - a.priority
  }

  const filterPredicateMap: Record<PageType, (t: ClientTodo) => boolean> = {
    [PageType.All]: (t) => !t.done,
    [PageType.Today]: (t) => !t.done && t.dueDate === todayDate(),
    [PageType.Done]: (t) => t.done,
    [PageType.Starred]: (t) => !t.done && t.starred,
  }

  const orderedTodos = createMemo(() =>
    todosState.todos.filter(filterPredicateMap[activePage()]).sort(compareTodos)
  )

  const flatTasks = createMemo(() =>
    orderedTodos()
      .map((t) => {
        const list: (NewSubtask | ClientSubtask | ClientTodo)[] = [
          t,
          ...t.subtasks,
        ]
        const ns = getModeData(TodoListMode.NewSubtask)
        if (ns?.parent === t.key) list.push(ns)
        return list
      })
      .flat()
  )

  // TODO: make sure memo runs no more than needed..
  // list containing all unique tag names used + the count
  const currentlyUsedTagsWithCount = createMemo(() => {
    let uniqueTagsWithCount = new Set<string>()
    // let countOfTags = {}
    todosState.todos.map((t) => {
      if (t.tags) {
        t.tags.forEach((tag) => {
          // if (uniqueTags.has(tag)) {
          //   // countOfTags[tag] += 1
          // }
          uniqueTagsWithCount.add(tag)
        })
      }
    })
    return uniqueTagsWithCount
  })

  function getTodoByKey(
    key: TodoKey
  ): NewSubtask | ClientSubtask | ClientTodo | undefined {
    return flatTasks().find((t) => t.key === key)
  }

  const focusedTodoIndex = createMemo(() =>
    flatTasks().findIndex((t) => t.key === focusedTodoKey())
  )

  function setFocusedTodoIndex(index: SetterParam<number>) {
    const todo =
      flatTasks()[
        typeof index === "function" ? index(focusedTodoIndex()) : index
      ]
    if (todo) setFocusedTodoKey(todo.key)
  }

  const focusedTodo = createMemo<
    NewSubtask | ClientTodo | ClientSubtask | undefined
  >(() => flatTasks()[focusedTodoIndex()])

  const getTodoIndex = (todo: ClientTodo): number => {
    return todosState.todos.findIndex((t) => t.key === todo.key)
  }

  return {
    request: options.request,
    todosState,
    getTodoIndex,
    flatTasks,
    // all the todosState state and methods can be available top level
    ...todosState,
    activePage,
    updateActivePage(page: PageType) {
      if (page === untrack(activePage)) return

      batch(() => {
        setActivePage(page)
        setFocusedTodoIndex(0)
      })
    },
    orderedTodos,
    focusedTodo,
    currentlyUsedTags,
    focusedTodoKey,
    focusedTodoIndex,
    getTodoByKey,
    isTodoFocused,
    setFocusedTodoKey,
    setFocusedTodoIndex,
    mode,
    getModeData,
    inMode,
    setMode,
    addNewTask,
    addNewSubtask,
    localSearchData: createMemo(() => getModeData(TodoListMode.Search)?.[0]()),
    startLocalSearch() {
      batch(() => {
        setMode(TodoListMode.Search, createSignal(undefined))
        setFocusedTodoKey(null)
      })
    },
  } as const
}

const TodoListCtx = createContext<ReturnType<typeof createTodoListState>>()

export const TodoListProvider = TodoListCtx.Provider

export const useTodoList = () => {
  const ctx = useContext(TodoListCtx)
  if (!ctx) throw new Error("useTodoList must be used within TodoListProvider")
  return ctx
}
