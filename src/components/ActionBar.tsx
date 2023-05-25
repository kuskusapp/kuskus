import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import Icon from "./Icon"
import { Show } from "solid-js"
import LocalSearch from "./LocalSearch"

export default function ActionBar() {
  const todoList = useTodoList()

  return (
    <div
      class="flex justify-between w-full items-center pl-5 pr-5 p-2 bg-gray-100 dark:bg-neutral-900"
      style={{
        "min-height": "50px",
        "border-top": "solid 3px rgb(43, 43, 43, 0.5)",
      }}
    >
      <Show
        when={!todoList.inMode(TodoListMode.Search)}
        fallback={<LocalSearch />}
      >
        <div
          class="has-tooltip cursor-pointer"
          onClick={() => todoList.setMode(TodoListMode.Search)}
        >
          <div
            class="tooltip shadow-lg p-1  -mt-8 text-white text-sm flex items-center px-3 gap-1 font-bold"
            style={{
              "transition-delay": "0.5s",
            }}
          >
            <span>Search todos</span>
            <Icon name="F key" />
          </div>
          <Icon name="Search" />
        </div>
        <div
          class="has-tooltip cursor-pointer pl-24 pt-2 pb-2 pr-24 rounded"
          onClick={() => todoList.setMode(TodoListMode.NewTodo)}
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
          class="has-tooltip cursor-pointer relative"
          onClick={() => todoList.setMode(TodoListMode.Settings)}
        >
          <div
            class="tooltip shadow-lg p-1 bg-stone-900 -mt-8 text-white text-sm flex items-center px-3 gap-1 font-bold top-3 right-4"
            style={{
              "border-radius": "25px",
              "transition-delay": "0.5s",
            }}
          >
            <span>Settings</span>
            {/* TODO: change to cmd+, */}
            {/* TODO: add icon + button bind */}
            <Icon name="N key" />
          </div>
          <Icon name="Settings" />
        </div>
      </Show>
    </div>
  )
}
