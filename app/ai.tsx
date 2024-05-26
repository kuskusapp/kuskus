import { z } from "zod"

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

export const checkIfFoodOrDrinkByDescription = {
	description:
		"Return true if given description is of a food or drink. Return false otherwise.",
	parameters: z.object({
		foodOrDrink: z.boolean().describe("Is the description of a food or drink?"),
	}),
	execute: async ({ foodOrDrink }: { foodOrDrink: boolean }) => {
		return { foodOrDrink }
	},
}
