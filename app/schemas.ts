import { z } from "zod"

export const describeImageSchema = z.object({
	imageAsBase64: z.string(),
	// huggingFaceToken: z.string(),
})
