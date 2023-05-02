import { createSignal } from "solid-js"
import { Checkbox } from "solid-headless"

export default function Switch() {
  const [check, setCheck] = createSignal(false)
  return (
    <>
      <Checkbox checked={false} />
      {/* <div
        class="bg-white relative h-6 w-12 border-2 border-black transition-all"
        style={{ "border-radius": "50px" }}
        onclick={() => {
          setCheck(!check())
        }}
      >
        <div
          style={{ "border-radius": "100px" }}
          class="absolute top-0 right-0 h-5 w-5 bg-red-200"
        ></div>
      </div> */}
    </>
  )
}
