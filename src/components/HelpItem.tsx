import Icon from "./Icon"

interface Props {
  problem: string
  keyboardInstruction: string
  mouseInstruction: string
}

export default function Instruction(props: Props) {
  return (
    <div
      id="singularhelp"
      class="flex"
      style={{
        "border-right": "solid 3px rgba(43, 43, 43, 0.5)",
      }}
    >
      <div
        id="titleOfHelp"
        class="flex gap-4 h-full justify-end items-center p-4 text-xl font-semibold text-end"
        style={{
          width: "20%",
          "border-right": "solid 3px rgba(43, 43, 43, 0.5)",
        }}
      >
        {props.problem}
      </div>{" "}
      <div class="text-sm grow h-full w-1/2">
        <div
          class="flex gap-3  h-full justify-between"
          style={{ "border-top": "solid 3px rgba(43, 43, 43, 0.5)" }}
        >
          <div
            id="keyboardtab"
            class="w-1/2 p-4 "
            style={{ "border-right": "solid 3px rgba(43, 43, 43, 0.5)" }}
          >
            <div class="flex items-center justify-center"></div>

            <div>{props.keyboardInstruction}</div>
          </div>
          <div class="w-1/2 rounded-lg p-2" id="mousetab">
            <div class="flex items-center justify-center"></div>
            <div>{props.mouseInstruction}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
