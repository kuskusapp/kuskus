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
  } = useGlobalContext()
  const [ref, setRef] = createSignal<HTMLInputElement>()
  const [index, setIndex] = createSignal<any>()
  createAutofocus(ref)

  // TODO: probably not the best place for this
  onMount(() => {
    setIndex(
      new Fuse(todos(), {
        keys: ["title"],
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
            setFocusedTodo(localSearchResultIds()[0])
            setLocalSearch(false)
            setLocalSearchResultIds([])
          }
        }
      }}
      // TODO: for highliting matches like in 2Do, need this
      // https://github.com/krisk/Fuse/issues/719
      oninput={(e) => {
        const matches = index().search(e.target.value)
        setLocalSearchResultIds(matches.map((m: any) => m.item.id))
      }}
      autofocus
      ref={autofocus}
      type="text"
      placeholder="Go to..."
    />
  )
}
