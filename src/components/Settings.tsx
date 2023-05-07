import clsx from "clsx"
import { Match, Switch, createSignal, onMount } from "solid-js"
import { GoogleClient } from "~/lib/auth"
import Keybind from "./Keybind"
import { useGlobalContext } from "~/GlobalContext/store"

export default function Settings() {
  const global = useGlobalContext()
  const [show, setShow] = createSignal("Keyboard")

  return (
    <div class="flex h-full w-full">
      <div
        class="flex justify-between flex-col dark:bg-stone-950 bg-zinc-200"
        style={{ "border-radius": "0px 0px 0px 10px" }}
      >
        <div>
          <div class="p-2 pl-3 flex flex-col gap-1">
            <div
              class={clsx(
                "cursor-pointer",
                show() === "Preferences" && "font-bold"
              )}
              onClick={() => setShow("Preferences")}
            >
              Preferences
            </div>
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
          <Match when={show() === "Preferences"}>
            <div
              class="cursor-pointer"
              onClick={() => {
                global.settingsState.toggleHideActionBar()
              }}
            >
              Hide action bar
            </div>
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
            {/* TODO: load user into store, so no need to await here to get user details */}
            {/* TODO: be able to change or set username */}
            {/* and set profile picture */}
            {/* <div>Username: {}</div> */}
          </Match>
          <Match when={show() === "Help"}>
            <div>
              Ask questions on{" "}
              <a class="text-blue-500" href="https://discord.gg/f8YHjyrX3h">
                Discord
              </a>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
