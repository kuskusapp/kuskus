"use server"

import { auth } from "@/edgedb-next-client"
import { updateUser } from "@/edgedb/crud/mutations"
import OpenAI from "openai"
import { create } from "ronin"
import z from "zod"
import { createServerAction, createServerActionProcedure } from "zsa"
import fs from "fs"

const publicAction = createServerAction()
const authAction = createServerActionProcedure()
	.handler(async () => {
		try {
			const session = auth.getSession()
			const client = session.client
			return {
				client,
			}
		} catch {
			throw new Error("User not authenticated")
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
			profileImage: z.custom<File>((file) => file instanceof File),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		const { username, displayName, profileImage } = input
		const client = ctx.client
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

export const describeImageAction = authAction
	.input(
		z.object({
			imageAsBase64: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const { imageAsBase64 } = input
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
		return response.choices[0].message.content

		throw new Error("Error describing image")
	})
