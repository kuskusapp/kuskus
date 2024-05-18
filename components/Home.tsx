"use client"
import { logoutAction } from "@/app/actions"
import Icons from "@/components/Icons"
import { homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiSignInThin } from "react-icons/pi"
import Search from "./Search"

interface Props {
	publicData: homePublicReturn
	authenticated: boolean
	authBuiltinUiUrl: string
	autBuiltinSignupUrl: string
}

export default observer(function Home(props: Props) {
	const publicData = useObservable(props.publicData)
	const local = useObservable({
		authenticated: props.authenticated,
		inputFocused: false,
		activeItem: null as string | null,
		hoveredDish: null as number | null,
		dishes: [],
		menuItems: [
			{ name: "KusKus", key: "kusKus" },
			{ name: "Explore", key: "explore" },
			{ name: "About", key: "about" },
		],
	})

	const [tags, setTags] = useState([
		"Italian",
		"Mexican",
		"Indian",
		"Chinese",
		"Japanese",
		"Italian",
		"Mexican",
		"Indian",
		"Chinese",
		"Japanese",
	])

	return (
		<div className="[&::-webkit-scrollbar]:hidden overflow-hidden">
			<Nav {...props} />
			<main className="flex flex-col pt-[120px] gap-[240px] items-center [&::-webkit-scrollbar]:hidden">
				<div className="flex flex-col gap-[36px] items-center px-[40px] p-[20px]">
					<div className="justify-center items-center gap-[8px] flex flex-col">
						<h1 className="text-6xl tracking-wider text-center font-bold">
							<span className="text-purple-400">Share</span> and{" "}
							<span className="text-fuchsia-400">Rate</span> food
						</h1>
						<p className=" text-[18px] w-[440px] font-light text-white/60 text-center">
							KusKus is community for food lovers, who love to see new places
							and share them
						</p>
					</div>
					<Search />
				</div>
				<div className="gap-[20px] flex flex-col w-full p-2">
					<div className="flex-center gap-[10px] w-full">
						{tags.map((tag) => {
							return (
								<motion.div
									className="h-[36px] flex-center px-5 rounded-full bg-white text-black text-[14px]"
									key={tag}
								>
									{tag}
								</motion.div>
							)
						})}
					</div>
					<div className="grid grid-cols-3 gap-[6px] w-full">
						{tags.map((tag) => {
							return (
								<div
									key={tag}
									className="bg-white aspect-w-1 aspect-h-1 pb-[100%] "
								></div>
							)
						})}
					</div>
				</div>
			</main>
		</div>
	)
})

function Nav(props: Props) {
	const local = useObservable({
		authenticated: props.authenticated,
		inputFocused: false,
		activeItem: null as string | null,
		hoveredDish: null as number | null,
		dishes: [],
		menuItems: [
			{ name: "KusKus", key: "kusKus" },
			{ name: "Explore", key: "explore" },
			{ name: "About", key: "about" },
		],
	})
	const router = useRouter()
	return (
		<div className="fixed top-0 left-0 h-[80px] w-screen flex-between px-[40px] backdrop-blur-sm">
			<div className="flex gap-[16px] text-[20px]">
				<div>KusKus</div>
				<div>Explore</div>
				<div>About</div>
			</div>
			<div>
				{local.menuItems.map((item, index) => (
					<div
						key={index}
						className="flex items-center space-x-2"
						onClick={() => {
							// setActiveItem(item.key === activeItem ? null : item.key)
						}}
					>
						{/* <h3>{item.name}</h3> */}
						{/* {activeItem === item.key ? (
									<IoIosArrowUp />
								) : (
									<IoIosArrowDown />
								)} */}
					</div>
				))}

				{!local.authenticated.get() && (
					<>
						<Link
							href={props.authBuiltinUiUrl}
							className="text-sm font-semibold leading-6 text-gray-800"
						>
							<button className="before:ease relative overflow-hidden bg-white px-4 py-2 rounded-full text-black flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-gray-500 before:opacity-10 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-black">
								<PiSignInThin size={20} className="mr-1" />
								Sign in
							</button>
						</Link>
						<Link
							href={props.autBuiltinSignupUrl}
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							<button className="before:ease relative overflow-hidden bg-black px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-20 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-white border-opacity-20">
								<Icons name="SignUp" size={[20, 20]} />
								Sign up
							</button>
						</Link>
					</>
				)}
				{local.authenticated.get() && (
					<Link
						href={"/"}
						className="text-sm font-semibold leading-6 text-gray-800"
					>
						<button
							onClick={async () => {
								await logoutAction({})
								router.refresh()
							}}
							className="before:ease relative overflow-hidden bg-black px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-20 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-white border-opacity-20"
						>
							<PiSignInThin size={20} className="mr-1" />
							Sign Out
						</button>
					</Link>
				)}
			</div>
		</div>
	)
}
