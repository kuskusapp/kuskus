import { useGlobalContext } from "~/GlobalContext/store"
import Icon from "./Icon"

export default function Modal() {
  const global = useGlobalContext()
  return (
    <div
      style={{
        "background-color": "#00000080",
        "backdrop-filter": "blur(2px)",
      }}
      class="fixed h-screen w-screen"
      onclick={() => global.setShowHelpModal(false)}
    >
      <div
        class="items-center h-full w-full flex justify-center"
        onclick={() => global.setShowHelpModal(true)}
      >
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
                onClick={() => global.setShowHelpModal(false)}
              >
                <Icon name="Cross" />
              </div>
            </nav>
            <div class="">words</div>
          </div>
        </div>
      </div>
    </div>
  )
}
