"use client"
import { homeAuthReturn, homePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import ActionBar from "../ActionBar"
import AddPostModal from "../AddPostModal"
import { ImageGrid, PostGridImage } from "../PostGrid"
import Search, { search_post_grid_images } from "../Search"
import SignInAndSignUp from "../SignInAndSignUp"
import ViewPost from "../ViewPost"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

export type DeviceSize = "mobile" | "tablet" | "desktop"
export type DeviceSizeMap = Record<DeviceSize, boolean>

interface Props {
	authenticated: boolean
	publicData: homePublicReturn
	authData?: homeAuthReturn
	authBuiltinUiUrl: string
	authBuiltinSignupUrl: string
}
export default observer(function HomeRoute(props: Props) {
	const auth = props.authenticated
	const local = useObservable({
		...props.publicData,
		...props.authData,
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
		],
		showViewPost: null as PostGridImage | null,
		searchInput: "",
		deviceSize: {
			mobile: false,
			tablet: false,
			desktop: true,
		} as DeviceSizeMap,
	})
	const router = useRouter()

	useEffect(() => {
		if (auth && !local.name.get()) {
			router.push("/settings")
		}
	}, [])

	const posts = local.posts.get() ?? []
	const images = useMemo(() => {
		return posts.map((post): PostGridImage => {
			return {
				id: post.roninId,
				alt: post.aiDescription,
				width: post.imageWidth,
				height: post.imageHeight,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash,
				aiDescription: post.aiDescription,
				description: post.description,
				categories: post.categories,
			}
		})
	}, [posts])

	// TODO: debounce search

	const searchedImages = useMemo(() => {
		if (local.searchInput.get().length < 2) {
			return images
		}

		return search_post_grid_images(local.searchInput.get(), images, 16)
	}, [local.searchInput.get(), images])

	useEffect(() => {
		const media_query_mobile = window.matchMedia("(max-width: 768px)")
		const media_query_tablet = window.matchMedia("(max-width: 1024px)")

		function handleMediaChange() {
			local.deviceSize.set({
				...local.deviceSize.get(),
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
				/>
			)}
			{auth && (
				<>
					<ActionBar
						activeTab="Home"
						activateAddPost={() => {
							local.addPostModalOpen.set(true)
						}}
						username={local.name.get()}
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
			{!auth && (
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
					<Search
						onInput={(input) => {
							local.searchInput.set(input)
						}}
					/>
				</div>
			</main>
			<div className="flex pt-[160px]">
				<ImageGrid
					images={searchedImages}
					columns={
						local.deviceSize.get().mobile
							? 1
							: local.deviceSize.get().tablet
								? 3
								: 4
					}
					onClick={(img) => {
						local.showViewPost.set(img)
					}}
				/>
			</div>
		</>
	)
})

function Nav(props: Props) {}
