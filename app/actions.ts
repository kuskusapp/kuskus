"use server"

import { z } from "zod"
import { actionClient } from "@/lib/safe-action"
import { updateUser } from "@/edgedb/crud/mutations"
import { auth } from "@/edgedb-next-client"
import { profileAuthLoadMoreImages } from "@/edgedb/crud/queries"

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
			// TODO: consider better errors
			return { failure: "Error with EdgeDB" }
		}
	})

const profileAuthGetMoreImagesSchema = z.object({
	pageNumber: z.number(),
})
export const profileAuthGetMoreImagesAction = actionClient
	.schema(profileAuthGetMoreImagesSchema)
	.action(async ({ parsedInput: { pageNumber } }) => {
		const session = auth.getSession()
		const client = session.client
		try {
			const res = await profileAuthLoadMoreImages.run(client, { pageNumber })
			return res
		} catch {
			// TODO: consider better errors
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
//     console.log(query)

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
