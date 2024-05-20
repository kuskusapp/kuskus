"use client"
import { homeAuthReturn, homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useMemo } from "react"
import ActionBar from "./ActionBar"
import AddPostModal from "./AddPostModal"
import { ImageGrid } from "./PostGrid"
import Search from "./Search"
import SignInAndSignUp from "./SignInAndSignUp"
import ViewPost from "./ViewPost"

type Image = {
	id: string
	alt: string
	width: number
	height: number
	src: string
	preview: string
}

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
		addPostModalOpen: true,
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
		showViewPost: null as Image | null,
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

	// useEffect(() => {
	// 	console.log(posts, "posts")
	// 	console.log(images, "images")
	// }, [posts])

	return (
		<>
			{local.showViewPost.get() !== null ? (
				<ViewPost
					post={local.showViewPost.get()}
					closeModal={local.showViewPost.set}
				/>
			) : null}
			{authData.get() !== null && (
				<>
					<ActionBar
						activeTab="Home"
						activateAddPost={() => {
							local.addPostModalOpen.set(true)
						}}
						username={authData.name.get()}
					/>
					<AddPostModal
						open={local.addPostModalOpen.get()}
						onClose={() => {
							local.addPostModalOpen.set(false)
						}}
						postsState={undefined}
					/>
				</>
			)}
			{authData.get() === null && (
				<SignInAndSignUp
					authBuiltinUiUrl={props.authBuiltinUiUrl}
					authBuiltinSignupUrl={props.authBuiltinSignupUrl}
				/>
			)}
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
			<div className="flex pt-[160px]">
				<ImageGrid
					images={images}
					onClick={(img) => {
						local.showViewPost.set(img)
					}}
				/>
			</div>
		</>
	)
})

function Nav(props: Props) {}
