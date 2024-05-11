"use client"

import { useState } from "react"

interface Props {
  setShowSettingsModal: (value: boolean) => void
}

export default function NewModal(props: Props) {
  const [settings, setSettings] = useState(["Edit Profile", "Preference"])
  const [selectedSetting, setSelectedSetting] = useState(settings[0])
  return (
    <div className="fixed z-10 top-0 left-0 w-screen text-black bg-black bg-opacity-45 h-screen flex items-center justify-center ">
      <div
        onClick={() => {
          props.setShowSettingsModal(false)
        }}
        className="absolute top-0 z-20 left-0 w-full h-full backdrop-blur-[2px] "
      ></div>
      <div className="w-[720px] flex z-30 h-[600px] bg-white rounded-[20px] overflow-hidden">
        <div className="border-r border-black/20 h-full w-1/2">
          <div className="h-[80px] p-5 pb-4 text-[24px] font-bold flex items-end border-b border-black/20">
            Settings
          </div>
          <div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden">
            {settings.map((element, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedSetting(settings[index])
                  }}
                  className="p-2 px-5 border-b border-black/20"
                >
                  {element}
                </div>
              )
            })}
          </div>
        </div>
        <div className="h-full w-1/2">
          <div className="h-[80px] p-5 pb-4 justify-between flex items-end border-b border-black/20">
            <div className="text-[24px] font-bold">{selectedSetting}</div>
            <div className="bg-white rounded-full h-[34px] flex items-center px-5 font-bold text-[14px] text-black">
              Save
            </div>
          </div>

          <div className="overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden">
            {
              {
                "Edit Profile": <EditProfile />,
                Preference: <Preference />,
              }[selectedSetting]
            }
          </div>
        </div>
      </div>
    </div>
  )
}
function EditProfile() {
  return (
    <div className="flex flex-col gap-[20px] ">
      <div className="w-full bg-gray-200 h-[400px] relative">
        <div className="absolute bottom-2 left-2 rounded-full w-[50px] h-[50px] bg-neutral-900"></div>
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[14px]">
          NAME
        </div>
        <input
          type="text"
          placeholder="Your name..."
          className="outline-none bg-transparent border-x-0 border-black/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[14px]">
          USERNAME
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[14px]">
          WTF
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[14px]">
          WTF
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[14px]">
          ????
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
    </div>
  )
}
function Preference() {
  return <div>nothing here yet C:</div>
}
