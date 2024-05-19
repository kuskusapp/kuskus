import { IoIosSearch } from "react-icons/io"
import Icons from "./Icons"

export default function Search() {
	return (
		<div className="flex gap-[10px] w-full">
			<div className="flex-between border-white/10 border bg-secondary rounded-[11px] w-full p-1">
				<div className="flex items-center flex-grow">
					<IoIosSearch className="ml-3 " size={20} />
					<input
						className="border flex-grow  bg-transparent border-none outline-none px-4 p-2"
						placeholder="Search for a place or dish..."
						onFocus={() => {
							// setInputFocused(true)
						}}
						onBlur={() => {
							// setInputFocused(false)
						}}
					/>
				</div>
			</div>
			<button className="flex w-[180px] gap-[4px] right-0 px-4 py-2 rounded-[11px] text-black flex-center bg-orange-200 border-b-2 border-yellow-600 focus:outline-none focus:ring">
				<Icons name="World" />
				Find nearby
			</button>
		</div>
	)
}
