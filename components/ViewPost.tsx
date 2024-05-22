"use client"

import Image from "next/image"
import Icons from "./Icons"
import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

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
}

export default function ViewPost(props: Props) {
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
							filter: "blur(600px)",
						}}
						className="absolute z-20  top-0 left-0 w-full h-full"
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
							<div className="w-[38px] flex items-center">
								<div className="bg-neutral-200 h-[28px] w-[28px] rounded-full"></div>
							</div>
							molly
						</div>
						<div className="flex flex-col text-[14px] text-white/70">
							<p className="text-primaryText flex">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Numquam, repudiandae impedit. Quisquam ipsa sunt, ducimus maxime
								dolores consequuntur. Ad, quaerat? Esse aut facere blanditiis
								quod veritatis corporis accusamus eos unde.
							</p>
							<div className="flex-col pt-2 space-y-1">
								<p>japanese</p>
								<div className="flex-row">
									<Icons name="Tag" size={[22, 22]} />
									<p>tags</p>
								</div>
							</div>
						</div>
					</div>
					<div className="p-[20px] border-y border-white/10 h-full">
						comments
					</div>
					<div className="w-fit m-[20px] h-[60px] self-end flex-center px-5 rounded-lg bg-yellow-600">
						Signup
					</div>
				</div>
			</div>
			<div className="w-[100px] p-[20px] flex justify-center"></div>
		</div>
	)
}
