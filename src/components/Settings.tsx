import clsx from "clsx"
import { Match, Show, Switch, createSignal, onCleanup, onMount } from "solid-js"
import { GoogleClient } from "~/lib/auth"
import Keybind from "./Keybind"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { useUserDetails } from "~/GlobalContext/userDetails"
import Icon from "./Icon"
import HelpItem from "./HelpItem"
import Instruction from "./HelpItem"

export default function Settings() {
  const todoList = useTodoList()
  const userDetails = useUserDetails()
  const initial = todoList.getModeData(TodoListMode.Settings)
  const [show, setShow] = createSignal(
    initial?.settingsState ? initial.settingsState : "Help"
  )

  return (
    <div class="flex h-full w-full">
      <div
        class="flex justify-between flex-col dark:bg-stone-900 bg-gray-100 pr-1"
        style={{ "border-radius": "0px 0px 0px 10px" }}
      >
        <div>
          <div class="p-2 pl-3 flex flex-col gap-1">
            {/* <div
              class={clsx(
                "cursor-pointer",
                show() === "Preferences" && "font-bold"
              )}
              onClick={() => setShow("Preferences")}
            >
              Preferences
            </div> */}
            <div
              class={clsx(
                "cursor-pointer",
                show() === "Keyboard" && "font-bold"
              )}
              onClick={() => setShow("Keyboard")}
            >
              Keyboard
            </div>
            <div
              class={clsx(
                "cursor-pointer",
                show() === "Account" && "font-bold"
              )}
              onClick={() => setShow("Account")}
            >
              Account
            </div>
            <div
              class={clsx("cursor-pointer", show() === "Help" && "font-bold")}
              onClick={() => setShow("Help")}
            >
              Help
            </div>
            <div
              class={clsx(
                "cursor-pointer",
                show() === "Upgrade" && "font-bold"
              )}
              onClick={() => setShow("Upgrade")}
            >
              Upgrade
            </div>
          </div>
        </div>
        <div
          class="flex cursor-pointer self-center pb-3 text-red-500"
          onClick={() => {
            // TODO: sign out with hanko, clear cookie?
          }}
        >
          Sign out
        </div>
      </div>
      <div class="p-4 h-full w-full">
        <Switch>
          <Match when={show() === "Preferences"}>
            {/* <div
              class="cursor-pointer"
              onClick={() => {
                // TODO: add maybe..
              }}
            >
              Hide action bar
            </div> */}
          </Match>
          <Match when={show() === "Keyboard"}>
            <div class="h-full">
              <div class="h-full w-full overflow-scroll">
                <h1 class="bg-neutral-300 font-semibold p-1 dark:bg-neutral-700">
                  General keybinds
                </h1>
                <Keybind action="Create new todo" keybind="n" />
                <Keybind action="Edit todo" keybind="return" />
                <Keybind
                  action="Search todos for current view (All/Today/Starred)"
                  keybind="f"
                />
                <Keybind action="Delete todo" keybind="Backspace" />
                <Keybind action="Change priority to 1" keybind="1" />
                <Keybind action="Change priority to 2" keybind="2" />
                <Keybind action="Change priority to 3" keybind="3" />
                <Keybind action="Star/Unstar" keybind="4" />
                <Keybind action="Create subtasks from a task" keybind="a" />
                <Keybind action="Focus on task below" keybind="Down arrow" />
                <Keybind action="Change to All" keybind="Control + 1" />
                <Keybind action="Change to Today" keybind="Control + 2" />
                <Keybind action="Change to Starred" keybind="Control + 3" />
                <Keybind action="Change to Done" keybind="Control + 4" />
                <h1 class="bg-neutral-300 font-semibold p-1 dark:bg-neutral-700">
                  Inside suggested tasks view
                </h1>
                <Keybind
                  action="Move suggested task to subtask"
                  keybind="Return"
                />
              </div>
            </div>
          </Match>
          <Match when={show() === "Account"}>
            <div class="w-full h-full flex items-center justify-center">
              <div class="flex flex-col gap-5 justify-center items-center">
                <Show
                  when={
                    new Date(
                      userDetails.userDetails.paidSubscriptionValidUntilDate
                    ) > new Date()
                  }
                  fallback={
                    <>
                      <div class="font-bold text-4xl">You are on free plan</div>
                      <div class="opacity-60 flex flex-col items-center justify-center">
                        <div>
                          {10 - userDetails.userDetails.freeAiTasksAvailable}/10
                          AI suggestions used
                        </div>
                        <div>{todoList.todos.length}/10 tasks used</div>
                      </div>
                      <button
                        class="flex items-center justify-center bg-neutral-800 p-2 px-6 hover:opacity-60 rounded-2xl cursor-pointer"
                        onClick={() => setShow("Upgrade")}
                      >
                        Upgrade
                      </button>
                    </>
                  }
                >
                  <div class="font-bold text-4xl">
                    You are on paid plan. Enjoy!
                  </div>
                  <div class="opacity-60 flex flex-col items-center justify-center"></div>
                </Show>
              </div>
            </div>
          </Match>
          <Match when={show() === "Help"}>
            <div class="w-full h-full flex flex-col items-center justify-between overflow-auto">
              <div class="overflow-scroll h-full w-full flex flex-col justify-center items-center">
                <div class="flex flex-col h-full w-3/4">
                  <Instruction
                    problem="Adding a task"
                    keyboardInstruction="Press n key"
                    mouseInstruction="Press on plus button on bottom with a mouse"
                  />
                  <Instruction
                    problem="Adding a subtask"
                    keyboardInstruction="When a task or subtask is focused, press l key"
                    mouseInstruction="TODO: "
                  />
                  <Instruction
                    problem="Changing focus between tasks"
                    keyboardInstruction="Use up and down arrow keys to move focus between"
                    mouseInstruction="Press on a task with a mouse"
                  />
                  <Instruction
                    problem="Edit a task"
                    keyboardInstruction="If task is focused, pressing `return` key will start
                    editing it"
                    mouseInstruction="Press on a focused task again with a mouse
                    to start editing it"
                  />
                  <Instruction
                    problem="Search tasks"
                    keyboardInstruction="If not editing any tasks, pressing f key will start
                    searching tasks currently in view. Start typing the task
                    you want to jump to, potential results will be
                    highlighted. Use up and down arrow keys to move focus
                    between results. Pressing return will switch focus to
                    the task."
                    mouseInstruction="Start start search by pressing the search icon in
                    bottom left"
                  />
                  <Instruction
                    problem="Edit note of a task"
                    keyboardInstruction="When editing a title of the task, can press down arrow
                    to start editing a note. Can press up arrow to start
                    editing title again."
                    mouseInstruction="Press on the note part of the todo and start editing the note"
                  />
                  <Instruction
                    problem="Edit priority of a task"
                    keyboardInstruction="Press 1, 2 or 3 to change priority when task is focused"
                    mouseInstruction="When editing a task, press on the priority icon to change priority"
                  />
                  <Instruction
                    problem="Star a task"
                    keyboardInstruction="Press 4 to change between star/unstarred when task is focused"
                    mouseInstruction="When editing a task, press on the priority icon to change starred/unstarred"
                  />
                  <Instruction
                    problem="Do AI suggestions for task"
                    keyboardInstruction="Press a key when task is focused. You will see a loading indicator and then the suggestions will appear"
                    mouseInstruction="TODO: "
                  />
                </div>
                <div class="flex w-full h-1/2 flex-col gap-5 text-2xl font-semibold justify-between items-center overflow-scroll">
                  <div class="flex w-full h-full justify-center items-center gap-5">
                    <div
                      class="h-full grow flex justify-center items-center text-2xl rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-900 hover:opacity-60"
                      style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
                    >
                      bug
                    </div>
                    <div
                      class="grow h-full flex justify-center items-center text-2xl rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-900 hover:opacity-60"
                      style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
                    >
                      <div class="">help</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Match>
          <Match when={show() === "Upgrade"}>
            <div class="flex flex-col w-full h-full hidden">
              <div class="flex h-full w-full">
                <div class="flex flex-col justify-center items-center gap-5 w-full bg-gray-200 dark:bg-neutral-900">
                  <div class="text-4xl mb-5 font-bold">10$ / month</div>
                  <div class="text-xl align-center">
                    <div class="">
                      Unlimited <span class="font-semibold text-2xl">AI</span>{" "}
                      (GPT-3)
                    </div>
                    <div>
                      Unlimited{" "}
                      <span class="font-semibold text-2xl">Todos</span>
                    </div>
                  </div>
                  <div class="dark:bg-neutral-950 bg-zinc-400 p-3 px-8 rounded-xl cursor-pointer">
                    Subscribe
                  </div>
                </div>
                <div class="flex flex-col justify-center items-center gap-5 w-full bg-zinc-300 dark:bg-neutral-800 ">
                  <div class="text-4xl mb-5 font-bold">25$ / month</div>
                  <div class="text-xl align-center">
                    <div>
                      State of the art{" "}
                      <span class="font-semibold text-2xl">AI</span>
                    </div>
                    <div>
                      1500 <span class="font-semibold text-2xl">GPT-4</span>{" "}
                      tasks
                    </div>
                  </div>
                  <div class="bg-zinc-400 dark:bg-neutral-950 p-3 px-8 rounded-xl cursor-pointer">
                    Subscribe
                  </div>
                </div>
              </div>
              <div class="flex h-full w-full">
                <div class="flex flex-col justify-center items-center gap-2 w-full bg-gray-200 dark:bg-neutral-900">
                  <div class="text-4xl font-bold">100$ / year</div>
                  <div class="text-xl align-center">
                    <div class="flex flex-col justify-center opacity-30">
                      <div class="text-3xl flex justify-center items-center">
                        <div>120$ / year</div>
                      </div>
                      <div
                        class="border-b-2 border-black dark:border-white"
                        style={{
                          "margin-top": "-17px",
                          "margin-bottom": "17px",
                        }}
                      ></div>
                    </div>
                    {/* <div>
                      Unlimited <span class="font-semibold text-2xl">AI</span>
                    </div> */}
                  </div>
                  <div class="dark:bg-neutral-950 bg-zinc-400 p-3 px-8 rounded-xl cursor-pointer">
                    Subscribe
                  </div>
                </div>
                <div class="flex flex-col justify-center items-center gap-2 w-full bg-zinc-300 dark:bg-neutral-800 ">
                  <div class="text-4xl font-bold">250$ / year</div>
                  <div class="text-xl align-center">
                    <div class="flex flex-col jusitfy-end opacity-30 ">
                      <div class="text-3xl align-center flex items-center justify-center">
                        <div>300$ / year</div>
                      </div>
                      <div
                        class="border-b-2 border-black dark:border-white"
                        style={{
                          "margin-top": "-17px",
                          "margin-bottom": "17px",
                        }}
                      ></div>
                    </div>
                    {/* <div>
                      1500 <span class="font-semibold text-2xl">GPT-4</span>{" "}
                      tasks
                    </div> */}
                  </div>
                  <div class="bg-zinc-400 dark:bg-neutral-950 p-3 px-8 rounded-xl cursor-pointer">
                    Subscribe
                  </div>
                </div>
              </div>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
