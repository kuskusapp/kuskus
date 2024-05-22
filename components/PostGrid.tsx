import { observer, useObservable } from "@legendapp/state/react"
import { AnimatePresence, motion } from "framer-motion"

export type PostGridImage = {
	id: string
	alt: string
	width: number
	height: number
	src: string
	preview: string
}

function getShortestColumn(heights: number[]): number {
	let shortest = 0
	for (let i = 1; i < heights.length; i += 1) {
		if (heights[i] < heights[shortest]) {
			shortest = i
		}
	}
	return shortest
}

export function ImageGrid(props: {
	images: PostGridImage[]
	onClick: (img: PostGridImage) => void
	columns: number
}) {
	const COLUMNS = props.columns
	const columns: PostGridImage[][] = new Array(COLUMNS)
	const heights: number[] = new Array(COLUMNS)

	for (let i = 0; i < COLUMNS; i += 1) {
		columns[i] = []
		heights[i] = 0
	}

	for (const image of props.images) {
		const i = getShortestColumn(heights)
		console.log(columns[i], "columns")
		// columns[i].push(image)
		// heights[i] += image.height / image.width
	}

	return columns.map((col, i) => (
		<div key={i} className="md:pl-2 pl-0 w-full">
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
	image: PostGridImage
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
