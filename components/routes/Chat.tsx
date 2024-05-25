"use client"
import * as react from "react"
import { FaUserCircle } from "react-icons/fa"
import { TbSquareLetterK } from "react-icons/tb"
import PlaceCard from "../PlaceCard"

type RelevantPlace = {
	name: string
	displayName: string
	imageUrl: string
	category: string
}

enum AnswerKind {
	Loading,
	Place,
	Text,
}
type Answer = AnswerLoading | AnswerPlace | AnswerText

type AnswerLoading = {
	kind: AnswerKind.Loading
}

type AnswerPlace = {
	kind: AnswerKind.Place
	places: RelevantPlace[]
}

type AnswerText = {
	kind: AnswerKind.Text
	text: string
}

type QuestionAndAnswer = {
	question: string
	answer: Answer
}

let dummy = 0

export default function Chat() {
	const input_ref = react.useRef<HTMLInputElement>(null)
	const messagesScroll = react.useRef<HTMLDivElement>(null)
	const [qas, set_qas] = react.useState<QuestionAndAnswer[]>([])

	react.useEffect(() => {
		if (messagesScroll.current) {
			messagesScroll.current.scrollTop = messagesScroll.current.scrollHeight
		}
	}, [qas])

	const handle_submit = react.useCallback(
		async (e: react.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			let query = input_ref.current?.value
			if (!query) return
			input_ref.current.value = ""

			const qa: QuestionAndAnswer = {
				question: query,
				answer: { kind: AnswerKind.Loading },
			}

			let qa_idx = 0
			set_qas((qas) => {
				const qas_copy = [...qas]
				qa_idx = qas_copy.push(qa) - 1
				return qas_copy
			})

			// TODO: fetch an actual answer

			await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate loading

			let answer: Answer
			if (++dummy % 2 === 0) {
				answer = {
					kind: AnswerKind.Text,
					text: "Nothing matched your search term, lets try something else!",
				}
			} else {
				answer = {
					kind: AnswerKind.Place,
					places: [
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
						{
							name: "3",
							displayName: "3",
							imageUrl:
								"https://lh5.googleusercontent.com/p/AF1QipPBtbz87EZ9HGIia9bkRT2szr99d5Bg9PRvLKvc=w408-h306-k-no",
							category: "coffee",
						},
					],
				}
			}

			set_qas((qas) => {
				const qas_copy = [...qas]
				qas_copy[qa_idx] = { ...qa, answer }
				return qas_copy
			})
		},
		[],
	)

	return (
		<>
			<div className="h-screen w-screen flex overflow-hidden">
				<div className="h-full bg-primary w-full flex flex-col px-[100px] p-2 pt-[50px]">
					{qas.length === 0 && (
						<div className="flex-col w-[40%] pl-10 absolute left-1/2 top-10 transform -translate-x-1/2 bg-[#09090b] py-8 border border-zinc-700 rounded-md">
							<p className="text-lg text-left">Welcome to KusKus AI Chat!</p>
							<p className="text-md w-[80%] text-left pt-5">
								KusKus is your smart companion for discovering the best spots
								nearby. Just type in the chat, and KusKus will swiftly suggest
								restaurants, cafes, coffeeplaces, and more around you. It's all
								about making your search easy, fast, and perfectly tailored to
								your needs!
							</p>
						</div>
					)}
					<div
						className="flex-grow overflow-auto mb-[80px]"
						ref={messagesScroll}
					>
						{qas.map((qa, index) => (
							<div
								key={index}
								className="mb-4 flex flex-col items-center w-full ref={messagesScroll}"
							>
								<div className="flex items-center w-full justify-center">
									<FaUserCircle className="text-white mr-2" />
									<div className="text-left w-[50%]">
										<div className="font-bold">{qa.question}</div>
									</div>
								</div>
								<div className="mt-4 w-full flex justify-center">
									{qa.answer.kind === AnswerKind.Loading && (
										<div>Loading...</div>
									)}
									{qa.answer.kind === AnswerKind.Text && (
										<div className="flex items-center w-full justify-center">
											<TbSquareLetterK className="text-white mr-2" />
											<div className="text-left w-[50%]">{qa.answer.text}</div>
										</div>
									)}
									{qa.answer.kind === AnswerKind.Place && (
										<div className="w-full flex flex-col items-center">
											<div className="flex items-center pb-5 w-full justify-center">
												<TbSquareLetterK className="text-white mr-2" />
												<div className="text-left w-[50%]">
													{" "}
													Here are the places you are looking for:
												</div>
											</div>
											<div className="flex flex-row justify-center w-full">
												{qa.answer.places.map((place) => (
													<PlaceCard
														name={place.name}
														displayName={place.displayName}
														imageUrl={place.imageUrl}
														category={place.category}
													/>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>

					<div className="h-[10%] p-2 flex items-center justify-center">
						<form onSubmit={handle_submit}>
							<div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 bg-[#09090b] px-5 py-10 border border-zinc-700 rounded-md">
								<input
									placeholder="Send message..."
									ref={input_ref}
									className="w-[550px] input-placeholder focus:outline-none px-4 py-2 border bg-inherit border-zinc-700/80 focus:border-transparent rounded-md text-zinc-300"
									type="text"
								/>
								<button
									type="submit"
									className="ml-2 p-2 bg-neutral-700 text-white rounded-md"
								>
									Send
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

// process.env.OPENAI_API_KEY =
// 	process.env.NEXT_PUBLIC_OPENAI_API_KEY
// local.messages.push({
// 	role: "user",
// 	content: local.query.get(),
// })
// const result = await generateText({
// 	model: openai("gpt-4o"),
// 	tools: { guessPlaces },
// 	system: `You are a helpful, respectful and honest assistant.`,
// 	messages: local.messages.get(),
// })
// console.log(result, "result")
// const places = await relevantPlacesAction({
// 	location: "Warsaw",
// 	category: "coffee",
// })
// console.log(places.data, "places")

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
