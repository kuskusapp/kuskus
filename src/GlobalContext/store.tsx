import {
  Accessor,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js"
import { getTodos } from "~/lib/graphql"

interface ContextProps {
  activePage: Accessor<string>
  setActivePage: Setter<string>
  todos: Accessor<TodoType[]>
  setTodos: Setter<TodoType[]>
  orderedTodos: Accessor<TodoType[]>
  setOrderedTodos: Setter<TodoType[]>
  focusedTodo: Accessor<number>
  setFocusedTodo: Setter<number>
  todoToEdit: Accessor<number>
  setTodoToEdit: Setter<number>
  newTodo: Accessor<boolean>
  setNewTodo: Setter<boolean>
  newTodoType: Accessor<string>
  setNewTodoType: Setter<string>
  localSearch: Accessor<boolean>
  setLocalSearch: Setter<boolean>
  editingTodo: Accessor<boolean>
  setEditingTodo: Setter<boolean>
  todoEditInput: Accessor<string>
  setTodoEditInput: Setter<string>
  guard: Accessor<boolean>
  setGuard: Setter<boolean>
  focusedTodoFromSearch: Accessor<number>
  setFocusedTodoFromSearch: Setter<number>
  highlitedTodosFromSearch: Accessor<number[]>
  setHighlightedTodosFromSearch: Setter<number[]>
  localSearchResultIds: Accessor<number[]>
  setLocalSearchResultIds: Setter<number[]>
  localSearchResultId: Accessor<number>
  setLocalSearchResultId: Setter<number>
  currentlyFocusedTodo: Accessor<number>
  setCurrentlyFocusedTodo: Setter<number>
}

const GlobalContext = createContext<ContextProps>()

export type TodoType = {
  id: number
  title: string
  done: boolean
  starred: boolean
  priority: 0 | 1 | 2 | 3
  description?: string
  dueDate?: Date
}

export function GlobalContextProvider(props: any) {
  const [todos, setTodos] = createSignal<TodoType[]>([
    {
      id: 1,
      title: "Make KusKus",
      done: false,
      dueDate: new Date(),
      starred: false,
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
  const [localSearchResultIds, setLocalSearchResultIds] = createSignal([])
  const [localSearchResultId, setLocalSearchResultId] = createSignal(0)
  const [currentlyFocusedTodo, setCurrentlyFocusedTodo] = createSignal(0)

  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)!
