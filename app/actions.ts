"use server"

import { createServerAction } from "zsa"
import z from "zod"
import OpenAI from "openai"
import { auth } from "@/edgedb-next-client"
import { updateUser } from "@/edgedb/crud/mutations"
import { create } from "ronin"

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

export const updateUserProfileAction = createServerAction()
	.input(
		z.object({
			username: z.string(),
			displayName: z.string().optional(),
			profileImage: z.custom<File>((file) => file instanceof File),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input }) => {
		const { username, displayName, profileImage } = input
		const session = auth.getSession()
		const client = session.client
		if (profileImage) {
			const resRoninUpload = await create.user.with({
				profilePhotoUrl: profileImage,
			})
			const resUpdateUser = await updateUser.run(client, {
				username,
				displayName,
				roninId: resRoninUpload.id,
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
		throw new Error("Error updating user profile")
	})
