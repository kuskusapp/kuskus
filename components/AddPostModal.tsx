"use client"
import { describeImageAction } from "@/app/actions"
import { observer, useObservable } from "@legendapp/state/react"
import React, { useEffect } from "react"
import { AIcon, PhotoIcon } from "../public/svg/modal-icons"

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
		aiDescription: "",
		aiDescriptionLoading: false,
		aiGuessesCategories: [] as string[],
		aiCategoriesGuessLoading: false,
		uploadedImage: null as Blob | null,
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

	useEffect(() => {
		local.isOpen.set(props.open)
	}, [props.open])

	const handleCloseModal = () => {
		local.isOpen.set(false)
		props.onClose()
	}

	if (!local.isOpen.get()) return null

	return (
		<div className="fixed w-screen z-[100] h-screen flex [&::-webkit-scrollbar]:hidden backdrop-blur-sm">
			<div className="w-[100px] p-[20px] flex justify-center">
				<div
					className="h-[50px] w-[50px] bg-neutral-800 cursor-pointer flex-center rounded-full  rotate-45 text-[28px]"
					onClick={() => {
						handleCloseModal()
					}}
				>
					+
				</div>
			</div>

			{/* <span className="inline-block h-screen align-middle" aria-hidden="true">
					&#8203;
				</span> */}

			<form
				// onSubmit={handleSubmit(async (data) => {
				// 	console.log(data, "data")
				// 	// const res = await buyProduct(data);
				// 	// Do something useful with the result.
				// })}
				className="flex w-full h-full relative"
				onSubmit={(e) => {
					e.preventDefault()
					handleCloseModal()
				}}
			>
				<div className="w-2/3 flex justify-center h-full bg-neutral-800 items-center">
					<label
						className="mt-1 w-full h-full flex justify-center hover:text-neutral-900 transition-all items-center focus:outline-none cursor-pointer"
						htmlFor="image"
					>
						{!local.uploadedImage.get() && <PhotoIcon className="h-10 w-10" />}
						<input
							type="file"
							id="image"
							onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
								e.stopPropagation()
								if (e.target.files && e.target.files[0]) {
									try {
										local.aiDescriptionLoading.set(true)
										const uploadedFile = e.target.files[0]
										local.uploadedImage.set(uploadedFile)
										const base64Image = await fileToBase64(uploadedFile)
										const resp = await describeImageAction({
											imageAsBase64: base64Image,
										})
										if (resp.data) {
											// @ts-ignore
											local.aiDescription.set(resp.data)
										}
										console.log(resp.data, "resp")
										local.aiDescriptionLoading.set(false)
									} catch (err) {
										local.aiDescriptionLoading.set(false)
										console.log(err)
									}
								}
							}}
							className="hidden"
						/>
					</label>
					{local.uploadedImage.get() && (
						<img
							// @ts-ignore
							src={URL.createObjectURL(local.uploadedImage.get())}
							className="max-w-full max-h-full"
						/>
					)}
				</div>
				<div className="flex flex-col bg-neutral-950 relative">
					<div>
						<label
							htmlFor="description"
							className="block text-xs font-normal border-b border-white/10 text-gray-700 py-2 pl-4 mb-2"
							style={{
								width: "400px",
							}}
						>
							Note
						</label>
						<textarea
							id="note"
							value={local.description.get()}
							placeholder="Write note..."
							onChange={(e) => local.description.set(e.target.value)}
							style={{
								height: "150px",
								outline: "none",
								textAlign: "left",
								resize: "none",
								overflow: "auto",
							}}
							className="bg-inherit mt-1 block border-b border-white/10 w-full px-3 text-neutral-700 border-none sm:text-sm textarea-placeholder"
						/>
					</div>
					<div className="relative" style={{ height: "150px" }}>
						<label
							className="block text-xs font-normal border-b border-white/10 text-gray-700 pb-2 pl-4 mb-2"
							style={{
								width: "400px",
							}}
						>
							Image Description
						</label>
						{local.aiDescriptionLoading.get() && (
							<div className="absolute bottom-1 right-3 flex bg-white items-center w-fit rounded-md gap-[10px] p-1 pl-2">
								<AIcon className="spin text-purple-600 h-4 w-4" />
								<p className=" text-right text-[12px] text-black pr-4">
									AI is thinking
								</p>
							</div>
						)}
						<p className="font-thin text-sm pl-4" style={{ color: "#555555" }}>
							{local.aiDescription.get()}
						</p>
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
								{local.aiCategoriesGuessLoading.get() && (
									<>
										<AIcon className="spin text-purple-600 h-4 w-4" />
										<p className="font-thin text-right text-xs text-black pr-4">
											AI is thinking
										</p>
									</>
								)}
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
							className="block text-xs font-normal text-gray-700 pb-2 pl-4 mb-2 border-b border-white/10"
							style={{
								width: "400px",
							}}
						>
							CATEGORIES
						</label>
						<input
							placeholder="Search categories..."
							className="mt-1 block w-full px-3 bg-inherit font-normal text-gray-700 border-none sm:text-sm textarea-placeholder"
						></input>

						<div className="flex flex-wrap gap-2 pl-2 mt-2">
							{sortedCategories.map((category) => (
								<button
									key={category}
									className={`px-2 py-1 text-white font-light  text-xs border rounded-full ${
										local.categories.get().includes(category)
											? "bg-white/50"
											: "bg-neutral-700 border border-neutral-600 "
									}`}
									onClick={(e) => addCategory(category, e)}
								>
									{category}
								</button>
							))}
						</div>
						{local.initialCount.get() < local.foodCategories.get().length && (
							<button
								className="mt-2 ml-4 text-gray-700 text-xs font-thin cursor-pointer"
								onClick={viewMore}
							>
								view more
							</button>
						)}
					</div>
					<div className="absolute right-4 bottom-4">
						<button className="bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-4 rounded">
							Share
						</button>
					</div>
				</div>
			</form>
			<div className="w-[100px] p-[20px] flex justify-center"></div>
		</div>
	)
})

function fileToBase64(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			resolve(reader.result as string)
		}
		reader.onerror = (error) => {
			reject(error)
		}
		reader.readAsDataURL(file)
	})
}
