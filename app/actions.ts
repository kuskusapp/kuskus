"use server"

import { auth } from "@/edgedb-next-client"
import { createPost, deletePost, updateUser } from "@/edgedb/crud/mutations"
import {
	profileLoadMorePosts,
	relevantPlacesQuery,
} from "@/edgedb/crud/queries"
import { actionClient } from "@/lib/safe-action"
import { create } from "ronin"
import { z } from "zod"
import { zfd } from "zod-form-data"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const logoutAction = actionClient.action(async () => {
	const { signout } = auth.createServerActions()
	signout()
})

export const updateUserAction = actionClient
	.schema(
		z.object({
			bio: z.string().optional(),
			place: z.string().optional(),
			displayName: z.string().optional(),
		}),
	)
	.action(async ({ parsedInput: { bio, place, displayName } }) => {
		const session = auth.getSession()
		const client = session.client
		try {
			await updateUser.run(client, { bio, place, displayName })
		} catch (err) {
			return { failure: "EdgeDB error:", errorDetails: err.message }
		}
	})

export const profileLoadMostPostsAction = actionClient
	.schema(
		z.object({
			username: z.string(),
			pageNumber: z.number(),
		}),
	)
	.action(async ({ parsedInput: { username, pageNumber } }) => {
		const session = auth.getSession()
		const client = session.client
		try {
			const res = await profileLoadMorePosts.run(client, {
				username,
				pageNumber,
			})
			return res
		} catch (err) {
			return { failure: "EdgeDB error:", errorDetails: err.message }
		}
	})

export const describeImageAction = actionClient
	.schema(
		z.object({
			image: zfd.formData({
				imageAsBase64: z.string(),
			}),
		}),
	)
	.action(async ({ parsedInput: { image } }) => {
		try {
			if (image.imageAsBase64.startsWith("data:image/png;base64,")) {
				throw new Error("OpenAI does not support png format")
			}
			// const response = await openai.chat.completions.create({
			// 	model: "gpt-4o",
			// 	messages: [
			// 		{
			// 			role: "user",
			// 			content: [
			// 				{ type: "text", text: "What’s in this image?" },
			// 				{
			// 					type: "image_url",
			// 					image_url: {
			// 						url: image.imageAsBase64,
			// 					},
			// 				},
			// 			],
			// 		},
			// 	],
			// })
			// console.log(response, "resp")
			// return response.choices[0].message.content
			return `This image shows a hand holding a cup of coffee with latte art in the shape of a heart on top. The background is an outdoor pavement area, and part of a person's shoes can be seen at the bottom of the image.`
		} catch (err) {
			return { failure: "Describe image error:", errorDetails: err.message }
		}
	})

export const uploadPostAction = actionClient
	.schema(
		z.object({
			imageFile: zfd.formData({
				image: zfd.file(),
			}),
			aiDescription: z.string(),
			description: z.string(),
			categories: z.optional(z.array(z.string())),
		}),
	)
	.action(
		async ({
			parsedInput: { imageFile, aiDescription, categories, description },
		}) => {
			const session = auth.getSession()
			const client = session.client
			await new Promise((resolve) => setTimeout(resolve, 3000))
			try {
				const roninPost = await create.post.with({
					photo: imageFile.image,
					aiDescription,
					description,
				})
				const dbPost = await createPost.run(client, {
					imageUrl: roninPost.photo.src,
					roninId: roninPost.id,
					imageWidth:
						"width" in roninPost.photo.meta ? roninPost.photo.meta.width : 0,
					imageHeight:
						"height" in roninPost.photo.meta ? roninPost.photo.meta.height : 0,
					imagePreviewBase64Hash: roninPost.photo.placeholder.base64,
					aiDescription: aiDescription,
					description: description,
					categories: categories,
				})
				console.log(dbPost, "db post")
				return "success"
			} catch (err) {
				return { failure: "Upload image error:", errorDetails: err.message }
			}
		},
	)

// extend to more categories in future
export const relevantPlacesAction = actionClient
	.schema(
		z.object({
			location: z.string(),
			category: z.string(),
		}),
	)
	.action(async ({ parsedInput: { location, category } }) => {
		const session = auth.getSession()
		const client = session.client
		const res = await relevantPlacesQuery.run(client, { location, category })
		try {
			return res
		} catch (err) {
			return { failure: "EdgeDB error", errorDetails: err.message }
		}
	})

export const deletePostAction = actionClient
	.schema(
		z.object({
			imageUrl: z.string(),
		}),
	)
	.action(async ({ parsedInput: { imageUrl } }) => {
		const session = auth.getSession()
		const client = session.client
		const res = await deletePost.run(client, { imageUrl })
		try {
			return res
		} catch (err) {
			return { failure: "EdgeDB error", errorDetails: err.message }
		}
	})

export const suggestCategoriesAction = actionClient
	.schema(
		z.object({
			foodDescription: z.string(),
		}),
	)
	.action(async ({ parsedInput: { foodDescription } }) => {
		try {
			const session = auth.getSession()
			if (session) {
				const categories = await fetch(
					`http://158.160.90.161:8000/suggest-categories/?text=${encodeURIComponent(foodDescription)}&k=1`,
				)
				return await categories.json()
			}
		} catch (err) {
			return { failure: "EdgeDB error", errorDetails: err.message }
		}
	})

export const updateUserProfileAction = actionClient
	.schema(
		z.object({
			username: z.string(),
			displayName: z.string().optional(),
			profileImage: z.any(),
		}),
	)
	.action(async ({ parsedInput: { username, displayName, profileImage } }) => {
		try {
			const session = auth.getSession()
			const client = session.client
			if (session) {
				const profileImageFiles = profileImage.getAll("profileImage")
				const profileImageFile = profileImageFiles[0]
				console.log(profileImageFile, "profile image file")
				if (profileImageFile) {
					const resRoninUpload = await create.user.with({
						profilePhotoUrl: profileImageFile,
					})
					const resUpdateUser = await updateUser.run(client, {
						username,
						displayName,
						// @ts-ignore
						roninId: resRoninUpload.id,
						// @ts-ignore
						profilePhotoUrl: resRoninUpload.profilePhotoUrl.src,
					})
					if (resUpdateUser) {
						return "ok"
					}
				} else {
					const resUpdateUser = await updateUser.run(client, {
						username,
						displayName,
					})
					if (resUpdateUser) {
						return "ok"
					}
				}
			}
		} catch (err) {
			return { failure: "EdgeDB error", errorDetails: err.message }
		}
	})
