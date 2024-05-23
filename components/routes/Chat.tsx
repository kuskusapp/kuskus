"use client"
import { relevantPlacesAction } from "@/app/actions"
import { openai } from "@ai-sdk/openai"
import { observer, useObservable } from "@legendapp/state/react"
import { CoreMessage, generateText, streamText } from "ai"
import { z } from "zod"

export default observer(function Chat() {
	const local = useObservable({
		query: "",
		messages: [] as CoreMessage[],
	})

	return (
		<div className="h-screen w-screen flex ">
			<div className=" h-full bg-primary w-full flex flex-col px-[100px] p-2 pt-[50px]">
				<div className="h-[90%]  w-full"></div>
				<div className="h-[10%] p-2  flex items-center justify-center">
					<form
						onSubmit={async (e) => {
							e.preventDefault()
							const places = await relevantPlacesAction({
								location: "Warsaw",
								category: "coffee",
							})
							console.log(places.data, "places")
							// process.env.OPENAI_API_KEY =
							// 	process.env.NEXT_PUBLIC_OPENAI_API_KEY
							// local.messages.push({ role: "user", content: local.query.get() })
							// TODO: show places for query
							// const result = await generateText({
							// 	model: openai("gpt-4o"),
							// 	tools: { guessPlaces },
							// 	system: `You are a helpful, respectful and honest assistant.`,
							// 	messages: local.messages.get(),
							// })
							// console.log(result, "result")

							// const result = await gpt4Model.doGenerate({
							// 	inputFormat: "prompt",
							// 	mode: { type: "regular" },
							// 	prompt: [
							// 		{
							// 			role: "user",
							// 			content: [{ type: "text", text: local.query.get() }],
							// 		},
							// 	],
							// })
							// console.log(result, "result")

							// TODO: stream it
							// const result = await gpt3Model.doStream({
							// 	inputFormat: "prompt",
							// 	mode: { type: "regular" },
							// 	prompt: [
							// 		{
							// 			role: "user",
							// 			content: [{ type: "text", text: local.query.get() }],
							// 		},
							// 	],
							// })
							// console.log(result, "result")
						}}
					>
						<input
							onChange={(e) => {
								local.query.set(e.target.value)
							}}
							className="w-full p-4 py-3 border border-slate-400/80 focus:border-transparent rounded-lg text-black"
							type="text"
						/>
					</form>
				</div>
			</div>
		</div>
	)
})

const guessPlaces = {
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
