"use client"
import { useState } from "react"
import { PencilIcon, ArrowIcon } from "../public/svg/modal-icons"
interface Props {
  setShowSettingsModal: (value: boolean) => void
}

export default function NewModal(props: Props) {
  const [settings, setSettings] = useState([
    "Edit Profile",
    "Preference",
    "Notifications",
    "Sign Out",
    "Delete Account",
  ])
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
          <div className="h-[80px] p-5 pb-4 text-[20px] font-semibold flex items-end border-b border-black/20">
            Settings
          </div>
          <div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden">
            {settings.map((element, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedSetting(settings[index])
                  }}
                  className={`p-2 px-5 border-b border-black/20 flex justify-between items-center ${
                    selectedSetting === element ? "bg-gray-100" : ""
                  }`}
                >
                  {element}
                  <ArrowIcon className="color-black w-7 h-7" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="h-full w-1/2">
          <div className="h-[80px] p-5 pb-4 justify-between flex items-end border-b border-black/20">
            <div className="text-[20px] font-semibold">{selectedSetting}</div>
            <button className="bg-black rounded-full h-[34px] flex items-center px-4 py-2 font-semibold text-[12px] text-white hover:text-gray-200 hover:bg-neutral-800">
              Save
            </button>
          </div>

          <div className="overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden cursor-pointer">
            {
              {
                "Edit Profile": <EditProfile />,
                Preference: <Preference />,
                Notifications: <Notifications />,

                "Sign Out": <SignOut />,
                "Delete Account": <DeleteAccount />,
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
    <div className="flex flex-col gap-[12px]">
      <div className="w-full bg-gray-200 h-[400px] relative">
        <button className="absolute bottom-2 left-2 rounded-full w-[50px] h-[50px] bg-neutral-100 bg-opacity-70 hover:bg-opacity-90 flex items-center justify-center">
          <PencilIcon className="w-6 h-6 text-neutral-700 opacity-50 hover:opacity-90" />
        </button>
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[12px]">
          NAME
        </div>
        <input
          type="text"
          placeholder="Your name..."
          className="font-thin text-xs outline-none bg-transparent border-x-0 border-black/20 w-full"
        />
      </div>
      <div className="w-full ">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[12px]">
          USERNAME
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="font-thin text-xs outline-none bg-transparent border-x-0 border-black/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[3px] text-black/50 px-4 text-[12px]">
          WTF
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[12px]">
          WTF
        </div>
        <input
          type="text"
          placeholder="Your username..."
          className="outline-none bg-transparent border-x-0 border-white/20 w-full"
        />
      </div>
      <div className="w-full">
        <div className="font-light mb-[6px] text-black/50 px-4 text-[12px]">
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
  return <div>nothing here yet</div>
}

function Notifications() {
  return <div>nothing here yet</div>
}

function SignOut() {
  return <div>nothing here yet</div>
}

function DeleteAccount() {
  return <div>nothing here yet</div>
}
