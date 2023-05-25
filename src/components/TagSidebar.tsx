import clsx from "clsx"
import { For, Show } from "solid-js"
import { PageType, useTodoList } from "~/GlobalContext/todo-list"
import NewTag from "./NewTag"

export default function TagSidebar() {
  const todoList = useTodoList()
  return (
    <>
      <style></style>
      <div
        id="TagsBar"
        class="flex flex-col bg-gray-100 dark:bg-neutral-900 gap-5 p-2 "
        style={{
          "border-right": "solid 3px rgba(43, 43, 43, 0.5)",
          width: "16%",
        }}
      >
        <div
          class="p-1.5 px-4 rounded-lg font-semibold"
          style={{
            border: "solid 2px rgb(43, 43, 43)",
            color: "rgb(43, 43, 43)",
          }}
          onClick={() => {
            todoList.setNewTag(true)
          }}
        >
          New Tag
        </div>
        <div class="flex flex-col gap-1 pt-1">
          <For each={Array.from(todoList.currentlyUsedTagsWithCount().keys())}>
            {(tag) => (
              <div
                class={clsx(
                  "flex flex-row-reverse pl-3 text-md align-center p-1 px-2 justify-between items-center cursor-pointer hover:bg-neutral-800 hover:rounded-lg",
                  todoList.activePage() === PageType.Filtered &&
                    todoList.selectedTagInSidebar() === tag &&
                    "bg-zinc-200 dark:bg-neutral-800 rounded"
                )}
                onClick={() => {
                  todoList.updateActivePage(PageType.Filtered)
                  todoList.setSelectedTagInSidebar(tag)
                }}
              >
                <div class="opacity-60 text-xs">
                  {todoList.currentlyUsedTagsWithCount().get(tag)}
                </div>
                <div>{tag}</div>
              </div>
            )}
          </For>
        </div>
        <Show when={todoList.newTag()}>
          <NewTag />
        </Show>
      </div>
    </>
  )
}
