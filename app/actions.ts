"use server"

import { z } from "zod"
import { actionClient } from "@/lib/safe-action"
import { updateUser } from "@/edgedb/crud/mutations"
import { auth } from "@/edgedb-next-client"
import { profileLoadMorePosts } from "@/edgedb/crud/queries"

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
		} catch {
			return { failure: "Error with EdgeDB" }
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
		} catch {
			return { failure: "Error with EdgeDB" }
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
