"use server"

import { createServerAction, createServerActionProcedure } from "zsa"
import z from "zod"
import OpenAI from "openai"
import { auth } from "@/edgedb-next-client"
import { updateUser } from "@/edgedb/crud/mutations"
import { create } from "ronin"
import { fileToBase64 } from "@/src/server-utils"

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
			image: z.custom<File>((file) => file instanceof File),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input }) => {
		const { image } = input
		console.log(image, "image")
		const imageAsBase64 = await fileToBase64(image)
		console.log(imageAsBase64, "image as base64")
		if (image) {
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
		}
		throw new Error("Error describing image")
	})
