import { batch, createMemo, createSelector, createSignal } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
import {
  ClientSubtask,
  ClientTodo,
  TodoKey,
  createTodosState,
  getNewKey,
} from "./todos"
import { todayDate } from "~/lib/lib"
import { SuggestedTodos } from "~/components/SuggestedTodos"
import { createSettingsState } from "./settings"

export type { ClientSubtask, ClientTodo } from "./todos"

export const enum PageType {
  All = "All",
  Today = "Today",
  Done = "Done",
  Starred = "Starred",
}

export type NewSubtask = {
  isNewSubtask: true
  parent: TodoKey
  key: TodoKey
}

export const enum TodoListMode {
  Default,
  Edit,
  NewTodo,
  NewSubtask,
  Search,
  Suggested,
}

type TodoListModeDataMap = {
  [TodoListMode.NewSubtask]: NewSubtask
}

type TodoListModeState = {
  [K in TodoListMode]: { type: K } & (K extends keyof TodoListModeDataMap
    ? { data: TodoListModeDataMap[K] }
    : { data?: undefined })
}[TodoListMode]

// TODO: remove non used signals!
export const [GlobalContextProvider, useGlobalContext] = createContextProvider(
  () => {
    const todosState = createTodosState()
    const settingsState = createSettingsState()

    const [activePage, setActivePage] = createSignal(PageType.All)
    const isPageActive = createSelector<PageType | null, PageType>(activePage)

    const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
    const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
      createSignal([])

    const [focusedTodoKey, setFocusedTodoKey] = createSignal<TodoKey | null>(
      null
    )
    const isTodoFocused = createSelector<TodoKey | null, TodoKey>(
      focusedTodoKey
    )

    const [todoListModeState, setTodoListMode] =
      createSignal<TodoListModeState>(
        { type: TodoListMode.Default },
        { equals: (a, b) => a.type === b.type && a.data === b.data }
      )
    const todoListMode = createMemo(() => todoListModeState().type)
    const isTodoListMode = createSelector<TodoListMode, TodoListMode>(
      () => todoListModeState().type
    )

    function setFocusedTodo(key: TodoKey | null) {
      batch(() => {
        setFocusedTodoKey(key)
        // focusing a different todo should reset viewing mode
        setTodoListMode({ type: TodoListMode.Default })
      })
    }

    function addNewTask() {
      batch(() => {
        setTodoListMode({ type: TodoListMode.NewTodo })
        setFocusedTodoKey(null)
      })
    }

    const newSubtask = createMemo(() => {
      const mode = todoListModeState()
      return mode.type === TodoListMode.NewSubtask ? mode.data : null
    })

    function addNewSubtask(parent: TodoKey): TodoKey {
      const key = getNewKey()
      batch(() => {
        setTodoListMode({
          type: TodoListMode.NewSubtask,
          data: { parent, key, isNewSubtask: true },
        })
        setFocusedTodoKey(key)
      })
      return key
    }

    function addSubtask(
      subtask: Pick<
        ClientSubtask,
        "title" | "note" | "starred" | "priority" | "dueDate"
      >
    ) {
      batch(() => {
        const { parent } = newSubtask()!
        const key = todosState.addSubtask(parent, {
          ...subtask,
          done: false,
          parent: getTodoByKey(parent) as ClientTodo,
        })
        setTodoListMode({ type: TodoListMode.Edit })
        setFocusedTodoKey(key)
      })
    }

    const [suggestedTodos, setSuggestedTodos] = createSignal<SuggestedTodos[]>(
      []
    )

    const [focusedSuggestedTodo, setFocusedSuggestedTodo] =
      createSignal<number>(0)

    const [todoEditInput, setTodoEditInput] = createSignal("")
    const [localSearchResultIds, setLocalSearchResultIds] = createSignal<
      TodoKey[]
    >([])
    const [localSearchResultId, setLocalSearchResultId] =
      createSignal<TodoKey | null>(null)
    const [editNoteInTodo, setEditNoteInTodo] = createSignal(false)
    const [showHelp, setShowHelp] = createSignal(false)
    const [showSettings, setShowSettings] = createSignal(false)
    const [clickTimeStamp, setClickTimeStamp] = createSignal(0)
    const [localSearchResultIndex, setLocalSearchResultIndex] =
      createSignal<number>(0)
    const [showSuggestedTasksModal, setShowSuggestedTasksModal] =
      createSignal<boolean>(false)
    const [loadingSuggestedTodos, setLoadingSuggestedTodos] =
      createSignal(false)

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
      todosState.todos
        .filter(filterPredicateMap[activePage()])
        .sort(compareTodos)
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

    function setFocusedTodoIndex(index: number) {
      const todo = flatTasks()[index]
      if (todo) setFocusedTodoKey(todo.key)
    }

    const focusedTodo = createMemo<
      NewSubtask | ClientTodo | ClientSubtask | undefined
    >(() => flatTasks()[focusedTodoIndex()])

    const getTodoIndex = (todo: ClientTodo): number => {
      return todosState.todos.findIndex((t) => t.key === todo.key)
    }

    function isNewSubtask(
      task: NewSubtask | ClientSubtask | ClientTodo
    ): task is NewSubtask {
      return "isNewSubtask" in task
    }

    function isSubtask(
      task: NewSubtask | ClientSubtask | ClientTodo
    ): task is ClientSubtask {
      return "parent" in task
    }

    return {
      todosState,
      settingsState,
      getTodoIndex,
      flatTasks,
      // all the todosState state and methods can be available top level
      ...todosState,
      orderedTodos,
      activePage,
      isPageActive,
      setActivePage,
      focusedTodo,
      focusedTodoKey,
      focusedTodoIndex,
      isTodoFocused,
      setFocusedTodo,
      setFocusedTodoIndex,
      todoListMode,
      isTodoListMode,
      setTodoListMode,
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
      editNoteInTodo,
      setEditNoteInTodo,
      showHelp,
      setShowHelp,
      showSettings,
      setShowSettings,
      clickTimeStamp,
      setClickTimeStamp,
      localSearchResultIndex,
      setLocalSearchResultIndex,
      showSuggestedTasksModal,
      setShowSuggestedTasksModal,
      suggestedTodos,
      setSuggestedTodos,
      focusedSuggestedTodo,
      setFocusedSuggestedTodo,
      loadingSuggestedTodos,
      setLoadingSuggestedTodos,
      addNewTask,
      newSubtask,
      addNewSubtask,
      addSubtask,
      isSubtask,
      isNewSubtask,
      getTodoByKey,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
