import { createSignal } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"

export type TodoType = {
  id: number
  title: string
  done: boolean
  starred: boolean
  priority: 0 | 1 | 2 | 3
  note?: string
  dueDate?: string
}

export const [GlobalContextProvider, useGlobalContext] = createContextProvider(
  () => {
    const [todos, setTodos] = createSignal<TodoType[]>([
      {
        id: 1,
        title: "Make KusKus",
        done: false,
        dueDate: "2023-04-25",
        note: "cover all important use cases",
        starred: true,
        priority: 2,
      },
      {
        id: 2,
        title: "Release KusKus",
        done: false,
        starred: true,
        priority: 1,
      },
      {
        id: 3,
        title: "Fix all bugs",
        done: false,
        starred: true,
        priority: 3,
      },
      {
        id: 4,
        title: "Polish",
        done: false,
        starred: true,
        priority: 0,
      },
    ])
    const [activePage, setActivePage] = createSignal("All")
    const [localSearch, setLocalSearch] = createSignal(false)
    const [orderedTodos, setOrderedTodos] = createSignal<TodoType[]>([])
    const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
    const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
      createSignal([])
    const [focusedTodo, setFocusedTodo] = createSignal<number>(0) // id of todo
    const [todoToEdit, setTodoToEdit] = createSignal<number>(0)
    const [editingTodo, setEditingTodo] = createSignal<boolean>(false)
    const [newTodo, setNewTodo] = createSignal<boolean>(false)
    const [newTodoType, setNewTodoType] = createSignal<string>("")
    const [todoEditInput, setTodoEditInput] = createSignal("")
    const [guard, setGuard] = createSignal(false)
    const [localSearchResultIds, setLocalSearchResultIds] = createSignal<
      number[]
    >([])
    const [localSearchResultId, setLocalSearchResultId] = createSignal(0)
    const [currentlyFocusedTodo, setCurrentlyFocusedTodo] = createSignal(0)
    const [editNoteInTodo, setEditNoteInTodo] = createSignal(false)
    const [showHelpModal, setShowHelpModal] = createSignal(false)
    const [clickTimeStamp, setClickTimeStamp] = createSignal(0)
    const [changeFocus, setChangeFocus] = createSignal(true)

    return {
      activePage,
      setActivePage,
      todos,
      setTodos,
      focusedTodo,
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
      orderedTodos,
      setOrderedTodos,
      currentlyFocusedTodo,
      setCurrentlyFocusedTodo,
      editNoteInTodo,
      setEditNoteInTodo,
      showHelpModal,
      setShowHelpModal,
      clickTimeStamp,
      setClickTimeStamp,
      changeFocus,
      setChangeFocus,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
