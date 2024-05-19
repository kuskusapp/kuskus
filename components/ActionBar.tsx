"use client"

import { GridIcon, PlusIcon, UserIcon } from "@/public/svg/search-icons"
import { observer, useObservable } from "@legendapp/state/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Props {
	activeTab: "Home" | "Profile" | "None"
	activateAddPost: () => void
	username: string
}
export default observer(function ActionBar(props: Props) {
	const local = useObservable({
		...props,
	})
	const router = useRouter()

	return (
		<>
			<motion.div
				style={{
					position: "fixed",
					top: 20,
					right: 20,
					width: "fit-content",
					zIndex: 50,
				}}
				className="flex flex-row gap-5 justify-center cursor-pointer"
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onHoverStart={(e) => {}}
					onHoverEnd={(e) => {}}
					transition={{
						easings: "ease-out",
						duration: 0.2,
					}}
					className="bg-secondary h-[50px] flex justify-center items-center space-x-3 rounded-full py-2 px-5"
					style={{
						marginLeft: "auto",
						justifyContent: "center",

						boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
					}}
				>
					<div
						onClick={() => {
							router.push("/")
						}}
					>
						<GridIcon
							className={
								local.activeTab.get() === "Home"
									? "text-primaryText w-7 h-7 hover:scale-[1.1] font-bold fill-white transition-all "
									: "text-primaryText w-7 h-7 hover:scale-[1.1] transition-all "
							}
						/>
					</div>
					<div
						onClick={() => {
							router.push(`/${local.username.get()}`)
						}}
					>
						<UserIcon
							className={
								local.activeTab.get() === "Profile"
									? "text-primaryText w-7 h-7 hover:scale-[1.1] font-bold fill-white transition-all"
									: "text-primaryText w-7 h-7 hover:scale-[1.1] transition-all"
							}
						/>
					</div>
				</motion.div>
				<motion.button
					whileHover={{ scale: 1.1 }}
					onHoverStart={(e) => {}}
					onHoverEnd={(e) => {}}
					transition={{
						easings: "ease-out",
						duration: 0.2,
					}}
					onClick={() => {
						local.activateAddPost()
					}}
					style={{
						width: "50px",
						height: "50px",
						boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
					}}
					className="rounded-full bg-secondary items-center justify-center flex text-white focus:outline-none focus:ring"
				>
					<PlusIcon className="text-primaryText w-7 h-7" />
				</motion.button>
			</motion.div>
		</>
	)
})
