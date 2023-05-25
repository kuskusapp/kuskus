import clsx from "clsx"
import { Match, Show, Switch, createSignal } from "solid-js"
import { TodoListMode, useTodoList } from "~/GlobalContext/todo-list"
import { useUserDetails } from "~/GlobalContext/userDetails"
import Instruction from "./HelpItem"
import Icon from "./Icon"
import Keybind from "./Keybind"

export default function Settings() {
  const todoList = useTodoList()
  const userDetails = useUserDetails()
  const initial = todoList.getModeData(TodoListMode.Settings)
  const [show, setShow] = createSignal(
    initial?.settingsState ? initial.settingsState : "Help"
  )

  return (
    <>
      <style>
        {`
        #Plan:hover {
          border: solid 3px rgba(147, 197, 253, 0.5);
          transition: all 1s ease-out;
        }
        #Plan {
          border: solid 3px rgba(43, 43, 43, 0.5);
          transition: all 1s ease-out;
        }
      `}
      </style>
      <div class="flex flex-col h-full w-full">
        <div>
          <div
            class="cursor-pointer opacity-60 absolute top-4 right-4"
            onClick={() => todoList.setMode(TodoListMode.Default)}
          >
            <Icon name="Cross" />
          </div>
        </div>
        <div class="flex h-full w-full">
          <div
            class="flex justify-between flex-col  dark:bg-stone-900 bg-gray-100 pr-1"
            style={{
              width: "16%",
              "border-right": "solid 3px rgba(43, 43, 43, 0.5)",
            }}
          >
            <div>
              <div>
                <div
                  class=" p-5 font-bold flex items-center "
                  style={{ "font-size": "28px", height: "104.22px" }}
                >
                  Settings
                </div>
                <div
                  class="p-2 pt-0 pr-0 pl-3 flex flex-col  gap-1 pl-5"
                  style={{ "font-size": "18px", "margin-right": "-6px" }}
                >
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
                      show() === "Keyboard" &&
                        "font-bold text-blue-300 border-r-4 border-blue-300"
                    )}
                    onClick={() => setShow("Keyboard")}
                  >
                    Keyboard
                  </div>
                  <div
                    class={clsx(
                      "cursor-pointer",
                      show() === "Account" &&
                        "font-bold text-blue-300 border-r-4 border-blue-300"
                    )}
                    onClick={() => setShow("Account")}
                  >
                    Account
                  </div>
                  <div
                    class={clsx(
                      "cursor-pointer",
                      show() === "Help" &&
                        "font-bold text-blue-300 border-r-4 border-blue-300"
                    )}
                    onClick={() => setShow("Help")}
                  >
                    Help
                  </div>
                  <div
                    class={clsx(
                      "cursor-pointer",
                      show() === "Upgrade" &&
                        "font-bold text-blue-300 border-r-4 border-blue-300"
                    )}
                    onClick={() => setShow("Upgrade")}
                  >
                    Upgrade
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex cursor-pointer self-center pb-4 text-xl text-red-500 font-bold"
              onClick={() => {
                // TODO: sign out with hanko, clear cookie?
              }}
            >
              Sign out
            </div>
          </div>
          <div class=" h-full w-full">
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
                  <div class="font-bold p-7" style={{ "font-size": "28px" }}>
                    Keyboard Shortcuts
                  </div>
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
                    <Keybind
                      action="Focus on task below"
                      keybind="Down arrow"
                    />
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
                          <div class="font-bold text-4xl">
                            You are on free plan
                          </div>
                          <div class="opacity-60 flex flex-col items-center justify-center">
                            <div>
                              {10 -
                                userDetails.userDetails.freeAiTasksAvailable}
                              /10 AI suggestions used
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
                    <div
                      class=" w-full flex"
                      style={{
                        "border-bottom": "solid 3px rgba(43, 43, 43, 0.5)",
                      }}
                    >
                      <div
                        class="font-bold p-6 pl-4"
                        style={{
                          "font-size": "36px",
                          width: "20%",
                          "border-right": "solid 3px rgba(43, 43, 43, 0.5)",
                        }}
                      >
                        Help
                      </div>
                      <div
                        class="flex items-center justify-center"
                        style={{ width: "80%" }}
                      >
                        <div class="flex items-center justify-center w-full">
                          <Icon name={"Keyboard"} />
                        </div>
                        <div class="flex items-center justify-center w-full">
                          <Icon name={"Cursor"} />
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex flex-col h-full w-full"
                      style={{
                        "border-bottom": "solid 3px rgba(43, 43, 43, 0.5)",
                      }}
                    >
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
                      <div class="flex w-full h-full justify-center items-center gap-5 p-5">
                        {/* TODO: add github icon */}
                        <a
                          class="h-full grow flex justify-center items-center text-2xl rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-900 hover:opacity-60 cursor-pointer"
                          style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
                          href={"https://github.com/kuskusapp/kuskus/issues"}
                          target="_blank"
                        >
                          Bug
                        </a>
                        {/* TODO: add discord icon */}
                        <a
                          class="grow h-full flex justify-center items-center text-2xl rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-900 hover:opacity-60 cursor-pointer"
                          style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
                          href={"https://discord.gg/f8YHjyrX3h"}
                          target="_blank"
                        >
                          Help
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Match>
              <Match when={show() === "Upgrade"}>
                <div>
                  <div class="flex flex-col w-full h-full">
                    <div class="flex flex-col gap-1 p-7">
                      <div
                        class="font-semibold"
                        style={{ "font-size": "32px" }}
                      >
                        Upgrade
                      </div>{" "}
                    </div>
                  </div>
                  <div class="w-full h-full px-5 flex flex-col gap-5 ">
                    <div class="flex gap-5 h-full">
                      <div
                        id="Plan"
                        class="relative rounded-xl flex flex-col h-full w-full p-6 px-10 gap-2 hover:text-blue-300 hover:opacity-60 cursor-pointer"
                      >
                        <div
                          class="font-semibold"
                          style={{ "font-size": "24px" }}
                        >
                          General
                        </div>
                        <div class="opacity-60">
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>Unlimited Todos</div>
                          </div>
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon> <div>Unlimited AI</div>
                          </div>
                        </div>
                        <div class="absolute bottom-2 gap-1 right-5 flex items-center">
                          <span
                            style={{ "font-size": "28px" }}
                            class="font-bold"
                          >
                            $10
                          </span>
                          <span class="opacity-60 font-bold">per month</span>
                        </div>
                      </div>
                      <div
                        id="Plan"
                        class="relative rounded-xl flex flex-col h-full w-full p-6 px-10 gap-2 hover:text-blue-300 hover:opacity-60 cursor-pointer"
                      >
                        <div
                          class="font-semibold"
                          style={{ "font-size": "24px" }}
                        >
                          General
                        </div>
                        <div class="opacity-60">
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>Unlimited Todos</div>
                          </div>
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon> <div>Unlimited AI</div>
                          </div>
                        </div>
                        <div class="absolute bottom-2 gap-1 right-5 flex items-center">
                          <span
                            style={{ "font-size": "28px" }}
                            class="font-bold"
                          >
                            $100
                          </span>
                          <span class="opacity-60 font-bold">per Year</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-5">
                      <div
                        id="Plan"
                        class="relative rounded-xl flex flex-col h-full w-full p-6 px-10 gap-2 hover:text-blue-300 hover:opacity-60 cursor-pointer"
                      >
                        <div
                          class="font-semibold"
                          style={{ "font-size": "24px" }}
                        >
                          Premium
                        </div>
                        <div class="opacity-60">
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>Unlimited Todos</div>
                          </div>
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>1500 state of the art AI tasks</div>
                          </div>
                        </div>
                        <div class="absolute bottom-2 gap-1 right-5 flex items-center">
                          <span
                            style={{ "font-size": "28px" }}
                            class="font-bold"
                          >
                            $25
                          </span>
                          <span class="opacity-60 font-bold">per month</span>
                        </div>
                      </div>
                      <div
                        id="Plan"
                        class="relative rounded-xl flex flex-col h-full w-full p-6 px-10 gap-2 hover:text-blue-300 hover:opacity-60 cursor-pointer"
                      >
                        <div
                          class="font-semibold"
                          style={{ "font-size": "24px" }}
                        >
                          Premium
                        </div>
                        <div class="opacity-60">
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>Unlimited Todos</div>
                          </div>
                          <div class="flex items-center gap-1">
                            <Icon name="Circle"></Icon>{" "}
                            <div>1500 state of the art AI tasks</div>
                          </div>
                        </div>
                        <div class="absolute bottom-2 gap-1 right-5 flex items-center">
                          <span
                            style={{ "font-size": "28px" }}
                            class="font-bold"
                          >
                            $200
                          </span>
                          <span class="opacity-60 font-bold">per Year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Match>
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}
