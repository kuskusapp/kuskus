"use client"
import { homeAuthReturn, homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import * as react from "react"
import ActionBar from "./ActionBar"
import AddPostModal from "./AddPostModal"
import { ImageGrid, PostGridImage } from "./PostGrid"
import Search, { search_post_grid_images } from "./Search"
import SignInAndSignUp from "./SignInAndSignUp"
import ViewPost from "./ViewPost"
import { useRouter } from "next/navigation"

export type DeviceSize = "mobile" | "tablet" | "desktop"
export type DeviceSizeMap = Record<DeviceSize, boolean>

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
	})
	const router = useRouter()

	react.useEffect(() => {
		if (props.authenticated && !authData.name.get()) {
			router.push("/settings")
		}
	}, [])

	const posts = publicData.posts.get() ?? []
	const images = react.useMemo(() => {
		return posts.map((post): PostGridImage => {
			return {
				id: post.roninId,
				alt: post.aiDescription,
				width: post.imageWidth,
				height: post.imageHeight,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash,
			}
		})
	}, [posts])

	const [search_input, setSearchInput] = react.useState("")

	// TODO: debounce search

	const searched_images = react.useMemo(() => {
		if (search_input.length < 2) {
			return images
		}

		return search_post_grid_images(search_input, images, 16)
	}, [search_input, images])

	const [device_size, setDeviceSize] = react.useState<DeviceSizeMap>({
		mobile: false,
		tablet: false,
		desktop: true,
	})

	react.useEffect(() => {
		const media_query_mobile = window.matchMedia("(max-width: 768px)")
		const media_query_tablet = window.matchMedia("(max-width: 1024px)")

		function handleMediaChange() {
			setDeviceSize({
				...device_size,
				mobile: media_query_mobile.matches,
				tablet: media_query_tablet.matches,
			})
		}

		media_query_mobile.addEventListener("change", handleMediaChange)
		media_query_tablet.addEventListener("change", handleMediaChange)

		return () => {
			media_query_mobile.removeEventListener("change", handleMediaChange)
			media_query_tablet.removeEventListener("change", handleMediaChange)
		}
	}, [])

	return (
		<>
			{local.showViewPost.get() && (
				<ViewPost
					post={local.showViewPost.get()}
					closeModal={local.showViewPost.set}
					onPostDelete={(postPhotoUrl) => {
						const updatedPosts = posts.filter(
							(post) => post.imageUrl !== postPhotoUrl,
						)
						publicData.posts.set(updatedPosts)
					}}
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
					{local.addPostModalOpen.get() ? (
						<AddPostModal
							onClose={() => {
								local.addPostModalOpen.set(false)
							}}
						/>
					) : null}
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
					images={searched_images}
					columns={device_size.mobile ? 1 : device_size.tablet ? 3 : 4}
					onClick={(img) => {
						local.showViewPost.set(img)
					}}
				/>
			</div>
		</>
	)
})

function Nav(props: Props) {}
