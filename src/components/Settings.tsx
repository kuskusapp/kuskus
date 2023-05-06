import clsx from "clsx"
import { Match, Switch, createSignal } from "solid-js"
import { GoogleClient } from "~/lib/auth"
import Keybind from "./Keybind"

export default function Settings() {
  const [show, setShow] = createSignal("Keyboard")
  return (
    <div class="flex h-full w-full">
      <div
        class="flex justify-between flex-col dark:bg-stone-950 bg-zinc-200"
        style={{ "border-radius": "0px 0px 0px 10px" }}
      >
        <div>
          <div class="p-2 pl-3">
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
              class={clsx("cursor-pointer", show() === "About" && "font-bold")}
              onClick={() => setShow("About")}
            >
              About
            </div>
          </div>
        </div>
        <div
          class="flex cursor-pointer pl-3 pb-2"
          onClick={() => {
            GoogleClient.signoutRedirect({
              post_logout_redirect_uri: import.meta.env
                .VITE_GOOGLE_LOGOUT_REDIRECT_URI,
            })
          }}
        >
          Sign out
        </div>
      </div>
      <div class="p-4 h-full w-full">
        <Switch>
          <Match when={show() === "Keyboard"}>
            <div class="h-full">
              <div class="h-full w-full overflow-scroll">
                <h1 class="bg-neutral-300 font-semibold p-1">
                  General keybinds
                </h1>
                <Keybind action="Create new todo" keybind="n" />
                <Keybind action="Edit todo" keybind="return" />
                <Keybind
                  action="Search todos for current view (All/Today/Starred)"
                  keybind="f"
                />
                <Keybind action="Delete todo" keybind="Backspace" />
                <Keybind action="Create subtasks from a task" keybind="a" />
                <Keybind action="Focus on task below" keybind="Down arrow" />
                <Keybind action="Change to All" keybind="Control + 1" />
                <Keybind action="Change to Today" keybind="Control + 2" />
                <Keybind action="Change to Starred" keybind="Control + 3" />
                <Keybind action="Change to Done" keybind="Control + 4" />
                <h1 class="bg-neutral-300 font-semibold p-1">
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
            {/* TODO: load user into store, so no need to  */}
            <div>Username: {}</div>
          </Match>
          <Match when={show() === "About"}>
            <div>Fast todo app with AI</div>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
