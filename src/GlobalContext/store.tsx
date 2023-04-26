import { createEffect, createSignal, onMount, untrack } from "solid-js"
import { createContextProvider } from "@solid-primitives/context"
import { grafbase } from "~/lib/graphql"
import {
  CreateTodoDocument,
  Mutation,
  Query,
  TodoUpdateDocument,
  TodosDocument,
} from "~/graphql/schema"
import { createTodosForDev } from "~/lib/local"

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
    const [runMutateTodo, setRunMutateTodo] = createSignal("") // id of the todo to mutate

    onMount(async () => {
      // await createTodosForDev()
      const res = await grafbase.request<Query>(TodosDocument)
      if (res.todoCollection?.edges) {
        res.todoCollection.edges.map((todo) => {
          setTodos([...todos(), todo?.node as TodoType])
        })
      }
    })

    createEffect(async () => {
      if (runMutateTodo() !== "") {
        untrack(async () => {
          if (todos().length > 0) {
            let todo = todos().find((todo) => todo.id === runMutateTodo())
            await grafbase.request<Mutation>(TodoUpdateDocument, {
              id: runMutateTodo(),
              todo: {
                title: todo?.title,
                done: todo?.done,
                starred: todo?.starred,
                priority: { set: todo?.priority },
                note: todo?.note,
                dueDate: todo?.dueDate,
              },
            })
            setRunMutateTodo("")
          }
        })
      }
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
      runMutateTodo,
      setRunMutateTodo,
    } as const
  },
  // @ts-expect-error this is just to assert context as non-nullable
  {}
)
