"use client"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import * as legend from "@legendapp/state/react"
import { motion } from "framer-motion"
import * as react from "react"
import * as actions from "@/app/actions"

interface Props {
	data: profileAuthReturn
}

type Image = {
	id: string
	alt: string
	width: number
	height: number
	src: string
	preview: string
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

const COLUMNS = 3

type ImageColumns = {
	images: Image[][]
	heights: number[]
}

function makeColumns(): ImageColumns {
	let cols: ImageColumns = {
		images: Array.from({ length: COLUMNS }, () => []),
		heights: Array.from({ length: COLUMNS }, () => 0),
	}
	return cols
}

function getShortestColumn(cols: ImageColumns): number {
	let shortest = 0
	for (let i = 1; i < cols.heights.length; i += 1) {
		if (cols.heights[i] < cols.heights[shortest]) {
			shortest = i
		}
	}
	return shortest
}

function addImages(images: Image[], cols: ImageColumns) {
	for (const image of images) {
		const shortest = getShortestColumn(cols)
		cols.images[shortest].push(image)
		cols.heights[shortest] += image.height / image.width
	}
}

let last_id = 0

export default legend.observer(function ProfileAuth(props: Props) {
	const server$ = legend.useObservable(props.data)
	const [showSettingsModal, setShowSettingsModal] = react.useState(false)

	const local = legend.useComputed(() => {
		const posts = server$.createdPosts.get() ?? []
		const images: Image[] = posts.map((post) => {
			return {
				id: (last_id++).toString(),
				alt: "",
				width: post.imageWidth ?? 1,
				height: post.imageHeight ?? 1,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash ?? "",
			}
		})

		const cols = makeColumns()
		addImages(images, cols)

		return {
			cols: cols,
			page: 0,
		}
	})

	return (
		<div className="min-h-screen h-full text-black/60">
			<Sidebar />
			<div className="ml-[380px] min-h-full flex">
				<button
					onClick={async () => {
						local.page.set((p) => p + 1)
						const res = await actions.profileAuthGetMoreImagesAction({
							pageNumber: local.page.get(),
						})

						if (res.data && !("failure" in res.data)) {
							const images: Image[] = res.data.createdPosts.map((post) => {
								return {
									id: (last_id++).toString(),
									alt: "",
									width: post.imageWidth ?? 1,
									height: post.imageHeight ?? 1,
									src: post.imageUrl,
									preview: post.imagePreviewBase64Hash ?? "",
								}
							})

							const cols = local.cols.get()
							addImages(images, cols)
							local.cols.set(cols)
						}
					}}
				>
					FETCH
				</button>
				{local.cols.get().images.map((col, i) => (
					<div key={i} className="pl-2 w-full">
						{col.map((img) => (
							<div key={img.id} className="pb-2">
								<LazyImage image={img} />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
})

function Sidebar() {
	const [hoveredSidebarTab, setHoveredSidebarTab] = react.useState("Following")
	return (
		<div className="fixed left-0 w-[380px] top-0 h-screen bg-gray-200">
			<div className="w-full h-3/5 bg-gray-300">Profile</div>
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
