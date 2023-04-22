import { autofocus, createAutofocus } from "@solid-primitives/autofocus"
import { createSignal, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import Fuse from "fuse.js"

export default function LocalSearch() {
  const {
    setFocusedTodo,
    todos,
    setLocalSearch,
    setLocalSearchResultIds,
    localSearchResultIds,
    setLocalSearchResultId,
    orderedTodos,
    setOrderedTodos,
    localSearchResultId,
  } = useGlobalContext()
  const [ref, setRef] = createSignal<HTMLInputElement>()
  const [index, setIndex] = createSignal<any>()
  createAutofocus(ref)

  // TODO: probably not the best place for this
  onMount(() => {
    console.log(orderedTodos(), "ordered todos")
    setIndex(
      new Fuse(orderedTodos(), {
        keys: ["title"],
        shouldSort: false,
      })
    )
  })

  return (
    <input
      style={{ outline: "none" }}
      class="w-full"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          if (localSearchResultIds().length > 0) {
            console.log(localSearchResultId(), "id")
            setFocusedTodo(localSearchResultId())
            setLocalSearch(false)
            setLocalSearchResultIds([])
            setLocalSearchResultId(0)
          }
        }
      }}
      // TODO: for highliting matches,
      // use includeMatches: true
      oninput={(e) => {
        const matches = index().search(e.target.value)
        console.log(matches)
        if (matches.length > 0) {
          setLocalSearchResultIds(matches.map((m: any) => m.item.id))
          setLocalSearchResultId(matches[0].item.id)
        }
      }}
      autofocus
      ref={autofocus}
      type="text"
      placeholder="Go to..."
    />
  )
}
