"use client"
import { useState } from "react"

export default function setup() {
	const [settings, setSettings] = useState([
		"Edit Profile",
		"Preference",
		"Notifications",
		"Sign Out",
		"Delete Account",
	])
	const [selectedSetting, setSelectedSetting] = useState(settings[0])
	return (
		<div className="w-screen flex z-30 h-screen bg-primary rounded-[20px] overflow-hidden">
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
								className={`p-2 px-5 border-b border-white/10 flex justify-between items-center ${
									selectedSetting === element ? "bg-white/10" : ""
								}`}
							>
								{element}
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
	)
}
function EditProfile() {
	return (
		<div className="flex flex-col gap-[12px]">
			<div className="w-full bg-neutral-800 h-[400px] relative">
				<button className="absolute bottom-2 left-2 rounded-full w-[50px] h-[50px] bg-neutral-700 bg-opacity-70 hover:bg-opacity-90 flex items-center justify-center">
					Edit
				</button>
			</div>
			<div className="w-full">
				<div className="font-light mb-[6px] text-white/50 px-4 text-[12px]">
					NAME
				</div>
				<input
					type="text"
					placeholder="Your name..."
					className="font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full"
				/>
			</div>
			<div className="w-full ">
				<div className="font-light mb-[6px]  px-4 text-[12px]">USERNAME</div>
				<input
					type="text"
					placeholder="Your username..."
					className="font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full"
				/>
			</div>
			<div className="w-full">
				<div className="font-light mb-[3px] text-white/50 px-4 text-[12px]">
					WTF
				</div>
				<input
					type="text"
					placeholder="Your username..."
					className="outline-none bg-transparent border-x-0 border-white/20 w-full"
				/>
			</div>
			<div className="w-full">
				<div className="font-light mb-[6px] text-white/50 px-4 text-[12px]">
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
