import { createSignal } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
import { createTodosState } from "./todos"

export type TodoType = {
  id: string
  title: string
  done: boolean
  starred: boolean
  priority: 0 | 1 | 2 | 3
  note?: string
  dueDate?: string
  subtasks?: [
    {
      id: number
      title: string
      done: boolean
      starred: boolean
      priority: 0 | 1 | 2 | 3
      note?: string
      dueDate?: string
    }
  ]
}

export const [GlobalContextProvider, useGlobalContext] = createContextProvider(
  () => {
    // const [todos, setTodos] = createSignal()
    const todosState = createTodosState()
    todosState.todos()
    // const todosState = {}

    const [activePage, setActivePage] = createSignal("All")
    const [localSearch, setLocalSearch] = createSignal(false)
    const [orderedTodos, setOrderedTodos] = createSignal<TodoType[]>([])
    const [focusedTodoFromSearch, setFocusedTodoFromSearch] = createSignal(0)
    const [highlitedTodosFromSearch, setHighlightedTodosFromSearch] =
      createSignal([])
    const [focusedTodo, setFocusedTodo] = createSignal<string>("") // id of todo
    const [todoToEdit, setTodoToEdit] = createSignal<string>("")
    const [editingTodo, setEditingTodo] = createSignal<boolean>(false)
    const [newTodo, setNewTodo] = createSignal<boolean>(false)
    const [newSubtask, setNewSubtask] = createSignal<boolean>(false)
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
      todosState,
      activePage,
      setActivePage,
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
      newSubtask,
      setNewSubtask,
      todos: todosState.todos,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
