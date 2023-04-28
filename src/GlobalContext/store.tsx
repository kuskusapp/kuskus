import { createMemo, createSelector, createSignal } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
import { ClientTodo, TodoKey, createTodosState } from "./todos"
import { todayDate } from "~/lib/lib"

export type { ClientSubtask, ClientTodo } from "./todos"

export const enum PageType {
  All = "All",
  Today = "Today",
  Done = "Done",
  Starred = "Starred",
}

export const [GlobalContextProvider, useGlobalContext] = createContextProvider(
  () => {
    const todosState = createTodosState()
    const [subtasks, setSubtasks] = createSignal<ClientTodo[]>([
      {
        id: "",
        title: "check all TODO: in code",
        done: false,
        starred: false,
        priority: 0,
      },
    ])

    const [activePage, setActivePage] = createSignal(PageType.All)
    const isPageActive = createSelector<PageType | null, PageType>(activePage)

    const [localSearch, setLocalSearch] = createSignal(false)
    const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
    const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
      createSignal([])

    const [focusedTodo, setFocusedTodo] = createSignal<TodoKey | null>(null)
    const isTodoFocused = createSelector<TodoKey | null, TodoKey>(focusedTodo)

    const [todoToEdit, setTodoToEdit] = createSignal<string>("")
    const [editingTodo, setEditingTodo] = createSignal<boolean>(false)
    const [newTodo, setNewTodo] = createSignal<boolean>(false)
    const [newSubtask, setNewSubtask] = createSignal<boolean>(false)
    const [newTodoType, setNewTodoType] = createSignal<string>("")
    const [todoEditInput, setTodoEditInput] = createSignal("")
    const [guard, setGuard] = createSignal(false)
    const [localSearchResultIds, setLocalSearchResultIds] = createSignal<
      string[]
    >([])
    const [localSearchResultId, setLocalSearchResultId] = createSignal("")
    const [editNoteInTodo, setEditNoteInTodo] = createSignal(false)
    const [showHelp, setShowHelp] = createSignal(false)
    const [showSettings, setShowSettings] = createSignal(false)
    const [clickTimeStamp, setClickTimeStamp] = createSignal(0)
    const [changeFocus, setChangeFocus] = createSignal(true)

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

    return {
      todosState,
      // all the todosState state and methods can be available top level
      ...todosState,
      orderedTodos,
      activePage,
      isPageActive,
      setActivePage,
      focusedTodo,
      isTodoFocused,
      setFocusedTodo,
      todoToEdit,
      setTodoToEdit,
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
      newSubtask,
      setNewSubtask,
      subtasks,
      setSubtasks,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
