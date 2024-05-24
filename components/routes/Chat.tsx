"use client"
// import { relevantPlacesAction } from "@/app/actions"
import { observer, useObservable } from "@legendapp/state/react"
import { CoreMessage } from "ai"
import { useEffect } from "react"
import PlaceCard from "../PlaceCard"
import ActionBar from "../ActionBar"

interface RelevantPlace {
	name: string
	displayName: string
	imageUrl: string
	category: string
}

export default observer(function Chat() {
	const local = useObservable({
		query: "",
		messages: [] as CoreMessage[],
		questionAndAnswer: [] as {
			question: string
			relevantPlaces?: RelevantPlace[]
			answerAsText?: string
		}[],
	})

	// used for testing the ui
	useEffect(() => {
		local.questionAndAnswer.set([
			{
				question: "Great coffee places in Warsaw",
				relevantPlaces: [
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
				],
			},
		])
	}, [])

	return (
		<>
			<div className="h-screen w-screen flex">
				<div className="h-full bg-primary w-full flex flex-col px-[100px] p-2 pt-[50px]">
					{local.questionAndAnswer.get().map((qa) => {
						return (
							<>
								<div>question: {qa.question}</div>
								<div>
									answer:{" "}
									{qa.relevantPlaces.map((place) => {
										console.log(place.imageUrl)
										return (
											<PlaceCard
												name={place.name}
												displayName={place.displayName}
												imageUrl={place.imageUrl}
												category={place.category}
											/>
										)
									})}
								</div>
							</>
						)
					})}
					{local.questionAndAnswer.get().length === 0 && (
						<div className="flex-col w-[40%] pl-10 absolute left-1/2 top-10 transform -translate-x-1/2 bg-[#09090b] py-8 border border-zinc-700 rounded-md">
							<p className="text-lg text-left">Welcome to KusKus AI Chat!</p>
							<p className="text-md w-[80%] text-left pt-5">
								KusKus is your smart companion for discovering the best spots
								nearby. Just type in the chat, and KusKus will swiftly suggest
								restaurants, cafes, shops, and more around you. It's all about
								making your search easy, fast, and perfectly tailored to your
								needs!
							</p>
						</div>
					)}
					<div className="h-[10%] p-2 flex items-center justify-center">
						<form
							onSubmit={async (e) => {
								e.preventDefault()
								// const places = await relevantPlacesAction({
								// 	location: "Warsaw",
								// 	category: "coffee",
								// })
								// console.log(places.data, "places")
							}}
						>
							<div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 bg-[#09090b] px-5 py-10 border border-zinc-700 rounded-md">
								<input
									placeholder="Send message..."
									onChange={(e) => {
										local.query.set(e.target.value)
									}}
									className="w-[550px] input-placeholder focus:outline-none px-4 py-2 border bg-inherit border-zinc-700/80 focus:border-transparent rounded-md text-zinc-300"
									type="text"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
})

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
