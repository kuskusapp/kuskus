import { z } from "zod"
import { relevantPlacesAction } from "./actions"

export const guessPlaces = {
	description: "Get relevant places in a location",
	parameters: z.object({
		location: z.string().describe("The location to get places for"),
		category: z.string().describe("The category to search for"),
	}),
	execute: async ({
		location,
		category,
	}: {
		location: string
		category: string
	}) => {
		return { location, category }
	},
}
