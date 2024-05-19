import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { FaMapPin } from "react-icons/fa6"

export default function Search() {
	const [isPressed, setIsPressed] = useState(false)

	const nearbyClicked = () => {
		setIsPressed(true)
		setTimeout(() => {
			setIsPressed(false)
		}, 500)
	}

	return (
		<div className="flex flex-row gap-3 mb-20">
			<div className="rounded-2xl flex-between border-neutral-700 border border-opacity-50 bg-neutral-800 bg-opacity-60 w-[450px] p-1">
				<div className="flex items-center flex-grow">
					<IoIosSearch className="ml-3 text-neutral-500" size={20} />
					<input
						className="focus:outline-none border flex-grow bg-transparent border-none text-neutral-200 px-4 p-3 input-placeholder"
						placeholder="Search for place or dish..."
						onFocus={() => {
							// setInputFocused(true)
						}}
						onBlur={() => {
							// setInputFocused(false)
						}}
					/>
				</div>
			</div>
			<button
				onMouseDown={nearbyClicked}
				style={{
					backgroundColor: "#eec093",
					boxShadow: isPressed ? "none" : "inset 0 -3px 0px 0px #a97e2a",
				}}
				className="flex gap-[4px] text-black right-0 px-5 py-2 text-[15px] rounded-2xl flex-center bg-secondary focus:outline-none focus:ring"
			>
				<FaMapPin className="w-5 h-5" />
				Places nearby
			</button>
		</div>
	)
}
