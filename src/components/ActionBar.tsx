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
        class="has-tooltip cursor-pointer pl-24 pt-2 pb-2 pr-24 rounded dark:border-stone-800"
        onClick={() => {
          if (!global.newTodo()) {
            // TODO: get context of current page, pass it as second arg
            // today, all ..

            batch(() => {
              global.setFocusedTodo(-1)
              global.setNewTodoType("all")
              global.setNewTodo(true)
              global.setGuard(true)
            })
          }
        }}
      >
        <div
          class="tooltip shadow-lg p-1 bg-stone-900 -mt-8 text-white text-sm flex items-center px-3 gap-1 font-bold"
          style={{
            "border-radius": "25px",
            "transition-delay": "0.5s",
          }}
        >
          <span>New Todo</span>
          <Icon name="N key" />
        </div>
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
