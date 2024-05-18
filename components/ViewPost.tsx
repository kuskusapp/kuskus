"use client"
interface Props {
	post: {
		id: string
		name: string
		category: string
		imageUrl: string
	}
	setIsModalOpen: (value: number) => void
}

export default function ViewPost(props: Props) {
	return (
		<div className="fixed w-screen h-screen flex-center z-[100] [&::-webkit-scrollbar]:hidden backdrop-blur-sm">
			<div
				className="absolute z-[110] top-0 left-0 w-full h-full bg-transparent"
				onClick={() => {
					props.setIsModalOpen(null)
				}}
			></div>
			<div className="w-2/3 bg-black h-full z-[120] flex">
				<div className="w-3/5 h-full">Image</div>
				<div className="w-2/5 h-full bg-neutral-800 flex flex-col justify-between">
					<div className="flex flex-col gap-[4px] p-[20px] py-[30px]">
						<div className="flex pb-[10px] gap-[10px] font-bold items-center">
							<div className="bg-neutral-200 h-[34px] w-[34px] rounded-full"></div>
							account Name
						</div>
						<div className="text-primaryText font-light">{props.post.name}</div>
						<div className="text-primaryText font-light text-[14px]">
							{props.post.category}
						</div>
					</div>
					<div className="p-[20px] border-y border-slate-400/50 h-full">
						comments
					</div>
					<div className="w-fit m-[20px] h-[50px] self-end flex-center px-4 rounded-md bg-yellow-500">
						Signup
					</div>
				</div>
			</div>
		</div>
	)
}
