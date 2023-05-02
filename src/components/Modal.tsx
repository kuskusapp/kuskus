import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"
import { createEventListener } from "@solid-primitives/event-listener"
import type { JSX } from "solid-js"

// TODO: should contain JSX passed in
// find a type for JSX.element..
interface Props {
  children: JSX.Element
}

export default function Modal(props: Props) {
  const global = useGlobalContext()

  let ref!: HTMLDivElement
  createEventListener(
    () => ref,
    "click",
    (e) => {
      if (e.target === ref) {
        global.setShowHelp(false)
        global.setShowSettings(false)
        global.setNewTodo(false)
      }
    },
    { passive: true }
  )

  return (
    <div
      style={{
        "background-color": "#00000080",
        "backdrop-filter": "blur(2px)",
      }}
      class="fixed h-screen w-screen"
    >
      <div class="items-center h-full w-full flex justify-center" ref={ref}>
        <div
          style={{
            "border-radius": "10px",
          }}
          class="bg-white h-1/2 flex w-1/2"
        >
          <div class="w-full">
            <nav
              style={{
                "border-radius": "10px 10px 0 0",
              }}
              class="flex items-end justify-end pr-3 pb-1 pt-3"
            >
              <div
                class="cursor-pointer"
                onClick={() => global.setShowHelp(false)}
              >
                <Icon name="Cross" />
              </div>
            </nav>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
