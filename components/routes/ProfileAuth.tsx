"use client"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
  data: profileAuthReturn
}

export default observer(function ProfileAuth(props: Props) {
  const server$ = useObservable(props.data)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // const local$ = useObservable({
  //   following: false,
  //   tabs: ["Photos", "Places", "Lists", "Following", "Followers"],
  //   selectedTab: "Photos",
  //   postsState: { liked: true, fillColor: "", likesCount: 0 },
  // })
  const [images, setImages] = useState([
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
  ])

  return (
    <div className="min-h-screen h-full text-black/60">
      <Sidebar />
      <div className="ml-[380px] h-full pl-[6px] grid grid-cols-2 gap-[6px]">
        {images.map((e, index) => {
          return (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1 bg-gray-200"
              style={{ paddingBottom: "70%" }}
            >
              {e}
            </div>
          )
        })}
      </div>
    </div>
  )
})

function Sidebar() {
  const [hoveredSidebarTab, setHoveredSidebarTab] = useState("Following")
  return (
    <div className="fixed left-0 w-[380px] top-0 h-screen bg-gray-200">
      <div className="w-full h-3/5 bg-gray-300">Profile</div>
      <div className="p-[24px] pt-[34px] flex flex-col justify-between h-2/5">
        <div className="flex flex-col gap-[2px]">
          <div className="text-[30px] font-bold">Molly</div>
          <div>@molly - she/her</div>
          <div>description</div>
        </div>
        <div className="flex gap-[10px] mt-[20px] self-center z-10 [&>*]:z-[30] [&>*]:rounded-[8px] [&>*]:w-[95px] [&>*]:flex [&>*]:justify-center [&>*]:p-1">
          <motion.div className="hover:bg-zinc-300">Photos</motion.div>
          <motion.div className="hover:bg-zinc-300">Following</motion.div>
          <motion.div className="hover:bg-zinc-300">Followers</motion.div>
        </div>
      </div>
    </div>
  )
}
