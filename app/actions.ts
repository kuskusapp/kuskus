"use server"

import { createServerAction } from "zsa"
import z from "zod"
import OpenAI from "openai"
import { auth } from "@/edgedb-next-client"
import { updateUser } from "@/edgedb/crud/mutations"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const incrementNumberAction = createServerAction()
	.input(
		z.object({
			number: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		await new Promise((resolve) => setTimeout(resolve, 3000))
		return input.number + 1
	})

export const updateUserAction = createServerAction()
	.input(
		z.object({
			bio: z.string().optional(),
			place: z.string().optional(),
			displayName: z.string().optional(),
		}),
	)
	.handler(async ({ input }) => {
		const { bio, place, displayName } = input
		const session = auth.getSession()
		const client = session.client
		try {
			await updateUser.run(client, { bio, place, displayName })
		} catch (err) {
			return { failure: "EdgeDB error:", errorDetails: err.message }
		}
	})
