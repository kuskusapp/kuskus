import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { FaMapPin } from "react-icons/fa6"
import PermissionModal from "./PermissonModal"
import { PostGridImage } from "./PostGrid"

/**
 * calculates the minimum number of single-character edits \
 * (insertions, deletions, or substitutions)               \
 * required to change one word into another.               \
 * It's a good choice for spell checking or auto-correct features.
 *
 * @returns the Levenshtein distance between the two strings:
 * - 0 if the strings are equal
 * - a positive integer if the strings are different
 */
export function levenshtein_distance(a: string, b: string): number {
	let mat = new Array(b.length + 1)

	for (let i = 0; i <= b.length; i += 1) {
		mat[i] = new Array(a.length + 1)
		mat[i][0] = i
	}

	for (let j = 0; j <= a.length; j += 1) {
		mat[0][j] = j
	}

	for (let i = 1; i <= b.length; i += 1) {
		for (let j = 1; j <= a.length; j += 1) {
			if (b[i - 1] == a[j - 1]) {
				mat[i][j] = mat[i - 1][j - 1]
			} else {
				mat[i][j] = Math.min(
					mat[i - 1][j - 1] + 1, // substitution
					mat[i][j - 1] + 1, // insertion
					mat[i - 1][j] + 1, // deletion
				)
			}
		}
	}

	return mat[b.length][a.length]
}

export function search_by_levenshtein_distance(
	query: string,
	strings: string[],
	max_results: number,
): number[] {
	let indexes: number[] = new Array(max_results)
	let scores: number[] = new Array(max_results)
	let len = 0

	strings_loop: for (let str_idx = 0; str_idx < strings.length; str_idx += 1) {
		let string = strings[str_idx]
		let score = levenshtein_distance(string, query)

		for (let i = 0; i < len; i += 1) {
			if (score < scores[i]) {
				// shift to the right
				for (let j = len; j > i; j -= 1) {
					indexes[j] = indexes[j - 1]
					scores[j] = scores[j - 1]
				}

				scores[i] = score
				indexes[i] = str_idx
				continue strings_loop
			}
		}

		if (len < max_results) {
			scores[len] = score
			indexes[len] = str_idx
			len += 1
		}
	}

	if (len < max_results) {
		indexes = indexes.slice(0, len)
	}

	return indexes
}

export function search_post_grid_images(
	query: string,
	images: PostGridImage[],
	max_results: number,
): PostGridImage[] {
	let results = search_by_levenshtein_distance(
		query,
		images.map((image) => image.alt),
		max_results,
	)

	return results.map((result) => images[result])
}

export type SearchProps = {
	onInput: (input: string) => void
}

export default function Search(props: SearchProps) {
	const [isPressed, setIsPressed] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const nearbyClicked = () => {
		setIsPressed(true)
		setTimeout(() => {
			setIsPressed(false)
			setShowModal(true)
		}, 300)
	}

	return (
		<div className="flex gap-3  w-full">
			<div className="rounded-2xl flex-between border-neutral-700 border border-opacity-50 bg-neutral-800 bg-opacity-60 w-full p-1">
				<label className="flex items-center flex-grow cursor-text">
					<IoIosSearch className="ml-3 text-neutral-500" size={20} />
					<input
						className="focus:ring-transparent border flex-grow bg-transparent border-none text-neutral-200 px-4 p-3 input-placeholder w-full"
						placeholder="Search for place or dish..."
						onFocus={() => {
							// setInputFocused(true)
						}}
						onBlur={() => {
							// setInputFocused(false)
						}}
						onChange={(e) => {
							props.onInput(e.target.value)
						}}
					/>
				</label>
			</div>
			<button
				onMouseDown={() => {
					navigator.geolocation.getCurrentPosition(() => {
						// TODO: show nearby places in grid
						console.log("Location permission granted")
					})
				}}
				style={{
					backgroundColor: isPressed ? "#dbb289" : "#eec093",
					boxShadow: isPressed ? "none" : "inset 0 -3px 0px 0px #a97e2a",
					transform: isPressed ? "translateY(2px)" : "none",
					scale: isPressed ? 0.98 : 1,
				}}
				className="md:flex-center hidden gap-[4px] text-black right-0 px-5 py-2 text-[15px] rounded-2xl bg-secondary focus:outline-none focus:ring"
			>
				<FaMapPin className="w-5 h-5" />
				Places nearby
			</button>
			{/* {showModal && (
				<PermissionModal onClose={() => setShowModal(false)}>
					<p className="text-black text-center">
						"KusKus" would like to use your current location.
					</p>
					<div
						className="flex flex-row gap-5 justify-center"
						style={{ margin: "auto" }}
					>
						<button
							onClick={() => locationPermission(false)}
							className="text-black text-base bg-gray-300 hover:bg-gray-400 rounded-full py-2 px-4"
						>
							Don't Allow
						</button>
						<button
							onClick={() => locationPermission(true)}
							className="text-black text-base bg-gray-300 hover:bg-gray-400 rounded-full py-2 px-4"
						>
							Allow
						</button>
					</div>
				</PermissionModal>
			)} */}
		</div>
	)
}
