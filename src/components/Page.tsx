import { useGlobalContext } from "~/GlobalContext/store"
import { Match, Show, Switch, createEffect, on, untrack } from "solid-js"
import Today from "~/pages/Today"
import Done from "~/pages/Done"
import All from "~/pages/All"
import Starred from "~/pages/Starred"
import ActionBar from "./ActionBar"
import LocalSearch from "./LocalSearch"
import { findIndexOfId } from "~/lib/lib"
import { createShortcut } from "@solid-primitives/keyboard"
import { createEventListener } from "@solid-primitives/event-listener"

export default function Page() {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      console.log(e.target)
      console.log(ref)
      if (e.target === ref) {
        global.setFocusedTodo(0)
      }
    },
    { passive: true }
  )

  createShortcut(
    ["Backspace"],
    () => {
      if (!global.localSearch() && !global.editingTodo()) {
        global.setTodos(
          global.todos().filter((todo) => todo.id !== global.focusedTodo())
        )

        let todoIdToFocus =
          global
            .orderedTodos()
            .findIndex((todo) => todo.id === global.focusedTodo()) + 1

        if (global.orderedTodos().length === todoIdToFocus) {
          global.setFocusedTodo(global.orderedTodos()[0].id)
        } else {
          global.setFocusedTodo(global.orderedTodos()[todoIdToFocus].id)
        }
        global.setCurrentlyFocusedTodo(
          findIndexOfId(global.orderedTodos(), global.focusedTodo()) - 1
        )
      }
    },
    { preventDefault: false }
  )

  return (
    <div id="page" class="flex flex-col" ref={ref}>
      <Switch>
        <Match when={global.activePage() === "All"}>
          <All />
        </Match>
        <Match when={global.activePage() === "Today"}>
          <Today />
        </Match>
        <Match when={global.activePage() === "Starred"}>
          <Starred />
        </Match>
        <Match when={global.activePage() === "Done"}>
          <Done />
        </Match>
      </Switch>
      <div
        class="flex fixed bottom-0 p-2 border-t border-opacity-25 border-slate-600 w-full"
        style={{ "margin-left": "-3px" }}
      >
        <Show when={global.localSearch()} fallback={<ActionBar />}>
          <LocalSearch />
        </Show>
      </div>
    </div>
  )
}
