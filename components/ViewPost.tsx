"use client"

import { deletePostAction } from "@/app/actions"
import { observer, useObservable } from "@legendapp/state/react"
import { IoCloseOutline } from "react-icons/io5"
import Loader from "./Loader"

interface Props {
	post: {
		id: string
		alt: string
		width: number
		height: number
		src: string
		preview: string
		userProfilePhotoUrl?: string
		description?: string
		aiDescription?: string
		categories?: string[]
	}
	closeModal: (value: {} | null) => void
	onPostDelete?: (postPhotoUrl: string) => void
}
export default observer(function ViewPost(props: Props) {
	const local = useObservable({
		deletingPost: false,
	})
	return (
		<div className="fixed flex-center bg-neutral-900 bg-opacity-95 w-screen z-[100] h-screen flex [&::-webkit-scrollbar]:hidden backdrop-blur-sm">
			<button
				className="absolute cursor-pointer top-10 left-20 glass-background hover:opacity-40 px-3 py-3 rounded-full z-[115]"
				onClick={() => {
					props.closeModal(null)
				}}
			>
				<IoCloseOutline size={20} />
			</button>
			<div
				className="absolute top-0 left-0 w-screen h-screen z-[110]"
				onClick={() => {
					props.closeModal(null)
				}}
			></div>
			<div className="w-[85%] overflow-hidden bg-black h-[80%] z-[120] flex  rounded-lg shadow-xl">
				<div className="w-3/5 z-20 overflow-hidden relative flex-center h-full">
					<div
						style={{
							background: `url(${props.post.src})`,
							// filter: "blur(600px)",
						}}
						className="absolute z-20 top-0 left-0 w-full h-full blur-effect"
					></div>
					<img
						alt="image"
						src={props.post.src}
						className="z-30"
						style={{
							height: "auto",
							maxWidth: "100%",
							maxHeight: "100%",
						}}
					/>
				</div>
				<div className="flex w-full flex-col glass-background">
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
						<div
							id="description"
							style={{
								height: "150px",
								outline: "none",
								textAlign: "left",
								color: "white",
								resize: "none",
								overflow: "auto",
							}}
							className="bg-inherit mt-1 block w-full px-3 text-white border-none sm:text-sm textarea-placeholder focus:ring-transparent"
						>
							{props.post.description}
						</div>
					</div>
					<div
						style={{
							minHeight: "220px",
							height: "220px",
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
						></div>
						<div
							className="p-0 text-xs bg-inherit text-white px-2"
							style={{
								overflowWrap: "break-word",
							}}
						>
							{props.post.aiDescription}
						</div>
					</div>

					<div
						style={{
							height: "100px",
							position: "relative",
						}}
					>
						<label
							className="block text-xs font-normal text-white text-opacity-60 pb-2 mb-2"
							style={{
								borderBottom: "1px solid #2c2c2c",

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
							{props.post.categories &&
								props.post.categories.map((category) => (
									<button
										key={category}
										className={`px-3 p-1 text-[14px] font-light text-sm border rounded-full`}
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
					<div className="flex justify-end absolute bottom-2 right-2">
						<div className="flex justify-end items-center p-5">
							{local.deletingPost.get() && <Loader color="red" />}
						</div>
						{props.onPostDelete && !local.deletingPost.get() && (
							<button
								onClick={async () => {
									const res = await deletePostAction({
										imageUrl: props.post.src,
									})
									if (!res.serverError) {
										props.onPostDelete(props.post.src)
										props.closeModal(null)
									}
								}}
								className="w-fit m-[20px] h-[40px] self-end flex-center transition-all px-5 py-1 rounded-lg bg-red-500 hover:bg-red-700"
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
})
