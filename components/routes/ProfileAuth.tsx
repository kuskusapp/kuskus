"use client"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import * as legend from "@legendapp/state/react"
import { motion } from "framer-motion"
import * as react from "react"

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

function ImageGrid(props: { images: Image[] }) {
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
					<LazyImage image={img} />
				</div>
			))}
		</div>
	))
}

function LazyImage(props: { image: Image }) {
	const [loaded, setLoaded] = react.useState(false)

	return (
		<div
			className="relative overflow-hidden flex justify-center items-center bg-black"
			style={{ aspectRatio: `${props.image.width}/${props.image.height}` }}
		>
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
				style={{ opacity: loaded ? 1 : 0 }}
				onLoad={() => {
					setLoaded(true)
				}}
				ref={(el) => {
					if (el && el.complete) setLoaded(true)
				}}
				alt={props.image.alt}
			></img>
		</div>
	)
}

let last_id = 0

export interface ProfileAuthProps {
	data: profileAuthReturn
}

export default legend.observer(function ProfileAuth(props: ProfileAuthProps) {
	const server$ = legend.useObservable(props.data)
	const [showSettingsModal, setShowSettingsModal] = react.useState(false)

	const posts = server$.createdPosts.get() ?? []
	const images = react.useMemo(() => {
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

	react.useEffect(() => {
		function checkBottom() {
			const FETCH_THRESHOLD = 600 // adjust
			if (
				window.innerHeight + window.scrollY + FETCH_THRESHOLD >=
				document.body.offsetHeight
			) {
				// TODO: fetch more posts

				server$.createdPosts.set([
					...(server$.createdPosts.get() ?? []),
					...(server$.createdPosts.get() ?? []),
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
			<Sidebar />
			<div className="ml-[380px] min-h-full flex">
				<ImageGrid images={images} />
			</div>
		</div>
	)
})

function Sidebar() {
	const [hoveredSidebarTab, setHoveredSidebarTab] = react.useState("Following")
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
