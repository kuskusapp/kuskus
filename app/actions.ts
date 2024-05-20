"use server"

import { z } from "zod"
import { actionClient } from "@/lib/safe-action"
import { updateUser } from "@/edgedb/crud/mutations"
import { auth } from "@/edgedb-next-client"
import { profileLoadMorePosts } from "@/edgedb/crud/queries"
import { describeImageSchema } from "./schemas"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: "sk-proj-",
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

export const describeImageAction = actionClient
	.schema(describeImageSchema)
	.action(async ({ parsedInput: { imageAsBase64 } }) => {
		try {
			// assumes image is a JPEG
			// TODO: support more types by: adjust the MIME type if it's different
			const dataUrl = `data:image/jpeg;base64,${imageAsBase64}`
			console.log(dataUrl, "data url")
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
									url: dataUrl,
								},
							},
						],
					},
				],
			})
			console.log(response.choices[0], "ai description of image")
			console.log(response, "response")
			console.log("finished")
			return true
			// const buffer = Buffer.from(imageAsBase64, "base64")
			// console.log(buffer, "buffer")
			// TODO: describe image
			// TODO: load image into ronin
			// return buffer
		} catch (err) {
			return { failure: "Describe image error:", errorDetails: err.message }
		}
	})

// const globalSearchSchema = z.object({
//   query: z.string(),
//   // categories: z.array(z.string()),
// })
// export const globalSearchAction = actionClient
//   .schema(globalSearchSchema)
//   .action(async ({ parsedInput: { query } }) => {
//     // TODO: turn query into vector..
//     // pass vector to edgedb for search, return results
//     return

//     const session = auth.getSession()
//     const client = session.client
//     try {
//       await updateUser.run(client, { bio, place, displayName })
//     } catch {
//       // TODO: consider better errors
//       return { failure: "Error with EdgeDB" }
//     }
//   })
