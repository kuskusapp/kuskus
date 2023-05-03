import {
  batch,
  createComputed,
  createMemo,
  createSelector,
  createSignal,
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
import { SuggestedTodos } from "~/components/SuggestedTodos"

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

// TODO: remove non used signals!
export const [GlobalContextProvider, useGlobalContext] = createContextProvider(
  () => {
    const todosState = createTodosState()

    const [activePage, setActivePage] = createSignal(PageType.All)
    const isPageActive = createSelector<PageType | null, PageType>(activePage)

    const [localSearch, setLocalSearch] = createSignal(false)
    const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
    const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
      createSignal([])

    const [focusedTodoKey, setFocusedTodoKey] = createSignal<TodoKey | null>(
      null
    )
    const isTodoFocused = createSelector<TodoKey | null, TodoKey>(
      focusedTodoKey
    )

    const [editingTodo, setEditingTodo] = createSignal<boolean>(false)

    const [suggestedTodos, setSuggestedTodos] = createSignal<SuggestedTodos[]>(
      []
    )

    const [focusedSuggestedTodo, setFocusedSuggestedTodo] =
      createSignal<number>(0)

    // TODO: intercepting a signal setter is a better way
    // createComputed runs before other createEffects
    createComputed(() => {
      focusedTodoKey()
      setEditingTodo(false)
    })

    const [newTodo, setNewTodo] = createSignal<boolean>(false)
    const [newTodoType, setNewTodoType] = createSignal<string>("")
    const [todoEditInput, setTodoEditInput] = createSignal("")
    const [guard, setGuard] = createSignal(false)
    const [localSearchResultIds, setLocalSearchResultIds] = createSignal<
      TodoKey[]
    >([])
    const [localSearchResultId, setLocalSearchResultId] =
      createSignal<TodoKey | null>(null)
    const [editNoteInTodo, setEditNoteInTodo] = createSignal(false)
    const [showHelp, setShowHelp] = createSignal(false)
    const [showSettings, setShowSettings] = createSignal(false)
    const [clickTimeStamp, setClickTimeStamp] = createSignal(0)
    const [changeFocus, setChangeFocus] = createSignal(true)
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

    const [newSubtask, setNewSubtask] = createSignal<NewSubtask | null>()
    const isAddingANewSubtask = () => !!newSubtask()

    function addNewSubtask(parent: TodoKey): TodoKey {
      const key = getNewKey()
      batch(() => {
        setNewSubtask({ parent, key, isNewSubtask: true })
        setFocusedTodoKey(key)
      })
      return key
    }

    const flatTasks = createMemo(() =>
      orderedTodos()
        .map((t) => {
          const list: (NewSubtask | ClientSubtask | ClientTodo)[] = [
            t,
            ...t.subtasks,
          ]
          const ns = newSubtask()
          if (ns?.parent === t.key) {
            list.push(ns)
          }
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

    const focusedTodo = createMemo<
      NewSubtask | ClientTodo | ClientSubtask | undefined
    >(() => flatTasks()[focusedTodoIndex()])

    const getTodoIndex = (todo: ClientTodo): number => {
      return todosState.todos.findIndex((t) => t.key === todo.key)
    }

    function parentOfFocusedTodo(global: ReturnType<typeof useGlobalContext>) {
      if ("parent" in global.flatTasks()[global.focusedTodoIndex()]) {
        return (global.flatTasks()[global.focusedTodoIndex()] as ClientSubtask)
          .parent
      }
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

    // function isSubtask(key: TodoKey) {
    //   const global = useGlobalContext()
    //   if ("subtasks" in global.flatTasks()[global.focusedTodoIndex()]) {
    //     return false
    //   }
    //   return true
    // }

    function findTodoFromFocusedTodo() {
      const global = useGlobalContext()
      global.flatTasks().find((t) => t.key === global.focusedTodoKey())
    }

    return {
      todosState,
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
      isTodoFocused,
      setFocusedTodoKey,
      newTodo,
      setNewTodo,
      newTodoType,
      setNewTodoType,
      localSearch,
      setLocalSearch,
      editingTodo,
      setEditingTodo,
      todoEditInput,
      setTodoEditInput,
      guard,
      setGuard,
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
      changeFocus,
      setChangeFocus,
      focusedTodoIndex,
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
      newSubtask,
      addNewSubtask,
      isAddingANewSubtask,
      isSubtask,
      isNewSubtask,
      getTodoByKey,
      setNewSubtask,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
