"use client"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
	authenticated: boolean
}
export default observer(function Settings(props: Props) {
	const local = useObservable({
		settings: [
			"Edit Profile",
			// "Preference",
			// "Notifications",
			// "Sign Out",
			// "Delete Account",
		],
		selectedSetting: "Edit Profile",
	})
	const router = useRouter()

	// TODO: route in RSC?
	useEffect(() => {
		if (!props.authenticated) router.push("/")
	}, [])

	return (
		<div className="w-screen flex z-30 h-screen bg-primary rounded-[20px] overflow-hidden">
			<div className="border-r border-black/20 h-full w-1/2">
				<div className="h-[80px] p-5 pb-4 text-[20px] font-semibold flex items-end border-b border-black/20">
					Settings
				</div>
				<div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden">
					{local.settings.get().map((element, index) => {
						return (
							<div
								onClick={() => {
									local.selectedSetting.set(local.settings[index])
								}}
								className={`p-2 px-5 border-b border-white/10 flex justify-between items-center ${
									local.selectedSetting.get() === element ? "bg-white/10" : ""
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
					<div className="text-[20px] font-semibold">
						{local.selectedSetting.get()}
					</div>
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
						}[local.selectedSetting.get()]
					}
				</div>
			</div>
		</div>
	)
})

function EditProfile() {
	const [username, setUsername] = useState("")
	const [isTouched, setIsTouched] = useState(false)
	const handleBlur = () => {
		setIsTouched(true)
	}

	const handleChange = (e) => {
		setUsername(e.target.value)
	}

	return (
		<div className="flex flex-col gap-[12px]">
			<div className="w-full bg-neutral-800 h-[400px] relative">
				<button className="absolute bottom-2 left-2 rounded-full w-[50px] h-[50px] bg-neutral-700 bg-opacity-70 hover:bg-opacity-90 flex items-center justify-center">
					Edit
				</button>
			</div>
			<div className="w-full">
				<div className="font-light mb-[6px] text-white/50 px-4 text-[12px]">
					Display Name
				</div>
				<input
					type="text"
					placeholder="Your name..."
					className="font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full"
				/>
			</div>
			<div className="w-full">
				<div className="flex gap-1">
					<div className="font-light mb-[6px]  px-4 text-[12px]">
						Username *
					</div>
					{isTouched && !username ? (
						<div className="text-red-500 text-[12px]">Username Required</div>
					) : null}
				</div>
				<input
					type="text"
					placeholder="Your username..."
					className={`font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full ${isTouched && !username ? "border-red-500" : ""}`}
					value={username}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
		</div>
	)
}

function Preference() {
	return <div>comming soon</div>
}

function Notifications() {
	return <div>comming soon</div>
}

function SignOut() {
	return <div>comming soon</div>
}

function DeleteAccount() {
	return <div>comming soon</div>
}
