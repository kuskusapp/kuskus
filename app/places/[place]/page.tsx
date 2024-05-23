"use client"

import { ImageGrid } from "@/components/PostGrid"
import { useObservable } from "@legendapp/state/react"
import { useMemo, useState } from "react"

export default async function ProfileRoute() {
	const [tags, setTags] = useState(["Coffee", "Breakfast", "Wifi", "Quiet"])
	return (
		<div className="flex flex-col md:flex-row">
			<div className="md:fixed relative top-0 left-0 md:w-[380px] w-full bg-secondary h-screen flex flex-col gap-[10px] p-3">
				<div className="bg-neutral-800 h-[380px] rounded-lg"></div>
				<div className="flex-col gap-2">
					<div className="text-[14px] text-white/70">Type</div>
					<div className="text-[26px] font-bold">Coffee LAB</div>
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
						<div>Star</div>
						<div>Price</div>
						<div>Photos</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 w-full p-3">
					<div className="bg-orange-200 text-black h-[50px] border-b-2 border-yellow-700 rounded-lg flex-center text-[18px]">
						Show on map
					</div>
				</div>
			</div>
			<div className="h-full">
				<div className="md:ml-[380px] m-0 min-h-full flex">grid here</div>
			</div>
		</div>
	)
}
