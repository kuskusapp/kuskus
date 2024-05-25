"use server"

import { createServerAction } from "zsa"
import z from "zod"

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
