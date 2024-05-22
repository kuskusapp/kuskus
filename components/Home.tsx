"use client"
import { homeAuthReturn, homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import * as react from "react"
import ActionBar from "./ActionBar"
import AddPostModal from "./AddPostModal"
import { ImageGrid, PostGridImage } from "./PostGrid"
import Search from "./Search"
import SignInAndSignUp from "./SignInAndSignUp"
import ViewPost from "./ViewPost"

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
		showViewPost: null as PostGridImage | null,
		windowSize: null as null | number,
	})

	react.useEffect(() => {
		if (window.innerWidth <= 768) {
			local.windowSize.set(768)
		}
	})

	const posts = publicData.posts.get() ?? []
	const images = react.useMemo(() => {
		return posts.map((post): PostGridImage => {
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

	const [search_input, setSearchInput] = react.useState("")

	react.useEffect(() => {
		console.log(search_input, "search_input")
	}, [search_input])

	return (
		<>
			{local.showViewPost.get() && (
				<ViewPost
					post={local.showViewPost.get()}
					closeModal={local.showViewPost.set}
				/>
			)}
			{authData.get() && (
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
						<h1
							style={{ fontSize: "clamp(20px, 7vw, 60px)" }}
							className=" tracking-wider text-center font-bold"
						>
							<span className="text-purple-400">Share</span> and{" "}
							<span className="text-fuchsia-400">Rate</span> food
						</h1>
						<p
							style={{
								fontSize: "clamp(10px, 3vw, 20px)",
								width: "clamp(250px, 50vw, 500px)",
							}}
							className=" font-light text-white/80 text-center"
						>
							KusKus is community for food lovers, who love to see new places
							and share them
						</p>
					</div>
					<Search onInput={setSearchInput} />
				</div>
			</main>
			<div className="flex pt-[160px]">
				<ImageGrid
					images={images}
					// columns={local.windowSize.get() > 768 ? 3 : 1}
					columns={3}
					onClick={(img) => {
						local.showViewPost.set(img)
					}}
				/>
			</div>
		</>
	)
})

function Nav(props: Props) {}
