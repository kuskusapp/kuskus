import { useUserDetails } from "~/GlobalContext/userDetails"
import Icon from "./Icon"

interface Props {
  title: string
}

export default function TopBar(props: Props) {
  // const userDetails = useUserDetails()

  return (
    <>
      <div
        class="p-3 flex gap-2 bg-neutral-900 items-center"
        style={{ "border-radius": "10px" }}
      >
        <div
          class="cursor-pointer"
          onClick={() => {
            // userDetails.setCollapsedSidebar()
          }}
        >
          <Icon name="Sidebar" />
        </div>
        <h1 class="font-bold text-lg">{props.title}</h1>
      </div>
    </>
  )
}
