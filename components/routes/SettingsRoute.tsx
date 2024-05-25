"use client"
import {
	updateUserProfileAction,
	updateUserProfileImageAction,
} from "@/app/actions"
import Loader from "@/components/Loader"
import { settingsAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// TODO: add more settings, logout, ..
interface Props {
	authenticated: boolean
	authData?: settingsAuthReturn
}
export default observer(function SettingsRoute(props: Props) {
	const local = useObservable({
		profilePhotoUrl: props.authData?.profilePhotoUrl || "",
		username: props.authData?.name || "",
		displayName: props.authData?.displayName || "",
		touched: false,
		savingProfile: false,
		uploadedProfileImageAsFile: null as File | null,
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
				<div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden">
					<div
						className={`p-2 px-5 border-b border-white/10 flex justify-between items-center bg-white/10`}
					>
						Edit Profile
					</div>
				</div>
				<div className="flex flex-col overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden"></div>
			</div>
			<div className="h-full w-1/2">
				<div className="h-[80px] p-5 pb-4 justify-between flex items-end border-b border-black/20">
					<div className="text-[20px] font-semibold"></div>
					{local.savingProfile.get() && <Loader />}
					{!local.savingProfile.get() && (
						<button
							disabled={!local.username.get()}
							className={`bg-black rounded-full h-[34px] flex items-center px-4 py-2 font-semibold text-[12px] text-white ${local.username.get() ? "hover:text-gray-200 hover:bg-neutral-800" : "bg-gray-500 cursor-not-allowed"}`}
							onClick={async () => {
								local.savingProfile.set(true)
								const res = await updateUserProfileAction({
									username: local.username.get(),
									displayName: local.displayName.get(),
								})
								if (!res.serverError) {
									router.push("/")
								} else {
									console.log(res.serverError, "server err")
									local.savingProfile.set(false)
								}
							}}
						>
							Save
						</button>
					)}
				</div>

				<div className="overflow-auto max-h-[calc(100%-80px)] [&::-webkit-scrollbar]:hidden cursor-pointer">
					<div className="flex flex-col gap-[12px]">
						<div className="w-full">
							<div className="w-full bg-neutral-800 h-[400px] relative">
								{local.uploadedProfileImageAsFile.get() && (
									<img
										src={URL.createObjectURL(
											// @ts-ignore
											local.uploadedProfileImageAsFile.get(),
										)}
										className="max-w-full max-h-full"
									/>
								)}
								{local.profilePhotoUrl.get() && (
									<img
										src={local.profilePhotoUrl.get()}
										className="max-w-full max-h-full"
									/>
								)}
								<input
									type="file"
									id="profilePhotoUpload"
									style={{ display: "none" }}
									onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
										if (e.target.files && e.target.files[0]) {
											try {
												const uploadedFile = e.target.files[0]
												local.uploadedProfileImageAsFile.set(uploadedFile)
												const data = new FormData()
												data.append("profileImage", uploadedFile)
												let res = await updateUserProfileImageAction({
													profileImage: data,
												})
												console.log(res, "res")
												console.log(res.serverError, "server error")
											} catch (err) {
												console.log(err)
											}
										}
									}}
								/>
								<button
									onClick={() =>
										document.getElementById("profilePhotoUpload").click()
									}
									className="absolute bottom-2 left-2 rounded-full w-[70px] h-[70px] bg-neutral-700 bg-opacity-70 hover:bg-opacity-90 flex items-center justify-center"
								>
									{local.profilePhotoUrl.get() ? "Change" : "Add"}
								</button>
							</div>
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
