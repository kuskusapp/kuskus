"use client"
import { useState } from "react"
import Image from "next/image"
import { IoIosSearch } from "react-icons/io"
import Header from "@/components/Header"
import { GlobeIcon } from "../../public/svg/search-icons"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const recommendedUsers = [
	{
		id: "user1",
		name: "user 1",
		imageUrl: "https://images.omrshn.dev/logisticcars.jpeg",
	},
	{
		id: "user2",
		name: "user 2",
		imageUrl: "https://images.omrshn.dev/logisticcars.jpeg",
	},
	{
		id: "user3",
		name: "user 3",
		imageUrl: "https://images.omrshn.dev/logisticcars.jpeg",
	},
	{
		id: "user4",
		name: "user 4",
		imageUrl: "https://images.omrshn.dev/logisticcars.jpeg",
	},
]

export default function SearchUsers() {
	const [inputFocused, setInputFocused] = useState(false)

	return (
		<>
			<Header />
			<div className="bg-white justify-center px-5 pt-5 mt-5">
				<div
					className="relative flex items-center justify-center h-10 m-auto"
					style={{ width: "100%" }}
				>
					<IoIosSearch
						className="absolute left-0 ml-3 text-black"
						size={inputFocused ? 24 : 18}
						style={{ top: "50%", transform: "translateY(-50%)" }}
					/>
					<input
						className="border border-neutral-500 rounded-full pl-10 pr-36 py-3"
						placeholder="Lets find your friends! Type name"
						style={{ width: "100%" }}
						onFocus={() => setInputFocused(true)}
						onBlur={() => setInputFocused(false)}
					/>
					<button
						className="absolute flex flex-row right-0 mr-1 px-4 py-2 rounded-full text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring"
						style={{ top: "50%", transform: "translateY(-50%)" }}
					>
						<GlobeIcon className="w-7 h-7 color-white" />
						or discover nearby users
					</button>
				</div>
				<div className="pb-20 space-y-10">
					<div className="pt-10">
						<h2 className="text-2xl font-normal">
							Places we recommend for you in{" "}
							<span className="">[City, Country]</span>
						</h2>
						<Swiper
							className="mt-5"
							spaceBetween={20}
							slidesPerView={4}
							onSlideChange={() => console.log("slide change")}
							onSwiper={(swiper) => console.log(swiper)}
						>
							{recommendedUsers.map((user) => (
								<SwiperSlide key={user.id}>
									<div className="w-80 h-40 relative">
										<Image
											className="rounded-lg"
											src={user.imageUrl}
											alt={user.name}
											layout="fill"
											objectFit="cover"
										/>
									</div>
									<div className="flex flex-col text-left pt-2 pl-2 space-y-1">
										<p className="text-base">{user.name}</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</>
	)
}
