"use client"

import { observer, useObservable } from "@legendapp/state/react"
import { IoCloseOutline } from "react-icons/io5"
import Loader from "./Loader"
import { deletePostAction } from "@/app/actions"

interface Props {
	post: {
		id: string
		alt: string
		width: number
		height: number
		src: string
		preview: string
	}
	closeModal: (value: {} | null) => void
	onPostDelete: (postPhotoUrl: string) => void
}
export default observer(function ViewPost(props: Props) {
	const local = useObservable({
		deletingPost: false,
	})
	return (
		<div className="fixed bg-neutral-900 bg-opacity-95 w-screen z-[100] h-screen flex [&::-webkit-scrollbar]:hidden backdrop-blur-sm">
			<button
				className="absolute top-10 left-20 glass-background hover:opacity-40 px-3 py-3 rounded-full z-50"
				onClick={() => {
					props.closeModal(null)
				}}
			>
				<IoCloseOutline size={20} />
			</button>
			<div className="w-[85%] bg-black h-[80%] flex absolute top-[10%] left-[10%] rounded-lg shadow-xl">
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
							width: "auto",
							height: "auto",
							maxWidth: "100%",
							maxHeight: "100%",
						}}
					/>
				</div>
				<div className="w-2/5 h-full bg-neutral-950 flex flex-col justify-between rounded-lg shadow-xl">
					<div className="flex flex-col gap-[4px] p-[20px] py-[30px]">
						<div className="flex pb-[10px] text-[18px]">
							{/* <div className="w-[38px] flex items-center">
								<div className="bg-neutral-200 h-[28px] w-[28px] rounded-full"></div>
							</div> */}
						</div>
						<div className="flex flex-col text-[14px] text-white/70">
							<p className="text-primaryText flex"></p>
							<div className="flex-col pt-2 space-y-1">
								{/* <p>japanese</p> */}
								{/* <div className="flex-row">
									<Icons name="Tag" size={[22, 22]} />
									<p className="pl-1">tags</p>
								</div> */}
							</div>
						</div>
					</div>
					{/* <div className="p-[20px] border-y border-white/10 h-full">
						comment
					</div> */}
					<div className="flex justify-end">
						<div className="flex justify-end items-center p-5">
							{local.deletingPost.get() && <Loader color="red" />}
						</div>
						{!local.deletingPost.get() && (
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
			<div className="w-[100px] p-[20px] flex justify-center"></div>
		</div>
	)
})
