import { Match, Switch, createSignal, onMount } from "solid-js"

export default function Settings() {
  const [show, setShow] = createSignal("Keyboard")
  return (
    <div class="flex h-full">
      <div
        style={{ "border-radius": "0px 0px 0px 10px" }}
        class="p-2 h-full bg-stone-950"
      >
        <div class="cursor-pointer" onClick={() => setShow("Keyboard")}>
          Keyboard
        </div>
        <div class="cursor-pointer" onClick={() => setShow("Account")}>
          Account
        </div>
        <div class="cursor-pointer" onClick={() => setShow("About")}>
          About
        </div>
      </div>
      <div>
        <Switch>
          <Match when={show() === "Keyboard"}>
            <h1 class="text-lg bold mb-1">Keyboard shortcuts</h1>
            <div>n = create new todo</div>
            <div>return = edit todo</div>
            <div>f = search todos for current view (All/Today/Starred)</div>
          </Match>
          <Match when={show() === "Account"}>
            <h1 class="text-lg bold mb-1">Account</h1>
            {/* TODO: load user into store, so no need to  */}
            <div>Username: {}</div>
          </Match>
          <Match when={show() === "About"}>
            <h1 class="text-lg bold mb-1">About</h1>
            <div>Fast todo app with AI</div>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
