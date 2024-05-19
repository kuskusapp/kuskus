"use client"

import { GridIcon, PlusIcon, UserIcon } from "@/public/svg/search-icons"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {}
export default observer(function ActionBar(props: Props) {
	const local = useObservable({
		activeTab: "" as "Home" | "Profile",
	})
	return (
		<>
			<div
				style={{
					position: "fixed",
					top: 20,
					right: 20,
					width: "fit-content",
					zIndex: 50,
				}}
				className="flex flex-row gap-5 justify-center"
			>
				<div
					className="bg-secondary h-[50px] flex justify-center items-center space-x-3 rounded-full py-2 px-3"
					style={{
						marginLeft: "auto",
						justifyContent: "center",

						boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
					}}
				>
					<GridIcon className="text-primaryText w-7 h-7" />
					<UserIcon className="text-primaryText w-7 h-7" />
				</div>
				<button
					onClick={() => {
						// open new post
					}}
					style={{
						width: "50px",
						height: "50px",
						boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
					}}
					className="rounded-full bg-secondary items-center justify-center flex text-white focus:outline-none focus:ring"
				>
					<PlusIcon className="text-primaryText w-7 h-7" />
				</button>
			</div>
		</>
	)
})
