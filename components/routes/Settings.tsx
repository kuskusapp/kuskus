"use client"
import { updateUserProfileAction } from "@/app/actions"
import { updateUser } from "@/edgedb/crud/mutations"
import { settingsAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// TODO: add more settings, logout, ..
interface Props {
	authenticated: boolean
	authData?: settingsAuthReturn
}
export default observer(function Settings(props: Props) {
	const local = useObservable({
		username: props.authData?.name || "",
		displayName: props.authData?.displayName || "",
		touched: false,
	})
	const router = useRouter()

	const handleBlur = () => {
		local.touched.set(true)
	}

	useEffect(() => {
		if (!props.authenticated) router.push("/")
	}, [])

	return (
		<div className="w-screen flex z-30 h-screen bg-primary rounded-[20px] overflow-hidden">
			<div className="border-r border-black/20 h-full w-1/2">
				<div className="h-[80px] p-5 pb-4 text-[20px] font-semibold flex items-end border-b border-black/20">
					Settings
				</div>
				<div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden"></div>
			</div>
			<div className="h-full w-1/2">
				<div className="h-[80px] p-5 pb-4 justify-between flex items-end border-b border-black/20">
					<div className="text-[20px] font-semibold"></div>
					<button
						disabled={!local.username.get()}
						className={`bg-black rounded-full h-[34px] flex items-center px-4 py-2 font-semibold text-[12px] text-white ${local.username.get() ? "hover:text-gray-200 hover:bg-neutral-800" : "bg-gray-500 cursor-not-allowed"}`}
						onClick={async () => {
							const res = await updateUserProfileAction({
								username: local.username.get(),
								displayName: local.displayName.get(),
							})
							if (!res.serverError) {
								router.push("/")
							} else {
								console.log(res.serverError, "server err")
							}
						}}
					>
						Save
					</button>
				</div>

				<div className="overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden cursor-pointer">
					<div className="flex flex-col gap-[12px] mt-2">
						<div className="w-full">
							<div className="flex gap-1">
								{!local.username.get() && (
									<div className="text-red-500 text-[12px] p-1">
										Username Required
									</div>
								)}
								{local.username.get() && (
									<div className="text-[12px] p-1">Username</div>
								)}
							</div>
							<input
								type="text"
								placeholder="Your username..."
								className={`font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full ${local.touched.get() && !local.username.get() ? "border-red-500" : ""}`}
								value={local.username.get()}
								onChange={(e) => {
									local.username.set(e.target.value)
								}}
								onBlur={handleBlur}
							/>
						</div>
						<div className="w-full">
							<div className="font-light mb-[6px] text-white/50 px-4 text-[12px]">
								Display Name
							</div>
							<input
								type="text"
								value={local.displayName.get()}
								placeholder="Your name..."
								onChange={(e) => {
									local.displayName.set(e.target.value)
								}}
								className="font-thin text-xs outline-none bg-transparent border-x-0 border-white/20 w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})
