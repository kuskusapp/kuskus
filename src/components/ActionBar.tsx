import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { batch } from "solid-js"

export default function ActionBar() {
  const global = useGlobalContext()
  return (
    <div class="flex justify-between w-full items-center pl-3 pr-3">
      <div
        class="has-tooltip cursor-pointer"
        onClick={() => {
          global.setShowHelp(true)
        }}
      >
        <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8 dark:text-black">
          Learn KusKus
        </span>
        <Icon name="Question" />
      </div>
      <div
        class="has-tooltip cursor-pointer pl-24 pt-2 pb-2 pr-24 border rounded"
        onClick={() => {
          if (!global.newTodo()) {
            // TODO: get context of current page, pass it as second arg
            // today, all ..

            batch(() => {
              global.setFocusedTodo("")
              global.setNewTodoType("all")
              global.setNewTodo(true)
              global.setGuard(true)
            })
          }
        }}
      >
        <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8 dark:text-black">
          New Todo
        </span>
        <Icon name="Plus" />
      </div>
      <div
        class="has-tooltip cursor-pointer"
        onClick={() => {
          global.setShowSettings(true)
        }}
      >
        <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8 dark:text-black">
          Settings
        </span>
        <Icon name="Settings" />
      </div>
    </div>
  )
}
