"use client"
import { profileLoadMostPostsAction } from "@/app/actions"
import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { motion } from "framer-motion"
import { useEffect, useMemo } from "react"
import { ImageGrid } from "../PostGrid"
import ViewPost from "../ViewPost"

let last_id = 0
interface Props {
	authData: profileAuthReturn
}

export default observer(function Profile(props: Props) {
	const authData = useObservable(props.authData)
	const local = useObservable({
		showSettingsModal: false,
		pageNumber: 0,
		postViewData: null,
		showPostViewModal: false,
	})

	const posts = authData.createdPosts.get() ?? []
	const images = useMemo(() => {
		return posts.map((post) => {
			return {
				id: (last_id++).toString(),
				alt: "",
				width: post.imageWidth ?? 1,
				height: post.imageHeight ?? 1,
				src: post.imageUrl,
				preview: post.imagePreviewBase64Hash ?? "",
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
				local.pageNumber.set(local.pageNumber.get() + 1)

				const posts = await profileLoadMostPostsAction({
					username: "nikiv",
					pageNumber: local.pageNumber.get(),
				})

				authData.createdPosts.set([
					...(authData.createdPosts.get() ?? []),
					...posts.data[0].createdPosts,
				])
			}
		}

		window.addEventListener("scroll", checkBottom)
		checkBottom()

		return () => {
			window.removeEventListener("scroll", checkBottom)
		}
	}, [])

	useEffect(() => {
		console.log(local.postViewData.get(), "post view data")
	}, [local.postViewData.get()])

	return (
		<div className="min-h-screen h-full ">
			{local.postViewData.get() !== null && local.postViewData.get().src && (
				<ViewPost
					post={{
						id: "1",
						name: "test",
						category: "sushi",
						imageUrl: local.postViewData.get().src,
					}}
					closeModal={() => {
						local.postViewData.set(null)
					}}
				/>
			)}
			<Sidebar />
			<div className="ml-[380px] min-h-full flex">
				<ImageGrid
					images={images}
					onClick={(img) => {
						local.postViewData.set(img)
						local.showPostViewModal.set(true)
					}}
				/>
			</div>
		</div>
	)
})

function Sidebar() {
	// const local = useObservable({
	// 	hoveredSidebarTab: "Following",
	// })
	return (
		<div className="fixed left-0 w-[380px] top-0 h-screen bg-secondary">
			<div className="w-full h-3/5 bg-substitute">Profile</div>
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
