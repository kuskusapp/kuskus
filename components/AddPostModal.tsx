"use client"
import { observer, useObservable } from "@legendapp/state/react"
import React, { useEffect } from "react"
import { AIcon } from "../public/svg/modal-icons"
import { FaImage } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"

interface Props {
	open: boolean
	onClose: () => void
	postsState: any
}

export default observer(function AddPostModal(props: Props) {
	const local = useObservable({
		isOpen: props.open,
		title: "",
		description: "",
		image: null as File | null,
		foodCategories: [
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
		],
		categories: [] as string[],
		initialCount: 8,
	})

	const addCategory = (
		category: string,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
		event.stopPropagation()
		local.categories.set((prevSelected) =>
			prevSelected.includes(category)
				? prevSelected.filter((cat) => cat !== category)
				: [...prevSelected, category],
		)
	}

	const viewMore = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		local.initialCount.set((prevCount) => prevCount + 3)
	}

	const sortedCategories = [
		...local.categories.get(),
		...local.foodCategories
			.get()
			.filter((cat) => !local.categories.get().includes(cat)),
	].slice(0, local.initialCount.get())

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		if (event.target.files && event.target.files[0]) {
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

	if (!local.isOpen.get()) return null

	return (
		<div className="fixed inset-0 z-10 overflow-y-auto">
			<button
				className="absolute top-10 left-20 glass-background hover:opacity-40 px-3 py-3 rounded-full z-50"
				onClick={handleCloseModal}
			>
				<IoCloseOutline />
			</button>
			<div className="min-h-screen px-2 text-center">
				<div
					className="fixed inset-0 bg-neutral-900 opacity-95"
					style={{ backdropFilter: "blur(30px)" }}
				/>
				<span className="inline-block h-screen align-middle" aria-hidden="true">
					&#8203;
				</span>
				<div className="inline-block w-full max-w-7xl my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSubmit()
						}}
						className="flex"
						style={{ minHeight: "650px" }}
					>
						<div
							className="w-4/5 flex h-[650px] justify-center items-center m-auto"
							style={{
								borderRight: "1px solid #2c2c2c",
								background: "rgba(0, 0, 0, 0.95)",
								backdropFilter: "blur(200px)",
							}}
						>
							<label
								className="mt-1 w-full h-full flex justify-center items-center focus:outline-none cursor-pointer"
								htmlFor="image"
							>
								<FaImage className="h-20 w-20 text-white hover:text-white" />
								<input
									type="file"
									id="image"
									onChange={handleImageChange}
									className="hidden"
								/>
							</label>
						</div>
						<div className="flex flex-col glass-background">
							<div>
								<label
									htmlFor="description"
									className="block text-xs font-normal text-white text-opacity-60 py-2 pl-4 mb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "400px",
									}}
								>
									DESCRIPTION
								</label>
								<textarea
									id="description"
									value={local.description.get()}
									placeholder="Write a description..."
									onChange={(e) => local.description.set(e.target.value)}
									style={{
										height: "150px",
										outline: "none",
										textAlign: "left",
										color: "white",
										resize: "none",
										overflow: "auto",
									}}
									className="bg-inherit mt-1 block w-full px-3 text-white border-none sm:text-sm textarea-placeholder"
								/>
							</div>
							<div style={{ height: "150px" }}>
								<label
									className="block text-xs font-normal text-white text-opacity-60 pb-2 pl-4 mb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "400px",
									}}
								>
									AI DESCRIPTION
								</label>
								<p className="font-thin text-white text-sm pl-4"></p>
								<div
									style={{
										position: "relative",
										width: "400px",
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
										<p className="font-thin text-right text-xs text-white pr-4">
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
									className="block text-xs font-normal text-white text-opacity-60 pb-2 pl-4 mb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "400px",
									}}
								>
									CATEGORIES
								</label>
								<input
									placeholder="Search categories..."
									className="mt-1 block w-full px-3 bg-inherit font-normal text-white border-none sm:text-sm textarea-placeholder"
								></input>

								<div className="flex flex-wrap gap-3 pl-2 mt-2">
									{sortedCategories.map((category) => (
										<button
											key={category}
											className={`px-3 py-2 text-white font-light text-sm border rounded-full ${
												local.categories.get().includes(category)
													? "bg-inherit border-yellow-500"
													: "bg-inherit borer-white hover:border-yellow-200"
											}`}
											onClick={(e) => addCategory(category, e)}
										>
											{category}
										</button>
									))}
								</div>
								{local.initialCount.get() <
									local.foodCategories.get().length && (
									<button
										className="mt-2 ml-4 text-white text-xs font-thin cursor-pointer"
										onClick={viewMore}
									>
										view more
									</button>
								)}
							</div>
						</div>
						<div className="absolute right-4 bottom-4">
							<button className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 rounded-xl">
								Share
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
})
