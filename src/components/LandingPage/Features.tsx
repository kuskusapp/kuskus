import clsx from "clsx"
import { Match, Switch, createSignal } from "solid-js"

export default function Features() {
  const [show, setShow] = createSignal("Features")
  return (
    <>
      <style>{`
        #Animation {
          animation: 1s linear 0s 1 slideInFromLeft;
        }
        @keyframes slideInFromLeft {
          0% {
              transform: translateX(-20px);
              opacity: 0;
          }
          100% {
              transform: translateX(0);
              opacity: 1;
          }
      }
      #Nav {
        padding: 10px 25px 10px 25px;
        border-radius: 25px;
        cursor: pointer;
      }
      #Nav:hover {
        background-color: rgba(38, 40, 60, 0.29);
        border: solid 1px rgba(111, 118, 156, 0.15)
        opacity: 0.6;
        transition: 0.3s;
      }
      #NavContainer {
        border-bottom: solid 1px rgba(38, 40, 60, 0.29)
      }
      `}</style>
      <div
        style={{
          "border-color": "rgba(7, 25, 61, 0.2)",
          "background-color": "rgba(1, 1, 4, 0.4)",
        }}
        class=" h-screen lg:border-l-4 text-white"
      >
        <div id="NavContainer" class="flex justify-between px-40 p-5">
          <div
            onClick={() => setShow("Features")}
            class={clsx(
              show() === "Features" && "font-bold text-blue-400 opacity-90"
            )}
            id="Nav"
          >
            Features
          </div>
          {/* <div
            onClick={() => setShow("Updates")}
            class={clsx(show() === "Updates" && "font-bold")}
            id="Nav"
          >
            Updates
          </div> */}
          <div
            onClick={() => setShow("Future")}
            class={clsx(show() === "Future" && "font-bold")}
            id="Nav"
          >
            Future
          </div>
          {/* <div
            onClick={() => setShow("Join")}
            class={clsx(show() === "Join" && "font-bold")}
            id="Nav"
          >
            Join
          </div> */}
        </div>
        <div class="flex flex-col pl-16 pt-20 gap-6">
          <Switch>
            <Match when={show() === "Pricing"}>
              <div></div>
            </Match>
            <Match when={show() === "Features"}>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  AI
                </h1>
                <div>
                  Create a task. AI will create subtasks for you. You pick
                  what's good.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  <span class="text-white">Keyboard</span> Shortcuts
                </h1>
                <div class="text-white">
                  Everything is fully keyboard driven. Fully modal. Can use
                  mouse too if you like.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Fast
                </h1>
                <div class="text-white">
                  Instant UI updates. No loading screens. No waiting.
                </div>
              </div>
            </Match>
            {/* <Match when={show() === "Updates"}>
              <div></div>
            </Match> */}
            {/* TODO: fix UI! not good */}
            <Match when={show() === "Future"}>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Mobile apps
                </h1>
                <div>Native iOS/Android apps. Fast and sleek.</div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  GitHub issues <span class="text-white">integrated</span>
                </h1>
                <div>
                  Similar to now dead app{" "}
                  <a
                    class="text-blue-500"
                    href="https://www.realartists.com/blog/ship-20.html"
                  >
                    Ship
                  </a>
                  . Like{" "}
                  <a class="text-blue-500" href="https://linear.app">
                    Linear
                  </a>{" "}
                  or{" "}
                  <a class="text-blue-500" href="https://height.app">
                    Height
                  </a>{" "}
                  but on top of GitHub issues.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Editor <span class="text-white">embedded</span>
                </h1>
                <div>
                  Write free form. Make plans. Easily create tasks from text.
                  Like in{" "}
                  <a class="text-blue-500" href="https://obsidian.md/">
                    Obsidian
                  </a>
                  .
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Clean Design
                </h1>
                <div>
                  Current UI is utility focused. Future UI will delight.{" "}
                  <a
                    class="text-blue-500"
                    href="https://culturedcode.com/things/"
                  >
                    Things
                  </a>{" "}
                  is big inspiration.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Collaboration
                </h1>
                <div>
                  Collaborate on tasks with your team/spouse/anyone. In real
                  time.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  AI Agents
                </h1>
                <div>Create AI agents to do things for you.</div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  Custom AI
                </h1>
                <div>
                  You have full control over AI. Write a plugin, bind it to a
                  key. Use it.
                </div>
              </div>
            </Match>
            <Match when={show() === "Join"}>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  <span class="text-white">Join</span> community
                </h1>
                <div>
                  Join{" "}
                  <a class="text-blue-500" href="https://discord.gg/f8YHjyrX3h">
                    Discord
                  </a>{" "}
                  and share your thoughts and ideas on how you use KusKus app.
                  Or what kinds of things you wish it did.
                </div>
              </div>
              <div>
                <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
                  <span class="text-white">Join</span> our team
                </h1>
                <div class="">
                  KusKus app is built fully with{" "}
                  <a class="text-blue-500" href="https://www.solidjs.com/">
                    Solid
                  </a>{" "}
                  (UI),{" "}
                  <a class="text-blue-500" href="https://grafbase.com">
                    Grafbase
                  </a>{" "}
                  (DB, edge logic) and{" "}
                  <a class="text-blue-500" href="https://tauri.app/">
                    Tauri
                  </a>{" "}
                  (desktop apps).
                </div>
                <div>
                  We need anyone that is great at building products. Designers
                  especially. If you're interested, message us on{" "}
                  <a class="text-blue-500" href="https://discord.gg/f8YHjyrX3h">
                    Discord
                  </a>
                  .
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  )
}
