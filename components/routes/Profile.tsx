"use client"
import { profileLoadMostPostsAction } from "@/app/actions"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo } from "react"
import ViewPost from "../ViewPost"

type Image = {
	id: string
	alt: string
	width: number
	height: number
	src: string
	preview: string
}

const COLUMNS = 3

function getShortestColumn(heights: number[]): number {
	let shortest = 0
	for (let i = 1; i < heights.length; i += 1) {
		if (heights[i] < heights[shortest]) {
			shortest = i
		}
	}
	return shortest
}

function ImageGrid(props: { images: Image[]; onClick: (img: Image) => void }) {
	const columns: Image[][] = new Array(COLUMNS)
	const heights: number[] = new Array(COLUMNS)

	for (let i = 0; i < COLUMNS; i += 1) {
		columns[i] = []
		heights[i] = 0
	}

	for (const image of props.images) {
		const i = getShortestColumn(heights)
		columns[i].push(image)
		heights[i] += image.height / image.width
	}

	return columns.map((col, i) => (
		<div key={i} className="pl-2 w-full">
			{col.map((img) => (
				<div key={img.id} className="pb-2">
					<LazyImage
						image={img}
						onClick={() => {
							props.onClick(img)
						}}
					/>
				</div>
			))}
		</div>
	))
}

const LazyImage = observer(function LazyImage(props: {
	image: Image
	onClick: () => void
}) {
	const local = useObservable({
		loaded: false,
		hovered: false,
		info: {
			description: "great restaurant there were bugs tho very lively 6/10",
			date: "3 months ago",
		},
	})

	return (
		<div
			onClick={() => {
				props.onClick()
			}}
			onMouseEnter={() => {
				local.hovered.set(true)
			}}
			onMouseLeave={() => {
				local.hovered.set(false)
			}}
			className="relative overflow-hidden flex justify-center items-center bg-black"
			style={{ aspectRatio: `${props.image.width}/${props.image.height}` }}
		>
			<AnimatePresence>
				{local.hovered.get() ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute bottom-0 left-0 p-2 text-white z-20"
					>
						<div>{local.info.get().description}</div>
						<div className="opacity-50 text-[14px]">
							{local.info.get().date}
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
			<img
				className="absolute h-full w-full object-cover"
				width={props.image.width}
				height={props.image.height}
				src={props.image.preview}
			></img>
			<img
				className="absolute h-full w-full object-cover transition-opacity"
				width={props.image.width}
				height={props.image.height}
				src={props.image.src}
				style={{ opacity: local.loaded.get() ? 1 : 0 }}
				onLoad={() => {
					local.loaded.set(true)
				}}
				ref={(el) => {
					if (el && el.complete) {
						local.loaded.set(true)
					}
				}}
				alt={props.image.alt}
			></img>
		</div>
	)
})

let last_id = 0
interface Props {
	authData: profileAuthReturn
}

export default observer(function Profile(props: Props) {
	const authData = useObservable(props.authData)
	const local = useObservable({
		showSettingsModal: false,
		pageNumber: 0,
		postViewData: null,
		showPostViewModal: false,
	})

	const posts = authData.createdPosts.get() ?? []
	const images = useMemo(() => {
		return posts.map((post) => {
			return {
				id: (last_id++).toString(),
				alt: "",
				width: post.imageWidth ?? 1,
				height: post.imageHeight ?? 1,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash ?? "",
			}
		})
	}, [posts])

	useEffect(() => {
		async function checkBottom() {
			const FETCH_THRESHOLD = 600 // adjust
			if (
				window.innerHeight + window.scrollY + FETCH_THRESHOLD >=
				document.body.offsetHeight
			) {
				local.pageNumber.set(local.pageNumber.get() + 1)

				const posts = await profileLoadMostPostsAction({
					username: "nikiv",
					pageNumber: local.pageNumber.get(),
				})

				authData.createdPosts.set([
					...(authData.createdPosts.get() ?? []),
					...posts.data[0].createdPosts,
				])
			}
		}

		window.addEventListener("scroll", checkBottom)
		checkBottom()

		return () => {
			window.removeEventListener("scroll", checkBottom)
		}
	}, [])

	return (
		<div className="min-h-screen h-full ">
			{local.postViewData.get() !== null && (
				<ViewPost
					post={{
						id: "1",
						name: "test",
						category: "sushi",
						imageUrl:
							"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
					}}
					closeModal={() => {
						local.postViewData.set(null)
					}}
				/>
			)}
			<Sidebar />
			<div className="ml-[380px] min-h-full flex">
				<ImageGrid
					images={images}
					onClick={(img) => {
						local.postViewData.set(img)
						local.showPostViewModal.set(true)
					}}
				/>
			</div>
		</div>
	)
})

function Sidebar() {
	// const local = useObservable({
	// 	hoveredSidebarTab: "Following",
	// })
	return (
		<div className="fixed left-0 w-[380px] top-0 h-screen bg-secondary">
			<div className="w-full h-3/5 bg-substitute">Profile</div>
			<div className="p-[24px] pt-[34px] flex flex-col justify-between h-2/5">
				<div className="flex flex-col gap-[2px]">
					<div className="text-[30px] font-bold">Molly</div>
					<div>@molly - she/her</div>
					<div>description</div>
				</div>
				<div className="flex gap-[10px] mt-[20px] self-center z-10 [&>*]:z-[30] [&>*]:rounded-[8px] [&>*]:w-[95px] [&>*]:flex [&>*]:justify-center [&>*]:p-1">
					<motion.div className="hover:bg-zinc-300">Photos</motion.div>
					<motion.div className="hover:bg-zinc-300">Following</motion.div>
					<motion.div className="hover:bg-zinc-300">Followers</motion.div>
				</div>
			</div>
		</div>
	)
}
