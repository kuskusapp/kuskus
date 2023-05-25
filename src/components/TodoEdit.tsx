import { Motion } from "@motionone/solid"
import { autofocus } from "@solid-primitives/autofocus"
import { createEventListener } from "@solid-primitives/event-listener"
import { createShortcut } from "@solid-primitives/keyboard"
import Fuse from "fuse.js"
import {
  For,
  Show,
  batch,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  untrack,
} from "solid-js"
import { todayDate } from "~/lib/lib"
import {
  ClientSubtask,
  ClientTodo,
  TodoListMode,
  useTodoList,
} from "../GlobalContext/todo-list"
import Icon from "./Icon"

export default function TodoEdit(props: {
  todo: ClientTodo | ClientSubtask
  initialEditNote?: true
}) {
  const todoList = useTodoList()
  const [title, setTitle] = createSignal(props.todo.title)
  const [note, setNote] = createSignal(props.todo.note)
  const [dueDate, setDueDate] = createSignal(props.todo.dueDate)
  const [showCalendar, setShowCalendar] = createSignal(false)
  const [showSelectPriority, setShowSelectPriority] = createSignal(false)
  const [priority, setPriority] = createSignal(props.todo.priority)
  const [starred, setStarred] = createSignal(props.todo.starred)
  const [tags, setTags] = createSignal(props.todo.tags)
  const [searchTags, setSearchTags] = createSignal(false)

  // createEventListener(document, "click", (e) => {
  //   console.log("click..")
  //   if (!searchTags()) {
  //     return
  //   }
  //   setSearchTags(false)
  // })

  const fuse = createMemo(
    () =>
      new Fuse(Array.from(todoList.currentlyUsedTagsWithCount().keys()), {
        shouldSort: false,
      })
  )
  const [searchTagsQuery, setSearchTagsQuery] = createSignal("")
  const filteredTags = createMemo(() => {
    if (searchTagsQuery() === "") {
      return Array.from(todoList.currentlyUsedTagsWithCount().keys()).filter(
        (r) => !props.todo.tags?.includes(r)
      )
    }
    const results = fuse()
      .search(searchTagsQuery())
      .filter((r) => !props.todo.tags?.includes(r.item))
      .map((r) => {
        return r.item
      })
    return results
  })

  onCleanup(() => {
    // REMOVE
    if (title() === "") {
      todoList.todosState.removeTodo(props.todo.key)
      return
    }

    if ("subtasks" in todoList.flatTasks()[todoList.focusedTodoIndex()]) {
      console.log("updating")
      console.log(tags())
      // UPDATE TASK
      batch(() => {
        todoList.todosState.updateTodo(props.todo.key, (p) => ({
          ...p,
          title: title(),
          note: note(),
          priority: priority(),
          starred: starred(),
          tags: tags(),
          dueDate: showCalendar() && !dueDate() ? todayDate() : dueDate(),
        }))

        todoList.setMode(TodoListMode.Default)
      })
      return
    }
    // UPDATE SUBTASK
    batch(() => {
      todoList.todosState.updateSubtask(
        // TODO: not sure how to avoid ts-ignore..
        // @ts-ignore
        todoList.flatTasks()[todoList.focusedTodoIndex()].parent.key,
        props.todo.key,
        // somehow id, key and parent need to be on the type
        // but they have to be derived, don't know how..
        (p) => ({
          ...p,
          title: title(),
          note: note(),
          priority: priority(),
          starred: starred(),
          dueDate: showCalendar() && !dueDate() ? todayDate() : dueDate(),
          done: false,
        })
      )
      todoList.setMode(TodoListMode.Default)
    })
  })

  createEventListener(window, "keydown", (e) => {
    if (e.code === "Enter" && !searchTags()) {
      batch(() => {
        if (title() === "") {
          todoList.removeTodo(props.todo.key)
        } else {
          todoList.updateTodo(props.todo.key, {
            title: title(),
            note: note(),
            starred: starred(),
            priority: priority(),
            dueDate: dueDate(),
          })
        }

        todoList.setMode(TodoListMode.Default)
      })
    }
  })

  let titleRef!: HTMLTextAreaElement,
    noteRef!: HTMLInputElement,
    datePickerRef!: HTMLInputElement,
    tagInputRef!: HTMLInputElement

  const [editNoteInTodo, setEditNoteInTodo] = createSignal(
    !!props.initialEditNote
  )

  createEffect(() => {
    if (editNoteInTodo()) {
      autofocus(noteRef)
      createShortcut(["ArrowUp"], () => setEditNoteInTodo(false))
    } else {
      autofocus(titleRef)
      createShortcut(["ArrowDown"], () => setEditNoteInTodo(true))
    }
  })

  createEffect(() => {
    if (searchTags()) {
      autofocus(tagInputRef)
      return
    }
    autofocus(titleRef)
  })

  return (
    <Motion.div class="flex flex-col cursor-default relative pl-1.5 pr-1.5 dark:bg-neutral-800 bg-zinc-200 py-2 transition-all rounded-lg w-full">
      <div
        class="w-full h-full flex justify-between"
        style={{ "padding-right": "0.375rem" }}
      >
        <div class="flex grow gap-1 items-start h-full">
          <div style={{ "padding-top": "3.5px" }}>
            <Icon name={"Square"} />
          </div>
          <div class="w-full h-full">
            <textarea
              value={title()}
              autofocus
              ref={titleRef}
              oninput={(e) => {
                setTitle(e.target.value)
                e.target.style.height = "auto"
                e.target.style.height = e.target.scrollHeight + "px"
              }}
              rows="1"
              style={{
                outline: "none",
                "word-break": "break-all",

                "min-height": "20px",
              }}
              class=" bg-inherit w-full overflow-hidden resize-none"
            ></textarea>
          </div>
        </div>
        <Show when={showSelectPriority()}>
          <div class="cursor-pointer flex">
            <div
              onClick={() => {
                setPriority(1)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 1"} />
            </div>
            <div
              onClick={() => {
                setPriority(2)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 2"} />
            </div>
            <div
              onClick={() => {
                setPriority(3)
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Priority 3"} />
            </div>
            <div
              onClick={() => {
                setStarred(!starred())
                setShowSelectPriority(false)
              }}
            >
              <Icon name={"Star"} />
            </div>
          </div>
        </Show>
        <Show when={!starred() && !showSelectPriority()}>
          <div
            class="cursor-pointer"
            onClick={() => {
              setShowSelectPriority(true)
            }}
          >
            {priority() === 3 && <Icon name={"Priority 3"} />}
            {priority() === 2 && <Icon name={"Priority 2"} />}
            {priority() === 1 && <Icon name={"Priority 1"} />}
          </div>
        </Show>
        <Show when={starred() && !showSelectPriority()}>
          <div
            class="cursor-pointer"
            onClick={() => {
              setShowSelectPriority(true)
            }}
          >
            {priority() === 3 && <Icon name={"StarWithPriority3"} />}
            {priority() === 2 && <Icon name={"StarWithPriority2"} />}
            {priority() === 1 && <Icon name={"StarWithPriority1"} />}
            {priority() === 0 && (
              <Icon name={"Star"} width={"22px"} height={"22px"} />
            )}
          </div>
        </Show>
      </div>
      <div
        style={{ "padding-right": "0.375rem" }}
        class="flex justify-between items-end w-full relative"
      >
        <div class="pl-6 grow">
          <textarea
            autofocus
            ref={noteRef}
            rows="1"
            style={{
              outline: "none",
              "word-break": "break-all",

              "min-height": "20px",
              width: "100%",
              "max-width": "100%",
            }}
            class="flex justify-center items-center bg-inherit overflow-hidden resize-none"
            type="text"
            oninput={(e) => {
              setNote(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = e.target.scrollHeight + "px"
            }}
            placeholder="Notes"
            value={props.todo.note ? props.todo.note : ""}
          />
        </div>
        {/* TODO: don't duplicate like below.. */}
        <div class=" grow text-sm flex w-1/2 items-center justify-end gap-2 overflow-auto">
          <div
            class=" flex transition-all min-w-fit gap-2 rounded cursor-pointer"
            style={{ "padding-top": "1.5px" }}
          >
            <div
              style={{
                "padding-top": "1px",
                "padding-bottom": "1px",
              }}
              class="flex min-w-fit gap-2 overflow-auto"
            >
              <For each={tags()}>
                {(tag) => (
                  <div class="min-w-fit bg-zinc-300 dark:bg-neutral-700 flex justify-center items-center pr-2 gap-1 rounded-2xl overflow-hidden px-3">
                    <div class="cursor-auto">{tag}</div>
                    <div
                      class="opacity-70 "
                      style={{ "padding-top": "1px" }}
                      onClick={() => {
                        setTags(tags()?.filter((t) => t !== tag))
                      }}
                    >
                      {" "}
                      <Icon name="Close"></Icon>
                    </div>
                  </div>
                )}
              </For>
              <Show when={searchTags()}>
                <div>
                  <div
                    style={{
                      width: "150px",
                      border: "solid 1px rgba(80,80,80,0.5)",
                    }}
                    class="flex gap-1 bg-zinc-200 dark:bg-neutral-800 pl-0.5 px-6 rounded"
                  >
                    <div class="opacity-60">
                      <Icon name="Search" />
                    </div>

                    <input
                      class="bg-zinc-200 dark:bg-neutral-800 text-sm rounded pl-0.5 outline-none"
                      ref={tagInputRef}
                      value={searchTagsQuery()}
                      autofocus
                      style={{
                        width: "100px",
                      }}
                      type="text"
                      onKeyPress={(e) => {
                        if (searchTagsQuery() === "" && e.key === "Enter") {
                          setSearchTags(false)
                          return
                        }
                        if (e.key === "Enter") {
                          if (
                            searchTagsQuery() !== "" &&
                            filteredTags().length > 0
                          ) {
                            if (tags() !== null) {
                              if (tags() !== undefined) {
                                setTags([...tags(), filteredTags()[0]])
                              } else {
                                setTags([filteredTags()[0]])
                              }
                            } else {
                              setTags([filteredTags()[0]])
                            }
                            return
                          }
                          if (tags() !== null) {
                            if (tags() !== undefined) {
                              setTags([...tags(), searchTagsQuery()])
                            } else {
                              setTags([searchTagsQuery()])
                            }
                          } else {
                            setTags([searchTagsQuery()])
                          }
                          setSearchTagsQuery("")
                        }
                      }}
                      oninput={(e) => {
                        setSearchTagsQuery(e.target.value)
                      }}
                      placeholder="Search"
                    />
                  </div>
                  <div
                    id="tagsearch"
                    class="flex w-full bg-zinc-200 dark:bg-neutral-800 z-20 rounded pl-1"
                    style={{}}
                  >
                    <div
                      class="absolute z-30 flex gap-1 flex-col mt-7 ml-2"
                      style={{
                        right: "62px",
                        bottom: "-152px",
                        width: "150px",
                      }}
                    >
                      <div
                        class="rounded w-full z-10 bg-zinc-200 dark:bg-neutral-800"
                        style={{
                          height: "150px",
                          border: "solid 1px rgba(80,80,80,0.5)",
                        }}
                      >
                        <div class="flex flex-col overflow-scroll py-2 px-2">
                          <Show
                            when={
                              filteredTags().length === 0 &&
                              searchTagsQuery() !== "" &&
                              !tags()?.includes(searchTagsQuery())
                            }
                          >
                            <div
                              class="rounded bg-zinc-200 dark:bg-neutral-700 pl-2 p-1"
                              onClick={() => {
                                if (tags() !== null) {
                                  console.log(tags())
                                  if (tags() !== undefined) {
                                    setTags([...tags(), searchTagsQuery()])
                                  } else {
                                    setTags([searchTagsQuery()])
                                  }
                                } else {
                                  setTags([searchTagsQuery()])
                                }
                                setSearchTagsQuery("")
                              }}
                            >
                              Create new tag "{searchTagsQuery()}"
                            </div>
                          </Show>
                          <For each={filteredTags()}>
                            {(tag) => (
                              <div
                                onClick={() => {
                                  setTags([...tags(), tag])
                                }}
                              >
                                {tag}
                              </div>
                            )}
                          </For>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Show>
              <div
                onClick={() => {
                  setSearchTags(!searchTags())
                }}
              >
                <Icon name="Tag" />
              </div>
            </div>
          </div>

          <Show
            when={props.todo.dueDate || showCalendar()}
            fallback={
              <div
                class="cursor-pointer"
                onClick={() => {
                  setShowCalendar(true)
                  datePickerRef.focus()
                }}
              >
                <Icon width="20" height="20" name="Calendar"></Icon>
              </div>
            }
          >
            <input
              autofocus
              ref={datePickerRef}
              style={{ width: "6.5rem" }}
              class="bg-transparent text-sm opacity-70 outline-none"
              type="date"
              id="start"
              onchange={(e) => {
                setDueDate(e.target.value)
              }}
              value={props.todo.dueDate ? props.todo.dueDate : todayDate()}
              min={props.todo.dueDate ? props.todo.dueDate : todayDate()}
            ></input>
          </Show>
        </div>
      </div>
    </Motion.div>
  )
}
