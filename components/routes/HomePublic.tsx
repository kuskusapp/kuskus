"use client"
import Icons from "@/components/Icons"
import { homePublicResturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import Link from "next/link"
import { IoIosSearch } from "react-icons/io"
import { PiSignInThin } from "react-icons/pi"

interface Props {
	data: homePublicResturn
}

export default observer(function HomePublic(props: Props) {
	const server$ = useObservable(props.data)
	const local$ = useObservable({
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

	return (
		<div>
			<header className="absolute inset-x-0 top-0 z-50 mx-10 py-5">
				<nav
					className="flex items-center justify-betwween p-2 lg:px-8"
					aria-label="Global"
				>
					<div className="flex flex-1 justify-end space-x-2">
						<>
							<div className="absolute left-10 flex flex-row space-x-5">
								{local$.menuItems.map((item) => (
									<div
										// key={item.key}
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
							</div>
							<Link
								// href={auth.getBuiltinUIUrl()}
								href={".."}
								className="text-sm font-semibold leading-6 "
							>
								<button className="before:ease relative overflow-hidden bg-white px-4 py-2 rounded-full text-black flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-gray-500 before:opacity-10 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-black">
									<PiSignInThin size={20} className="mr-1" />
									Sign in
								</button>
							</Link>
							{/* ) : ( */}
							<Link
								// href={auth.getBuiltinUISignUpUrl()}
								href=".."
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								<button className="before:ease relative overflow-hidden bg-black px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-20 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-white border-opacity-20">
									<Icons name="SignUp" size={[20, 20]} />
									Sign up
								</button>
							</Link>
							{/* )} */}
						</>
					</div>
				</nav>
			</header>
			<main className="flex flex-col items-center mt-20 h-screen">
				<div
					className="justify-center flex flex-col mt-5 mb-10"
					style={{ maxWidth: "40em" }}
				>
					<h1 className="text-6xl font-m  mb-3 text-center">
						Share and rate food
					</h1>
					<p className="text-xl font-light  text-opacity-50 mt-5 text-center">
						KusKus is community for food lovers,
						<span className="display: block">
							who love to see new places and share them
						</span>
					</p>
				</div>
				<div className="relative flex items-center justify-center h-10">
					<IoIosSearch
						className="absolute left-0 ml-3 text-black"
						size={local$.inputFocused.get() ? 22 : 18}
						style={{ top: "50%", transform: "translateY(-50%)" }}
					/>
					<input
						className="border border-neutral-500 rounded-full pl-10 pr-36 py-3"
						placeholder="Search for a place or a dish..."
						style={{ width: "50em" }}
						onFocus={() => {
							// setInputFocused(true)
						}}
						onBlur={() => {
							// setInputFocused(false)
						}}
					/>
					<button
						className="absolute flex flex-row right-0 mr-1 px-4 py-2 rounded-full text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring"
						style={{ top: "50%", transform: "translateY(-50%)" }}
					>
						<Icons name="World" />
						or find places near you
					</button>
				</div>
				<div className="flex flex-row mt-10">
					{local$.dishes.map((dish, index) => (
						<button
							key={index}
							className="bg-transparent border border-black rounded-full px-4 py-2 m-1 hover:bg-gray-200 hover:-rotate-3 transition-transform duration-600 ease-in-out relative overflow-hidden flex items-center"
							onMouseEnter={() => {
								// setHoveredDish(index)
							}}
							onMouseLeave={() => {
								// setHoveredDish(null)
							}}
						>
							{/* {dish} */}
							<span
								className={`absolute mr-2 right-0 transition-opacity duration-700 ease-in-out hover:rotate-180 ${local$.hoveredDish.get() === index ? "opacity-100" : "opacity-0"}`}
							>
								?
							</span>
						</button>
					))}
				</div>
			</main>
		</div>
	)
})
