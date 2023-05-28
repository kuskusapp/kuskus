import { Motion } from "@motionone/solid"
import { useTodoList } from "~/GlobalContext/todo-list"

interface Props {
  explanation: string
}

export default function ExplainedTodo(props: Props) {
  const todoList = useTodoList()

  return (
    <Motion.div
      id="todoExplanation"
      initial={{ transform: "translateX(20px)", opacity: 0 }}
      animate={{ transform: "translateX(0px)", opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ width: "0px" }}
      style={{
        width: "40%",
      }}
      class="flex flex-col items-center h-full overflow-hidden"
    >
      <Motion.div
        initial={{ "font-size": "0px" }}
        animate={{ "font-size": "18px" }}
        transition={{ duration: 0 }}
        // TODO: improve the animation on showing the text, text appears squished..
        exit={{ display: "none" }}
        class="bg-gray-100 dark:bg-neutral-900 w-full p-3 text-lg text-center"
      >
        {/* TODO: fix this ts-ignore as well as all others.. */}
        Explanation for {/* @ts-ignore */}
        {todoList.focusedTodo()!.title}
      </Motion.div>
      <div class="h-full bg-gray-100 dark:bg-neutral-900 overflow-scroll w-full">
        <div
          class="flex flex-col h-full overflow-scroll px-5 opacity-90 text-sm items-center jusitfy-center"
          style={{ "border-radius": "10px" }}
        >
          {props.explanation}
        </div>
      </div>
    </Motion.div>
  )
}
