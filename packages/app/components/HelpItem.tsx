import Icon from "./Icon"

interface Props {
  problem: string
  keyboardInstruction: string
  mouseInstruction: string
}

export default function Instruction(props: Props) {
  return (
    <div id="singularhelp" class="flex flex-col gap-2 p-2">
      <div
        id="titleOfHelp"
        class="flex justify-center gap-4 items-center text-xl font-semibold"
      >
        {props.problem}
      </div>{" "}
      <div class="text-sm ">
        <div class="flex mx-5 gap-4 justify-between">
          <div
            id="keyboardtab"
            class="w-1/2 rounded-lg p-2"
            style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
          >
            <div class="flex items-center justify-center">
              <Icon name={"Keyboard"} />
            </div>

            <div>{props.keyboardInstruction}</div>
          </div>
          <div
            class="w-1/2 rounded-lg p-2"
            id="mousetab"
            style={{ border: "solid 1px rgba(80,80,80,0.7)" }}
          >
            <div class="flex items-center justify-center">
              <Icon name="Cursor" />
            </div>
            <div>{props.mouseInstruction}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
