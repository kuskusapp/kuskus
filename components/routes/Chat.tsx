"use client"
import { relevantPlacesAction } from "@/app/actions"
import { observer, useObservable } from "@legendapp/state/react"
import { CoreMessage } from "ai"
import { useEffect } from "react"
import PlaceCard from "../PlaceCard"

export default observer(function Chat() {
	const local = useObservable({
		query: "",
		messages: [] as CoreMessage[],
		relevantPlaces: [] as {
			name: string
			displayName: string
			imageUrl: string
			category: string
		}[],
	})

	useEffect(() => {
		local.relevantPlaces.set([
			{
				name: "sklep-z-kawa-i-kawiarnia",
				displayName: "Sklep z Kawą i Kawiarnia",
				imageUrl:
					"https://lh5.googleusercontent.com/p/AF1QipPB8FL_x-CQbk9z4ZYLkaqyrHNfkhnFhJ5-T0Qw=w408-h271-k-no",
				category: "coffee",
			},
			{
				name: "wazaap",
				displayName: "Wazaap",
				imageUrl:
					"https://lh5.googleusercontent.com/p/AF1QipPBtbz87EZ9HGIia9bkRT2szr99d5Bg9PRvLKvc=w408-h306-k-no",
				category: "coffee",
			},
		])
	}, [])

	return (
		<>
			<div className="h-screen w-screen flex ">
				<div className=" h-full bg-primary w-full flex flex-col px-[100px] p-2 pt-[50px]">
					<div className="h-[90%]  w-full"></div>
					{local.relevantPlaces.get().map((place) => {
						return (
							<>
								<PlaceCard
									name={place.name}
									displayName={place.displayName}
									imageUrl={place.imageUrl}
									category={place.category}
								/>
							</>
						)
					})}
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
		</>
	)
})
