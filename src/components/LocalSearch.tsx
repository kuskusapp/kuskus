import { autofocus } from "@solid-primitives/autofocus"
import { createSignal, onMount } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import Fuse from "fuse.js"
import { findIndexOfId } from "~/lib/lib"

export default function LocalSearch() {
  const global = useGlobalContext()
  const [index, setIndex] = createSignal<any>()

  // TODO: probably not the best place for this
  onMount(() => {
    setIndex(
      new Fuse(global.orderedTodos(), {
        keys: ["title"],
        shouldSort: false,
      })
    )
  })

  return (
    <input
      style={{ outline: "none", "border-radius": "25px", margin: "-4px" }}
      class="w-full p-2 px-4 grow"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          if (global.localSearchResultIds().length > 0) {
            global.setFocusedTodo(global.localSearchResultId())
            global.setLocalSearch(false)
            global.setLocalSearchResultIds([])
            global.setLocalSearchResultId("")
            global.setCurrentlyFocusedTodo(
              findIndexOfId(global.orderedTodos(), global.focusedTodo())
            )
          }
        }
      }}
      // TODO: for highliting matches,
      // use includeMatches: true
      oninput={(e) => {
        const matches = index().search(e.target.value)
        if (matches.length === 0) {
          global.setLocalSearchResultIds([])
        }
        if (matches.length > 0) {
          global.setLocalSearchResultIds(matches.map((m: any) => m.item.id))
          global.setLocalSearchResultId(matches[0].item.id)
        }
      }}
      autofocus
      ref={autofocus}
      type="text"
      placeholder="Go to..."
    />
  )
}
