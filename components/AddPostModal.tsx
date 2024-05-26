"use client"
import {
	checkIfFoodOrDrinkByDescriptionAction,
	createPostAction,
	describeImageAction,
} from "@/app/actions"
import { errorToast, fileToBase64 } from "@/src/react-utils"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { FaImage } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"
import AiThinking from "./AiThinking"
import Loader from "./Loader"

interface Props {
	user: string
	onClose: () => void
}

export default observer(function AddPostModal(props: Props) {
	const local = useObservable({
		title: "",
		description: "",
		uploadedImageAsFile: null as File | null,
		aiDescription: "",
		aiDescriptionLoading: false,
		guessedCategories: [] as string[],
		aiCategoriesGuessLoading: false,
		uploadingPost: false,
		imageIsFoodOrDrink: false,
		foodCategories: [
			"Sushi",
			"Smoothie",
			"Vegan",
			"Pizza",
			"Burger",
			"Pasta",
			"Salad",
			"Tacos",
			"Soup",
			"Steak",
			"Coffee",
		],
		categories: [] as string[],
		initialCount: 8,
	})
	const router = useRouter()

	const addCategory = (
		category: string,
		event?: React.MouseEvent<HTMLButtonElement>,
	) => {
		local.categories.set((prevSelected) =>
			prevSelected.includes(category)
				? prevSelected.filter((cat) => cat !== category)
				: [...prevSelected, category],
		)
	}
	useEffect(() => {
		local.guessedCategories.get().forEach((guessed) => {
			if (!local.foodCategories.get().includes(guessed)) {
				local.foodCategories.unshift(guessed)
			}
		})
		local.foodCategories.set([...local.foodCategories.get()])
		local.guessedCategories.get().forEach((guessed) => {
			if (!local.categories.get().includes(guessed)) {
				local.categories.unshift(guessed)
			}
		})
	}, [local.guessedCategories.get()])

	const sortedCategories = [
		...local.categories.get(),
		...local.foodCategories
			.get()
			.filter((cat) => !local.categories.get().includes(cat)),
	].slice(0, local.initialCount.get())

	return (
		<>
			<Toaster />
			<div className="fixed top-0 left-0 w-screen h-screen z-10 flex-center">
				<button
					onClick={() => props.onClose()}
					className="absolute top-10 left-20 glass-background hover:opacity-40 px-3 py-3 rounded-full z-50"
				>
					<IoCloseOutline />
				</button>
				<div
					className="absolute backdrop-blur-sm  top-0 left-0 w-screen h-screen z-20"
					onClick={() => {
						props.onClose()
					}}
				></div>

				<div className="relative z-30 h-fit rounded-lg overflow-hidden md:w-4/5 w-full bg-neutral-900">
					<form
						className="flex md:flex-row flex-col"
						onSubmit={(e) => {
							e.preventDefault()
						}}
					>
						<div
							className="md:w-4/5 w-full flex h-[650px] justify-center items-center m-auto"
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
								{!local.uploadedImageAsFile.get() && (
									<FaImage className="h-20 w-20 text-white hover:text-white" />
								)}
								{local.uploadedImageAsFile.get() && (
									<img
										// @ts-ignore
										src={URL.createObjectURL(local.uploadedImageAsFile.get())}
										className="max-w-full max-h-full"
									/>
								)}
								<input
									type="file"
									id="image"
									onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
										if (e.target.files && e.target.files[0]) {
											local.aiDescription.set("")
											const uploadedFile = e.target.files[0]
											local.uploadedImageAsFile.set(uploadedFile)
											local.aiDescriptionLoading.set(true)

											const [imageDescription, err] = await describeImageAction(
												{
													imageAsBase64: await fileToBase64(uploadedFile),
												},
											)
											if (err) {
												errorToast(err.data)
												return
											}
											local.aiDescriptionLoading.set(false)
											if (err) errorToast(err.data)
											// @ts-ignore
											local.aiDescription.set(imageDescription)

											const [foodOrDrink, err2] =
												await checkIfFoodOrDrinkByDescriptionAction({
													description: local.aiDescription.get(),
												})
											if (err2) {
												console.log(err2, "error checking if food/drink")
												errorToast(err2.data)
												return
											}
											console.log(foodOrDrink)
											local.imageIsFoodOrDrink.set(foodOrDrink)
											// process.env.OPENAI_API_KEY =
											// 	process.env.NEXT_PUBLIC_OPENAI_API_KEY
											// const result = await generateText({
											// 	model: openai("gpt-4o"),
											// 	tools: { checkIfFoodOrDrinkByDescription },
											// 	system: `You have to answer if image description provided is food or drink and be precise. It has to be precise image of food or drink, otherwise return false.`,
											// 	messages: [
											// 		{ role: "user", content: local.aiDescription.get() },
											// 	],
											// })
											// const foodOrDrink = result.toolCalls[0].args.foodOrDrink
											// if (!foodOrDrink) {
											// 	errorToast("Please upload an image of food or drink")
											// }
											// local.imageIsFoodOrDrink.set(foodOrDrink)

											// TODO: add back
											// const [categories, err] =
											// 	await suggestCategoriesAction({
											// 		foodDescription: local.aiDescription.get(),
											// 	})
											// local.guessedCategories.set(categories)
											// console.log(categories, "categories")
										}
									}}
									className="hidden"
								/>
							</label>
						</div>
						<div className="flex flex-col glass-background">
							<div>
								<label
									htmlFor="description"
									className="block text-xs font-normal text-white text-opacity-60 py-2 mb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "100%",
										paddingLeft: "1rem",
									}}
								>
									Description
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
									className="bg-inherit mt-1 block w-full px-3 text-white border-none sm:text-sm textarea-placeholder focus:ring-transparent"
								/>
							</div>
							<div
								style={{
									minHeight: "220px",
									height: local.aiDescriptionLoading.get() ? "auto" : "220px",
								}}
							>
								<label
									className="block text-xs font-normal text-white text-opacity-60 pb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "100%",
										paddingLeft: "1rem",
									}}
								>
									Image Description
								</label>
								<p className="font-thin text-white text-sm pl-4"></p>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										width: "100%",
										marginTop: "10px",
									}}
								>
									{local.aiDescriptionLoading.get() && <AiThinking />}
								</div>
								<div
									className="p-0 text-xs bg-inherit text-white px-2"
									style={{
										width: "400px",
										overflowWrap: "break-word",
									}}
								>
									{local.aiDescription.get()}
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
									className="block text-xs font-normal text-white text-opacity-60 pb-2 mb-2"
									style={{
										borderBottom: "1px solid #2c2c2c",
										width: "400px",
										marginBottom: "10px",
										paddingLeft: "1rem",
									}}
								>
									Categories
								</label>
								{/* TODO: add back when there is more categories */}
								{/* <input
									placeholder="Search categories..."
									className="mt-1 block w-full px-3 bg-inherit font-normal text-white border-none sm:text-sm textarea-placeholder"
								/> */}
								<div className="flex flex-wrap gap-3 pl-2 mt-2">
									{sortedCategories.map((category) => (
										<button
											key={category}
											className={`px-3 p-1 text-[14px] font-light text-sm border rounded-full ${
												local.categories.get().includes(category)
													? "bg-inherit bg-yellow-500 border-yellow-500 text-black"
													: `bg-inherit borer-white text-white ${local.imageIsFoodOrDrink.get() ? "hover:border-yellow-200" : "cursor-not-allowed"}`
											}`}
											onClick={(e) => addCategory(category, e)}
											disabled={local.imageIsFoodOrDrink.get() ? false : true}
										>
											{category}
										</button>
									))}
								</div>
								{/* TODO: add back when there is more categories */}
								{/* {local.initialCount.get() <
									local.foodCategories.get().length && (
									<button
										className="mt-2 ml-4 text-white text-xs font-thin cursor-pointer"
										onClick={viewMore}
									>
										view more
									</button>
								)} */}
							</div>
						</div>
						<div className="absolute right-4 z-50 bottom-4">
							{local.uploadingPost.get() && <Loader />}
							{!local.uploadingPost.get() && (
								<button
									className={`py-2 px-4 rounded-xl font-semibold ${
										local.imageIsFoodOrDrink.get()
											? "bg-yellow-500 hover:bg-yellow-700 text-black"
											: "bg-neutral-700 text-neutral-500 bg-opacity-50"
									}`}
									disabled={!local.imageIsFoodOrDrink.get()}
									onClick={async () => {
										if (!local.imageIsFoodOrDrink.get()) return
										local.uploadingPost.set(true)
										const formData = new FormData()
										formData.append(
											"postImage",
											// @ts-ignore
											local.uploadedImageAsFile.get(),
										)
										const [, err] = await createPostAction(formData, {
											aiDescription: local.aiDescription.get(),
											description: local.description.get(),
											categories: local.categories.get(),
										})
										if (err) {
											local.uploadingPost.set(false)
											errorToast(err.data)
											return
										}
										props.onClose()
										router.push(`/${props.user}`)
									}}
								>
									Share
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	)
})
