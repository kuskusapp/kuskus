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

const updateUserSchema = z.object({
	bio: z.string().optional(),
	place: z.string().optional(),
	displayName: z.string().optional(),
})
export const updateUserAction = actionClient
	.schema(updateUserSchema)
	.action(async ({ parsedInput: { bio, place, displayName } }) => {
		const session = auth.getSession()
		const client = session.client
		try {
			await updateUser.run(client, { bio, place, displayName })
		} catch (err) {
			return { failure: "EdgeDB error:", errorDetails: err.message }
		}
	})

const profileLoadMostPostsSchema = z.object({
	username: z.string(),
	pageNumber: z.number(),
})
export const profileLoadMostPostsAction = actionClient
	.schema(profileLoadMostPostsSchema)
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

const describeImageSchema = z.object({
	image: zfd.formData({
		imageAsBase64: z.string(),
	}),
})
export const describeImageAction = actionClient
	.schema(describeImageSchema)
	.action(async ({ parsedInput: { image } }) => {
		try {
			if (image.imageAsBase64.startsWith("data:image/png;base64,")) {
				throw new Error("OpenAI does not support png format")
			}
			const response = await openai.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{
						role: "user",
						content: [
							{ type: "text", text: "What’s in this image?" },
							{
								type: "image_url",
								image_url: {
									url: image.imageAsBase64,
								},
							},
						],
					},
				],
			})
			console.log(response, "response")
			console.log(response.choices[0].message.content, "description")
			return response.choices[0].message.content
			// return `This image shows a bamboo steamer basket containing six dumplings. The steamer is placed on a white plate with a mesh liner inside to prevent the dumplings from sticking. The scene suggests that the dumplings are likely being served at a restaurant. The background shows part of a table and seating, indicating a dining environment.`
			// return `The image shows a web interface with a black background. On the left side, there is a placeholder or icon that typically represents an image, indicating that an image should be here but is currently missing or not loaded. On the right side, there is a section labeled "DESCRIPTION" with a text box that says "Write a description..." and another labeled "Image Description". Below this, there are several categories displayed in oval buttons, including "Sushi", "Breakfast", "Smoothie", "Vegan", "Pasta", "Salad", "Healthy", and "Steak". At the bottom right, there is a yellow button labeled "Share".`
		} catch (err) {
			return { failure: "Describe image error:", errorDetails: err.message }
		}
	})

const uploadPostSchema = z.object({
	imageFile: zfd.formData({
		image: zfd.file(),
	}),
	aiDescription: z.string(),
	description: z.string(),
	categories: z.optional(z.array(z.string())),
})
export const uploadPostAction = actionClient
	.schema(uploadPostSchema)
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
				})
				console.log(dbPost, "db post")
				return "success"
			} catch (err) {
				return { failure: "Upload image error:", errorDetails: err.message }
			}
		},
	)

// extend to more categories in future
const relevantPlacesSchema = z.object({
	location: z.string(),
	category: z.string(),
})
export const relevantPlacesAction = actionClient
	.schema(relevantPlacesSchema)
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

const deletePostSchema = z.object({
	imageUrl: z.string(),
})
export const deletePostAction = actionClient
	.schema(deletePostSchema)
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

const suggestCategoriesSchema = z.object({
	foodDescription: z.string(),
})
export const suggestCategoriesAction = actionClient
	.schema(suggestCategoriesSchema)
	.action(async ({ parsedInput: { foodDescription } }) => {
		try {
			const session = auth.getSession()
			if (session) {
				const categories = await fetch(
					`http://158.160.90.161:8000/suggest-categories/?text=${encodeURIComponent(foodDescription)}&k=2`,
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
		}),
	)
	.action(async ({ parsedInput: { username, displayName } }) => {
		try {
			const session = auth.getSession()
			const client = session.client
			if (session) {
				const res = await updateUser.run(client, {
					username,
					displayName,
				})
				console.log(res, "res")
				if (res) {
					return "ok"
				} else {
					throw new Error("Error updating user profile")
				}
			}
		} catch (err) {
			return { failure: "EdgeDB error", errorDetails: err.message }
		}
	})
