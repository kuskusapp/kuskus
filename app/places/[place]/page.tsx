"use client"

import { ImageGrid } from "@/components/PostGrid"
import { useObservable } from "@legendapp/state/react"
import { useMemo, useState } from "react"
import { FaMapPin } from "react-icons/fa6"

export default async function ProfileRoute() {
	const [isPressed, setIsPressed] = useState(false)
	const [tags, setTags] = useState(["Coffee", "Breakfast", "Wifi", "Quiet"])

	return (
		<div className="flex flex-col md:flex-row">
			<div className="md:fixed relative top-0 left-0 md:w-[380px] w-full bg-secondary h-screen flex flex-col gap-[10px] px-3 py-5">
				<div className="bg-neutral-800 h-[380px] rounded-xl"></div>
				<div className="flex-col gap-2">
					<p className="text-[14px] text-white70">Type</p>
					<p className="text-[26px] text-white font-bold">Coffee LAB</p>
					<div className="flex gap-1">
						{tags.map((tag) => {
							return (
								<div className="px-2 rounded-full p-1 border border-white/20 w-fit text-[14px]">
									{tag}
								</div>
							)
						})}
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-white">Star</p>
						<p className="text-white">Price</p>
						<p className="text-white">Photos</p>
					</div>
				</div>
				<button
					style={{
						position: "absolute",
						bottom: "30px",
						left: "50%",
						transform: "translateX(-50%)",
						margin: "0 auto",
						backgroundColor: isPressed ? "#eec093" : "#e7cdaa",
						boxShadow: isPressed ? "none" : "inset 0 -3px 0px 0px #a97e2a",
						scale: isPressed ? 0.98 : 1,
						width: "95%",
					}}
					className="md:flex-center hidden text-black right-0  py-4 text-[16px] rounded-2xl bg-secondary focus:outline-none focus:ring"
				>
					<FaMapPin className="w-5 h-5" />
					Show on map
				</button>
			</div>
			<div className="h-full">
				<div className="md:ml-[380px] m-0 min-h-full flex">grid here</div>
			</div>
		</div>
	)
}
