import { z } from "zod"

export const guessPlaces = {
	description: "Get relevant places in a location",
	parameters: z.object({
		location: z.string().describe("The location to get places for"),
		category: z.array(z.string()).describe("The category to search for"),
	}),
	execute: async ({
		location,
		category,
	}: {
		location: string
		category: string
	}) => {
		console.log(location, "location")
		console.log(category, "category")
		// await relevantPlacesAction()
		return {}
	},
}
