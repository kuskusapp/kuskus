"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 5,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user2",
		name: "user 2",
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 5,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user3",
		name: "user 3",
		location: "City, Country",
		followers: 70,
		following: 10,
		lists: 0,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user4",
		name: "user 4",
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 5,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user5",
		name: "user 5",
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 5,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user6",
		name: "user 6",
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 0,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
	{
		id: "user7",
		name: "user 7",
		location: "City, Country",
		followers: 100,
		following: 50,
		lists: 5,
		imageUrl:
			"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
	},
]

interface UserBadgeProps {
	imageUrl: string
	username: string
}

const UserBadge: React.FC<UserBadgeProps> = ({ imageUrl, username }) => {
	return (
		<div className="flex space-x-2">
			<div className="w-8 h-8 relative">
				<Image
					src={imageUrl}
					alt={username}
					className="rounded-full"
					layout="fill"
					objectFit="cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
				/>
			</div>
			<span>{username}</span>
		</div>
	)
}

export default function SearchUsers() {
	const [inputFocused, setInputFocused] = useState(false)

	return (
		<>
			<Header />
			<div className=" justify-center px-5 pt-5 mt-5">
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
							You might like content of these KusKus users{" "}
						</h2>
						<Swiper
							className="mt-5"
							spaceBetween={20}
							slidesPerView={4}
							onSlideChange={() => {}}
						>
							{recommendedUsers.map((user) => (
								<SwiperSlide key={user.id}>
									<div
										className="flex flex-col p-6 space-x-6 border border-gray-200 rounded-xl"
										onClick={() => (window.location.href = `/${user.name}`)}
										style={{
											cursor: "pointer",
											height: "300px",
											alignItems: "start",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<div className="flex flex-row">
											<div className="w-20 h-20 mr-6 relative">
												<Image
													className="rounded-full"
													src={user.imageUrl}
													alt={user.name}
													layout="fill"
													objectFit="cover"
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													priority
												/>
											</div>
											<div className="flex flex-col">
												<h1 className="text-xl font-semibold">{user.name}</h1>
												<p>location: {user.location}</p>
											</div>
										</div>
										<div className="flex flex-col mt-4 flex-grow">
											<p>{user.followers} followers</p>
											<UserBadge
												key={user.id}
												imageUrl={user.imageUrl}
												username={user.name}
											/>
											<p>{user.following} following</p>
											<p>
												{user.lists !== 0
													? `${user.lists} lists`
													: "no lists yet"}
											</p>
										</div>
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
