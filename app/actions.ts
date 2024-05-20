"use server"

import { z } from "zod"
import { actionClient } from "@/lib/safe-action"
import { updateUser } from "@/edgedb/crud/mutations"
import { auth } from "@/edgedb-next-client"
import { profileLoadMorePosts } from "@/edgedb/crud/queries"
import { describeImage } from "@/cli/seed"

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
	imageBlob: z.any(),
	huggingFaceToken: z.string(),
})
export const describeImageAction = actionClient
	.schema(describeImageSchema)
	.action(async ({ parsedInput: { imageBlob, huggingFaceToken } }) => {
		console.log("wtf try run it")
		const session = auth.getSession()
		console.log(session, "sesh")
		if (session) {
			try {
				let imageDescription = await describeImage(imageBlob, huggingFaceToken)
				console.log(imageDescription)
				return imageDescription
			} catch (err) {
				return { failure: "Error describing image:", errorDetails: err.message }
			}
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
