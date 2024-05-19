"use client"
import { homeAuthReturn, homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useEffect, useMemo } from "react"
import AddPostModal from "./AddPostModal"
import { ImageGrid } from "./PostGrid"
import Search from "./Search"
import ActionBar from "./ActionBar"
import { isEmpty } from "@legendapp/state"
import SignInAndSignUp from "./SignInAndSignUp"

let lastId = 0
interface Props {
	publicData: homePublicReturn
	authData?: homeAuthReturn
	authenticated: boolean
	authBuiltinUiUrl: string
	authBuiltinSignupUrl: string
}
export default observer(function Home(props: Props) {
	const publicData = useObservable(props.publicData)
	const authData = useObservable(props.authData)
	const local = useObservable({
		inputFocused: false,
		addPostModalOpen: false,
		activeItem: null as string | null,
		hoveredDish: null as number | null,
		dishes: [],
		menuItems: [
			{ name: "KusKus", key: "kusKus" },
			{ name: "Explore", key: "explore" },
			{ name: "About", key: "about" },
		],
		tags: [
			"Italian",
			"Mexican",
			"Indian",
			"Chinese",
			"Japanese",
			"Italian",
			"Mexican",
			"Indian",
			"Chinese",
			"Japanese",
		],
	})

	const posts = publicData.posts.get() ?? []
	const images = useMemo(() => {
		return posts.map((post) => {
			return {
				id: (lastId++).toString(),
				alt: "",
				width: post.imageWidth ?? 1,
				height: post.imageHeight ?? 1,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash ?? "",
			}
		})
	}, [posts])

	useEffect(() => {
		console.log(posts, "posts")
		console.log(images, "images")
	}, [posts])

	return (
		<>
			{!isEmpty(authData.get()) && (
				<ActionBar
					activeTab="Home"
					activateAddPost={() => {
						local.addPostModalOpen.set(true)
					}}
					username={authData.name.get()}
				/>
			)}
			{isEmpty(authData.get()) && (
				<SignInAndSignUp
					authBuiltinUiUrl={props.authBuiltinUiUrl}
					authBuiltinSignupUrl={props.authBuiltinSignupUrl}
				/>
			)}
			<AddPostModal
				open={local.addPostModalOpen.get()}
				onClose={() => {
					local.addPostModalOpen.set(false)
				}}
				postsState={undefined}
			/>
			<main className="flex flex-col pt-[120px] gap-[240px] items-center [&::-webkit-scrollbar]:hidden">
				<div className="flex flex-col gap-[36px] items-center px-[40px] p-[20px]">
					<div className="justify-center items-center gap-[8px] flex flex-col">
						<h1 className="text-6xl tracking-wider text-center font-bold">
							<span className="text-purple-400">Share</span> and{" "}
							<span className="text-fuchsia-400">Rate</span> food
						</h1>
						<p className=" text-[20px] w-[500px] font-light text-white/80 text-center">
							KusKus is community for food lovers, who love to see new places
							and share them
						</p>
					</div>
					<Search />
				</div>
			</main>
			<div className="flex">
				<ImageGrid images={images} onClick={(img) => {}} />
			</div>
		</>
	)
})

function Nav(props: Props) {}
