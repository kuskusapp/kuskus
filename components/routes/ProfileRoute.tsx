"use client"
import { profileAuthReturn, profilePublicReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useEffect, useMemo } from "react"
import { SettingsIcon } from "../../public/svg/modal-icons"
import ActionBar from "../ActionBar"
import AddPostModal from "../AddPostModal"
import { ImageGrid } from "../PostGrid"
import ViewPost from "../ViewPost"
import { useRouter } from "next/navigation"
import { profileLoadMoreMostsAction } from "@/app/actions"
import { errorToast } from "@/src/react-utils"

let lastId = 0
interface Props {
	authenticated: boolean
	publicData: profilePublicReturn
	authData?: profileAuthReturn
}
export default observer(function ProfileRoute(props: Props) {
	const auth = props.authenticated
	const local = useObservable({
		...props.publicData,
		...props.authData,
		addPostModalOpen: false,
		showSettingsModal: false,
		pageNumber: 0,
		postViewData: null,
		showPostViewModal: false,
		windowSize: null as null | number,
	})
	const router = useRouter()
	const posts = local.createdPosts.get() ?? []
	const images = useMemo(() => {
		return posts.map((post) => {
			return {
				id: (lastId++).toString(),
				alt: "",
				width: post.imageWidth ?? 1,
				height: post.imageHeight ?? 1,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash ?? "",
				description: post.description,
				aiDescription: post.aiDescription,
				categories: post.categories,
			}
		})
	}, [posts])

	useEffect(() => {
		async function checkBottom() {
			const FETCH_THRESHOLD = 600 // adjust
			if (
				window.innerHeight + window.scrollY + FETCH_THRESHOLD >=
				document.body.offsetHeight
			) {
				// local.pageNumber.set(local.pageNumber.get() + 1)
				// const [posts, err] = await profileLoadMoreMostsAction({
				// 	username: local.name.get(),
				// 	pageNumber: local.pageNumber.get(),
				// })
				// if (err) {
				// 	console.log(err.data)
				// 	// errorToast(err.data)
				// 	return
				// }
				// if (posts && posts.length > 0 && posts[0].createdPosts) {
				// 	local.createdPosts.set([
				// 		...(local.createdPosts.get() ?? []),
				// 		...posts[0].createdPosts,
				// 	])
				// }
			}
		}

		window.addEventListener("scroll", checkBottom)
		checkBottom()

		return () => {
			window.removeEventListener("scroll", checkBottom)
		}
	}, [])

	useEffect(() => {
		if (window.innerWidth <= 768) {
			local.windowSize.set(768)
		}
	})

	return (
		<>
			{auth && (
				<ActionBar
					activeTab="Profile"
					activateAddPost={() => {
						local.addPostModalOpen.set(true)
					}}
					username={local.name.get()}
				/>
			)}
			{local.addPostModalOpen.get() ? (
				<AddPostModal
					user={local.name.get()}
					onClose={() => {
						local.addPostModalOpen.set(false)
					}}
				/>
			) : null}
			<div className="h-full flex-col flex">
				{local.postViewData.get() !== null && local.postViewData.get().src && (
					<ViewPost
						post={{
							width: 1,
							height: 1,
							alt: "",
							id: "",
							preview: "",
							src: local.postViewData.get().src,
							description: local.postViewData.get().description,
							aiDescription: local.postViewData.get().aiDescription,
							categories: local.postViewData.get().categories,
						}}
						closeModal={() => {
							local.postViewData.set(null)
						}}
						onPostDelete={(postPhotoUrl) => {
							const updatedPosts = posts.filter(
								(post) => post.imageUrl !== postPhotoUrl,
							)
							local.createdPosts.set(updatedPosts)
						}}
					/>
				)}
				<Sidebar
					authenticated={auth}
					prettyName={local.displayName.get()}
					username={local.name.get()}
					description={local.bio.get()}
					profileImageUrl={local.profilePhotoUrl.get()}
					onSettingsClick={() => {
						router.push("/settings")
					}}
				/>
				<div className="md:ml-[380px] m-0 min-h-full flex">
					<ImageGrid
						columns={local.windowSize.get() < 768 ? 3 : 1}
						images={images}
						onClick={(img) => {
							local.postViewData.set(img)
							local.showPostViewModal.set(true)
						}}
					/>
				</div>
			</div>
		</>
	)
})

function Sidebar({
	authenticated,
	prettyName,
	username,
	description,
	profileImageUrl,
	onSettingsClick,
}: {
	authenticated: boolean
	prettyName: string
	username: string
	description?: string
	profileImageUrl?: string
	onSettingsClick?: () => void
}) {
	return (
		<div className="md:fixed left-0 md:w-[380px] w-full top-0 h-screen bg-secondary relative">
			{authenticated && (
				<button className="z-100 absolute top-2 left-2 hover:opacity-60 transition-opacity duration-300">
					<SettingsIcon
						className="color-white w-8 h-8 settings-icon"
						onClick={() => {
							onSettingsClick()
						}}
					/>
				</button>
			)}
			<img className="w-full h-3/5 bg-substitute" src={profileImageUrl}></img>
			<div className="p-[24px] pt-[34px] flex flex-col justify-between h-2/5">
				<div className="flex flex-col gap-[2px]">
					<div className="text-[30px] font-bold">{prettyName}</div>
					<div>@{username}</div>
					<div>{description}</div>
				</div>
				{/* <div className="flex gap-[10px] mt-[20px] self-center z-10 [&>*]:z-[30] [&>*]:rounded-[8px] [&>*]:w-[95px] [&>*]:flex [&>*]:justify-center [&>*]:p-1">
					<motion.div className="hover:bg-zinc-300 bold">Photos</motion.div>
					<motion.div className="hover:bg-zinc-300">Following</motion.div>
					<motion.div className="hover:bg-zinc-300">Followers</motion.div>
				</div> */}
			</div>
		</div>
	)
}
