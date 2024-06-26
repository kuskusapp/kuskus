"use server"

import { auth } from "@/edgedb-next-client"
import { createPost, deletePost, updateUser } from "@/edgedb/crud/mutations"
import {
	profileLoadMorePosts,
	relevantPlacesQuery,
} from "@/edgedb/crud/queries"
import { generateText } from "ai"
import OpenAI from "openai"
import { create } from "ronin"
import z from "zod"
import { createServerActionProcedure } from "zsa"
import { openai as vercelOpenai } from "@ai-sdk/openai"
import { checkIfFoodOrDrinkByDescription, guessPlaces } from "./ai"

const publicAction = createServerActionProcedure()
	.handler(async () => {
		const session = auth.getSession()
		const client = session.client
		return {
			client,
		}
	})
	.createServerAction()
const authAction = createServerActionProcedure()
	.handler(async () => {
		const session = auth.getSession()
		const client = session.client
		const authenticated = await session.isSignedIn()
		if (!authenticated) throw "User not authenticated"
		return {
			client,
		}
	})
	.createServerAction()
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const updateUserProfileAction = authAction
	.input(
		z.object({
			username: z.string(),
			displayName: z.string().optional(),
		}),
	)
	.handler(async ({ input, ctx }) => {
		const { username, displayName } = input
		const client = ctx.client
		const resUpdateUser = await updateUser.run(client, {
			username,
			displayName,
		})
		if (resUpdateUser) return
		throw "Error updating user profile"
	})

export const updateUserProfileActionWithImage = authAction
	.input(
		z.object({
			username: z.string(),
			displayName: z.string().optional(),
			profileImage: z.custom<File>((file) => file instanceof File),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		const { username, displayName, profileImage } = input
		const client = ctx.client
		const resRoninUpload = await create.user.with({
			profilePhotoUrl: profileImage,
		})
		const resUpdateUser = await updateUser.run(client, {
			username,
			displayName,
			roninId: resRoninUpload.id,
			profilePhotoUrl: resRoninUpload.profilePhotoUrl.src,
		})
		if (resUpdateUser) return
		throw "Error updating user profile"
	})

export const describeImageAction = authAction
	.input(
		z.object({
			imageAsBase64: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const { imageAsBase64 } = input
		if (imageAsBase64.includes("data:image/png;base64,")) {
			throw "Error describing image as .png files are not supported by OpenAI 😿"
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
								url: imageAsBase64,
							},
						},
					],
				},
			],
		})
		if (!response) throw Error("Error describing image")
		return response.choices[0].message.content
		// return `The image shows a dark brown dog with a white muzzle sitting on a concrete surface. The background features green fields, trees, and a cloudy sky. The dog appears to be looking slightly to the side.`
	})

export const suggestCategoriesAction = authAction
	.input(
		z.object({
			foodDescription: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const { foodDescription } = input
		console.log(foodDescription, "food desc")
		const categories = await fetch(
			`http://158.160.90.161:8000/suggest-categories/?text=${encodeURIComponent(foodDescription)}&k=1`,
		)
		console.log(categories, "categories")
		console.log(categories.json(), "json")
		if (!categories.ok) throw new Error("Error suggesting categories")
		return await categories.json()
	})

export const createPostAction = authAction
	.input(
		z.object({
			postImage: z.custom<File>((file) => file instanceof File),
			aiDescription: z.string(),
			description: z.string(),
			categories: z.optional(z.array(z.string())),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		const { postImage, aiDescription, description, categories } = input
		const client = ctx.client
		const roninPost = await create.post.with({
			photo: postImage,
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
		if (!dbPost) throw new Error("Error creating post")
		return "ok"
	})

export const deletePostAction = authAction
	.input(
		z.object({
			imageUrl: z.string(),
		}),
	)
	.handler(async ({ input, ctx }) => {
		const { imageUrl } = input
		const client = ctx.client
		const res = await deletePost.run(client, { imageUrl })
		if (!res) throw new Error("Error deleting post")
		return "ok"
	})

export const profileLoadMoreMostsAction = publicAction
	.input(
		z.object({
			username: z.string(),
			pageNumber: z.number(),
		}),
	)
	.handler(async ({ input, ctx }) => {
		const { username, pageNumber } = input
		const client = ctx.client
		const posts = await profileLoadMorePosts.run(client, {
			username,
			pageNumber,
		})
		if (!posts) throw "Error fetching more posts"
		return posts
	})

export const checkIfFoodOrDrinkByDescriptionAction = authAction
	.input(
		z.object({
			description: z.string(),
		}),
	)
	.handler(async ({ input, ctx }) => {
		const { description } = input
		const result = await generateText({
			model: vercelOpenai("gpt-4o"),
			tools: { checkIfFoodOrDrinkByDescription },
			system: `You have to answer if image description provided is food or drink and be precise. It has to be precise image of food or drink, otherwise return false.`,
			messages: [{ role: "user", content: description }],
		})
		const foodOrDrink = result.toolCalls[0].args.foodOrDrink
		if (!foodOrDrink) {
			throw "Please upload an image of food or drink"
		}
		return foodOrDrink
	})

export const guessPlacesAction = authAction
	.input(
		z.object({
			query: z.string(),
		}),
	)
	.handler(async ({ input, ctx }) => {
		const { query } = input
		const client = ctx.client
		const result = await generateText({
			model: vercelOpenai("gpt-4o"),
			tools: { guessPlaces },
			system: `You are a helpful, respectful and honest assistant.`,
			messages: [{ role: "user", content: query }],
		})
		if (result.toolCalls.length === 0) {
			throw "Nothing matched your search term, lets try something else!"
		}
		const location = result.toolCalls[0].args.location
		console.log(location, "location")
		const category = result.toolCalls[0].args.category
		console.log(category, "category")

		const places = await relevantPlacesQuery.run(client, { location, category })
		console.log(places, "places")
		if (!places) throw "Error fetching relevant places"
		return places
	})
