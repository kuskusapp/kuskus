import { observer, useObservable } from "@legendapp/state/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { PiSignInThin } from "react-icons/pi"
import Icons from "./Icons"

interface Props {
	authenticated: boolean
	authBuiltinUiUrl: string
	autBuiltinSignupUrl: string
}
// TODO: update, make it into generic Nav maybe
export default observer(function Nav(props: Props) {
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
				{/* TODO: move this to settings */}
				{/* {local.authenticated.get() && (
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
				)} */}
			</div>
		</div>
	)
})
