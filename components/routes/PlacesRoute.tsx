"use client"
import { placesPublicReturn } from "@/edgedb/crud/queries"
import { Logo } from "@/public/svg/kuskus-logo"
import { HeartIcon } from "@heroicons/react/24/outline"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FaMapPin } from "react-icons/fa6"

interface Props {
	authenticated: boolean
	publicData: placesPublicReturn
}
export default observer(function PlacesRoute(props: Props) {
	const auth = props.authenticated
	const local = useObservable({
		...props.publicData,
		tags: [] as string[],
	})

	const router = useRouter()
	useEffect(() => {
		// if (props.publicData.length === 0) {
		// 	router.push("/")
		// }
	})
	return (
		<div className="flex flex-col md:flex-row ">
			<div
				style={{ backgroundColor: "#202020" }}
				className=" md:fixed relative top-0 left-0 md:w-[380px] w-full bg-secondary h-screen flex flex-col gap-[10px] px-3 py-5"
			>
				<Logo className="mb-3 w-[145px] h-[40px]" />
				{/* <div className="bg-neutral-600 h-[380px] rounded-xl"></div> */}
				<img
					// @ts-ignore
					src={local.profileImageUrl.get()}
					className="h-[380px] rounded-xl"
				></img>
				<div className="flex-col gap-2">
					<p className="text-[14px] text-white70"></p>
					<div className="flex flex-row justify-between">
						<p className="text-[26px] text-white font-bold">
							{/* @ts-ignore */}
							{local.displayName.get()}
						</p>
						<HeartIcon className="w-7 h-7" />
					</div>

					<div className="flex gap-1">
						{local.tags.get().map((tag) => {
							return (
								<p className="px-2 rounded-full p-1 border border-white/20 w-fit text-[14px]">
									{tag}
								</p>
							)
						})}
					</div>
					<div className="flex flex-col gap-3 py-5">
						{/* TODO: get from DB */}
						<p className="text-white">✨ Liked by 10 users</p>
						{/* <p className="text-white">💰 Price</p>
						<p className="text-white">📸 Photos</p> */}
					</div>
				</div>
				<button
					style={{
						position: "absolute",
						bottom: "30px",
						left: "50%",
						transform: "translateX(-50%)",
						margin: "0 auto",
						width: "95%",
					}}
					className="md:flex-center hidden text-black hover:bg-[#d0b088] bg-[#eec093] right-0  py-4 text-[16px] rounded-2xl bg-secondary focus:outline-none focus:ring"
					onClick={() => {
						// @ts-ignore
						window.open(local.googleMapsUrl.get())
					}}
				>
					<FaMapPin className="w-5 h-5" />
					Show on map
				</button>
			</div>
			<div className="h-full">
				<div className="md:ml-[380px] m-0 min-h-full flex"></div>
			</div>
		</div>
	)
})
