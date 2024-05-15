"use client"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
	data: profileAuthReturn
}

type Image = {
	id     : string
	alt	   : string
	width  : number
	height : number
	src    : string
	preview: string
}

const images: Image[] = [{
	id:	     "1",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "2",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "3",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "4",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "5",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "6",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "7",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "8",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "9",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "10",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "11",
	alt:	 "A beautiful image",
	height:  1080,
	width:   1920,
	src:     "https://spatie.be/docs/image/v3/images/example.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}, {
	id:	     "12",
	alt:	 "A beautiful image",
	height:  1920,
	width:   1080,
	src:     "https://c4.wallpaperflare.com/wallpaper/351/154/439/4k-kittens-catzilla-cats-city-hd-wallpaper-preview.jpg",
	preview: "data:image/png;base64, UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoYABgAP3GuzV+0rSilqAgCkC4JQBmDgsiSpIv92vkkXrAtc0AA/t/8oKpLNnWeC8WeIKaXY//9K5wyClBUuBipO4IHUxFJDApoaH64tJuHJDT40v3ojwAAAAA=",
}]

function LazyImage(props: {image: Image}) {

	const [loaded, setLoaded] = useState(false)

	return <div
		className="relative overflow-hidden flex justify-center items-center bg-black"
		style={{aspectRatio: `${props.image.width}/${props.image.height}`}}
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
			style={{opacity: loaded ? 1 : 0}}
			onLoad={() => {
				setLoaded(true)
			}}
			ref={el => {
				if (el && el.complete) setLoaded(true)
			}}
			alt={props.image.alt}
		></img>
	</div>	
}

export default observer(function ProfileAuth(props: Props) {
	const server$ = useObservable(props.data)
	const [showSettingsModal, setShowSettingsModal] = useState(false)

	return (
		<div className="min-h-screen h-full text-black/60">
			<Sidebar />
			<div className="ml-[380px] h-full pl-[6px] grid grid-cols-2 gap-[6px]">
				{images.map(img => <LazyImage image={img} key={img.id} />)}
			</div>
		</div>
	)
})

function Sidebar() {
	const [hoveredSidebarTab, setHoveredSidebarTab] = useState("Following")
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
