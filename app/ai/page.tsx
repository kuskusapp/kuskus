"use client"

import { useChat } from "ai/react"

// testing Vercel AI SDK
// https://sdk.vercel.ai/docs/ai-sdk-rsc/generative-ui
export default function AI() {
	const { messages, input, handleInputChange, handleSubmit } = useChat()
	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
			{messages.map((m) => (
				<div key={m.id} className="whitespace-pre-wrap">
					{m.role === "user" ? "User: " : "AI: "}
					{m.content}
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<input
					className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
					value={input}
					placeholder="Say something..."
					onChange={handleInputChange}
				/>
			</form>
		</div>
	)
}
