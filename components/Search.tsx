import { IoIosSearch } from "react-icons/io"
import Icons from "./Icons"

export default function Search() {
	return (
		<div className="flex-between border-neutral-500 border bg-white rounded-md w-[620px] p-1">
			<div className="flex items-center flex-grow">
				<IoIosSearch className="ml-3 text-black" size={20} />
				<input
					className="border flex-grow  bg-transparent border-none text-black outline-none px-4 p-2"
					placeholder="Search for a place or dish..."
					onFocus={() => {
						// setInputFocused(true)
					}}
					onBlur={() => {
						// setInputFocused(false)
					}}
				/>
			</div>
			<button className="flex gap-[4px] right-0 px-4 py-2 text-[14px] rounded-md text-white flex-center bg-secondary focus:outline-none focus:ring">
				<Icons name="World" />
				or find places near you
			</button>
		</div>
	)
}
