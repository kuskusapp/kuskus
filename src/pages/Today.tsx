import { useKeyDownList } from "@solid-primitives/keyboard"
import { Show, createEffect, untrack } from "solid-js"
import { useGlobalContext } from "~/GlobalContext/store"
import NewTodo from "~/components/NewTodo"
import Todo from "~/components/Todo"
import { isToday } from "~/lib/lib"

export default function Today() {
  const global = useGlobalContext()

  return (
    <div class="p-16 pt-6">
      <h1 class="font-bold text-3xl mb-8">Today</h1>
    </div>
  )
}
