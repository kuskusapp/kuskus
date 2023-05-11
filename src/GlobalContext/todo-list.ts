import {
  batch,
  createMemo,
  createSelector,
  createSignal,
  untrack,
} from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
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

export const enum TodoListMode {
  Default,
  Edit,
  NewTodo,
  NewSubtask,
  Search,
  Suggest,
  Settings,
}

type TodoListModeDataMap = {
  [TodoListMode.NewSubtask]: NewSubtask
  [TodoListMode.Edit]: { initEditingNote?: true }
}

export type TodoListModeData<T extends TodoListMode> =
  T extends keyof TodoListModeDataMap ? TodoListModeDataMap[T] : void

type TodoListModeState = {
  [K in TodoListMode]: { type: K } & (K extends keyof TodoListModeDataMap
    ? { data: TodoListModeDataMap[K] }
    : { data?: undefined })
}[TodoListMode]

export function createTodoListState() {
  const todosState = createTodosState()

  const [activePage, setActivePage] = createSignal(PageType.All)

  const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
  const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
    createSignal([])

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
    modeState().type === mode
      ? (modeState().data as TodoListModeData<T>)
      : undefined

  function setFocusedTodo(key: TodoKey | null) {
    batch(() => {
      setFocusedTodoKey(key)
      // focusing a different todo should reset viewing mode
      setMode(TodoListMode.Default)
    })
  }

  function addNewTask() {
    batch(() => {
      setMode(TodoListMode.NewTodo)
      setFocusedTodoKey(null)
    })
  }

  const newSubtask = createMemo(() => {
    const mode = modeState()
    return mode.type === TodoListMode.NewSubtask ? mode.data : null
  })

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

  const [todoEditInput, setTodoEditInput] = createSignal("")
  const [localSearchResultIds, setLocalSearchResultIds] = createSignal<
    TodoKey[]
  >([])
  const [localSearchResultId, setLocalSearchResultId] =
    createSignal<TodoKey | null>(null)
  const [clickTimeStamp, setClickTimeStamp] = createSignal(0)
  const [localSearchResultIndex, setLocalSearchResultIndex] =
    createSignal<number>(0)

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
        const ns = newSubtask()
        if (ns?.parent === t.key) list.push(ns)
        return list
      })
      .flat()
  )

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
    focusedTodoKey,
    focusedTodoIndex,
    getTodoByKey,
    isTodoFocused,
    setFocusedTodo,
    setFocusedTodoIndex,
    mode,
    getModeData,
    inMode,
    setMode,
    todoEditInput,
    setTodoEditInput,
    focusedTodoFromSearch,
    setFocusedTodoFromSearch,
    highlitedTodosFromSearch,
    setHighlightedTodosFromSearch,
    localSearchResultIds,
    setLocalSearchResultIds,
    localSearchResultId,
    setLocalSearchResultId,
    clickTimeStamp,
    setClickTimeStamp,
    localSearchResultIndex,
    setLocalSearchResultIndex,
    addNewTask,
    addNewSubtask,
  } as const
}

export const [TodoListProvider, useTodoList] = createContextProvider(
  (state: ReturnType<typeof createTodoListState>) => state,
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
