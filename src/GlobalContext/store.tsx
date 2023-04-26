import { createSignal, onMount } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
import { grafbase } from "~/lib/graphql"
import {
  CreateTodoDocument,
  Mutation,
  Query,
  TodosDocument,
} from "~/graphql/schema"

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
    const [todos, setTodos] = createSignal<TodoType[]>([])
    onMount(async () => {
      // await grafbase.request<Mutation>(CreateTodoDocument, {
      //   todo: {
      //     title: "Fix all bugs",
      //     starred: true,
      //     priority: 3,
      //     done: false,
      //   },
      // })
      // await grafbase.request<Mutation>(CreateTodoDocument, {
      //   todo: {
      //     title: "Make Kuskus",
      //     starred: true,
      //     priority: 2,
      //     done: false,
      //     note: "cover all important use cases",
      //   },
      // })
      // await grafbase.request<Mutation>(CreateTodoDocument, {
      //   todo: {
      //     title: "Release KusKus",
      //     starred: true,
      //     priority: 1,
      //     done: false,
      //   },
      // })
      // await grafbase.request<Mutation>(CreateTodoDocument, {
      //   todo: {
      //     title: "Polish",
      //     starred: true,
      //     priority: 0,
      //     done: false,
      //   },
      // })
      const res = await grafbase.request<Query>(TodosDocument)
      if (res.todoCollection?.edges) {
        res.todoCollection.edges.map((todo) => {
          setTodos([...todos(), todo?.node])
        })
      }
      console.log(todos(), "todos")
    })
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
      newSubtask,
      setNewSubtask,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
