import React, { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { PhotoIcon, AIcon } from "../public/svg/modal-icons"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {
	open: boolean
	onClose: () => void
	postsState: any
}

const foodCategories = [
	"Sushi",
	"Breakfast",
	"Smoothie",
	"Vegan",
	"Pasta",
	"Salad",
	"Healthy",
	"Steak",
	"Cocktail",
	"Burger",
	"Indian",
	"Curry",
	"Soup",
	"Coffee",
]

export default observer(function AddPostModal(props: Props) {
	const local = useObservable({
		isOpen: props.open,
		title: "",
		description: "",
		image: null as File | null,
	})

	const [categories, setCategories] = useState<string[]>([])
	const [initialCount, setInitialCount] = useState(8)

	const addCathegory = (category: string) => {
		setCategories((prevSelected) =>
			prevSelected.includes(category)
				? prevSelected.filter((cat) => cat !== category)
				: [...prevSelected, category],
		)
	}

	const viewMore = () => {
		setInitialCount((prevCount) => prevCount + 3)
	}

	const sortedCategories = [
		...categories,
		...foodCategories.filter((cat) => !categories.includes(cat)),
	].slice(0, initialCount)

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			// @ts-ignore
			local.image.set(event.target.files[0])
		}
	}

	useEffect(() => {
		local.isOpen.set(props.open)
	}, [props.open])

	const handleCloseModal = () => {
		local.isOpen.set(false)
		props.onClose()
	}

	const handleSubmit = () => {
		handleCloseModal()
	}

	return (
		<Transition appear show={local.isOpen.get()} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={() => {}}
			>
				<button
					className="fixed mt-10 mr-40 top-50 right-40 bg-neutral-200 hover:bg-neutral-400 px-4 py-2 rounded-full z-50"
					onClick={handleCloseModal}
				>
					x
				</button>
				<div className="min-h-screen px-2 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Panel className="fixed inset-0 bg-black opacity-70" />
					</Transition.Child>

					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
								className="flex "
								style={{ minHeight: "600px" }}
							>
								<div
									className="w-2/3 flex justify-center items-center m-auto"
									style={{ borderRight: "1px solid #e7e7e7", height: "610px" }}
								>
									<button
										className="mt-1 w-full h-full flex justify-center items-center bg-white focus:outline-none"
										// onClick={() => document.getElementById("image").click()}
									>
										<PhotoIcon className="h-6 w-6 text-gray-700" />
										<input
											type="file"
											id="image"
											onChange={handleImageChange}
											className="hidden"
										/>
									</button>
								</div>
								<div className=" flex flex-col">
									<div>
										<label
											htmlFor="description"
											className="block text-xs font-thin text-gray-700 py-2 pl-4 mb-2"
											style={{
												borderBottom: "1px solid #e7e7e7",
												width: "320px",
											}}
										>
											DESCRIPTION
										</label>
										<textarea
											id="description"
											value={local.description.get()}
											placeholder="Write a description..."
											style={{
												height: "150px",
												outline: "none",
												textAlign: "left",
												resize: "none",
												overflow: "auto",
											}}
											className="mt-1 block w-full px-3 bg-white border-none sm:text-sm textarea-placeholder"
										/>
									</div>
									<div style={{ height: "150px" }}>
										<label
											className="block text-xs font-thin text-gray-700 pb-2 pl-4 mb-2"
											style={{
												borderBottom: "1px solid #e7e7e7",
												width: "320px",
											}}
										>
											AI DESCRIPTION
										</label>
										<p className="font-thin text-sm pl-4">textext</p>
										<div
											style={{
												position: "relative",
												width: "320px",
												height: "100px",
											}}
										>
											<div
												style={{
													position: "absolute",
													display: "flex",
													flexDirection: "row",

													gap: "2px",
													right: "0",
													bottom: "0",
												}}
											>
												<AIcon className="spin text-purple-600 h-4 w-4" />
												<p className="font-thin text-right text-xs pr-4">
													AI is thinking
												</p>
											</div>
										</div>
									</div>
									<div
										style={{
											width: "320px",
											height: "100px",
											position: "relative",
										}}
									>
										<label
											className="block text-xs font-thin text-gray-700 pb-2 pl-4 mb-2"
											style={{
												borderBottom: "1px solid #e7e7e7",
												width: "320px",
											}}
										>
											CATEGORIES
										</label>
										<input
											placeholder="Search categories..."
											className="mt-1 block w-full px-3 bg-white border-none sm:text-sm textarea-placeholder"
										></input>

										<div className="flex flex-wrap gap-2 pl-2 mt-2">
											{sortedCategories.map((category) => (
												<button
													key={category}
													className={`px-2 py-1 text-gray-900 font-light text-xs border rounded-full ${categories.includes(category) ? "bg-yellow-500 border-yellow-500 text-white" : "hover:border-yellow-500"}`}
													onClick={() => addCathegory(category)}
												>
													{category}
												</button>
											))}
										</div>
										{initialCount < foodCategories.length && (
											<button
												className="mt-2 ml-4 text-gray-500 text-xs font-thin cursor-pointer"
												onClick={viewMore}
											>
												view more
											</button>
										)}
									</div>
								</div>
								<div className="absolute right-4 bottom-4">
									<button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
										Share
									</button>
								</div>
							</form>
						</div>
					</Transition>
				</div>
			</Dialog>
		</Transition>
	)
})
