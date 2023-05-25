import Icon from "./Icon"

interface Props {
  problem: string
  keyboardInstruction: string
  mouseInstruction: string
}

export default function Instruction(props: Props) {
  return (
    <>
      <style>
        {`
        #titleOfHelp{
          border-right: solid 3px rgba(200, 200, 200, 0.5)
        }
        #keyboardtab {
          border-right: solid 3px rgba(200, 200, 200, 0.5)
        }
        #helpitem {
          border-top: solid 3px rgba(200,200,200, 0.5)
        }
        @media (prefers-color-scheme: dark) {
          #titleOfHelp {
            border-right: solid 3px rgba(43, 43, 43, 0.5)
          }
          #keyboardtab {
            border-right: solid 3px rgba(43, 43, 43, 0.5)
          }
          #helpitem {
            border-top: solid 3px rgba(43, 43, 43, 0.5)
          }
        }
      `}
      </style>
      <div id="singularhelp" class="flex h-full">
        <div
          id="titleOfHelp"
          class="flex  gap-4 h-full justify-end items-center p-4 text-xl font-semibold text-end"
          style={{
            width: "20%",
          }}
        >
          {props.problem}
        </div>
        <div class="text-sm grow h-full w-1/2">
          <div class="flex gap-3 justify-between h-full" id="helpitem">
            <div id="keyboardtab" class="w-1/2 p-4 h-full ">
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
    </>
  )
}
